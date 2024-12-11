import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload extends JwtPayload {
    userId: string;
    iat: number;
    exp: number;
}

export interface CustomRequest extends Request {
    user?: string | CustomJwtPayload;
}
