import { useMemo, useState } from "react";
import { useCart } from "../../store/cart.store.js";
import ProductCard from "../ProductCard.jsx";
import { mockProducts, mockCategories } from "../../data/products.js";

const MainProductos = () => {
    const { add } = useCart();
   const [products] = useState(mockProducts);
   const [categories] = useState(mockCategories);
   const [selectedCategoryId, setSelectedCategoryId] = useState(null);
   const [search, setSearch] = useState("");
 
   // Filtro combinado texto + categoría
   const filtered = useMemo(() => {
     const q = search.toLowerCase();
 
     return products.filter((p) => {
       const matchesText =
         !q ||
         p.name?.toLowerCase().includes(q) ||
         p.brand?.toLowerCase().includes(q) ||
         p.model?.toLowerCase().includes(q) ||
         p.sku?.toLowerCase().includes(q);
 
       const matchesCategory =
         !selectedCategoryId || p.categoryId === selectedCategoryId;
 
       return matchesText && matchesCategory;
     });
   }, [search, products, selectedCategoryId]);
 
   const currentCategory = useMemo(() => {
     if (!selectedCategoryId) return null;
     return categories.find((c) => c.id === selectedCategoryId) || null;
   }, [selectedCategoryId, categories]);
 
   return (
     <div className="max-w-6xl mx-auto px-4 py-10">
       {/* TÍTULO tipo Figma */}
       <header className="mb-8 text-center">
         <p className="text-xs tracking-[0.35em] uppercase text-[#4E5A62]">
           Productos {currentCategory ? ` / ${currentCategory.name}` : ""}
         </p>
         <h1 className="mt-2 text-3xl md:text-4xl font-bold text-[#005598]">
           {currentCategory
             ? currentCategory.name.toUpperCase()
             : "NUESTROS PRODUCTOS"}
         </h1>
       </header>
 
       <div className="flex flex-col md:flex-row gap-8">
         {/* Sidebar FILTRAR POR */}
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
                   {cat.img && (
                     <img
                       src={cat.img}
                       alt={cat.name}
                       className="w-6 h-6 object-contain"
                     />
                   )}
                   <span>{cat.name}</span>
                 </button>
               ))}
             </div>
           </div>
         </aside>
 
         {/* Contenido principal */}
         <section className="flex-1">
           {/* Buscador arriba a la derecha */}
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
             <div className="bg-white rounded-2xl shadow p-8 text-center opacity-80">
               No se encontraron productos.
             </div>
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
                     })
                   }
                 />
               ))}
             </div>
           )}
         </section>
       </div>
     </div>
  )
}

export default MainProductos