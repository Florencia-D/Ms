// src/pages/ProductDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../store/cart.store.js";
import { mockProducts } from "../data/products.js";

export default function ProductDetail() {
  const { id } = useParams();
  const { add } = useCart();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");

  useEffect(() => {
    const numericId = Number(id);
    const found = mockProducts.find((p) => p.id === numericId);

    if (!found) {
      setError("Producto no encontrado.");
      setProduct(null);
    } else {
      setError("");
      setProduct(found);
      setQty(1);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        {error ? (
          <div className="rounded-xl bg-red-50 text-red-800 px-4 py-3 mb-4">
            {error}
          </div>
        ) : (
          <div className="animate-pulse bg-white rounded-2xl shadow p-8">
            Cargando producto…
          </div>
        )}
      </div>
    );
  }

  const handleAddToCart = () => {
    add({
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      sku: product.sku,
      quantity: qty,
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* MIGAS */}
      <nav className="mb-4 text-sm">
        <Link to="/productos" className="text-[#005598] hover:underline">
          Productos
        </Link>
        <span className="text-gray-500"> / {product.name}</span>
      </nav>

      <div className="bg-white rounded-2xl shadow-md px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row gap-8">
        {/* IMAGEN */}
        <div className="md:w-1/2 flex items-center justify-center">
          <div className="w-full aspect-[4/3] bg-[#F1F3F6] rounded-2xl flex items-center justify-center overflow-hidden">
            {product.img ? (
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <span className="text-gray-400 text-sm">
                Sin imagen disponible
              </span>
            )}
          </div>
        </div>

        {/* DETALLE */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-[#005598]">
            {product.name}
          </h1>

          <div className="text-sm text-gray-600 space-x-2">
            {product.sku && (
              <span>
                <span className="font-semibold">SKU:</span> {product.sku}
              </span>
            )}
            {product.brand && (
              <span>
                <span className="font-semibold">Marca:</span> {product.brand}
              </span>
            )}
            {product.model && (
              <span>
                <span className="font-semibold">Modelo:</span> {product.model}
              </span>
            )}
          </div>

          {product.desc && (
            <p className="text-gray-700 leading-relaxed mt-2">
              {product.desc}
            </p>
          )}

          <p className="mt-4 text-2xl md:text-3xl font-bold text-[#201E1E]">
            {product.price?.toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
              maximumFractionDigits: 0,
            })}
          </p>

          {/* Cantidad + botón */}
          <div className="mt-4 flex items-center gap-4">
            <div className="inline-flex items-center border rounded-full overflow-hidden">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-3 py-1 text-lg"
              >
                −
              </button>
              <span className="px-4 text-sm">{qty}</span>
              <button
                type="button"
                onClick={() => setQty((q) => q + 1)}
                className="px-3 py-1 text-lg"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="bg-[#005598] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#004278] transition"
            >
              Agregar al carrito
            </button>
          </div>

          {/* Bullet de confianza como en el Figma */}
          <ul className="mt-4 text-sm text-gray-700 list-disc list-inside space-y-1">
            <li>Garantía oficial.</li>
            <li>Soporte técnico Messina.</li>
            <li>Factura A/B.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
