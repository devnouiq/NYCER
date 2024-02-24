import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
dotenv.config();

const SECRET_KEY: string = process.env.ACCESS_TOKEN_SECRET || '';

const authUserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader: string = req.headers.authorization || '';
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Header not provided!" });
        return;
    }
    const token: string = authHeader.split(" ")[1];
    try {
        const decoded: string | jwt.JwtPayload = jwt.verify(token, SECRET_KEY);
        const user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Not authorized to access this route" });
        return;
    }
};

export default authUserMiddleware;