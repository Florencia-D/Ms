import { createContext, useContext, useState, useEffect } from "react";

// 🔹 1️⃣ Creamos el contexto
export const AuthContext = createContext();

// 🔹 2️⃣ Componente Provider
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

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

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 3️⃣ Hook personalizado
export const useAuth = () => useContext(AuthContext);
