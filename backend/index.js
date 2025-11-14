import express from "express";
import cors from "cors";
import pool from "./src/config/db.js";
import 'dotenv/config';

// Importar las rutas
import usuariosRoutes from "./src/routes/usuariosRoutes.js";
import authRoutes from "./src/routes/authRoutes.js";
import productosRoutes from "./src/routes/productosRoutes.js"; 
import empleadosRoutes from "./src/routes/empleadosRoutes.js";


const app = express();
app.use(cors());
app.use(express.json());

// Ruta principal para probar conexión
app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");
    res.send("<h1 style='color:green'>Conectado correctamente a la base de datos</h1>");
  } catch (error) {
    res.status(500).send(`<h1 style='color:red'>Error al conectar a la base de datos</h1>`);
  }
});

// Conectar las rutas
app.use("/api", usuariosRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", productosRoutes); 
app.use("/empleados", empleadosRoutes);


// Iniciar servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));


