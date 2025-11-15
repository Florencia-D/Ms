import "../css/Header.css";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { home, login, cart } from "../routes/path";
import { FaSearch, FaUser, FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";



const Header = () => {
  const { usuario, logout } = useAuth();
  const [showMenu, setShowMenu] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showCart, setShowCart] = useState(false); // <-- Estado del carrito
  const navigate = useNavigate();


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
          {/* <input
            type="text"
            placeholder="Buscar producto"
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
          
          <FaSearch className="nav-icon orange" /> */}

          <div className="user-menu">
            <FaUser
              className="nav-icon orange"
              onClick={handleUserClick}
              style={{ cursor: "pointer" }}
            />

            {usuario && showMenu && (
              <div className="dropdown-menu">
                <p className="user-name">{usuario?.nombre || "Usuario"}</p>
                <button onClick={handleLogout} className="logout-btn">
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>

          {/* Carrito */}

          <Link to={cart}>
            <FaShoppingCart className="nav-icon orange" />
          </Link>
        </div>

      </div>

      {/* Modal de login */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onGoRegister={() => {
            setShowLoginModal(false);
            setShowRegisterModal(true);
          }}
        />
      )}

      {/* modal de registro */}
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
