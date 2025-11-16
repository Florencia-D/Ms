import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  const [showRecupero, setShowRecupero] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const [resetToken, setResetToken] = useState("");

  // Normaliza cualquier usuario que venga de login o localStorage
  const normalizeUser = (user) => {
    if (!user) return null;
    return {
      id: user.id || user.id_usuario || null,
      nombre: user.nombre || user.Nombre || "Usuario",
      email: user.email || user.Email || "",
      token: user.token || "",
    };
  };

  // Cargar usuario desde localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("usuario");
      if (storedUser && storedUser !== "undefined") {
        setUsuario(normalizeUser(JSON.parse(storedUser)));
      }
    } catch (error) {
      console.error("Error al cargar usuario del localStorage:", error);
      localStorage.removeItem("usuario");
    }
  }, []);

  const login = (userData) => {
    const normalizedUser = normalizeUser(userData);
    setUsuario(normalizedUser);
    localStorage.setItem("usuario", JSON.stringify(normalizedUser));
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

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

export const useAuth = () => useContext(AuthContext);
