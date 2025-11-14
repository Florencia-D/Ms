import { createContext, useContext, useState, useEffect } from "react";

// Creamos el contexto
export const AuthContext = createContext();

//  Componente Provider
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Modal de recuperación y reset de contraseña
  const [showRecupero, setShowRecupero] = useState(false);
  
  const [showReset, setShowReset] = useState(false);
  const [resetToken, setResetToken] = useState("");

  // Cargar usuario desde localStorage si existe
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("usuario");
      if (storedUser && storedUser !== "undefined") {
        setUsuario(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error al cargar usuario del localStorage:", error);
      localStorage.removeItem("usuario"); // limpia si hay datos corruptos
    }
  }, []);

  // Iniciar sesión
  const login = (userData) => {
    setUsuario(userData);
    localStorage.setItem("usuario", JSON.stringify(userData));
  };

  // Cerrar sesión
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  //  Funciones para modales

const openRecuperoModal = () => setShowRecupero(true);
const closeRecuperoModal = () => setShowRecupero(false);

  const openResetModal = (token) => {
    setResetToken(token);
    setShowReset(true);
  };
  const closeResetModal = () => {
    setResetToken("");
    setShowReset(false);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        logout,
        showRecupero,
        openRecuperoModal,
        closeRecuperoModal,
        showReset,
        openResetModal,
        closeResetModal,
        resetToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//  Hook personalizado
export const useAuth = () => useContext(AuthContext);
