import React, { useState, useEffect } from "react";
import "../css/NavBar.css";
import { Link } from "react-router-dom";
import {
  FiHome,
  FiBox,
  FiTool,
  FiMessageCircle,
  FiPhone,
} from "react-icons/fi";
import {
  home,
  productos,
  servicioTecnico,
  login,
  contacto,
  asesoramiento,
} from "../routes/path.js";

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ===== NAV SUPERIOR ===== */}
      <nav >
        <div className="nav-content">
          <ul className="nav-links">
            <Link to={home} className="link">Inicio</Link>
            <Link to={productos} className="link">Productos</Link>
            <Link to={servicioTecnico} className="link">Servicio técnico</Link>
            <Link to={asesoramiento} className="link">Asesoramiento</Link>
            <Link to={contacto} className="link">Contacto</Link>
          </ul>
        </div>
      </nav>

      {/* ===== NAV LATERAL ===== */}
      <nav className={`navbar-side ${isScrolled ? "visible" : ""}`}>
        <ul className="side-links">
          <li className="side-item" data-tooltip="Inicio">
            <Link to={home}><FiHome className="side-icon" /></Link>
          </li>
          <li className="side-item" data-tooltip="Productos">
            <Link to={productos}><FiBox className="side-icon" /></Link>
          </li>
          <li className="side-item" data-tooltip="Servicio Técnico">
            <Link to={servicioTecnico}><FiTool className="side-icon" /></Link>
          </li>
          <li className="side-item" data-tooltip="Asesoramiento">
            <Link to={asesoramiento}><FiMessageCircle className="side-icon" /></Link>
          </li>
          <li className="side-item" data-tooltip="Contacto">
            <Link to={contacto}><FiPhone className="side-icon" /></Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
