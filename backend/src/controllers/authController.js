import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const registerUser = async (req, res) => {
  try {
    const { Nombre, Apellido, Email, Telefono, Direccion, Contrasenia } = req.body;

    // Verifica si ya existe el email en mi base de datos, en caso de que exista no puede registrarse con ese email 
    const [userExists] = await pool.query("SELECT * FROM Usuarios WHERE Email = ?", [Email]);
    if (userExists.length > 0) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(Contrasenia, 10);

    // Insertar nuevo usuario en la db
    await pool.query(
      "INSERT INTO Usuarios (Nombre, Apellido, Email, Telefono, Direccion, Contrasenia) VALUES (?, ?, ?, ?, ?, ?)",
      [Nombre, Apellido, Email, Telefono, Direccion, hashedPassword]
    );

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

//-----------------------------------------LOGINN-------------------------------------------------------

export const loginUser = async (req, res) => {
  try {
    const { Email, Contrasenia } = req.body;

    const [rows] = await pool.query("SELECT * FROM Usuarios WHERE Email = ?", [Email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];

    // Comparamos las contraseñas
    const validPassword = await bcrypt.compare(Contrasenia, user.Contrasenia);
    if (!validPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    // Crear token JWT
    const token = jwt.sign({ id: user.id_usuario, email: user.Email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user.id_usuario,
        nombre: user.Nombre,
        email: user.Email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};
