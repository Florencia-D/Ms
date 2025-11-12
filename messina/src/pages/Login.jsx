import React, { useState, useContext } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

 // Redirige al inicio
  const handleGoHome = () => navigate("/");

  // Redirige al registro
  const handleGoRegister = () => navigate("/registro");

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email, Contrasenia: password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error al iniciar sesión");
        return;
      }

      //  Guardar usuario y token en el contexto
      login({
        id: data.user.id_usuario,
        nombre: data.user.Nombre,
        email: data.user.Email,
        token: data.token,
      });

      alert("Inicio de sesión exitoso");
      navigate("/");
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      setError("Error del servidor. Intenta nuevamente más tarde.");
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="heading">Inicio de sesión</div>
        <form className="form" onSubmit={handleSubmit}>
          <input
            required
            className="input"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            className="input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <span className="error-message">{error}</span>}
          <input className="login-button" type="submit" value="Iniciar Sesión" />
          <button
            type="button"
            className="login-button"
            onClick={handleGoRegister}
          >
            Registrarme
          </button>

        </form>

         <button className="go-home-button" onClick={handleGoHome}>
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default Login;
