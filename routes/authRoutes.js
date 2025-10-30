import express from "express";
import { register, login } from "../controllers/authController.js";
import loginValidator from "../validators/auth/loginValidator.js";
import registerValidator from "../validators/auth/registerValidator.js";

const router = express.Router();

router.post("/register",...registerValidator, register);
router.post("/login",...loginValidator, login);

export default router;
