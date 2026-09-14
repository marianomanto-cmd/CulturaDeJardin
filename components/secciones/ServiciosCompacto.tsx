import Link from 'next/link';
import Revelar from '@/components/motion/Revelar';
import TextoRevelado from '@/components/motion/TextoRevelado';
import Magnetico from '@/components/motion/Magnetico';
import { SERVICIOS } from '@/data/servicios';

/**
 * Los tres servicios en la home, compactos y numerados. Va temprano a
 * propósito: quien llega tiene que entender qué se ofrece antes de meterse en
 * el compendio. El detalle completo vive en /servicios.
 */
export default function ServiciosCompacto() {
  return (
    <section
      id="servicios"
      data-sec="servicios"
      className="cj-seccion cj-seccion--noche cj-sobre-oscuro overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[8%] bottom-[-12%] h-[min(42vw,460px)] w-[min(42vw,460px)] bg-papel opacity-[.03]"
        style={{
          WebkitMask: "url('/assets/cj-mark.png') no-repeat center/contain",
          mask: "url('/assets/cj-mark.png') no-repeat center/contain",
        }}
      />
      <div className="cj-wrap relative">
        <Revelar className="mb-[clamp(34px,5vw,58px)] flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[56ch]">
            <span className="cj-antetitulo cj-antetitulo--claro">02 · Servicios</span>
            <TextoRevelado
              como="h2"
              className="cj-titulo cj-titulo--claro"
              texto="Tres formas de trabajar el jardín"
            />
            <p className="cj-cuerpo cj-cuerpo--claro">
              Del croquis a escala al calendario de relevo, y del calendario al taller donde se
              aprende a hacerlo. Cada servicio se puede tomar solo o encadenado con los otros.
            </p>
          </div>
          <Magnetico>
            <Link href="/servicios" className="cj-pildora cj-pildora--linea">
              Ver los servicios
            </Link>
          </Magnetico>
        </Revelar>

        <div className="grid gap-[clamp(14px,2vw,22px)] grid-cols-[repeat(auto-fit,minmax(min(100%,272px),1fr))]">
          {SERVICIOS.map((s, i) => (
            <Revelar key={s.slug} demora={i * 90} className="h-full">
              <Link href={`/servicios#${s.slug}`} className="cj-tarjeta-servicio">
                <span className="cj-dato text-[34px] font-extralight leading-none text-pino-claro">
                  {s.num}
                </span>
                <h3 className="m-0 mt-4 text-[19px] font-normal leading-[1.3] text-papel">
                  {s.titulo}
                </h3>
                {s.subtitulo ? (
                  <span className="cj-script mt-1 block text-[22px] text-pino-claro">
                    {s.subtitulo}
                  </span>
                ) : null}
                <p className="mt-3 text-[13.5px] leading-[1.72] text-[rgba(244,239,230,.68)]">
                  {s.resumen}
                </p>
                <span className="mt-auto flex items-center gap-2 pt-6 text-[10px] uppercase tracking-[.2em] text-pino-claro">
                  Ver detalle
                  <span aria-hidden="true" className="cj-flecha-h">
                    →
                  </span>
                </span>
              </Link>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}
