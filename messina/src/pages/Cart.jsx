
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../store/cart.store.js";
import {
  Trash2,
  FileText,
  X,
  Printer,
  Banknote,
  MessageCircle,
  ShoppingCart,
  UserCircle2,
  CheckCircle2,
} from "lucide-react";

/* ===========================
   Página de Carrito
   =========================== */
export default function Cart() {
  const { items, increment, decrement, remove, clear } = useCart();

  const [showInvoice, setShowInvoice] = useState(false);

  // Datos del cliente para factura
  const [customer, setCustomer] = useState({
    name: "",
    document: "",
    address: "",
  });

  const subtotal = items.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
    0
  );
  const discount = 0;
  const total = subtotal - discount;

  const handleCheckout = () => {
    if (!items || items.length === 0) return;
    setShowInvoice(true);
  };

  // 🧺 Carrito vacío
  if (!items || items.length === 0) {
    return (
      <div className="bg-[#F4F5F7] min-h-[calc(100vh-96px)]">
        <div className="max-w-5xl mx-auto px-4 py-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E0ECFF] text-[#005598] text-xs font-semibold mb-4">
            <ShoppingCart className="w-4 h-4" />
            Tu carrito está vacío
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-[#333] mb-2">
            Aún no agregaste productos
          </h1>
          <p className="text-sm text-gray-600 mb-8">
            Explorá nuestros productos y sumá todo lo que necesitás para tu
            negocio.
          </p>

          <Link
            to="/productos"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-gradient-to-r from-[#005598] to-[#DF5438] text-white font-semibold text-sm md:text-base shadow-lg shadow-[#DF5438]/30 hover:brightness-110 transition"
          >
            Ver productos
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F4F5F7] min-h-[calc(100vh-96px)]">
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-10 space-y-6">
        {/* 🔹 HEADER COLORIDO */}
        <header className="mb-2">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#005598] via-[#1D70B8] to-[#DF5438] p-[1px] shadow-[0_18px_35px_rgba(15,23,42,0.25)]">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-5 md:px-8 py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 hidden sm:flex w-9 h-9 rounded-full bg-[#005598]/10 items-center justify-center">
                  <ShoppingCart className="w-5 h-5 text-[#005598]" />
                </div>
                <div>
                  <p className="text-[11px] tracking-[0.28em] uppercase text-[#4E5A62] font-semibold">
                    Resumen de tu compra
                  </p>
                  <h1 className="text-2xl md:text-3xl font-bold text-[#111827]">
                    Tu Carrito de Compras
                  </h1>
                  <p className="text-xs md:text-sm text-gray-600 mt-1">
                    Revisá los productos, completá tus datos y generá la
                    factura para pagar por transferencia bancaria.
                  </p>
                </div>
              </div>

              {/* Paso a paso */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex flex-wrap gap-2 justify-end text-[11px]">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#005598] text-white font-semibold shadow-sm">
                    <span className="inline-flex w-4 h-4 rounded-full bg-white/20 items-center justify-center text-[10px]">
                      1
                    </span>
                    Carrito
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#F97316]/10 text-[#C05621] font-semibold">
                    <span className="inline-flex w-4 h-4 rounded-full bg-[#FED7AA] items-center justify-center text-[10px]">
                      2
                    </span>
                    Datos del cliente
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-semibold">
                    <span className="inline-flex w-4 h-4 rounded-full bg-emerald-200 items-center justify-center text-[10px]">
                      3
                    </span>
                    Factura & pago
                  </span>
                </div>

                <div className="hidden md:flex items-center gap-2 text-xs bg-[#F1EEEA] px-3 py-1.5 rounded-full border border-[#E5D8CF]">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium text-[#4B5563]">
                    Total actual:{" "}
                    <span className="text-[#DF5438] font-semibold">
                      ${total.toLocaleString("es-AR")}
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 🔹 DATOS DEL CLIENTE */}
        <section className="bg-white rounded-2xl shadow-md border border-[#E5E7EB] px-5 md:px-6 py-5">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full bg-[#EEF3FF] flex items-center justify-center">
                <UserCircle2 className="w-5 h-5 text-[#005598]" />
              </div>
              <div>
                <p className="text-[11px] tracking-[0.25em] text-[#4E5A62] uppercase font-semibold">
                  Datos del cliente
                </p>
                <h2 className="text-lg md:text-xl font-semibold text-[#111827]">
                  Para emitir la factura
                </h2>
              </div>
            </div>

            <span className="hidden md:inline-flex items-center px-3 py-1 rounded-full bg-[#FFF7ED] text-[11px] text-[#C05621] border border-[#FED7AA] font-medium">
              Si dejás los campos vacíos, se emite como Consumidor Final.
            </span>
          </div>

          <div className="grid md:grid-cols-3 gap-4 text-xs md:text-sm">
            {/* Nombre */}
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1">
                Nombre / Razón social
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#005598]/60 focus:border-[#005598] bg-[#F9FAFB]"
                placeholder="Consumidor Final"
                value={customer.name}
                onChange={(e) =>
                  setCustomer((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </div>

            {/* CUIT / DNI */}
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1">
                CUIT / DNI
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#005598]/60 focus:border-[#005598] bg-[#F9FAFB]"
                placeholder="20-12345678-9"
                value={customer.document}
                onChange={(e) =>
                  setCustomer((prev) => ({
                    ...prev,
                    document: e.target.value,
                  }))
                }
              />
            </div>

            {/* Domicilio */}
            <div>
              <label className="block text-[11px] font-medium text-gray-500 mb-1">
                Domicilio
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[#005598]/60 focus:border-[#005598] bg-[#F9FAFB]"
                placeholder="Calle, número, ciudad"
                value={customer.address}
                onChange={(e) =>
                  setCustomer((prev) => ({
                    ...prev,
                    address: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <p className="mt-2 text-[11px] text-gray-500 md:hidden">
            Si dejás los campos vacíos, la factura se emitirá como Consumidor
            Final.
          </p>
        </section>

        {/* 🔹 GRID PRINCIPAL: listado + resumen */}
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] gap-8 mt-2">
          {/* IZQUIERDA: productos */}
          <section>
            <h2 className="text-lg font-semibold text-[#374151] mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#DF5438]" />
              Productos seleccionados
            </h2>

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

            <div className="flex flex-wrap gap-4 mt-6 items-center">
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

          {/* DERECHA: tarjeta resumen */}
          <aside>
            <div className="rounded-2xl bg-gradient-to-b from-[#005598]/90 via-[#005598] to-[#002B4F] p-[1px] shadow-lg shadow-[#0F172A]/40">
              <div className="bg-[#0B1727] rounded-2xl p-6 text-white flex flex-col gap-4">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-lg font-semibold">Resumen de pago</h2>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-[11px] uppercase tracking-[0.16em]">
                    Transferencia bancaria
                  </span>
                </div>

                <div className="space-y-1 text-sm">
                  <RowDark label="Subtotal" value={subtotal} />
                  <RowDark label="Descuentos" value={discount} />
                  <div className="border-t border-white/10 my-2" />
                  <RowDark label="Total" value={total} bold />
                </div>

                <div className="rounded-xl bg-[#F97316]/10 border border-[#FDBA74]/60 px-3 py-2 text-[11px] text-[#FED7AA]">
                  <p>
                    Recordá que el pago se realiza por transferencia bancaria. 
                    Al finalizar, vas a ver la factura con el CBU/alias y un 
                    botón para enviar el comprobante por WhatsApp.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCheckout}
                  className="w-full mt-1 bg-gradient-to-r from-[#DF5438] to-[#F97316] hover:brightness-110 text-white font-semibold py-3 rounded-full transition flex items-center justify-center gap-2 shadow-md shadow-[#F97316]/40 text-sm"
                >
                  <FileText className="w-4 h-4" />
                  Generar factura y datos de pago
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* 🔹 Modal de Factura */}
      {showInvoice && (
        <InvoiceModal
          items={items}
          subtotal={subtotal}
          discount={discount}
          total={total}
          customer={customer}
          onClose={() => setShowInvoice(false)}
        />
      )}
    </div>
  );
}

/* ===========================
   Item del carrito
   =========================== */
function CartItem({ item, increment, decrement, remove }) {
  const image = item.image || item.img;
  const price = item.price || 0;
  const quantity = item.quantity || 1;
  const lineTotal = price * quantity;

  return (
    <div className="flex items-center justify-between bg-white rounded-2xl shadow-sm border border-[#E5E7EB] px-5 py-4 hover:shadow-md hover:border-[#005598]/40 transition-all duration-150 hover:-translate-y-0.5">
      <div className="flex items-center gap-4">
        <div className="relative">
          {image && (
            <div className="w-16 h-16 rounded-xl bg-[#F3F4F6] flex items-center justify-center overflow-hidden">
              <img
                src={image}
                alt={item.name || item.title}
                className="w-full h-full object-contain"
              />
            </div>
          )}
          <span className="absolute -top-1 -left-1 px-2 py-[2px] rounded-full bg-[#005598] text-[10px] text-white">
            x{quantity}
          </span>
        </div>

        <div>
          <p className="font-semibold text-[#111827]">
            {item.name || item.title || "Producto"}
          </p>
          <p className="text-xs text-gray-500">
            Precio unidad:{" "}
            <span className="font-semibold text-[#005598]">
              ${price.toLocaleString("es-AR")}
            </span>
          </p>
          {item.sku && (
            <p className="text-[11px] text-gray-400 mt-1">SKU: {item.sku}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        {/* Cantidad */}
        <div className="flex items-center bg-[#F3F4F6] rounded-full px-3 py-1">
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

        {/* Total x producto */}
        <p className="text-sm font-semibold text-[#111827]">
          ${lineTotal.toLocaleString("es-AR")}
        </p>

        {/* Botón eliminar (cesto) */}
        <button
          type="button"
          onClick={() => remove(item.id)}
          className="text-red-500 hover:text-red-600"
          title="Eliminar producto"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

/* ===========================
   Fila de resumen clara
   =========================== */
function Row({ label, value, bold = false }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-200">{label}</span>
      <span className={bold ? "font-semibold text-white" : "text-gray-100"}>
        ${value.toLocaleString("es-AR")}
      </span>
    </div>
  );
}

/* ===========================
   Fila de resumen oscura (sidebar)
   =========================== */
function RowDark({ label, value, bold = false }) {
  return (
    <div className="flex justify-between">
      <span className="text-[#E5E7EB] text-sm">{label}</span>
      <span
        className={
          bold
            ? "font-semibold text-[#FACC15] text-base"
            : "text-[#F9FAFB] text-sm"
        }
      >
        ${value.toLocaleString("es-AR")}
      </span>
    </div>
  );
}

/* ===========================
   Modal de Factura + Transferencia
   =========================== */
function InvoiceModal({ items, subtotal, discount, total, customer, onClose }) {
  const fecha = new Date().toLocaleString("es-AR");
  const nroFactura = "0001-00000001"; // Podés hacerlo dinámico más adelante

  const whatsappNumber = "5493813373236";

  const nombreCliente = customer.name || "Consumidor Final";

  const handleSendWhatsapp = () => {
    const mensaje = `Hola, soy ${nombreCliente}. Adjunto comprobante de transferencia por la factura ${nroFactura} por un total de $${total.toLocaleString(
      "es-AR"
    )}.`;

    const url = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
      mensaje
    )}`;

    window.open(url, "_blank");
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header modal */}
        <div className="bg-gradient-to-r from-[#005598] via-[#1D70B8] to-[#DF5438] rounded-t-2xl px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Factura de compra</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-4 space-y-4 text-sm">
          {/* Empresa + Nro factura */}
          <div className="flex flex-col md:flex-row md:justify-between gap-4 border-b pb-4">
            <div>
              <h3 className="font-semibold text-[#005598] text-base">
                Messina Máquinas y Servicios
              </h3>
              <p className="text-gray-600">
                Dirección: San Miguel de Tucumán, Tucumán, Argentina
              </p>
              <p className="text-gray-600">CUIT: 20-12345678-9</p>
              <p className="text-gray-600">Tel: (381) 000-0000</p>
              <p className="text-gray-600">Email: info@messina.com</p>
            </div>

            <div className="text-right">
              <p className="text-gray-600">
                <span className="font-semibold">Factura N°: </span>
                {nroFactura}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Fecha: </span>
                {fecha}
              </p>
            </div>
          </div>

          {/* Datos del cliente */}
          <div className="border-b pb-3">
            <h3 className="font-semibold text-[#333] mb-2 text-sm">
              Datos del cliente
            </h3>
            <div className="space-y-1 text-sm text-gray-700 bg-[#F9FAFB] rounded-xl px-3 py-2">
              <p>
                <span className="font-semibold">Nombre / Razón social: </span>
                {customer.name || "Consumidor Final"}
              </p>
              {customer.document && (
                <p>
                  <span className="font-semibold">CUIT / DNI: </span>
                  {customer.document}
                </p>
              )}
              {customer.address && (
                <p>
                  <span className="font-semibold">Domicilio: </span>
                  {customer.address}
                </p>
              )}
            </div>
          </div>

          {/* Detalle de productos */}
          <div>
            <h3 className="font-semibold text-[#333] mb-2 text-sm">
              Detalle de productos
            </h3>
            <div className="border rounded-xl overflow-hidden">
              <table className="w-full text-xs md:text-sm">
                <thead className="bg-[#F5F5F5] text-gray-700">
                  <tr>
                    <th className="text-left px-3 py-2">Producto</th>
                    <th className="text-right px-3 py-2">Cant.</th>
                    <th className="text-right px-3 py-2">Precio</th>
                    <th className="text-right px-3 py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => {
                    const price = item.price || 0;
                    const qty = item.quantity || 1;
                    const lineTotal = price * qty;
                    return (
                      <tr key={item.id} className="border-t">
                        <td className="px-3 py-2">
                          <span className="font-medium">
                            {item.name || "Producto"}
                          </span>
                          {item.sku && (
                            <span className="block text-[11px] text-gray-500">
                              SKU: {item.sku}
                            </span>
                          )}
                        </td>
                        <td className="px-3 py-2 text-right">{qty}</td>
                        <td className="px-3 py-2 text-right">
                          ${price.toLocaleString("es-AR")}
                        </td>
                        <td className="px-3 py-2 text-right">
                          ${lineTotal.toLocaleString("es-AR")}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totales */}
          <div className="flex justify-end">
            <div className="w-full md:w-64 space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span>${subtotal.toLocaleString("es-AR")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Descuentos:</span>
                <span>${discount.toLocaleString("es-AR")}</span>
              </div>
              <div className="flex justify-between border-t pt-1 mt-1">
                <span className="font-semibold text-[#333]">Total:</span>
                <span className="font-semibold text-[#333]">
                  ${total.toLocaleString("es-AR")}
                </span>
              </div>
            </div>
          </div>

          {/* Medio de pago: Transferencia */}
          <div className="mt-4 border rounded-2xl bg-[#F9FAFB] px-4 py-4 space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <Banknote className="w-5 h-5 text-[#16a34a]" />
              <h3 className="text-sm font-semibold text-[#111827]">
                Medio de pago: Transferencia bancaria
              </h3>
            </div>

            <p className="text-xs text-gray-600">
              La compra se abona únicamente mediante{" "}
              <span className="font-semibold">transferencia bancaria</span>. Una
              vez realizada la transferencia, por favor enviá el comprobante por
              WhatsApp para confirmar tu pedido.
            </p>

            <div className="grid md:grid-cols-2 gap-3 text-xs text-gray-700">
              <div className="space-y-1">
                <p>
                  <span className="font-semibold">Banco: </span>
                  Banco Ejemplo S.A.
                </p>
                <p>
                  <span className="font-semibold">Titular: </span>
                  Messina Máquinas y Servicios
                </p>
              </div>
              <div className="space-y-1">
                <p>
                  <span className="font-semibold">CBU: </span>
                  0000000000000000000000
                </p>
                <p>
                  <span className="font-semibold">Alias: </span>
                  MESSINA.MAQUINAS.PAGO
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer modal */}
        <div className="flex flex-wrap justify-end gap-3 border-t px-6 py-3 bg-gray-50">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cerrar
          </button>
          <button
            type="button"
            onClick={handleSendWhatsapp}
            className="px-4 py-2 text-sm rounded-full bg-[#25D366] text-white font-semibold hover:bg-[#1ebe5a] inline-flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            Enviar comprobante por WhatsApp
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="px-4 py-2 text-sm rounded-full bg-[#005598] text-white font-semibold hover:bg-[#004075] inline-flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Imprimir
          </button>
        </div>
      </div>
    </div>
  );
}
