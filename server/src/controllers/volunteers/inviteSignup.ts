import { Request, Response } from "express"
import { capitaliseStr, formatDate, normalizeMobile } from "../../utils/global";
import getData from "../../utils/getData";
import { verifyVolunteerInvite } from "../../gql/volunteers/queries";
import { signupInvitation } from "../../gql/volunteers/mutations";
import { hash } from 'bcrypt';

const inviteSignup = async (req: Request, res: Response) => {
  
  if(req.body.token && req.body.token !== 'null' && req.body.token !== 'NULL')
  {
    const inviteResult = await getData(verifyVolunteerInvite, {token: req.body.token})
    if(inviteResult?.errors)
    {
      return res.status(400).json({
        status: 'error',
        message: inviteResult?.errors[0]?.message
      })
    }
    const invite = inviteResult?.data?.Invitations?.[0]
    if(!invite)
    {
      return res.status(404).json({
        status: 'error',
        message: "Invitation doesn't exist."
      })
    }
    const phone = normalizeMobile(req.body.phoneNumber)
    const emailRaw = (req.body.email || '').replace('%40', '@').trim()
    const email = emailRaw ? emailRaw.toLowerCase() : null
    if(invite.phone_number && invite.phone_number !== phone)
    {
      return res.status(404).json({
        status: 'error',
        message: "This invitation is for a different phone number."
      })
    }
    if(!invite.phone_number && invite.email && invite.email !== email)
    {
      return res.status(404).json({
        status: 'error',
        message: "Invitation doesn't exist for the given email."
      })
    }
    if (!phone) {
      return res.status(400).json({
        status: 'error',
        message: 'Please provide a valid 10-digit mobile number',
      })
    }
  
    const encryptPass = await hash(req.body.password, 12)
    
    const variables = {
      ...req.body,
      inviteToken: req.body.token,
      isAdmin: invite.isAdmin,
      name: capitaliseStr(req.body.name),
      state: capitaliseStr(req.body.state),
      location: capitaliseStr(req.body.location),
      city: capitaliseStr(req.body.city),
      email,
      phoneNumber: phone,
      dob: formatDate(req.body.dob),
      password: encryptPass,
      isAdminVerified: true,
      isVerified: true,
      token: null,
      isAccepted: true
    };

    const data = await getData(signupInvitation, variables)
    if(data?.errors)
    {
      return res.status(400).json({
        status: 'error',
        message: data?.errors[0]?.message
      })
    }
    if(data?.data?.update_Invitations?.affected_rows && data?.data?.insert_users?.affected_rows)
    {
      return res.status(200).json({
        status: 'success',
        message: "User registered successfully!"
      })
    }
    return res.status(400).json({
      status: 'error',
      message: "Something went wrong. Please try again later!"
    })
  }

  return res.status(400).json({
    status: 'error',
    message: "Invalid Invitation!"
  })

}

export default inviteSignup