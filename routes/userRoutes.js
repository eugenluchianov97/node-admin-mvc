import express from "express";
import {userController} from "../controllers/userController.js";

import createValidator from "../validators/user/createValidator.js";
import updateValidator from "../validators/user/updateValidator.js";

import {authMiddleware} from "../middleware/authMiddleware.js";
import {adminMiddleware} from "../middleware/adminMiddleware.js";
import multer from "multer";

const upload = multer(); // без сохранения на диск, используем buffer


const router = express.Router();

router.get("/",...[authMiddleware,adminMiddleware], userController.index);
router.get("/:id",...[authMiddleware,adminMiddleware], userController.show);

router.post(
    "/",
    ...[authMiddleware, adminMiddleware],
    upload.single("avatar"),  // multer идёт раньше валидатора
    ...createValidator,
    userController.create
);

router.put(
    "/:id",
    ...[authMiddleware, adminMiddleware],
    upload.single("avatar"),  // multer идёт раньше валидатора
    ...updateValidator,
    userController.update
);
router.delete("/:id",...[authMiddleware,adminMiddleware], userController.delete);

export default router;
