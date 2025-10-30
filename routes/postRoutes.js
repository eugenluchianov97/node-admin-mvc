import express from "express";
import {
    getPosts,
    getPost,
    createPost,
    updatePost,
    deletePost
} from "../controllers/postController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const router = express.Router();

// Получить все посты (любой авторизованный)
router.get("/", authMiddleware, getPosts);

// Получить один пост
router.get("/:id", authMiddleware, getPost);

// Создать пост (только админ)
router.post("/", authMiddleware, adminMiddleware, createPost);

// Обновить пост (только админ)
router.put("/:id", authMiddleware, adminMiddleware, updatePost);

// Удалить пост (только админ)
router.delete("/:id", authMiddleware, adminMiddleware, deletePost);

export default router;
