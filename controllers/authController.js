import {validationResult} from "express-validator";
import {authService} from "../services/authService.js";

const userObject  = (user) =>{
    if (!user) return null;
    return {
        id:user['_id'],
        name:user['name'],
        email:user['email'],
        role:user['role'],
        avatar:user['avatar'],
        createdAt:user['createdAt'],
        updatedAt:user['updatedAt']
    }
}

export const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const user = await authService.register(req.body);

        res.status(201).json(userObject(user));
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const { user, token } = await authService.login(email, password);

        res.json({token, user:userObject(user)});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
