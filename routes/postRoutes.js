import express from "express";
import postController from "../controllers/postController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import {redactorMiddleware} from "../middleware/redactorMiddleware.js";

import multer from "multer";

import updateValidator from "../validators/post/updateValidator.js";
import createValidator from "../validators/post/createValidator.js";
import categoryController from "../controllers/categoryController.js";


const router = express.Router();
const upload = multer(); // без сохранения на диск, используем buffer

router.get("/", postController.index);

router.get("/:id",postController.show);

router.post("/",
    ...[authMiddleware,redactorMiddleware],
    upload.single("image"),
    ...createValidator,
    postController.create
);

router.put("/:id",
    ...[authMiddleware,redactorMiddleware],
    upload.single("image"),
    ...updateValidator,
    postController.update
);

router.delete("/:id",
    ...[authMiddleware,redactorMiddleware],
    postController.delete
);

export default router;
