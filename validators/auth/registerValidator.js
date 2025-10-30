import { body } from "express-validator";
import User from "../../models/User.js";

export const registerValidator = [
    body("name")
        .notEmpty()
        .withMessage("Имя обязательно для заполнения")
        .isLength({ min: 2 })
        .withMessage("Имя должно содержать минимум 2 символа"),
    body("email")
        .custom(async (value) => {

            const existingUser = await User.findOne({ email: value });
            if (existingUser) {
                throw new Error("Такой email уже зарегистрирован");
            }
            return true;
        })
        .isEmail()
        .withMessage("Введите корректный email"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Пароль должен содержать минимум 6 символов"),
    body("role")
        .isIn(["user", "redactor", "admin"])
        .withMessage("Роль должна быть 'user', 'redactor' или 'admin'"),
];

export default registerValidator;