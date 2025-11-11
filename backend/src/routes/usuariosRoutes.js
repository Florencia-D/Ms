import express from "express";
import {
  obtenerUsuarios,
  obtenerUsuarioPorId,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario,
} from "../controllers/usuariosController.js";

const router = express.Router();

// Rutas CRUD
router.get("/usuarios", obtenerUsuarios);            // Obtener todos
router.get("/usuarios/:id", obtenerUsuarioPorId);    // Obtener por ID
router.post("/usuarios", crearUsuario);              // Crear
router.put("/usuarios/:id", actualizarUsuario);      // Actualizar
router.delete("/usuarios/:id", eliminarUsuario);     // Eliminar

export default router;
