import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import path from "path";
import multer from "multer";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));


// Роуты
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/posts", postRoutes);

// Запуск сервера
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
