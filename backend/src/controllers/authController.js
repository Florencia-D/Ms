import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import pool from "../config/db.js";

//----------------------------------------- REGISTRO -------------------------------------------------------
export const registerUser = async (req, res) => {
  try {
    const { Nombre, Apellido, Email, Telefono, Direccion, Contrasenia } = req.body;

    // Verifica si ya existe el email
    const [userExists] = await pool.query("SELECT * FROM Usuarios WHERE Email = ?", [Email]);
    if (userExists.length > 0) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(Contrasenia, 10);

    // Insertar nuevo usuario en la DB
    await pool.query(
      "INSERT INTO Usuarios (Nombre, Apellido, Email, Telefono, Direccion, Contrasenia) VALUES (?, ?, ?, ?, ?, ?)",
      [Nombre, Apellido, Email, Telefono, Direccion, hashedPassword]
    );

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

//----------------------------------------- LOGIN -------------------------------------------------------
export const loginUser = async (req, res) => {
  try {
    const { Email, Contrasenia } = req.body;

    const [rows] = await pool.query("SELECT * FROM Usuarios WHERE Email = ?", [Email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];

    // Comparamos contraseñas
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

//----------------------------------------- RECUPERAR CONTRASEÑA -------------------------------------------------------
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Buscar usuario por email
    const [rows] = await pool.query("SELECT * FROM Usuarios WHERE Email = ?", [email]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];

    // Generar token temporal (15 minutos)
    const token = jwt.sign({ id: user.id_usuario }, process.env.JWT_SECRET_RESET, { expiresIn: "15m" });

    // Guardar token en la base de datos
    await pool.query("UPDATE Usuarios SET reset_token = ? WHERE id_usuario = ?", [token, user.id_usuario]);

    // Configurar transporte de correo
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // contraseña de aplicación Gmail
      },
    });

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    const mailOptions = {
      from: `"Soporte" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Recuperación de contraseña",
      html: `
        <h3>Hola ${user.Nombre || ""},</h3>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>⚠️ Este enlace expirará en 15 minutos.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Correo de recuperación enviado correctamente" });
  } catch (error) {
    console.error("Error en forgotPassword:", error);
    res.status(500).json({ message: "Error al enviar el correo" });
  }
};

//----------------------------------------- RESETEAR CONTRASEÑA -------------------------------------------------------
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_RESET);

    // Encriptar nueva contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Actualizar usuario
    await pool.query(
      "UPDATE Usuarios SET Contrasenia = ?, reset_token = NULL WHERE id_usuario = ? AND reset_token = ?",
      [hashedPassword, decoded.id, token]
    );

    res.json({ message: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error en resetPassword:", error);
    res.status(400).json({ message: "Token inválido o expirado" });
  }
};
