import React, { useState } from "react";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  // Estados de los campos
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");

  // Estados de validación
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState("");

  // Expresiones regulares
  const regexNombre = /^[a-zA-ZÀ-ÿ\s]{3,40}$/;
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

  // Navegación
  const handleGoLogin = () => navigate("/login");
  const handleGoHome = () => navigate("/");

  // Validaciones individuales (en tiempo real)
  const validarCampo = (nombreCampo, valor) => {
    let mensaje = "";

    switch (nombreCampo) {
      case "nombre":
        if (!regexNombre.test(valor)) mensaje = "Debe tener al menos 3 letras y solo contener letras.";
        break;
      case "apellido":
        if (!regexNombre.test(valor)) mensaje = "Debe tener al menos 3 letras y solo contener letras.";
        break;
      case "email":
        if (!regexEmail.test(valor)) mensaje = "Correo electrónico inválido.";
        break;
      case "password":
        if (!regexPassword.test(valor))
          mensaje = "Mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo.";
        break;
      case "confirmarPassword":
        if (valor !== password) mensaje = "Las contraseñas no coinciden.";
        break;
      default:
        if (!valor.trim()) mensaje = "Este campo es obligatorio.";
        break;
    }

    setErrores((prev) => ({ ...prev, [nombreCampo]: mensaje }));
  };

  // Enviar al backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    // Verificar si hay errores antes de enviar
    const hayErrores = Object.values(errores).some((error) => error);
    if (hayErrores) {
      alert("Corrige los errores antes de continuar.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Nombre: nombre,
          Apellido: apellido,
          Email: email,
          Telefono: telefono,
          Direccion: direccion,
          Contrasenia: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrores({ general: data.message || "Error al registrar el usuario" });
        return;
      }

      setMensaje("✅ Registro exitoso. ¡Ya puedes iniciar sesión!");
      setNombre("");
      setApellido("");
      setEmail("");
      setTelefono("");
      setDireccion("");
      setPassword("");
      setConfirmarPassword("");

      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Error en el registro:", err);
      setErrores({ general: "Error del servidor. Intenta nuevamente más tarde." });
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="heading">Registro de usuario</div>

        <form className="form" onSubmit={handleSubmit}>
          {/* Nombre */}
          <input
            required
            className="input"
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
              validarCampo("nombre", e.target.value);
            }}
          />
          {errores.nombre && <span className="error-message">{errores.nombre}</span>}

          {/* Apellido */}
          <input
            required
            className="input"
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => {
              setApellido(e.target.value);
              validarCampo("apellido", e.target.value);
            }}
          />
          {errores.apellido && <span className="error-message">{errores.apellido}</span>}

          {/* Email */}
          <input
            required
            className="input"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validarCampo("email", e.target.value);
            }}
          />
          {errores.email && <span className="error-message">{errores.email}</span>}

          {/* Teléfono */}
          <input
            required
            className="input"
            type="text"
            placeholder="Teléfono"
            value={telefono}
            onChange={(e) => {
              setTelefono(e.target.value);
              validarCampo("telefono", e.target.value);
            }}
          />
          {errores.telefono && <span className="error-message">{errores.telefono}</span>}

          {/* Dirección */}
          <input
            required
            className="input"
            type="text"
            placeholder="Dirección"
            value={direccion}
            onChange={(e) => {
              setDireccion(e.target.value);
              validarCampo("direccion", e.target.value);
            }}
          />
          {errores.direccion && <span className="error-message">{errores.direccion}</span>}

          {/* Contraseña */}
          <input
            required
            className="input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validarCampo("password", e.target.value);
            }}
          />
          {errores.password && <span className="error-message">{errores.password}</span>}

          {/* Confirmar contraseña */}
          <input
            required
            className="input"
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmarPassword}
            onChange={(e) => {
              setConfirmarPassword(e.target.value);
              validarCampo("confirmarPassword", e.target.value);
            }}
          />
          {errores.confirmarPassword && (
            <span className="error-message">{errores.confirmarPassword}</span>
          )}

          {/* Mensajes generales */}
          {errores.general && <span className="error-message">{errores.general}</span>}
          {mensaje && <span className="success-message">{mensaje}</span>}

          <input className="login-button" type="submit" value="Registrarme" />

          <button type="button" className="login-button" onClick={handleGoLogin}>
            Ya tengo cuenta
          </button>
        </form>

        <button className="go-home-button" onClick={handleGoHome}>
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default Register;
