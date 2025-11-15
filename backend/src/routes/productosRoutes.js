import express from "express";
import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/productosController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ⚠ IMPORTANTE:
// NO repitas /productos en cada ruta.
// Estas rutas ya están montadas en: app.use("/api/productos", productosRoutes)

// 📌 GET todos los productos (requiere token)
router.get("/", verifyToken, obtenerProductos);

// 📌 GET un producto por id
router.get("/:id", verifyToken, obtenerProductoPorId);

// 📌 Crear nuevo producto
router.post("/", verifyToken, crearProducto);

// 📌 Actualizar producto
router.put("/:id", verifyToken, actualizarProducto);

// 📌 Eliminar producto
router.delete("/:id", verifyToken, eliminarProducto);

export default router;
