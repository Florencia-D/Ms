
import { Receipt, Scale, LayoutDashboard, Wrench, GraduationCap, ShieldCheck, Headset,} from "lucide-react";



const MainAsesoramiento = () => {
 const tiposAsesoramiento = [
    {
      icon: <Receipt className="w-10 h-10" />,
      title: "Controladores fiscales",
      text: "Selección del modelo adecuado, configuración y alta ante AFIP.",
    },
    {
      icon: <LayoutDashboard className="w-10 h-10" />,
      title: "Fisco / Impositivo",
      text: "Asesoramiento sobre normativa vigente y requisitos de facturación.",
    },
    {
      icon: <Scale className="w-10 h-10" />,
      title: "Balanzas",
      text: "Elección de balanzas comerciales e industriales según tu rubro.",
    },
    {
      icon: <Wrench className="w-10 h-10" />,
      title: "Servicio Técnico",
      text: "Revisión de tu parque de equipos y planes de mantenimiento.",
    },
  ];

  const beneficiosPostVenta = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "Capacitación",
      text: "Capacitación inicial a tu personal sobre el uso correcto de los equipos y software instalados.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Garantía",
      text: "Cobertura por fallas de fábrica y reemplazo de equipos según condiciones del fabricante.",
    },
    {
      icon: <Headset className="w-8 h-8" />,
      title: "Asistencia remota",
      text: "Soporte telefónico y remoto para resolver incidentes sin necesidad de traslado.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F4F5F7]">
      {}
      <section
        className="relative w-full h-[260px] md:h-[360px] lg:h-[420px] overflow-hidden"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/1200x/76/46/e2/7646e23464a5bc80d2fe13d7daed3988.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {}
        <div className="absolute inset-0 bg-black/30" />

        {}
        <div className="relative w-full h-full flex items-center justify-center z-10">
          <div className="text-center px-4">
            <span className="text-white/80 text-sm md:text-base tracking-[0.25em] uppercase font-semibold">
              
            </span>
            <h1 className="mt-3 text-5xl md:text-4xl lg:text-5xl font-bold text-white uppercase mb-3">
              ASESORAMIENTO Y SERVICIO POSTVENTA
            </h1>
            <br />
            <br />
            <p className="max-w-5xl mx-auto text-sm md:text-base text-white/90">
              Te acompañamos antes, durante y después de la implementación de tus equipos,
              para que tu negocio funcione siempre al máximo.
            </p>
          </div>
        </div>
      </section>

      {}
      <main className="max-w-6xl mx-auto px-4 py-10 md:py-14 space-y-10">
        {}
        <section className="bg-white rounded-2xl shadow-md px-6 md:px-10 py-8 md:py-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#005598] mb-2">
            Tipos de asesoramiento
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 max-w-3xl">
            Diseñamos un plan a medida según el rubro, la cantidad de puntos de venta y el
            volumen de operación de tu empresa.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tiposAsesoramiento.map((item) => (
              <div
                key={item.title}
                className="group bg-[#F7F8FA] rounded-2xl px-5 py-6 flex flex-col items-center text-center shadow-sm border border-transparent hover:border-[#005598]/15 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              >
                <div className="mb-3 flex items-center justify-center rounded-full bg-white shadow-sm w-16 h-16 group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-base md:text-lg font-semibold text-[#005598] mb-1">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Postventa */}
        <section className="bg-white rounded-2xl shadow-md px-6 md:px-10 py-8 md:py-10">
          <h2 className="text-xl md:text-2xl font-semibold text-[#005598] mb-2">
            Postventa por un año en controladores fiscales
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-6 max-w-3xl">
            El plan de postventa de <span className="font-semibold">Messina</span> incluye
            acompañamiento durante los primeros 12 meses luego de la instalación del equipo.
          </p>

          <div className="grid md:grid-cols-3 gap-5">
            {beneficiosPostVenta.map((item) => (
              <article
                key={item.title}
                className="bg-[#F7F8FA] rounded-2xl px-5 py-6 shadow-sm border border-gray-100 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm">
                    {item.icon}
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-[#005598]">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* CTA final */}
        <section className="bg-[#005598] text-white rounded-2xl shadow-md p-7 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-2xl md:text-3xl font-semibold mb-2">
              ¿Querés asesorarte sin compromiso?
            </h3>
            <p className="text-sm md:text-base text-white/90">
              Completá el formulario de contacto y un asesor se comunicará con vos para
              analizar tu caso y armar una propuesta a medida.
            </p>
          </div>
          <a
            href="/contacto"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-[#005598] font-semibold text-sm md:text-base shadow hover:bg-[#DF5438] hover:text-white transition-colors"
          >
            Contactar ahora
          </a>
        </section>
      </main>
    </div>
  )
}

export default MainAsesoramiento