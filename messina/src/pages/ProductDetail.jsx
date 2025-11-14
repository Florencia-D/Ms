import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../store/cart.store.js";

const API_BASE = "http://localhost:8000";   // si usás proxy, podés dejar solo "/api"
const API_URL = `${API_BASE}/api/productos`;
const FALLBACK = "/img/placeholder-300x200.png";

// Normaliza imagen: https tal cual; relativa con “/”
const normalizeImg = (raw) => {
  if (!raw) return "";
  const s = String(raw).trim();
  if (s.startsWith("http")) return s;
  return s.startsWith("/") ? s : `/${s}`;
};

export default function ProductDetail() {
  const { id } = useParams();
  const { add } = useCart();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOne = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_URL}/${id}`);
        if (res.status === 404) {
          setError("Producto no encontrado.");
          setProduct(null);
          return;
        }
        if (!res.ok) throw new Error("Error al cargar el producto.");

        const p = await res.json();
        console.log("EJEMPLO API detalle:", p);
        const normalized = {
          id: Number(p.id_producto ?? p.id ?? 0),
          name: p.nombre ?? p.Nombre_producto ?? "",
          brand: p.marca ?? "",
          model: p.modelo ?? "",
          sku: p.sku ?? p.N_serie ?? "",
          img: normalizeImg(p.imagen ?? p.Imagen ?? p.img ?? ""),
          price: Number(p.precio ?? 0),
          desc: p.descripcion ?? "",
        };

        setProduct(normalized);
        setQty(1);
      } catch (e) {
        console.error(e);
        setError(e.message || "Error al cargar el producto.");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchOne();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="animate-pulse bg-white rounded-2xl shadow p-8">Cargando producto…</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="rounded-xl bg-red-50 text-red-800 px-4 py-3 mb-4">{error || "Producto no encontrado."}</div>
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
            <img
              src={product.img || FALLBACK}
              alt={product.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = FALLBACK;
              }}
            />
          </div>
        </div>

        {/* DETALLE */}
        <div className="md:w-1/2 flex flex-col gap-4">
          <h1 className="text-2xl md:text-3xl font-bold text-[#005598]">{product.name}</h1>

          <div className="text-sm text-gray-600 space-x-2">
            {product.sku && <span><span className="font-semibold">SKU:</span> {product.sku}</span>}
            {product.brand && <span><span className="font-semibold">Marca:</span> {product.brand}</span>}
            {product.model && <span><span className="font-semibold">Modelo:</span> {product.model}</span>}
          </div>

          {product.desc && <p className="text-gray-700 leading-relaxed mt-2">{product.desc}</p>}

          <p className="mt-4 text-2xl md:text-3xl font-bold text-[#201E1E]">
            {product.price.toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 })}
          </p>

          <div className="mt-4 flex items-center gap-4">
            <div className="inline-flex items-center border rounded-full overflow-hidden">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-1 text-lg">−</button>
              <span className="px-4 text-sm">{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} className="px-3 py-1 text-lg">+</button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="bg-[#005598] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[#004278] transition"
            >
              Agregar al carrito
            </button>
          </div>

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
