import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/const.js";
export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1]; // Bearer TOKEN

    if (!token) return res.status(401).json({ message: "No token provided" });

    try {
        req.user = jwt.verify(token,JWT_SECRET); // добавляем пользователя в запрос
        next();
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};
