import pool from "../config/db.js";

// Obtener todos los empleados
export const obtenerEmpleados = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM Empleados");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener empleados" });
  }
};

// Obtener empleado por ID
export const obtenerEmpleadoPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query(
      "SELECT * FROM Empleados WHERE id_empleado = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener empleado" });
  }
};

// Crear empleado
export const crearEmpleado = async (req, res) => {
  try {
    const {
      Nombre,
      Apellido,
      Email,
      Telefono,
      Direccion,
      Rol,
      Contrasenia,
    } = req.body;

    if (!Nombre || !Apellido || !Email || !Contrasenia) {
      return res.status(400).json({
        message: "Nombre, apellido, email y contraseña son obligatorios",
      });
    }

    await pool.query(
      `INSERT INTO Empleados 
      (Nombre, Apellido, Email, Telefono, Direccion, Rol, Contrasenia)
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [Nombre, Apellido, Email, Telefono, Direccion, Rol, Contrasenia]
    );

    res.status(201).json({ message: "Empleado creado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear empleado" });
  }
};

// Actualizar empleado
export const actualizarEmpleado = async (req, res) => {
  const { id } = req.params;

  const {
    Nombre,
    Apellido,
    Email,
    Telefono,
    Direccion,
    Rol,
    Contrasenia,
  } = req.body;

  try {
    const [result] = await pool.query(
      `UPDATE Empleados SET
        Nombre = ?,
        Apellido = ?,
        Email = ?,
        Telefono = ?,
        Direccion = ?,
        Rol = ?,
        Contrasenia = ?
      WHERE id_empleado = ?`,
      [
        Nombre,
        Apellido,
        Email,
        Telefono,
        Direccion,
        Rol,
        Contrasenia,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.json({ message: "Empleado actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar empleado" });
  }
};

// Eliminar empleado
export const eliminarEmpleado = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      "DELETE FROM Empleados WHERE id_empleado = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Empleado no encontrado" });
    }

    res.json({ message: "Empleado eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar empleado" });
  }
};
