import express from "express";
import { obtenerUsuarios, obtenerUsuarioPorId, crearUsuario, actualizarUsuario, eliminarUsuario,} from "../controllers/usuariosController.js";

const router = express.Router();

// Rutas CRUD
router.get("/usuarios", obtenerUsuarios);          
router.get("/usuarios/:id", obtenerUsuarioPorId);    
router.post("/usuarios", crearUsuario);              
router.put("/usuarios/:id", actualizarUsuario);      
router.delete("/usuarios/:id", eliminarUsuario);    

export default router;
