import { body } from "express-validator";
import User from "../../models/User.js";
import mongoose from "mongoose";

const updateValidator = [
    body("name")
        .optional()
        .isLength({ min: 2 })
        .withMessage("Имя должно содержать минимум 2 символа"),
    body("email")
        .optional()
        .isEmail()
        .withMessage("Введите корректный email")
        .custom(async (value, { req }) => {
            const userId = req.params.id;

            if (!userId) {
                throw new Error("ID пользователя отсутствует");
            }

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                throw new Error("Неверный ID пользователя");
            }

            const existingUser = await User.findOne({ email: value });

            if (existingUser && existingUser['_id'].toString() !== userId) {
                throw new Error("Такой email уже зарегистрирован");
            }

            return true;
        }),
    body("password")
        .optional()
        .isLength({ min: 6 })
        .withMessage("Пароль должен содержать минимум 6 символов"),
    body("role")
        .optional()
        .isIn(["user", "redactor", "admin"])
        .withMessage("Роль должна быть 'user', 'redactor' или 'admin'"),
    body("avatar")
        .optional()
        .custom((value, { req }) => {
            if (!req.file) return true; // файл не обязателен
            const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
            if (!allowedTypes.includes(req.file.mimetype)) {
                throw new Error("Аватар должен быть изображением (jpeg, jpg, png, webp)");
            }
            return true;
        }),
];

export default updateValidator;