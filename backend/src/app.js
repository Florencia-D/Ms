require("dotenv").config(); // carga variables de entorno

import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import productosRoutes from "./routes/productosRoutes.js";
import categoriasRoutes from "./routes/categoriasRoutes.js";
import "./config/db.js"; // conectar DB

dotenv.config();


const express = require("express");
const cors = require("cors");
const routes = require("./routes");


// Crear instancia de express
const app = express();

// Middlewares globales
app.use(cors()); 
app.use(morgan("dev")); // logs HTTP
app.use(express.json()); // reemplaza bodyParser.json()
app.use(express.urlencoded({ extended: true })); // reemplaza bodyParser.urlencoded()


// Rutas principales
app.use("/api/productos", routes); 
app.use("/api/categorias", categoriasRoutes);


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



module.exports = app;
