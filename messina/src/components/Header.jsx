import "../css/Header.css";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { home, cart } from "../routes/path";
import { FaUser, FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useState, useRef, useEffect } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const Header = () => {
  const { usuario, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCartWarning, setShowCartWarning] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    if (showMenu) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showMenu]);

  const handleUserClick = () => {
    if (usuario) {
      setShowMenu(!showMenu);
    } else {
      setShowLoginModal(true);
    }
  };

  const handleLogout = () => {
    logout();
    setShowMenu(false);
    navigate("/");
  };

  const handleCartClick = () => {
    if (!usuario) {
      setShowCartWarning(true);
      setTimeout(() => setShowCartWarning(false), 3000);
      return;
    }
    navigate(cart);
  };

  return (
    <>
      <header className="header">
        <div className="logo-container">
          <Link to={home}>
            <img src="/Logo2.png" alt="Messina Logo" className="logo" />
          </Link>
        </div>
        <NavBar />
      </header>

      <div className="search-container">
        <div className="nav-search">
          {/* Icono usuario */}
          <div className="user-menu">
            <FaUser
              className="nav-icon orange"
              onClick={handleUserClick}
              style={{ cursor: "pointer" }}
            />
            {showMenu && (
              <div className="dropdown-menu" ref={menuRef}>
                <p className="user-name">{usuario?.nombre || "Usuario"}</p>
                {usuario && (
                  <button onClick={handleLogout} className="logout-btn">
                    Cerrar sesión
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Icono carrito */}
          <div className="cart-container" style={{ position: "relative" }}>
            <FaShoppingCart
              className="nav-icon orange"
              style={{ cursor: "pointer" }}
              onClick={handleCartClick}
            />
            {showCartWarning && (
              <div className="cart-warning">
                Debes iniciar sesión para poder comprar
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modales */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onGoRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
      )}

      {showRegisterModal && (
        <RegisterModal
          onClose={() => setShowRegisterModal(false)}
          onGoLogin={() => {
            setShowRegisterModal(false);
            setShowLoginModal(true);
          }}
        />
      )}
    </>
  );
};

export default Header;