import "../css/Header.css";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { home, login } from "../routes/path";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; 
import { useState } from "react";

const Header = () => {
  const { usuario, logout } = useAuth(); 
  const [showMenu, setShowMenu] = useState(false);

  const handleUserClick = () => {
    if (usuario) {
      setShowMenu(!showMenu);
    }
  };

  const handleLogout = () => {
    logout();
    setShowMenu(false);
  };

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <Link to={home}>
            <img src="/public/Logo2.png" alt="Messina Logo" className="logo" />
          </Link>
        </div>
        <NavBar />
      </header>

      <div className="search-container">
        <div className="nav-search">
          <input type="text" placeholder="Buscar producto" />
          <FaSearch className="nav-icon orange" />

          {/* Lógica del usuario */}
          {usuario ? (
            <div className="user-menu">
              <FaUser
                className="nav-icon orange"
                onClick={handleUserClick}
                style={{ cursor: "pointer" }}
              />
              {showMenu && (
                <div className="dropdown-menu">
                  <p className="user-name"> {usuario?.user?.Nombre || "Usuario"}</p>
                  <button onClick={handleLogout} className="logout-btn">
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to={login}>
              <FaUser className="nav-icon orange" />
            </Link>
          )}

          <FaShoppingCart className="nav-icon orange" />
        </div>
      </div>
    </>
  );
};

export default Header;
