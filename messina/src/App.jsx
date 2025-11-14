

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Productos from "./pages/Productos";
import Serviciotec from "./pages/Serviciotec";
import Asesoramiento from "./pages/Asesoramiento";
import Contacto from "./pages/Contacto";
import QuienesSomos from "./pages/QuienesSomos";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";               // 👈 importante
import ProductDetail from "./pages/ProductDetail";


import React, { useState, useContext } from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { home, asesoramiento, servicioTecnico, productCard, register, productDetail, productos, contacto, quienesSomos } from "./routes/path";
import Asesoramiento from './pages/Asesoramiento';
import Contacto from './pages/Contacto';
import QuienesSomos from './pages/QuienesSomos';


import SplashScreen from "./components/SplashScreen";
import BotonWp from "./components/BotonWp";
import BotonCart from "./components/BotonCart"; // 👈 nuevo

// 🔹 Importamos contexto y modales
import { AuthProvider, AuthContext } from "./context/AuthContext";
import RecuperoContraseña from "./components/RecuperoContraseña";
import ResetContraseña from "./components/ResetContraseña";

function AppContent() {
  const { showRecupero, closeRecuperoModal, showReset, closeResetModal, resetToken } = useContext(AuthContext);
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      ) : (
        <Router>
          {/* Tus rutas */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/servicioTec" element={<Serviciotec />} />
            <Route path="/asesoramiento" element={<Asesoramiento />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/quienesSomos" element={<QuienesSomos />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>

          {/* Botones flotantes */}
          <BotonWp />

          {/* 🔹 Modales globales */}
          {showRecupero && <RecuperoContraseña onClose={closeRecuperoModal} />}
          {showReset && <ResetContraseña token={resetToken} onClose={closeResetModal} />}
        </Router>
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
