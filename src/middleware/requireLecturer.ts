import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

function requireLecturer(req: Request, res: Response, next: NextFunction) {
  const user = res.locals.user.lecturer;

  if (!user) {
    return res.status(StatusCodes.FORBIDDEN).json({ Message: "You are not Authorized to perform this operation" })
  }

  return next();
}

export default requireLecturer;

