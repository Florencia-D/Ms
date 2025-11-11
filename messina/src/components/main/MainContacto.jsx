import { useState } from "react";

export default function Contacto() {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" }); // limpia errores mientras se escribe
  };

  const validar = () => {
    const err = {};

    // ✅ Nombre: obligatorio, mínimo 3 letras, solo texto
    if (!form.nombre.trim()) {
      err.nombre = "Ingresá tu nombre completo";
    } else if (!/^[a-zA-ZÀ-ÿ\s]{3,40}$/.test(form.nombre)) {
      err.nombre = "El nombre solo puede contener letras y espacios";
    }

    // ✅ Email: formato válido
    if (!form.email.trim()) {
      err.email = "Ingresá tu correo electrónico";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      err.email = "El email no tiene un formato válido";
    }

    // ✅ Teléfono: opcional, pero si se completa debe tener formato correcto
    if (form.telefono.trim() && !/^\+?\d{7,15}$/.test(form.telefono)) {
      err.telefono = "El teléfono debe contener solo números (7 a 15 dígitos)";
    }

    // ✅ Asunto: opcional, pero si se completa debe tener al menos 3 caracteres
    if (form.asunto.trim() && form.asunto.length < 3) {
      err.asunto = "El asunto es demasiado corto";
    }

    // ✅ Mensaje: obligatorio, mínimo 10 caracteres
    if (!form.mensaje.trim()) {
      err.mensaje = "Por favor, escribí tu mensaje";
    } else if (form.mensaje.length < 10) {
      err.mensaje = "El mensaje debe tener al menos 10 caracteres";
    }

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validar();
    setErrores(err);

    if (Object.keys(err).length > 0) return;

    console.log("Datos enviados:", form);
    setEnviado(true);
    setForm({ nombre: "", email: "", telefono: "", asunto: "", mensaje: "" });

    setTimeout(() => setEnviado(false), 5000); // oculta mensaje después de 5 seg
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Encabezado */}
      <section className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[#005598]">Contacto</h1>
        <p className="mt-3 text-lg opacity-80">
          ¿Tenés alguna consulta? Completá el formulario o comunicate con nosotros. Te responderemos a la brevedad.
        </p>
      </section>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Información */}
        <aside className="bg-white rounded-2xl shadow p-6">
          <h2 className="text-xl font-semibold mb-3">Datos de contacto</h2>
          <ul className="opacity-90 space-y-2">
            <li><span className="font-medium">Teléfono:</span> (381) 555-1234</li>
            <li><span className="font-medium">Email:</span> contacto@messina.com</li>
            <li><span className="font-medium">Horario:</span> Lunes a Viernes 9:00–18:00</li>
          </ul>
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Sucursal Central</h3>
            <p className="opacity-80">Av. Siempre Viva 123, San Miguel de Tucumán</p>
          </div>
        </aside>

        {/* Formulario */}
        <section className="bg-white rounded-2xl shadow p-6 md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Dejanos tu mensaje</h2>

          {enviado && (
            <div className="mb-4 rounded-xl bg-green-50 text-green-700 px-4 py-3">
              ¡Gracias! Tu mensaje fue enviado correctamente.
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
            {/* Nombre */}
            <div>
              <label className="block text-sm mb-1">Nombre y apellido</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className={`w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 ${
                  errores.nombre ? "border-red-500 ring-red-200" : "focus:ring-[#005598]"
                }`}
                placeholder="Ej: Sofía Jiménez"
              />
              {errores.nombre && <p className="text-sm text-red-600 mt-1">{errores.nombre}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 ${
                  errores.email ? "border-red-500 ring-red-200" : "focus:ring-[#005598]"
                }`}
                placeholder="tu@email.com"
              />
              {errores.email && <p className="text-sm text-red-600 mt-1">{errores.email}</p>}
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm mb-1">Teléfono (opcional)</label>
              <input
                type="text"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                className={`w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 ${
                  errores.telefono ? "border-red-500 ring-red-200" : "focus:ring-[#005598]"
                }`}
                placeholder="381 555 1234"
              />
              {errores.telefono && <p className="text-sm text-red-600 mt-1">{errores.telefono}</p>}
            </div>

            {/* Asunto */}
            <div>
              <label className="block text-sm mb-1">Asunto (opcional)</label>
              <input
                type="text"
                name="asunto"
                value={form.asunto}
                onChange={handleChange}
                className={`w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 ${
                  errores.asunto ? "border-red-500 ring-red-200" : "focus:ring-[#005598]"
                }`}
                placeholder="Consulta sobre productos"
              />
              {errores.asunto && <p className="text-sm text-red-600 mt-1">{errores.asunto}</p>}
            </div>

            {/* Mensaje */}
            <div className="col-span-2">
              <label className="block text-sm mb-1">Mensaje</label>
              <textarea
                name="mensaje"
                rows={5}
                value={form.mensaje}
                onChange={handleChange}
                className={`w-full border rounded-xl px-3 py-2 outline-none focus:ring-2 resize-y ${
                  errores.mensaje ? "border-red-500 ring-red-200" : "focus:ring-[#005598]"
                }`}
                placeholder="Contanos tu consulta..."
              />
              {errores.mensaje && <p className="text-sm text-red-600 mt-1">{errores.mensaje}</p>}
            </div>

            {/* Botones */}
            <div className="col-span-2 flex gap-3 mt-2">
              <button
                type="submit"
                className="bg-[#005598] text-white px-5 py-2 rounded-xl hover:bg-[#004178] transition"
              >
                Enviar mensaje
              </button>
              <a
                href={`mailto:contacto@messina.com?subject=${encodeURIComponent(
                  form.asunto || "Consulta desde la web"
                )}&body=${encodeURIComponent(`${form.nombre} - ${form.email}\n\n${form.mensaje}`)}`}
                className="border border-[#005598] text-[#005598] px-5 py-2 rounded-xl hover:bg-[#005598] hover:text-white transition"
              >
                Enviar por correo
              </a>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
