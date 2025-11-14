// src/config/db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

let pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT, // importante!
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Conectado correctamente a la base de datos de Messina");
    connection.release();
  } catch (error) {
    console.error("❌ Error al conectar a la base de datos:", error); // <--- mostrar todo el error
  }

// try {
//   pool = mysql.createPool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//     port: Number(process.env.DB_PORT) || 3306, // puerto de MySQL
//     waitForConnections: true,
//     connectionLimit: 10,
//     queueLimit: 0,
//   });

//   // Test de conexión (opcional)
//   const connection = await pool.getConnection();
//   console.log("✅ Conectado correctamente a la base de datos de Messina");
//   connection.release();
// } catch (error) {
//   console.error("❌ Error al conectar a la base de datos:", error.message);
// >>>>>>> origin/sofia-Ms
}

testConnection();

export default pool;
