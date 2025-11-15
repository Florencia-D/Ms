import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword
} from "../controllers/authController.js";



import { verifyToken } from "../middleware/authMiddleware.js";





const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);


router.get("/protegido", verifyToken, (req, res) => {
  res.json({ message: "Acceso permitido", user: req.user });
});




export default router;
