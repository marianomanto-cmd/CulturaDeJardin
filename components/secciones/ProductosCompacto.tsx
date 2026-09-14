import Link from 'next/link';
import Revelar from '@/components/motion/Revelar';
import TextoRevelado from '@/components/motion/TextoRevelado';
import Magnetico from '@/components/motion/Magnetico';
import ImagenRevelada from '@/components/motion/ImagenRevelada';

const PIEZAS = [
  {
    rotulo: 'LIBRO-OBJETO',
    titulo: 'Agenda Bitácora',
    texto: 'Planificación atemporal y registro fenológico de doce meses, con QR a la plataforma.',
  },
  {
    rotulo: 'COLECCIÓN',
    titulo: 'Láminas botánicas',
    texto: 'Grabado y acuarela científica, con disección anatómica de cada especie.',
  },
  {
    rotulo: 'DESCARGABLES',
    titulo: 'Planillas y guías',
    texto: 'Matrices de seguimiento, fichas binomiales y fascículos técnicos para imprimir.',
  },
];

/** Teaser de la tienda en la home. El catálogo completo vive en /productos. */
export default function ProductosCompacto() {
  return (
    <section id="productos" data-sec="productos" className="cj-seccion cj-seccion--blanco">
      <div className="cj-wrap">
        <div className="grid items-center gap-[clamp(28px,4vw,56px)] grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))]">
          <Revelar className="max-w-[54ch]">
            <span className="cj-antetitulo">09 · Productos</span>
            <TextoRevelado como="h2" className="cj-titulo" texto="Lo que queda en la mesa" />
            <p className="cj-cuerpo">
              Piezas físicas de colección y recursos digitales que se completan a mano. La bitácora
              y las láminas son el puente analógico del proyecto: lo que sigue estando cuando la
              pantalla se apaga.
            </p>
            <ul className="mt-7 flex list-none flex-col gap-4 p-0">
              {PIEZAS.map((p) => (
                <li key={p.titulo} className="border-t border-[rgba(74,0,36,.12)] pt-4">
                  <span className="cj-dato block text-[9px] tracking-[.18em] text-pino">
                    {p.rotulo}
                  </span>
                  <span className="mt-1.5 block text-[16.5px] font-normal text-borgona">
                    {p.titulo}
                  </span>
                  <span className="mt-1 block text-[13.5px] leading-[1.7] text-tinta-suave">
                    {p.texto}
                  </span>
                </li>
              ))}
            </ul>
            <Magnetico>
              <Link href="/productos" className="cj-pildora cj-pildora--solida mt-8">
                Ver el catálogo
              </Link>
            </Magnetico>
          </Revelar>

          <Revelar demora={120}>
            <ImagenRevelada
              src="/assets/img/jardin-seco-santolina.webp"
              alt="Láminas botánicas, acuarelas y cuaderno de campo sobre una mesa de trabajo"
              proporcion="4/5"
              sizes="(max-width:830px) 100vw, (max-width:1040px) 50vw, 640px"
              parallax={0.08}
              zoomHover
            />
          </Revelar>
        </div>
      </div>
    </section>
  );
}
