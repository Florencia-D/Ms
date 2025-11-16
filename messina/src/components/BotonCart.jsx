// src/components/BotonCart.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function BotonCart() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { usuario } = useAuth();

  // Si ya está en /cart, no muestres el botón
  if (pathname === "/cart") return null;

  const handleClick = () => {
    if (usuario) {
      navigate("/cart");
    } else {
      alert("Debes iniciar sesión para acceder al carrito");
    
    }
  };

  return (
    <button
      onClick={handleClick}
      className="
        fixed
        bottom-24 right-4
        w-14 h-14
        rounded-full
        bg-gradient-to-r from-[#005598] to-[#DF5438]
        shadow-lg shadow-[#000]/30
        flex items-center justify-center
        text-white
        hover:scale-105
        hover:shadow-xl
        transition-transform transition-shadow
        z-40
      "
      aria-label="Ir al carrito"
    >
      <FaShoppingCart className="w-6 h-6" />
    </button>
  );
}
