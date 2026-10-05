import { Request, Response } from "express"
import getData from "../../utils/getData"
import { checkPhoneAvailability } from "../../gql/volunteers/queries"
import CryptoJS from "crypto-js"
import { newInvite } from "../../gql/volunteers/mutations"
import { capitaliseStr, normalizeMobile } from "../../utils/global"
import generateEmail from "../../utils/generateMail"
import transporter from "../../utils/nodeMailer"

const inviteVolunteer = async (req: Request, res: Response) => {
  const name = capitaliseStr(req.body?.name || '')
  const phone = normalizeMobile(req.body?.phoneNumber || req.body?.phone)
  const emailRaw = (req.body?.email || '').trim()
  const email = emailRaw ? emailRaw.toLowerCase() : null
  const isAdmin = req.body?.isAdmin === true || req.body?.isAdmin === 'true'

  if (!name || name.length < 3) {
    return res.status(400).json({
      status: 'error',
      message: 'Name must be at least 3 characters long',
    })
  }
  if (!phone) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide a valid 10-digit mobile number',
    })
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide a valid email',
    })
  }

  const existing = await getData(checkPhoneAvailability, { phoneNumber: phone })
  if (existing?.errors) {
    return res.status(400).json({
      status: 'error',
      message: existing.errors[0]?.message,
    })
  }
  if (existing?.data?.users?.length) {
    return res.status(400).json({
      status: 'error',
      message: 'This phone number is already registered',
    })
  }
  if (existing?.data?.Invitations?.length) {
    return res.status(400).json({
      status: 'error',
      message: 'An invitation is already waiting for this phone number',
    })
  }

  const token = CryptoJS.AES.encrypt(phone, process.env.CRYPTO_TICKET || '').toString()
  const created = await getData(newInvite, {
    name,
    email,
    phone_number: phone,
    token,
    isAdmin,
  })
  if (created?.errors) {
    return res.status(400).json({
      status: 'error',
      message: created.errors[0]?.message,
    })
  }

  const signupPath = `/signup?ticket=${encodeURIComponent(token)}&phone=${phone}`
  if (email) {
    const mailOptions = {
      from: 'infotech@thelastcentre.com',
      to: email,
      subject: 'TLC Invitation',
      text: '',
      html: generateEmail(
        `https://tlc-mvp-app.vercel.app${signupPath}`,
        name,
        'Accept Invitation',
        'TLC invites you to join. You will sign up with your phone number.'
      ),
    }
    transporter.sendMail(mailOptions, () => {})
  }

  return res.status(200).json({
    status: 'success',
    message: email
      ? 'Invitation ready. Share the phone signup link. A copy was also emailed.'
      : 'Invitation ready. Share this phone signup link.',
    signupPath,
    phone,
  })
}

export default inviteVolunteer
