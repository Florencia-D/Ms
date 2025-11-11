import pool from "../config/db.js";

// 🔹 Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id_usuario, Nombre, Apellido, Email, Telefono, Direccion FROM Usuarios"
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los usuarios" });
  }
};

// 🔹 Obtener usuario por ID
export const obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await pool.query(
      "SELECT id_usuario, Nombre, Apellido, Email, Telefono, Direccion FROM Usuarios WHERE id_usuario = ?",
      [id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

// 🔹 Crear nuevo usuario
export const crearUsuario = async (req, res) => {
  try {
    const { Nombre, Apellido, Email, Telefono, Direccion, Contrasenia } = req.body;

    const [existe] = await pool.query("SELECT * FROM Usuarios WHERE Email = ?", [Email]);
    if (existe.length > 0) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    await pool.query(
      "INSERT INTO Usuarios (Nombre, Apellido, Email, Telefono, Direccion, Contrasenia) VALUES (?, ?, ?, ?, ?, ?)",
      [Nombre, Apellido, Email, Telefono, Direccion, Contrasenia]
    );

    res.status(201).json({ message: "Usuario creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear usuario" });
  }
};

// 🔹 Actualizar usuario
export const actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { Nombre, Apellido, Email, Telefono, Direccion } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE Usuarios SET Nombre = ?, Apellido = ?, Email = ?, Telefono = ?, Direccion = ? WHERE id_usuario = ?",
      [Nombre, Apellido, Email, Telefono, Direccion, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};

// 🔹 Eliminar usuario
export const eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "DELETE FROM Usuarios WHERE id_usuario = ?",
      [id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};
