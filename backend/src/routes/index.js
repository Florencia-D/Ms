import express from "express";
import usuariosRouter from "./usuariosRoutes.js";
import authRoutes from "./authRoutes.js";
import productosRoutes from "./productosRoutes.js";
import empleadosRoutes from "./empleadosRoutes.js";

const router = express.Router();

router.get("/health", (req, res) => res.json({ ok: true }));

router.use("/auth", authRoutes);
router.use("/usuarios", usuariosRouter);
router.use("/productos", productosRoutes);
router.use("/empleados", empleadosRoutes);

export default router;
