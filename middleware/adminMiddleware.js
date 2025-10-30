import {ADMIN} from "../config/const.js";

export const adminMiddleware = (req, res, next) => {
    if (req.user.role !== ADMIN) {
        return res.status(403).json({ message: "Access denied. Admins only." });
    }
    next();
};