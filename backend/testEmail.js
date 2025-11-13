import nodemailer from "nodemailer";
import 'dotenv/config';

async function testEmail() {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Soporte" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // te lo envías a vos mismo
    subject: "Prueba de correo",
    text: "¡Hola! Esto es un test de envío de correo desde Node.",
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado:", info.response);
  } catch (err) {
    console.error("Error al enviar correo:", err);
  }
}

testEmail();
