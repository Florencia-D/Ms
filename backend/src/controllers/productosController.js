import pool from "../config/db.js";

// Obtener todos los productos

export const obtenerProductos = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.id_producto, p.Nombre_producto, p.Descripcion, p.Marca, p.Modelo,
             p.Imagen, p.N_serie, p.Precio, p.id_categoria
      FROM Productos p
      WHERE p.Estado = TRUE
      ORDER BY p.id_producto ASC
    `);

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: "Error al obtener productos" });
  }
};

// Obtener producto por ID
export const obtenerProductoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM Productos WHERE id_producto = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener producto" });
  }
};

// Crear producto
export const crearProducto = async (req, res) => {
  try {
    const {
      Nombre_producto,
      Descripcion,
      Marca,
      Modelo,
      Imagen,
      N_serie,
      Estado,
      Precio,
      id_categoria,
      id_stock,
    } = req.body;

    if (!Nombre_producto || !Precio) {
      return res.status(400).json({
        message: "El nombre del producto y el precio son obligatorios",
      });
    }

    await pool.query(
      `INSERT INTO Productos 
      (Nombre_producto, Descripcion, Marca, Modelo, Imagen, N_serie, Estado, Precio, id_categoria, id_stock)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        Nombre_producto,
        Descripcion,
        Marca,
        Modelo,
        Imagen,
        N_serie,
        Estado ?? true,
        Precio,
        id_categoria || null,
        id_stock || null,
      ]
    );

    res.status(201).json({ message: "Producto creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear producto" });
  }
};

// Actualizar producto
export const actualizarProducto = async (req, res) => {
  const { id } = req.params;

  const {
    Nombre_producto,
    Descripcion,
    Marca,
    Modelo,
    Imagen,
    N_serie,
    Estado,
    Precio,
    id_categoria,
    id_stock,
  } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE Productos SET 
      Nombre_producto = ?, 
      Descripcion = ?, 
      Marca = ?, 
      Modelo = ?, 
      Imagen = ?, 
      N_serie = ?, 
      Estado = ?, 
      Precio = ?, 
      id_categoria = ?, 
      id_stock = ?
      WHERE id_producto = ?`,
      [
        Nombre_producto,
        Descripcion,
        Marca,
        Modelo,
        Imagen,
        N_serie,
        Estado,
        Precio,
        id_categoria,
        id_stock,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar producto" });
  }
};

// Eliminar producto
export const eliminarProducto = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "DELETE FROM Productos WHERE id_producto = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar producto" });
  }
};

