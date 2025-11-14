import React, { useState } from "react";
import "../css/Login.css"; 

const RecuperoContraseña = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "No se pudo enviar el correo");
        return;
      }

      setMessage("📨 Se ha enviado un enlace de recuperación a tu correo.");
    } catch (err) {
      console.error(err);
      setError("Error del servidor. Intenta más tarde.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ background: "transparent", boxShadow: "none" }}
      >
        <button className="close-modal-btn" onClick={onClose}>
          ✖
        </button>

        <div className="container">
          <div className="heading">Recuperar Contraseña</div>

          <form className="form" onSubmit={handleSubmit}>
            <input
              required
              className="input"
              type="email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {message && <span className="success-message">{message}</span>}
            {error && <span className="error-message">{error}</span>}

            <input
              className="login-button"
              type="submit"
              value="Enviar enlace"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default RecuperoContraseña;
