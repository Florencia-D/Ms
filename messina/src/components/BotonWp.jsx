import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "../css/BotonWp.css"; // asegurate de tener este archivo

export default function BotonWp() {
  return (
    <a
      href="https://wa.me/5493813373236"
      className="boton-wp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp />
    </a>
  );
}
