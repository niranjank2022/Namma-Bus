import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


interface CustomRequest extends Request {
    user?: string | JwtPayload;
}

export function authorizeJWT(req: CustomRequest, res: Response, next: NextFunction) {

    const authHeader = req.header("Authorization");
    if (!authHeader) {
        res.status(401).json({ message: "Authorization field missing in the header" });
        return;
    }

    const authToken = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(403).json({
            message: "Invalid or expired token",
            error
        });
    }
}
