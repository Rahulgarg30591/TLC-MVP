import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import getData from '../../utils/getData';
import { DeleteUserByEmail, InsertUserMutation } from '../../gql/user/mutations';
import generateEmail from '../../utils/generateMail';
import transporter from '../../utils/nodeMailer';
import { capitaliseStr, formatDate, normalizeMobile } from '../../utils/global';
import { hash } from 'bcrypt';

const accountExistsMessage = (message?: string) => {
  const msg = message || '';
  if (msg.includes('users_phoneNumber_key')) {
    return 'An account with this phone number already exists';
  }
  if (msg.includes('users_email_key')) {
    return 'An account with this email already exists';
  }
  return msg;
};

const signup = async (req: Request, res: Response) => {
  const mutation = InsertUserMutation;
  const phoneNumber = normalizeMobile(req.body?.phoneNumber);
  if (!phoneNumber) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide a valid 10-digit mobile number',
    });
  }

  const emailRaw = (req.body?.email || '').trim();
  const email = emailRaw ? emailRaw.toLowerCase() : null;
  if (emailRaw && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw)) {
    return res.status(400).json({
      status: 'error',
      message: 'Please provide a valid email',
    });
  }

  const encryptPass = await hash(req.body.password, 12)
  let token: any = email
    ? CryptoJS.AES.encrypt(email, process.env.CRYPTO_TICKET || '').toString()
    : '';

  const variables = {
    ...req.body,
    name: capitaliseStr(req.body.name),
    state: capitaliseStr(req.body.state),
    location: capitaliseStr(req.body.location),
    city: capitaliseStr(req.body.city),
    email,
    phoneNumber,
    dob: formatDate(req.body.dob),
    password: encryptPass,
    isVerified: !email,
    token,
  };

  if (!email) {
    const created = await getData(mutation, variables);
    if (created?.errors) {
      return res.status(400).json({
        status: 'error',
        message: accountExistsMessage(created.errors[0]?.message),
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'Account created. An admin needs to approve it before you can sign in.',
    });
  }

  const data = await getData(mutation, variables);
  if (!data.errors) {
    const mailOptions = {
      from: 'infotech@thelastcentre.com',
      to: req.body.email,
      subject: 'Verification of TLC Email',
      text: '',
      html: generateEmail(
        `https://tlc-mvp-server.vercel.app/user/verifyUser?token=${variables.token}`,
        capitaliseStr(req.body.name)
      ),
    };

    transporter.sendMail(mailOptions, async (err) => {
      if (!err) {
        return res.status(200).json({
          status: 'success',
          message: 'Mail sent successfully!',
        });
      }

      await getData(DeleteUserByEmail, {
        email: req.body.email,
      });

      return res.status(400).json({
        status: 'error',
        message: 'Something went wrong, Please try again!',
      });
    });
    return;
  }
  return res.status(400).json({
    status: 'error',
    message: accountExistsMessage(data?.errors[0]?.message),
  });
};

export default signup;
