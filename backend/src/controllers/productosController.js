// import pool from "../config/db.js";

// // Obtener todos los productos
// export const obtenerProductos = async (req, res) => {
//   try {
//     const [rows] = await pool.query("SELECT * FROM Productos");
//     res.json(rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al obtener productos" });
//   }
// };

// // Obtener producto por id
// export const obtenerProductoPorId = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const [rows] = await pool.query("SELECT * FROM Productos WHERE id_producto = ?", [id]);
//     if (rows.length === 0) {
//       return res.status(404).json({ message: "Producto no encontrado" });
//     }
//     res.json(rows[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al obtener producto" });
//   }
// };

// // Crear nuevo producto
// export const crearProducto = async (req, res) => {
//   try {
//     const { nombre, descripcion, precio, stock, imagen } = req.body;

//     if (!nombre || !precio) {
//       return res.status(400).json({ message: "El nombre y el precio son obligatorios" });
//     }

//     await pool.query(
//       "INSERT INTO Productos (Nombre, descripcion, precio, stock, imagen) VALUES (?, ?, ?, ?, ?)",
//       [nombre, descripcion, precio, stock || 0, imagen || null]
//     );

//     res.status(201).json({ message: "Producto agregado correctamente" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al crear producto" });
//   }
// };

// //Actualizar producto
// export const actualizarProducto = async (req, res) => {
//   const { id } = req.params;
//   const { nombre, descripcion, precio, stock, imagen } = req.body;

//   try {
//     const [result] = await pool.query(
//       "UPDATE Productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, imagen = ? WHERE id_producto = ?",
//       [nombre, descripcion, precio, stock, imagen, id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Producto no encontrado" });
//     }

//     res.json({ message: "Producto actualizado correctamente" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al actualizar producto" });
//   }
// };

// // Eliminar producto
// export const eliminarProducto = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const [result] = await pool.query("DELETE FROM Productos WHERE id_producto = ?", [id]);

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Producto no encontrado" });
//     }

//     res.json({ message: "Producto eliminado correctamente" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error al eliminar producto" });
//   }
// };

import pool from "../config/db.js";

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Productos");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener productos" });
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
