// Aqui se guarda toda la configuracion del servidor
require("dotenv").config(); // carga variables de entorno

import dotenv from "dotenv";
dotenv.config();


const express = require("express");
const cors = require("cors");
// const morgan = require("morgan");
const routes = require("./routes");

// Conexión a la base de datos
require("./config/db");

// Crear instancia de express
const app = express();

// Middlewares globales
app.use(cors()); // habilita CORS
app.use(morgan("dev")); // logs HTTP
app.use(express.json()); // reemplaza bodyParser.json()
app.use(express.urlencoded({ extended: true })); // reemplaza bodyParser.urlencoded()

// Rutas principales
app.use("/api/productos", routes); // monta las rutas importadas en la ruta base /api

// Endpoint de prueba DB
app.get("/ping", (req, res) => {
  const db = require("./config/db");
  db.query("SELECT CURRENT_USER() AS user, DATABASE() AS db", (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows[0]);
  });
});

// Raíz
app.get("/", (_req, res) => res.send("API Biblioteca OK"));

// Exportar la app configurada
module.exports = app;
