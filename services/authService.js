import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userRepository } from "../repositories/userRepository.js";
import {JWT_EXPIRE, JWT_SECRET} from "../config/const.js";

export const authService = {

    async login(email, password) {
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new Error("Пользователь не найден");
        }

        if (!await bcrypt.compare(password, user['password'])) {
            throw new Error("Неверный пароль");
        }

        const token = jwt.sign(
            { id: user['_id'], email: user['email'], role: user['role'] },
            JWT_SECRET ,
            { expiresIn: JWT_EXPIRE }
        );

        return { user, token };
    },

    async register({ name, email, password, role }) {
        const candidate = await userRepository.findByEmail(email);
        if (candidate) {
            throw new Error("Пользователь с таким email уже существует");
        }

        const hash = await bcrypt.hash(password, 10);
        return await userRepository.create({ name, email, password: hash, role });
    },
};
