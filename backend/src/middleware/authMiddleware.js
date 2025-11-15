import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!secretKey) {
    return res.status(500).json({ message: "Clave secreta no configurada en el servidor" });
  }

  if (!authHeader) {
    return res.status(401).json({ message: "Acceso denegado. No se proporcionó token" });
  }

  const tokenParts = authHeader.split(" ");

  if (tokenParts[0] !== "Bearer" || !tokenParts[1]) {
    return res.status(401).json({ message: "Acceso denegado. Formato de token inválido" });
  }

  const token = tokenParts[1];

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }

    req.user = decoded;
    next();
  });
};
