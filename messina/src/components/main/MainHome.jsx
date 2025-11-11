import "../../css/MainHome.css";
import { useNavigate } from "react-router-dom";
import Carrusel from "../Carrusel";

import {
  Receipt,
  Scale,
  LayoutDashboard,
  Wrench,
  GraduationCap,
  ShieldCheck,
  Headset,
} from "lucide-react";

const MainHome = () => {
  const navigate = useNavigate();

  // Categorías con links externos
  const categorias = [
    { nombre: "Calculadoras", img: "https://i.pinimg.com/736x/24/3b/77/243b774adc6ec2a098a58b2d8438b8df.jpg", link: "https://www.example.com/calculadoras" },
    { nombre: "Controladores Fiscales", img: "https://i.pinimg.com/736x/cf/c3/0f/cfc30f0d63ce03264983732f9f4dc60a.jpg", link: "https://i.pinimg.com/736x/cf/c3/0f/cfc30f0d63ce03264983732f9f4dc60a.jpg" },
    { nombre: "Gavetas y Cajas Fuertes", img: "https://i.pinimg.com/736x/db/dc/0b/dbdc0b3eb41c5221772660477556e0a1.jpg", link: "https://www.example.com/cajas" },
    { nombre: "Scanner y PC Industrial", img: "https://i.pinimg.com/736x/39/01/da/3901dac4ebb42de06cc4b8cb8a7680c9.jpg", link: "https://www.example.com/scanner" },
    { nombre: "Control y Gestión", img: "https://i.pinimg.com/736x/98/d0/ab/98d0abd2eb6af221d547ce70446c140b.jpg", link: "https://i.pinimg.com/736x/98/d0/ab/98d0abd2eb6af221d547ce70446c140b.jpg" },
    { nombre: "Balanzas", img: "https://i.pinimg.com/1200x/bc/08/5f/bc085fa4c12217d857bd67e49c337911.jpg", link: "https://i.pinimg.com/1200x/bc/08/5f/bc085fa4c12217d857bd67e49c337911.jpg" },
    { nombre: "Comanderas", img: "https://i.pinimg.com/736x/a5/5c/9c/a55c9cee75c4e2763b1a5cb71debbd4d.jpg", link: "https://i.pinimg.com/736x/a5/5c/9c/a55c9cee75c4e2763b1a5cb71debbd4d.jpg" },
    { nombre: "Insumos", img: "https://i.pinimg.com/736x/e6/ed/41/e6ed41e9ce17fe14b1d44bd831e98fb1.jpg", link: "https://www.example.com/insumos" },
  ];



  const beneficiosPostVenta = [
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: "CONFIANZA",
      text: "Capacitación inicial a tu personal sobre el uso correcto de los equipos y software instaladosCada cliente que nos elige deposita en nosotros su confianza, y respondemos con transparencia, seguridad y un servicio que prioriza siempre su tranquilidad..",
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "EXPERIENCIA",
      text: "Nuestra amplia trayectoria en el rubro nos permite ofrecer soluciones efectivas, adaptadas a las necesidades de cada negocio.",
    },
    {
      icon: <Headset className="w-8 h-8" />,
      title: "PROFESIONALISMO",
      text: " Trabajamos con compromiso y excelencia en cada detalle, brindando un servicio serio y responsable que refleja la calidad y profesionalismo de nuestro equipo.",
    },
  ];

  return (
    <>
      <div className="min-h-screen bg-[#F4F5F7]">

        <section
          className="relative w-full h-[260px] md:h-[360px] lg:h-[420px] overflow-hidden"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/736x/97/6b/7c/976b7c59a6e8b5ca835e185dffb0df87.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >

          <div className="absolute inset-0 bg-black/30" />


            <div className="relative w-full h-full flex items-center justify-center z-10">
              <div className="text-center px-4">
              <span className="text-white/80 text-sm md:text-base tracking-[0.25em] uppercase font-semibold">

              </span>
              <h1 className="mt-3 text-4xl md:text-3xl lg:text-4xl font-semibold text-white uppercase mb-3 leading-snug">
                CONFIANZA Y EXPERIENCIA AL SERVICIO DE TU NEGOCIO
              </h1>
              <br />
              <br />
              <button className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-[#005598] font-semibold text-sm md:text-base shadow hover:bg-[#DF5438] hover:text-white transition-colors" onClick={() => navigate("/quienesSomos")}>
                Conocenos
              </button>
            </div>
          </div>
        </section>


          {/* VALORES */}
        <section className=" max-w-6xl mx-auto px-2 py-10 md:py-8 space-y-5">
        
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



        <main className="max-w-6xl mx-auto px-4 py-10 md:py-5 space-y-10">
          <section className="bg-white rounded-2xl shadow-md px-6 md:px-10 py-8 md:py-10">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#005598] mb-2">
              PRODUCTOS DESTACADOS
            </h2>
            <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 max-w-3xl">
              Diseñamos un plan a medida según el rubro, la cantidad de puntos de venta y el
              volumen de operación de tu empresa.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"> </div>

          </section>

          {/* categorias */}
          <section className="bg-white rounded-2xl shadow-md px-6 md:px-10 py-8 md:py-5">
            <h2 className="text-2xl md:text-3xl font-semibold text-[#005598] mb-2">
              CATEGORIAS
            </h2>
            <div className="categorias">
              {categorias.map((cat, index) => (
                <a
                  key={index}
                  href={cat.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="categoria"
                >
                  <img src={cat.img} alt={cat.nombre} />
                  <div className="overlay">
                    <h3>{cat.nombre}</h3>
                  </div>
                </a>
              ))}
            </div>


          </section>
          <Carrusel />
          {/* CTA final */}
          <section className="bg-[#005598] text-white rounded-2xl shadow-md p-7 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="max-w-xl">
              <h3 className="text-2xl md:text-3xl font-semibold mb-2">
                ¿Querés los mejores productos para tu negocio?
              </h3>
              <p className="text-sm md:text-base text-white/90">
                Visita nuestra pagina de productos, donde encontraras todo lo que necesitas para tu negocio.
              </p>
            </div>
            <a
              href="/productos"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-[#005598] font-semibold text-sm md:text-base shadow hover:bg-[#DF5438] hover:text-white transition-colors"
            >
              Ver productos
            </a>
          </section>
        </main>
      </div>










     

    </>


  );
};

export default MainHome;
