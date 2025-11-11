import { Link } from "react-router-dom";

const ProductCard = ({ id, img, name, brand, model, sku, price, onAdd }) => {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 flex flex-col">
      <Link to={`/producto/${id}`} className="block">
        <img
          src={img || "https://via.placeholder.com/300x200?text=Producto"}
          alt={name}
          className="w-full h-40 object-cover rounded-lg mb-3 bg-gray-100"
          onError={(e) =>
            (e.currentTarget.src =
              "https://via.placeholder.com/300x200?text=Producto")
          }
        />
      </Link>

      <h2 className="font-semibold text-[#005598]">{name}</h2>
      <p className="text-sm opacity-70 mb-2">
        {brand} {model} {sku ? `• ${sku}` : ""}
      </p>

      <div className="mt-auto flex items-center justify-between">
        <span className="font-bold text-lg">
          ${Number(price || 0).toLocaleString("es-AR")}
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
};

export default ProductCard;
