import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { UserModel } from './user.model';
import { RegisterUserBody } from './user.schema';
import { createUser, findUserById } from './user.service';

export async function registerUserHandler(req: Request, res: Response) {
  const { first_name, last_name, email, password } = req.body;

  try {
    if (!first_name || !last_name || !email || !password) {
      res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'All fields are required',
      });
      return;
    }

    const user = await createUser({ ...req.body });
    return res
      .status(StatusCodes.CREATED)
      .json({ success: true, message: 'User created successfully' });
  } catch (e: any) {
    console.log(e);
    if (e.code === 11000) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ success: false, message: 'User already exists' });
    }
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ success: false, message: e.message });
  }
}

export async function getCurrentUserHandler(req: Request, res: Response) {
  const user_id = res.locals.user._id;

  try {

    const user = await findUserById(user_id);

    if (!user) {
      return res
        .status(500)
        .json({ status: "success", message: "unauthorized request" });
    }

    return res.status(200).json({
      status: "success",
      message: "user data and wallet",
      data: { ...user },
    });
  } catch (error: any) {
    console.log(error)
    return res.status(500).json({ status: "failed", message: error.message });
  }
}
