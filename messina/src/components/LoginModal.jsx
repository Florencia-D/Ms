// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext"; 
// import "../css/Login.css";

// const LoginModal = ({ onClose, onGoRegister }) => {
//   const navigate = useNavigate();
//   const { login, openRecuperoModal } = useAuth(); //  Contexto
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleGoRegister = () => {
//     onClose();
//     if (onGoRegister) onGoRegister();
//   };

//   const handleForgotPassword = () => {
//     onClose(); // Cierra login
//     openRecuperoModal(); // Abre modal global de recuperación
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const response = await fetch("http://localhost:8000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ Email: email, Contrasenia: password }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         setError(data.message || "Error al iniciar sesión");
//         return;
//       }

//       login({
//         id: data.user.id_usuario,
//         nombre: data.user.Nombre,
//         email: data.user.Email,
//         token: data.token,
//       });

//       onClose();
//     } catch (err) {
//       console.error("Error al conectar con el servidor:", err);
//       setError("Error del servidor. Intenta nuevamente más tarde.");
//     }
//   };

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div
//         className="modal-content"
//         onClick={(e) => e.stopPropagation()}
//         style={{ background: "transparent", boxShadow: "none" }}
//       >
//         <button className="close-modal-btn" onClick={onClose}>
//           ✖
//         </button>

//         <div className="container">
//           <div className="heading">Inicio de sesión</div>

//           <form className="form" onSubmit={handleSubmit}>
//             <input
//               required
//               className="input"
//               type="email"
//               placeholder="E-mail"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <input
//               required
//               className="input"
//               type="password"
//               placeholder="Contraseña"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             {/* "Olvidaste tu contraseña" */}
//             <p className="forgot-password" onClick={handleForgotPassword}>
//               ¿Olvidaste tu contraseña?
//             </p>

//             {error && <span className="error-message">{error}</span>}

//             <input
//               className="login-button"
//               type="submit"
//               value="Iniciar Sesión"
//             />

//             <button
//               type="button"
//               className="login-button"
//               onClick={handleGoRegister}
//             >
//               Registrarme
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;


import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; 
import "../css/Login.css";

const LoginModal = ({ onClose, onGoRegister }) => {
  const { login, openRecuperoModal } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleGoRegister = () => {
    onClose();
    if (onGoRegister) onGoRegister();
  };

  const handleForgotPassword = () => {
    onClose();
    openRecuperoModal();
  };

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

      login({
        id: data.user.id_usuario,
        nombre: data.user.Nombre,
        email: data.user.Email,
        token: data.token,
      });
      console.log("Usuario logueado:", data.user);

      onClose();
    } catch (err) {
      console.error("Error al conectar con el servidor:", err);
      setError("Error del servidor. Intenta nuevamente más tarde.");
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

            <p className="forgot-password" onClick={handleForgotPassword}>
              ¿Olvidaste tu contraseña?
            </p>

            {error && <span className="error-message">{error}</span>}

            <input
              className="login-button"
              type="submit"
              value="Iniciar Sesión"
            />

            <button
              type="button"
              className="login-button"
              onClick={handleGoRegister}
            >
              Registrarme
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
