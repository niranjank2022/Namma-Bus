import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { MESSAGES } from "../../lib/constants";
import {CustomJwtPayload, CustomRequest} from "./../../lib/interfaces";


export function authorizeJWT(
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    res.status(401).json({ message: MESSAGES.AUTH_HEADER_MISSING });
    return;
  }

  const authToken = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY as string);
    req.user = decoded as CustomJwtPayload;
    next();
  } catch (error) {
    res.status(403).json({
      message: MESSAGES.TOKEN_ERROR_MESSAGE,
    });
  }
}
