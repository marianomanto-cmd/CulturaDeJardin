import ImagenRevelada from '@/components/motion/ImagenRevelada';
import Revelar from '@/components/motion/Revelar';
import TextoRevelado from '@/components/motion/TextoRevelado';
import { LAMINAS } from '@/data/contenido';

// La cinta se duplica porque el keyframe cjMarquee corre hasta -50%: la
// segunda mitad ocupa el hueco que deja la primera y el bucle no salta.
const CINTA = LAMINAS.concat(LAMINAS);

const MASCARA = 'linear-gradient(90deg,transparent,#000 4%,#000 96%,transparent)';

export default function Laminas() {
  return (
    <section
      id="laminas"
      data-sec="laminas"
      className="cj-seccion cj-seccion--noche cj-seccion--ancha"
    >
      <div className="cj-wrap px-[clamp(20px,5vw,64px)]">
        <Revelar className="mb-[clamp(30px,4vw,48px)] max-w-[58ch]">
          <span className="cj-antetitulo cj-antetitulo--claro">07 · Galería de Láminas</span>
          <TextoRevelado
            como="h2"
            className="cj-titulo cj-titulo--claro"
            texto="Anatomía dibujada"
          />
          <p className="cj-cuerpo cj-cuerpo--claro">
            Disección de flores, morfología foliar, sistemas radiculares y fructificación. Láminas
            de ilustración naturalista clásica.
          </p>
        </Revelar>
      </div>

      {/* Foco propio: es lo único que activa el :focus-within que pausa la cinta
          (WCAG 2.2.2) y lo que vuelve alcanzable el scroll horizontal que el
          modo reduced-motion abre sobre este mismo contenedor. */}
      <div
        className="cj-marquesina-wrap relative overflow-hidden"
        style={{ WebkitMaskImage: MASCARA, maskImage: MASCARA }}
        tabIndex={0}
        role="group"
        aria-label="Galería de Láminas"
      >
        <div className="cj-marquesina pb-2" style={{ gap: 'clamp(14px,2vw,26px)' }}>
          {CINTA.map((lamina, i) => (
            <figure
              key={`${lamina.nombre}-${i}`}
              aria-hidden={i >= LAMINAS.length ? true : undefined}
              className="m-0 flex w-[min(80vw,380px)] flex-none flex-col gap-3.5"
            >
              <ImagenRevelada
                src={lamina.img}
                alt={lamina.alt}
                proporcion="3/4"
                sizes="(max-width:475px) 80vw, 380px"
                zoomHover
                style={{ background: '#0C1F19' }}
              />
              <figcaption>
                <span className="block text-[16.5px] italic text-papel">{lamina.nombre}</span>
                <span className="mt-[6px] block font-mono text-[10px] tracking-[.08em] text-pino-claro">
                  {lamina.detalle}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      <div className="cj-wrap px-[clamp(20px,5vw,64px)] pt-[clamp(28px,4vw,44px)]">
        <Revelar
          como="p"
          className="m-0 max-w-[80ch] text-[12.5px] leading-[2] text-[rgba(244,239,230,.5)]"
        >
          <span className="text-pino-claro">{'Compendio en preparación · '}</span>Salvia greggii ·
          Achillea millefolium · Agapanthus praecox · Iris germanica · Papaver rhoeas · Echinacea
          purpurea · Hydrangea macrophylla · Dietes grandiflora · Farfugium japonicum · Paspalum ·
          Lavandula angustifolia · Coreopsis lanceolata
        </Revelar>
      </div>
    </section>
  );
}
