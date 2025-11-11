// import { useMemo } from "react";
// import { useCart } from "../store/cart.store.js";

// export default function Cart() {
//   const { items, add, remove, clear } = useCart();

//   // Total calculado
//   const total = useMemo(
//     () => items.reduce((acc, it) => acc + it.price * it.qty, 0),
//     [items]
//   );

//   const inc = (item) => add(item, 1);
//   const dec = (item) => {
//     if (item.qty > 1) add(item, -1);     // nuestro add admite negativos
//     else remove(item.id);
//   };

//   if (!items.length) {
//     return (
//       <div className="max-w-6xl mx-auto px-4 py-10">
//         <h1 className="text-3xl md:text-4xl font-bold text-[#005598] mb-3">Carrito</h1>
//         <div className="bg-white rounded-2xl shadow p-8 text-center">
//           <p className="text-lg opacity-80">Tu carrito está vacío.</p>
//           <a href="/productos" className="inline-block mt-6 bg-[#005598] text-white px-5 py-2 rounded-xl">
//             Ver productos
//           </a>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       <h1 className="text-3xl md:text-4xl font-bold text-[#005598] mb-6">Carrito</h1>

//       <div className="bg-white rounded-2xl shadow overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm">
//             <thead className="bg-gray-100 text-gray-700">
//               <tr>
//                 <th className="text-left px-4 py-3">Producto</th>
//                 <th className="text-left px-4 py-3">Precio</th>
//                 <th className="text-left px-4 py-3">Cantidad</th>
//                 <th className="text-left px-4 py-3">Subtotal</th>
//                 <th className="px-4 py-3"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {items.map((it) => (
//                 <tr key={it.id} className="border-t">
//                   <td className="px-4 py-3">
//                     <div className="flex items-center gap-3">
//                       {it.img && (
//                         <img
//                           src={it.img}
//                           alt={it.name}
//                           className="w-14 h-14 object-cover rounded-lg"
//                         />
//                       )}
//                       <div>
//                         <div className="font-medium">{it.name}</div>
//                         {it.sku && <div className="text-xs opacity-70">SKU: {it.sku}</div>}
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3">${it.price?.toFixed(2) ?? "0.00"}</td>
//                   <td className="px-4 py-3">
//                     <div className="inline-flex items-center rounded-xl border">
//                       <button
//                         onClick={() => dec(it)}
//                         className="px-3 py-1 hover:bg-gray-100"
//                         aria-label="Disminuir"
//                       >
//                         −
//                       </button>
//                       <span className="px-3 select-none">{it.qty}</span>
//                       <button
//                         onClick={() => inc(it)}
//                         className="px-3 py-1 hover:bg-gray-100"
//                         aria-label="Aumentar"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </td>
//                   <td className="px-4 py-3">
//                     ${(it.price * it.qty).toFixed(2)}
//                   </td>
//                   <td className="px-4 py-3">
//                     <button
//                       onClick={() => remove(it.id)}
//                       className="text-[#DF5438] hover:underline"
//                     >
//                       Quitar
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//             <tfoot className="border-t">
//               <tr>
//                 <td className="px-4 py-4" colSpan={2}>
//                   <button
//                     onClick={clear}
//                     className="border px-4 py-2 rounded-xl hover:bg-gray-50"
//                   >
//                     Vaciar carrito
//                   </button>
//                 </td>
//                 <td className="px-4 py-4 font-semibold text-right">Total:</td>
//                 <td className="px-4 py-4 font-bold text-lg">
//                   ${total.toFixed(2)}
//                 </td>
//                 <td className="px-4 py-4">
//                   <a
//                     href="/checkout"
//                     className="bg-[#005598] text-white px-5 py-2 rounded-xl inline-block"
//                   >
//                     Finalizar compra
//                   </a>
//                 </td>
//               </tr>
//             </tfoot>
//           </table>
//         </div>
//       </div>

//       <div className="mt-6 flex justify-between">
//         <a href="/productos" className="text-[#005598] hover:underline">
//           ← Seguir comprando
//         </a>
//       </div>
//     </div>
//   );
// }
