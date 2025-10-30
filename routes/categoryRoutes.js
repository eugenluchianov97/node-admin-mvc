import express from "express";
import categoryController from "../controllers/categoryController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";
import {redactorMiddleware} from "../middleware/redactorMiddleware.js";

import multer from "multer";

import updateValidator from "../validators/category/updateValidator.js";
import createValidator from "../validators/category/createValidator.js";

const router = express.Router();
const upload = multer(); // без сохранения на диск, используем buffer

router.get("/", categoryController.index);
router.get("/:id", categoryController.show);

router.post("/",
    ...[authMiddleware,redactorMiddleware],
    upload.single("image"),
    ...createValidator,
    categoryController.create
);

router.put("/:id",
    ...[authMiddleware,redactorMiddleware],
    upload.single("image"),
    ...updateValidator,
    categoryController.update
);
router.delete("/:id",
    ...[authMiddleware,redactorMiddleware],
    categoryController.delete
);

export default router;
