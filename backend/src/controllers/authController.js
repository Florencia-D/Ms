import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
import { transporter } from "../utils/email.js";

//---------------------------------- REGISTRO ----------------------------------
export const registerUser = async (req, res) => {
  try {
    const { Nombre, Apellido, Email, Telefono, Direccion, Contrasenia } = req.body;

    const [userExists] = await pool.query("SELECT * FROM Usuarios WHERE Email = ?", [Email]);
    if (userExists.length > 0) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }

    const hashedPassword = await bcrypt.hash(Contrasenia, 10);

    await pool.query(
      "INSERT INTO Usuarios (Nombre, Apellido, Email, Telefono, Direccion, Contrasenia) VALUES (?, ?, ?, ?, ?, ?)",
      [Nombre, Apellido, Email, Telefono, Direccion, hashedPassword]
    );

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

//---------------------------------- LOGIN ----------------------------------
export const loginUser = async (req, res) => {
  try {
    const { Email, Contrasenia } = req.body;

    const [rows] = await pool.query("SELECT * FROM Usuarios WHERE Email = ?", [Email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];

    const validPassword = await bcrypt.compare(Contrasenia, user.Contrasenia);
    if (!validPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.id_usuario, email: user.Email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
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

//---------------------------- RECUPERAR CONTRASEÑA ----------------------------
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const [rows] = await pool.query("SELECT * FROM Usuarios WHERE Email = ?", [email]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];

    // Crear token válido 15 minutos
    const token = jwt.sign(
      { id: user.id_usuario },
      process.env.JWT_SECRET_RESET,
      { expiresIn: "15m" }
    );

    // Guardar el token temporal
    await pool.query(
      "UPDATE Usuarios SET reset_token = ?, reset_expires = ? WHERE id_usuario = ?",
      [token, new Date(Date.now() + 15 * 60 * 1000), user.id_usuario]
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    // Enviar correo
    await transporter.sendMail({
      from: `"Soporte" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Recuperación de contraseña",
      html: `
        <h3>Hola ${user.Nombre},</h3>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
        <p>⚠ Este enlace expira en 15 minutos.</p>
      `,
    });

    res.json({ message: "Correo enviado correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al enviar el correo" });
  }
};

//---------------------------- RESTABLECER CONTRASEÑA ----------------------------
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    // ❗ VALIDAR CON EL SECRET CORRECTO
    const decoded = jwt.verify(token, process.env.JWT_SECRET_RESET);

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query(
      "UPDATE Usuarios SET Contrasenia = ?, reset_token = NULL, reset_expires = NULL WHERE id_usuario = ? AND reset_token = ?",
      [hashedPassword, decoded.id, token]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "Token inválido o ya utilizado" });
    }

    res.json({ message: "Contraseña actualizada correctamente" });

  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Token inválido o expirado" });
  }
};
