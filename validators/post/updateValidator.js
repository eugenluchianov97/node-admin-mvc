import { body } from "express-validator";
import mongoose from "mongoose";
import Category from "../../models/Category.js";
import User from "../../models/User.js";
import Post from "../../models/Post.js";

const updateValidator = [
    body("title")
        .optional()
        .isLength({ min: 2 })
        .withMessage("Заголовок должен содержать минимум 2 символа"),

    body("slug")
        .optional()
        .isLength({ min: 2 })
        .withMessage("Слаг должен содержать минимум 2 символа")
        .custom(async (value, { req }) => {
            const postId = req.params.id;

            if (!postId) throw new Error("ID поста отсутствует");
            if (!mongoose.Types.ObjectId.isValid(postId)) throw new Error("Неверный ID поста");

            const existingPost = await Post.findOne({ slug: value });
            if (existingPost && existingPost._id.toString() !== postId) {
                throw new Error("Такой slug уже существует");
            }

            return true;
        }),

    body("content")
        .optional()
        .isLength({ min: 1 })
        .withMessage("Контент должен содержать минимум 1 символ"),

    body("image")
        .optional()
        .custom((value, { req }) => {
            if (!req.file) return true; // файл не обязателен
            const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
            if (!allowedTypes.includes(req.file.mimetype)) {
                throw new Error("Изображение должно быть jpeg, jpg, png или webp");
            }
            return true;
        }),

    body("active")
        .optional()
        .toBoolean()
        .isBoolean()
        .withMessage("Поле 'active' должно быть true или false"),

    body("lang")
        .optional()
        .isIn(["ru", "en"])
        .withMessage("Язык должен быть 'ru' или 'en'"),

    body("category_id")
        .optional()
        .isMongoId()
        .withMessage("Некорректный формат category_id — ожидается Mongo ObjectId")
        .bail()
        .custom(async (value) => {
            const category = await Category.findById(value);
            if (!category) throw new Error("Категория с таким ID не найдена");
            return true;
        }),

    body("user_id")
        .optional()
        .isMongoId()
        .withMessage("Некорректный формат user_id — ожидается Mongo ObjectId")
        .bail()
        .custom(async (value) => {
            const user = await User.findById(value);
            if (!user) throw new Error("Пользователь с таким ID не найден");
            return true;
        })
];

export default updateValidator;
