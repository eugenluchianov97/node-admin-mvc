import express from "express";
import {
    getCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
} from "../controllers/categoryController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Все маршруты защищены JWT
router.get("/", authMiddleware, getCategories); // любой авторизованный
router.get("/:id", authMiddleware, getCategory); // любой авторизованный

// Только админ может создавать, обновлять и удалять
router.post("/", authMiddleware, adminMiddleware, createCategory);
router.put("/:id", authMiddleware, adminMiddleware, updateCategory);
router.delete("/:id", authMiddleware, adminMiddleware, deleteCategory);

export default router;
