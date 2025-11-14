// src/pages/Cart.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../routes/cart.store.js";

export default function Cart() {
  const navigate = useNavigate();

  // 💡 Ajustá estos nombres si en tu store se llaman distinto
  const { items, increment, decrement, remove, clear } = useCart();

  const subtotal = items.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );
  const discount = 0;
  const total = subtotal - discount;

  // 🧩 Vista si el carrito está vacío
  if (!items || items.length === 0) {
    return (
      <div className="bg-[#F5F5F5] min-h-[calc(100vh-96px)]">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-[#005598] mb-4">
            Tu Carrito de Compras
          </h1>
          <p className="text-gray-600 mb-8">
            Todavía no agregaste productos a tu carrito.
          </p>
          <Link
            to="/productos"
            className="inline-block bg-[#005598] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#004075] transition"
          >
            Ver productos
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    // Más adelante acá podés abrir el modal de factura o ir a otra vista
    // de momento lo dejamos así:
    alert("Acá después va la vista / factura de Finalizar Compra 😉");
  };

  return (
    <div className="bg-[#F5F5F5] min-h-[calc(100vh-96px)]">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Título */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#333] mb-10">
          Tu Carrito de Compras
        </h1>

        {/* Contenido principal: listado + resumen */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-8">
          {/* Columna izquierda: productos */}
          <section>
            <h2 className="text-xl font-semibold text-[#333] mb-4">Resumen</h2>

            <div className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  increment={increment}
                  decrement={decrement}
                  remove={remove}
                />
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-6">
              <button
                type="button"
                onClick={clear}
                className="text-sm text-red-500 hover:text-red-600 hover:underline"
              >
                Vaciar carrito
              </button>

              <Link
                to="/productos"
                className="text-sm text-[#005598] hover:underline"
              >
                ← Seguir comprando
              </Link>
            </div>
          </section>

          {/* Columna derecha: tarjeta de resumen */}
          <aside>
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-[#333] mb-4">
                Resumen
              </h2>

              <div className="space-y-2 text-sm">
                <Row label="Subtotal" value={subtotal} />
                <Row label="Descuentos" value={discount} />
                <hr className="my-2" />
                <Row label="Total" value={total} bold />
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="w-full mt-5 bg-[#DF5438] hover:bg-[#c7472e] text-white font-semibold py-3 rounded-full transition"
              >
                Finalizar Compra
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

/* 🔹 Componente para cada ítem del carrito */
function CartItem({ item, increment, decrement, remove }) {
  const image = item.image || item.img; // intenta usar cualquiera de los dos
  const price = item.price || 0;
  const quantity = item.quantity || 1;

  return (
    <div className="flex items-center justify-between bg-white rounded-xl shadow-sm border border-gray-100 px-5 py-4">
      <div className="flex items-center gap-4">
        {image && (
          <img
            src={image}
            alt={item.name || item.title}
            className="w-16 h-16 object-contain rounded-lg bg-gray-50"
          />
        )}

        <div>
          <p className="font-semibold text-[#333]">
            {item.name || item.title || "Producto"}
          </p>
          <p className="text-sm text-gray-500">
            ${(price * quantity).toLocaleString("es-AR")}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
          <button
            type="button"
            onClick={() => decrement(item.id)}
            className="w-6 h-6 flex items-center justify-center rounded-full text-gray-700 text-sm hover:bg-gray-200"
          >
            −
          </button>
          <span className="mx-3 w-6 text-center text-sm font-medium">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => increment(item.id)}
            className="w-6 h-6 flex items-center justify-center rounded-full text-gray-700 text-sm hover:bg-gray-200"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={() => remove(item.id)}
          className="text-[11px] text-red-500 hover:text-red-600 hover:underline"
        >
          Quitar
        </button>
      </div>
    </div>
  );
}

/* 🔹 Fila de resumen (subtotal / descuentos / total) */
function Row({ label, value, bold = false }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className={bold ? "font-semibold text-[#333]" : "text-gray-700"}>
        ${value.toLocaleString("es-AR")}
      </span>
    </div>
  );
}
