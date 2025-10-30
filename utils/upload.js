import multer from "multer";
import path from "path";
import fs from "fs";

// Функция для генерации хранилища для разных сущностей
export const createUploader = (entityFolder = "common") => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const uploadPath = path.join(process.cwd(), "uploads", entityFolder);
            // Создаём директорию, если не существует
            fs.mkdirSync(uploadPath, { recursive: true });
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname);
            const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
            cb(null, filename);
        },
    });

    const fileFilter = (req, file, cb) => {
        // Принимаем только изображения
        if (!file.mimetype.startsWith("image/")) {
            return cb(new Error("Только изображения разрешены!"), false);
        }
        cb(null, true);
    };

    return multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } }); // до 5МБ
};
