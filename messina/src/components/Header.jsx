
import "../css/Header.css";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import { home, login } from "../routes/path";
import { FaSearch, FaUser, FaShoppingCart, } from "react-icons/fa";


const Header = () => {
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
          <Link to="/login"><FaUser className="nav-icon orange" /></Link>
          <FaShoppingCart className="nav-icon orange" />
        </div>
      </div>




    </>

  );
};

export default Header;
