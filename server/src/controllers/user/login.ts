import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import getData from '../../utils/getData';
import { getUserByEmail, getUserByPhone } from '../../gql/user/queries';
import { updateStatus, updateStatusById } from '../../gql/user/mutations';
import jwt from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { normalizeMobile } from '../../utils/global';

const login = async (req: Request, res: Response) => {
  const identifier = (req.body?.email || req.body?.phoneNumber || '').trim();
  const { password } = req.body;

  if (!identifier || !password) {
    return res
      .status(400)
      .json({ message: 'Please provide your phone number and password!', status: 'error' });
  }

  const phone = normalizeMobile(identifier);
  const data = phone
    ? await getData(getUserByPhone, { phoneNumber: phone })
    : await getData(getUserByEmail, { email: identifier.toLowerCase() });

  if (data?.errors?.length) {
    return res.status(500).json({
      status: 'error',
      message: 'Database is unavailable. Please try again later.',
    });
  }

  if (!data?.data?.users?.length) {
    return res
      .status(400)
      .json({ status: 'error', message: 'User does not exists!' });
  }

  const user = data.data.users[0];
  const decryptedPass = await compare(password, user?.password)
  if (!decryptedPass){  
    return res.status(401).json({
      status: 'error',
      message: 'Invalid Credentials',
    });
  }
  if (!user.isVerified) {
    return res.status(401).json({
      status: 'error',
      message: 'Email is not verified. Please follow instructions sent on mail',
    });
  }

  if (!user.isAdminVerified) {
    return res.status(403).json({
      status: 'error',
      message:
        'Your account is not verified yet. Please contact your admin for more details.',
    });
  }
  let userToSend: any = JSON.parse(JSON.stringify(user));
  delete userToSend?.password
  
  const tokenObj = {
    id: user?.id,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    isAdmin: user?.isAdmin
  }
  const token = jwt.sign(tokenObj, process.env.JWT_SECRET_KEY || '', {
    expiresIn: '24h'
  })

  const updateUserStatus = user?.email
    ? await getData(updateStatus, { email: user.email, isLoggedIn: token })
    : await getData(updateStatusById, { id: user.id, isLoggedIn: token })
  userToSend = {
    ...userToSend,
    key: token
  }
  if(updateUserStatus?.data?.update_users?.affected_rows)
  {
    return res.status(200).json({ status: 'success', user: userToSend });
  }
  return res.status(400).json({ status: 'error', message: 'Something went wrong. Please try again later!' });
};

export default login;
