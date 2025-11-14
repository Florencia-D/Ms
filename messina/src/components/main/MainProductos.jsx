import { useEffect, useMemo, useState } from "react";
import { useCart } from "../../store/cart.store.js";
import ProductCard from "../ProductCard.jsx";
import { mockCategories } from "../../data/products.js";

const API_URL = "http://localhost:8000/api/productos";


const normalizeImg = (raw) => {
  if (!raw) return "";
  const s = String(raw).trim();
  if (s.startsWith("http")) return s;
  return s.startsWith("/") ? s : `/${s}`;
};

export default function MainProductos() {
  const { add } = useCart();

  const [products, setProducts] = useState([]);
  const [categories] = useState(mockCategories);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("No se pudieron cargar los productos.");

        const data = await res.json();
        const list = Array.isArray(data) ? data : (data.productos ?? data.products ?? []);

        const normalized = list.map((p) => ({
          id: Number(p.id_producto ?? p.id ?? p.ID ?? 0),
          name: p.nombre ?? p.Nombre_producto ?? p.name ?? "",
          brand: p.marca ?? p.Marca ?? p.brand ?? "",
          model: p.modelo ?? p.Modelo ?? p.model ?? "",
          sku: p.sku ?? p.N_serie ?? "",
          img: normalizeImg(p.imagen ?? p.Imagen ?? p.img ?? ""),
          price: Number(p.precio ?? p.Precio ?? p.price ?? 0),
          desc: p.descripcion ?? p.Descripcion ?? p.desc ?? "",
          categoryId: p.id_categoria ?? p.categoryId ?? null,
        }));

        setProducts(normalized);
      } catch (err) {
        console.error(err);
        setError(err.message || "Error al cargar productos.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter((p) => {
      const matchesText =
        !q ||
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.model?.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q);

      const matchesCategory = !selectedCategoryId || p.categoryId === selectedCategoryId;
      return matchesText && matchesCategory;
    });
  }, [search, products, selectedCategoryId]);

  const currentCategory = useMemo(() => {
    if (!selectedCategoryId) return null;
    return categories.find((c) => c.id === selectedCategoryId) || null;
  }, [selectedCategoryId, categories]);

  // Loading
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <header className="mb-8 text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-[#4E5A62]">
            Productos {currentCategory ? ` / ${currentCategory.name}` : ""}
          </p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-[#005598]">
            {currentCategory ? currentCategory.name.toUpperCase() : "NUESTROS PRODUCTOS"}
          </h1>
        </header>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow animate-pulse h-40" />
          ))}
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10">
        <header className="mb-8 text-center">
          <p className="text-xs tracking-[0.35em] uppercase text-[#4E5A62]">Productos</p>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-[#005598]">NUESTROS PRODUCTOS</h1>
        </header>
        <div className="bg-red-50 text-red-800 rounded-2xl px-4 py-3 text-center">{error}</div>
      </div>
    );
  }

  // Normal
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <header className="mb-8 text-center">
        <p className="text-xs tracking-[0.35em] uppercase text-[#4E5A62]">
          Productos {currentCategory ? ` / ${currentCategory.name}` : ""}
        </p>
        <h1 className="mt-2 text-3xl md:text-4xl font-bold text-[#005598]">
          {currentCategory ? currentCategory.name.toUpperCase() : "NUESTROS PRODUCTOS"}
        </h1>
      </header>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="md:w-64">
          <div className="bg-white rounded-2xl shadow border border-[#A9ABAE]/40 p-6">
            <h2 className="text-sm font-semibold tracking-[0.25em] uppercase text-[#4E5A62]">
              Filtrar por
            </h2>
            <div className="mt-4 space-y-1">
              <button
                type="button"
                onClick={() => setSelectedCategoryId(null)}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg transition ${
                  !selectedCategoryId
                    ? "bg-[#005598] text-white font-semibold"
                    : "text-[#201E1E] hover:bg-[#F1EEEA]"
                }`}
              >
                Todos
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategoryId(cat.id)}
                  className={`w-full flex items-center gap-2 text-left text-sm px-3 py-2 rounded-lg transition ${
                    selectedCategoryId === cat.id
                      ? "bg-[#005598] text-white font-semibold"
                      : "text-[#4E5A62] hover:bg-[#F1EEEA]"
                  }`}
                >
                  {cat.img && <img src={cat.img} alt={cat.name} className="w-6 h-6 object-contain" />}
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Grid */}
        <section className="flex-1">
          <div className="mb-4 flex justify-end">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar producto…"
              className="w-full md:w-80 border border-[#A9ABAE]/70 rounded-full px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#005598]"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl shadow p-8 text-center opacity-80">No se encontraron productos.</div>
          ) : (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filtered.map((p) => (
                <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  brand={p.brand}
                  model={p.model}
                  price={p.price}
                  sku={p.sku}
                  img={p.img}
                  desc={p.desc}
                  onAdd={() =>
                    add({
                      id: p.id,
                      name: p.name,
                      price: p.price,
                      img: p.img,
                      sku: p.sku,
                      quantity: 1,
                    })
                  }
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
