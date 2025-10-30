import {ADMIN, REDACTOR} from "../config/const.js";

export const redactorMiddleware = (req, res, next) => {
    if (req.user.role !== REDACTOR && req.user.role !== ADMIN) {
        return res.status(403).json({ message: "Access denied. Redactor only." });
    }

    next();
};