import ImagenRevelada from '@/components/motion/ImagenRevelada';
import Revelar from '@/components/motion/Revelar';
import TextoRevelado from '@/components/motion/TextoRevelado';

interface Pilar {
  img: string;
  alt: string;
  rotulo: string;
  titulo: string;
  texto: string;
}

const PILARES: readonly Pilar[] = [
  {
    img: '/assets/img/pradera-stipa-coreopsis.webp',
    alt: 'Stipa, coreopsis y salvia junto a una escalinata de piedra',
    rotulo: 'TÉCNICA + ARTE',
    titulo: 'Taxonomía y lámina en la misma página',
    texto:
      'Nomenclatura binomial precisa, requerimientos y manejo, junto a ilustración naturalista clásica y reflexión paisajística.',
  },
  {
    img: '/assets/img/pradera-salvias.webp',
    alt: 'Cantero de vereda con alstroemerias, arbustos y gramíneas',
    rotulo: 'RELEVO ECOLÓGICO',
    titulo: 'Canteros continuos, sin claros',
    texto:
      'Herbáceas OIP y PVO sincronizadas para lograr canteros estratificados y biológicamente equilibrados todo el año.',
  },
  {
    img: '/assets/img/jardin-seco-santolina.webp',
    alt: 'Láminas botánicas, acuarelas y cuaderno de campo sobre una mesa de trabajo',
    rotulo: 'MEMORIA VIVA',
    titulo: 'Registro fenológico sistemático',
    texto:
      'Metodología de registro, rotulación de semillas y seguimiento para documentar la evolución del jardín propio.',
  },
];

export default function Pensamiento() {
  return (
    <section id="pensamiento" data-sec="pensamiento" className="cj-seccion cj-seccion--blanco">
      <div className="cj-wrap">
        <Revelar className="mb-[clamp(34px,5vw,62px)] max-w-[62ch]">
          <span className="cj-antetitulo">02 · Pensamiento Jardinero</span>
          <TextoRevelado
            como="h2"
            className="cj-titulo"
            texto="Ni consejos genéricos ni catálogo de vivero"
          />
          <p className="cj-cuerpo">
            El pensamiento jardinero concibe el jardín como refugio cotidiano, ejercicio de
            presencia, observación paciente y diálogo con el medio natural, superando la visión
            utilitaria de la jardinería como mero mantenimiento estético.
          </p>
        </Revelar>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,278px),1fr))] gap-[clamp(18px,2.4vw,32px)]">
          {PILARES.map((pilar, i) => (
            <Revelar
              key={pilar.rotulo}
              como="article"
              demora={i * 90}
              className="flex flex-col gap-4"
            >
              <ImagenRevelada
                src={pilar.img}
                alt={pilar.alt}
                proporcion="3/2"
                sizes="(max-width:640px) 100vw, (max-width:980px) 45vw, (max-width:1468px) 29vw, 426px"
              />
              <span className="text-[9.5px] tracking-[.26em] text-pino">{pilar.rotulo}</span>
              <h3 className="text-[19px] font-normal text-borgona">{pilar.titulo}</h3>
              <p className="text-[14px] leading-[1.72] text-tinta-suave">{pilar.texto}</p>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}
