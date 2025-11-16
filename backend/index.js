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

<<<<<<< HEAD
// Ruta principal para probar conexión
=======
// Test de la base de datos
>>>>>>> flor
app.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT 1");
    res.send("<h1 style='color:green'>Conectado correctamente a la base de datos</h1>");
  } catch (error) {
    res.status(500).send(`<h1 style='color:red'>Error al conectar a la base de datos</h1>`);
  }
});

<<<<<<< HEAD
// Conectar las rutas
app.use("/api", usuariosRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", productosRoutes); 
app.use("/empleados", empleadosRoutes);

=======
// Montar rutas
app.use("/api/auth", authRoutes); 
app.use("/api/usuarios", usuariosRoutes); 
app.use("/api/productos", productosRoutes);
app.use("/api/empleados", empleadosRoutes);
>>>>>>> flor

// Iniciamos el servidor
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));


