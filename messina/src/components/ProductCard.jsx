import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // 🔹 importamos contexto
import LoginModal from "./LoginModal"; // 🔹 modal de login

const FALLBACK = "/img/placeholder-300x200.png";

const normalizeImg = (raw) => {
  if (!raw) return FALLBACK;
  const s = String(raw).trim();
  if (s.startsWith("http")) return s;
  return s.startsWith("/") ? s : `/${s}`;
};

export default function ProductCard({
  id,
  img,
  name,
  brand,
  model,
  sku,
  price,
  onAdd,
}) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // 🔹 para abrir login

  const { usuario } = useAuth(); // 🔹 usuario logueado

  const src = normalizeImg(img);

  const handleAdd = () => {
    if (!usuario) {
      // Usuario no logueado → abrir login
      setShowLoginModal(true);
      return;
    }

    const product = {
      id,
      img: src,
      name,
      brand,
      model,
      sku,
      price,
      quantity: qty,
    };

    if (onAdd) onAdd(product);

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const increase = () => setQty((q) => Math.min(99, q + 1));
  const decrease = () => setQty((q) => Math.max(1, q - 1));

  const buttonClasses = added
    ? "mt-auto w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2.5 rounded-full text-sm transition transform scale-[1.03] shadow-lg"
    : "mt-auto w-full bg-[#DF5438] hover:bg-[#c7472e] text-white font-semibold py-2.5 rounded-full text-sm transition";

  return (
    <>
      <article className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:-translate-y-1 hover:shadow-md transition">
        <Link to={`/producto/${id}`} className="block">
          <div className="w-full h-48 bg-gradient-to-b from-[#F8FAFC] to-[#E5EDF7] flex items-center justify-center">
            <img
              src={src}
              alt={name}
              className="max-h-40 w-auto object-contain drop-shadow-sm"
              onError={(e) => {
                e.currentTarget.src = FALLBACK;
              }}
            />
          </div>
        </Link>

        <div className="p-4 flex-1 flex flex-col">
          <Link to={`/producto/${id}`}>
            <h3 className="font-semibold text-[#333] mb-1 line-clamp-2">
              {name}
            </h3>
          </Link>

          {brand && (
            <p className="text-sm text-gray-500">
              {brand} {model && `· ${model}`}
            </p>
          )}
          {sku && <p className="text-xs text-gray-400 mt-1">SKU: {sku}</p>}

          <div className="mt-3 mb-2">
            <p className="text-lg font-bold text-[#005598]">
              ${price?.toLocaleString("es-AR")}
            </p>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500">Cantidad:</span>
            <div className="flex items-center bg-gray-100 rounded-full px-2 py-1">
              <button
                type="button"
                onClick={decrease}
                className="w-6 h-6 flex items-center justify-center rounded-full text-gray-700 text-sm hover:bg-gray-200"
              >
                −
              </button>
              <span className="mx-3 w-6 text-center text-sm font-medium">
                {qty}
              </span>
              <button
                type="button"
                onClick={increase}
                className="w-6 h-6 flex items-center justify-center rounded-full text-gray-700 text-sm hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          <button type="button" onClick={handleAdd} className={buttonClasses}>
            {added ? "Agregado al carrito ✔" : "Agregar al carrito"}
          </button>

          {added && (
            <div className="mt-2 flex items-center justify-center gap-2 text-xs text-emerald-600 animate-pulse">
              <CheckCircle2 className="w-4 h-4" />
              <span>Producto agregado correctamente</span>
            </div>
          )}
        </div>
      </article>

      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
    </>
  );
}
