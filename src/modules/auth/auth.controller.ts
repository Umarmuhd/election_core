import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import omit from '../../helpers/omit';
import { findUserByEmail } from '../user/user.service';
import { LoginBody } from './auth.schema';
import { signJwt } from './auth.utils';

export async function loginHandler(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: 'Email and password are required' });
    return;
  }

  const user = await findUserByEmail(email);

  if (!user) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, message: 'Invalid login credentials' });
    return;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ success: false, message: 'Invalid login credentials' });
  }

  const payload = omit(user.toJSON(), ['password', '__v']);

  const accessToken = signJwt(payload);

  res.cookie('accessToken', accessToken, {
    maxAge: 900000, // 15 mins
    httpOnly: true,
    domain:
      process.env.NODE_ENV !== "production" ? "localhost" : "election1.vercel.app",
    path: "/",
    secure: false,
  });

  return res
    .status(StatusCodes.OK)
    .json({ success: true, message: 'login success!', accessToken, user });
}
