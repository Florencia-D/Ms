import express from "express";
<<<<<<< HEAD
import {
  obtenerProductos,
  obtenerProductoPorId,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
} from "../controllers/productosController.js";

const router = express.Router();

router.get("/productos", obtenerProductos);
router.get("/productos/:id", obtenerProductoPorId);
router.post("/productos", crearProducto);
router.put("/productos/:id", actualizarProducto);
router.delete("/productos/:id", eliminarProducto);
=======
import {  obtenerProductos, obtenerProductoPorId, crearProducto, actualizarProducto, eliminarProducto,} from "../controllers/productosController.js";

const router = express.Router();

router.get("/", obtenerProductos);
router.get("/:id", obtenerProductoPorId);
router.post("/", crearProducto);
router.put("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);
>>>>>>> flor

export default router;

