
import '../css/Carrusel.css'

import marca1 from "../assets/marcas/alo.png";
import marca2 from "../assets/marcas/arcor.png";
import marca3 from "../assets/marcas/arlequin.png";
import marca4 from "../assets/marcas/axion.png";
import marca5 from "../assets/marcas/bluebell.png";
import marca6 from "../assets/marcas/bonafide.png";
import marca7 from "../assets/marcas/carniceria.png";
import marca8 from "../assets/marcas/catalinaspark.png";
import marca9 from "../assets/marcas/amaicha.png";
import marca10 from "../assets/marcas/elgriego.png";
import marca11 from "../assets/marcas/elmilabar.png";
import marca12 from "../assets/marcas/Emi.png";
import marca13 from "../assets/marcas/fontana.png";
import marca14 from "../assets/marcas/freddo.png";
import marca15 from "../assets/marcas/friar.png";
import marca16 from "../assets/marcas/grido.png";
import marca17 from "../assets/marcas/hilton.png";
import marca18 from "../assets/marcas/jrb.png";
import marca19 from "../assets/marcas/labotica.png";
import marca20 from "../assets/marcas/laparrilla.png";
import marca21 from "../assets/marcas/launion.png";
import marca22 from "../assets/marcas/mostaza.png";
import marca23 from "../assets/marcas/mrchurro.png";
import marca24 from "../assets/marcas/pollo.png";
import marca25 from "../assets/marcas/postino.png";
import marca26 from "../assets/marcas/remetal.png";
import marca27 from "../assets/marcas/sanatoriomodelo.png";
import marca28 from "../assets/marcas/sanbernardo.png";
import marca29 from "../assets/marcas/sanjavier.png";
import marca30 from "../assets/marcas/santiagokohn.png";
import marca31 from "../assets/marcas/tatito.png";
import marca32 from "../assets/marcas/tello.png";
import marca33 from "../assets/marcas/tiendademoda.png";
import marca34 from "../assets/marcas/tropollo.png";
import marca35 from "../assets/marcas/yoheladeria.png";


const marcas = [
    marca1, marca2, marca3, marca4, marca5, marca6,
    marca7, marca8, marca9, marca10, marca11, marca12,
    marca13, marca14, marca15, marca16, marca17, marca18,
    marca19, marca20, marca21, marca22, marca23, marca24,
    marca25, marca26, marca27, marca28, marca29, marca30,
    marca31, marca32, marca33, marca34, marca35
];


const Carrusel = () => {
    return (
        <div className="marquee">
            <div className="marquee_header">MARCAS QUE CONFIAN EN NOSOTROS </div>

            <div className="marquee__inner">
                {/* 2️⃣ Primer grupo de imágenes */}
                <div className="marquee__group">
                    {marcas.map((img, i) => (
                        <img key={i} src={img} alt={`Marca ${i + 1}`} />
                    ))}
                </div>

                {/* 3️⃣ Segundo grupo (duplicado para crear efecto infinito) */}
                <div className="marquee__group">
                    {marcas.map((img, i) => (
                        <img key={`dup-${i}`} src={img} alt={`Marca ${i + 1}`} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Carrusel;
