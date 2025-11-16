// src/controllers/categoriasController.js
import pool from "../config/db.js";

export const obtenerCategorias = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Categoria_productos");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener categorías" });
  }
};
