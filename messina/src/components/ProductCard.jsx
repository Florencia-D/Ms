import { Link } from "react-router-dom";

const FALLBACK = "/img/placeholder-300x200.png";

const normalizeImg = (raw) => {
  if (!raw) return "";
  const s = String(raw).trim();
  if (s.startsWith("http")) return s;        // URL absoluta (Cloudinary/S3/etc.)
  return s.startsWith("/") ? s : `/${s}`;    // relativa desde /public
};

export default function ProductCard({
  id, img, name, brand, model, sku, price, onAdd,
}) {
  const src = normalizeImg(img);

  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <Link to={`/producto/${id}`} className="block">
        <img
          src={src || FALLBACK}
          alt={name || "Producto"}
          className="w-full h-40 object-contain rounded-lg mb-3 bg-gray-100"
          onError={(e) => { e.currentTarget.src = FALLBACK; }}
          crossOrigin="anonymous"
        />
      </Link>

      <h2 className="font-semibold text-[#005598]">{name}</h2>
      <p className="text-sm opacity-70 mb-2">
        {brand} {model} {sku ? `• ${sku}` : ""}
      </p>

      <div className="mt-auto flex items-center justify-between">
        <span className="font-bold text-lg">
          {Number(price || 0).toLocaleString("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 })}
        </span>
        <button
          onClick={onAdd}
          className="bg-[#005598] text-white px-3 py-1 rounded-xl hover:bg-[#004178] transition text-sm"
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
