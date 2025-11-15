
import { Link } from "react-router-dom";
import { Wrench, ShieldCheck, Headset, CircleDot } from "lucide-react";


const MainServicioTecnico = () => {
  return (
    <div className="bg-[#F5F7FB] min-h-screen">
      
      <section className="relative">
        <img
          src="https://i.pinimg.com/1200x/ca/3f/d7/ca3fd7fa55348777251f1cd27ea2d834.jpg" 
          alt="Servicio técnico Messina"
          className="h-[300px] md:h-[380px] w-full object-cover"
        />
       
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent" />

        <div className="absolute inset-0 flex items-center">
          <div className="max-w-6xl mx-auto px-4">
            <span className="text-white/90 text-2xl md:text-5xl tracking-[0.25em] uppercase font-semibold text-center">
              SERVICIO TÉCNICO
            </span>
            <h1 className="text-lg md:text-2xl font-semibold text-white mt-2 leading-snug">
              Atendemos tus necesidades técnicas con rapidez y garantía
            </h1>

            <p className="max-w-xl text-xs md:text-sm text-white/85 mt-3 mb-2 text-center">
              Servicio técnico especializado para impresoras fiscales, balanzas,
              controladores y otros equipos. Diagnóstico, reparación y
              mantenimiento con soporte profesional.
            </p>
          </div>
        </div>
      </section>


      <main className="max-w-6xl mx-auto px-4 pb-16 -mt-10 space-y-12 relative z-10">
        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#005598] mb-2">
            Nuestros Servicios
          </h2>
          <p className="text-sm md:text-base opacity-80 mb-6">
            Brindamos soluciones integrales para que tus equipos funcionen al 100%.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#F4F8FF] rounded-2xl p-6 md:p-7 flex flex-col items-center justify-between text-center shadow-md min-h-[210px] transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-xl">
              <div className="flex w-full items-center justify-center mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[#E4EDFF] flex items-center justify-center">
                  <span className="text-2xl text-[#005598]">🧾</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[#005598] mb-1 text-sm md:text-base">
                  Reparación de Máquinas Fiscales
                </h3>
                <p className="text-xs md:text-sm opacity-80">
                  Puesta a punto, reemplazo de piezas y pruebas de funcionamiento
                  para asegurar un rendimiento óptimo.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F4F8FF] rounded-2xl p-6 md:p-7 flex flex-col items-center justify-between text-center shadow-md min-h-[210px] transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-xl">
              <div className="flex w-full items-center justify-center mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[#E4EDFF] flex items-center justify-center">
                  <span className="text-2xl text-[#005598]">🛡️</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[#005598] mb-1 text-sm md:text-base">
                  Mantenimiento Preventivo
                </h3>
                <p className="text-xs md:text-sm opacity-80">
                  Limpieza, calibración y actualización para evitar fallas y
                  prolongar la vida útil de tus equipos.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F4F8FF] rounded-2xl p-6 md:p-7 flex flex-col items-center justify-between text-center shadow-md min-h-[210px] transition-transform duration-300 ease-out hover:-translate-y-2 hover:shadow-xl">
              <div className="flex w-full items-center justify-center mb-4">
                <div className="w-14 h-14 rounded-2xl bg-[#E4EDFF] flex items-center justify-center">
                  <span className="text-2xl text-[#005598]">🎧</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-[#005598] mb-1 text-sm md:text-base">
                  Asesoramiento Técnico
                </h3>
                <p className="text-xs md:text-sm opacity-80">
                  Soporte en sitio o remoto para configuración, uso correcto e
                  integración con otros sistemas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CÓMO FUNCIONA EL SERVICIO TÉCNICO */}
        <section>
          <h2 className="text-xl md:text-2xl font-bold text-[#005598] mb-2">
            Cómo funciona el servicio técnico
          </h2>
          <p className="text-sm md:text-base opacity-80 mb-5">
            Te acompañamos en cada etapa, desde el ingreso del equipo hasta la
            entrega final.
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Paso 1 */}
            <div className="bg-white rounded-xl shadow p-4 flex gap-3 items-start transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
              <div className="w-8 h-8 rounded-full bg-[#005598] text-white flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base">
                  Recepción del equipo
                </h3>
                <p className="text-xs md:text-sm opacity-80">
                  Registro de datos, síntomas y accesorios entregados.
                </p>
              </div>
            </div>

            {/* Paso 2 */}
            <div className="bg-white rounded-xl shadow p-4 flex gap-3 items-start transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
              <div className="w-8 h-8 rounded-full bg-[#005598] text-white flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base">
                  Diagnóstico y presupuesto
                </h3>
                <p className="text-xs md:text-sm opacity-80">
                  Evaluación técnica y cotización previa a la reparación.
                </p>
              </div>
            </div>

            {/* Paso 3 */}
            <div className="bg-white rounded-xl shadow p-4 flex gap-3 items-start transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
              <div className="w-8 h-8 rounded-full bg-[#005598] text-white flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base">
                  Reparación
                </h3>
                <p className="text-xs md:text-sm opacity-80">
                  Mano de obra especializada y repuestos originales.
                </p>
              </div>
            </div>

            {/* Paso 4 */}
            <div className="bg-white rounded-xl shadow p-4 flex gap-3 items-start transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-lg">
              <div className="w-8 h-8 rounded-full bg-[#005598] text-white flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-sm md:text-base">
                  Entrega y garantía de servicio
                </h3>
                <p className="text-xs md:text-sm opacity-80">
                  Pruebas finales, recomendaciones y garantía por escrito.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA PARA CONTACTO */}
        <section className="bg-[#005598] rounded-2xl text-white p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg md:text-xl font-semibold">
              ¿Necesitás coordinar un servicio técnico?
            </h3>
            <p className="text-sm md:text-base text-white/85 mt-1">
              Escribinos y agendamos la revisión de tu equipo.
            </p>
          </div>
          <a
            href="/contacto"
            className="inline-block bg-white text-[#005598] font-medium px-6 py-2.5 rounded-xl hover:bg-slate-100 transition"
          >
            Contactanos
          </a>
        </section>
      </main>
    </div>
  )
}

export default MainServicioTecnico