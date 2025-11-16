import React, { useState } from "react";

const ResetContraseña = ({ token, onClose }) => {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch(`http://localhost:8000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "No se pudo actualizar la contraseña");
        return;
      }

      setMessage("✅ Contraseña actualizada correctamente.");
    } catch (err) {
      console.error(err);
      setError("Error del servidor. Intenta más tarde.");
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose}>✖</button>
        <div className="container">
          <div className="heading">Restablecer Contraseña</div>
          <form className="form" onSubmit={handleSubmit}>
            <input
              required
              className="input"
              type="password"
              placeholder="Nueva contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {message && <span className="success-message">{message}</span>}
            {error && <span className="error-message">{error}</span>}

            <input className="login-button" type="submit" value="Actualizar contraseña" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetContraseña;
