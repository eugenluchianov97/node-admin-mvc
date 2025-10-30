import fs from "fs";
import path from "path";

export const fileService = {
    saveImage(file, folder = "common") {
        if (!file) {
            return { fileName: null, path: null, url: null };
        }

        const uploadPath = path.join(process.cwd(), "uploads", folder);
        fs.mkdirSync(uploadPath, { recursive: true }); // создаем при отсутствии

        const ext = path.extname(file.originalname) || ".png";

        const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
        const fullPath = path.join(uploadPath, fileName);

        fs.writeFileSync(fullPath, file.buffer);

        const url = `/uploads/${folder}/${fileName}`;

        return { fileName, path: fullPath, url };
    },
};
