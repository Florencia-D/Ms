import React from "react";
import "../../css/MainQuienesSomos.css";
import { Link } from 'react-router-dom';
import iconObjetivos from "../../assets/icon-objetivos.png"; // cambia por tu icono real
import iconValores from "../../assets/icon-valores.png";


const MainQuienesSomos = () => {
  return (
    <main className="main-quienes-somos">

      <section className="QS">
        <div className="QS-content">
          <h1>Más de 60 años de trayectoria brindando soluciones tecnológicas</h1>
          <h3>Desde 1960 acompañamos a empresas y comercios con innovación, compromiso y confianza</h3>
          <Link to="/productos">
            <button className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white text-[#005598] font-semibold text-sm md:text-base shadow hover:bg-[#DF5438] hover:text-white transition-colors">
                Ver productos
              </button>
          </Link>
        </div>
      </section>


      <section className="historia-presente">
        <div className="bloque">
          <h2 className="titulo-azul">Nuestra historia</h2>
          <p>
            Todo inició en el año 1960, cuando Jose Antonio Messina con 21 años
            ingresó en Olivetti Argentina como técnico de máquinas de escribir.
            Durante 16 años hizo carrera llegando a ocupar el puesto de
            supervisor nacional de servicio técnico.
          </p>
          <p>
            En 1976 Olivetti Argentina declina su posición en Tucumán apoyando y
            acompañando a Messina en la apertura de su propio taller con
            garantía oficial, quien ese mismo año da inicio a su carrera como
            técnico independiente en la región.
          </p>
        </div>

        <div className="bloque">
          <h2 className="titulo-azul">Presente</h2>
          <p>
            Con los años Messina, máquinas y servicios, ha logrado llegar a
            varias provincias del noroeste argentino siendo un referente en el
            rubro de los Controladores Fiscales y el equipamiento comercial. Sin
            embargo, hoy más vigentes que nunca, buscamos expandir nuestras
            fronteras regionales y digitales.
          </p>
        </div>
      </section>




      





      {/* Sección Objetivos y Valores */}
        <h2 className="titulo-naranja">OBJETIVOS Y VALORES</h2>

      <section className="objetivos-valores">
      
        <div className="bloque-objetivo">
          <img src={iconObjetivos} alt="Icono objetivos" />
          <ul>
            <li>Brindar soluciones rápidas y efectivas.</li>
            <li>Un asesoramiento personalizado y completo.</li>
            <li>
              Ampliar nuestros horizontes para conectar con más personas y
              empresas en todo el país.
            </li>
            <li>
              Poner la calidad, por sobre todo, tanto en nuestros productos como
              servicios.
            </li>
            <li>
              Siempre instruir al cliente para una acertada toma de decisiones.
            </li>
            <li>
              Ofrecer productos que faciliten y perfeccionen el trabajo de
              nuestros clientes.
            </li>
          </ul>
        </div>

        <div className="bloque-objetivo">
          <img src={iconValores} alt="Icono valores" />
          <ul>
            <li>Compromiso</li>
            <li>Honestidad</li>
            <li>Respeto</li>
            <li>Responsabilidad</li>
            <li>Diligencia</li>
          </ul>
        </div>
      </section>


    </main>
  );
};

export default MainQuienesSomos;
