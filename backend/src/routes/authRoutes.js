import express from "express";
import { registerUser, loginUser, forgotPassword, resetPassword } from "../controllers/authController.js";

const router = express.Router();

// Registro
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);


router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
export default router;
