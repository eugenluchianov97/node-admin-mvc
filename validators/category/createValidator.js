import { body } from "express-validator";

const createValidator = [
    body("title")
        .notEmpty()
        .withMessage("Тайтл обязателен для заполнения")
        .isLength({ min: 2 })
        .withMessage("Имя должно содержать минимум 2 символа"),
    body("active")
        .optional()
        .toBoolean()
        .isBoolean()
        .withMessage("Поле 'active' должно быть true или false"),
    body("image")
        .optional()
        .custom((value, { req }) => {
            if (!req.file) return true; // файл не обязателен
            const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg"];
            if (!allowedTypes.includes(req.file.mimetype)) {
                throw new Error("Аватар должен быть изображением (jpeg, jpg, png, webp)");
            }
            return true;
        }),
    body("lang")
        .optional()
        .isIn(["ru", "en"])
        .withMessage("Язык должен быть 'ru' или 'ro'"),
];

export default createValidator;