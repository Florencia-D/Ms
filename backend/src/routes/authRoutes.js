import express from "express";
<<<<<<< HEAD
import { registerUser, loginUser, forgotPassword, resetPassword } from "../controllers/authController.js";
=======
import {registerUser, loginUser, forgotPassword, resetPassword} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";
>>>>>>> flor

const router = express.Router();

// Registro
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);


router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
<<<<<<< HEAD
=======


router.get("/protegido", verifyToken, (req, res) => {
  res.json({ message: "Acceso permitido", user: req.user });
});


>>>>>>> flor
export default router;
