import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  const user = res.locals.user.admin;

  if (!user) {
    return res.status(StatusCodes.FORBIDDEN).json({Message: "You are not Authorized to perform this operation"})
   
  }

  return next();
}

export default requireAdmin;
