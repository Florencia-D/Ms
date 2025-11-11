import React from "react";
import { FaFacebook, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo y redes */}
        <div className="footer-section logo-section">
          <div className="logo-container">
            <img src="/Logo2.png" alt="Messina Logo" className="footer-logo" />

          </div>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/messinamys?igsh=MTJhaHppODB1ZmplZQ=="
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
            >
              <FaInstagram />
            </a>
          </div>

        </div>

        {/* Horarios */}
        <div className="footer-section">
          <h3>Horarios</h3>
          <p>Lunes a Jueves:<br />8:30 a 13:30 Hs - 14:30 a 18 Hs</p>
          <p>Viernes:<br />8:30 a 13:30 Hs - 14:30 a 17 Hs</p>
        </div>

        {/* Ayuda */}
        <div className="footer-section">
          <h3>Ayuda</h3>
          <p>Quienes somos</p>
          <p>Preguntas frecuentes</p>
          <p>Cambios y devoluciones</p>
        </div>

        {/* Contacto */}
        <div className="footer-section">
          <h3>Contáctanos</h3>
          <p><FaPhoneAlt className="footer-icon" /> 381-3373236</p>
          <p><FaEnvelope className="footer-icon" /> ventasmessina.mys@gmail.com</p>
          <p><FaMapMarkerAlt className="footer-icon" /> Pcia de la Rioja 15, T4000ISA<br />San Miguel de Tucumán, Tucumán</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© Copyright 2025 | Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
