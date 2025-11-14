// src/components/BotonCart.jsx
import { Link, useLocation } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

export default function BotonCart() {
  const { pathname } = useLocation();

  // Si ya está en /cart, no muestres el botón
  if (pathname === "/cart") return null;

  return (
    <Link
      to="/cart"
      className="
        fixed
        bottom-24 right-4   /* un poquito arriba del botón de WP */
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
    </Link>
  );
}
