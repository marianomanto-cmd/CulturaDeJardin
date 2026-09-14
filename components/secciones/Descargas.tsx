import Revelar from '@/components/motion/Revelar';
import TextoRevelado from '@/components/motion/TextoRevelado';
import { DESCARGAS } from '@/data/contenido';

// Los PDF todavía no existen: el prototipo las dibuja como <a href="#descargas">,
// un enlace que no lleva a ninguna parte. Hasta que haya archivo son tarjetas
// informativas —no focalizables— con su estado a la vista.
export default function Descargas() {
  return (
    <section id="descargas" data-sec="descargas" className="cj-seccion cj-seccion--borgona">
      <div className="cj-wrap">
        <Revelar className="mb-[clamp(30px,4vw,48px)] max-w-[56ch]">
          <span className="cj-antetitulo cj-antetitulo--rosa">11 · Material Imprimible</span>
          <TextoRevelado
            como="h2"
            className="cj-titulo cj-titulo--claro"
            texto="El puente analógico"
          />
          <p className="cj-cuerpo cj-cuerpo--rosa">
            Los códigos QR de la bitácora física llegan acá. Hogar estructurado de los recursos, sin
            dispersión en redes efímeras.
          </p>
        </Revelar>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,250px),1fr))] gap-3">
          {DESCARGAS.map((descarga, i) => (
            // El reveal va en el envoltorio: su transición de opacidad/transform
            // queda pisada por la del hover si comparten elemento con la tarjeta.
            <Revelar key={descarga.titulo} demora={i * 70} className="flex">
              <div className="cj-tarjeta-descarga flex flex-1 flex-col gap-3 rounded-[3px] border border-[rgba(244,239,230,.18)] p-6 transition-[background-color,border-color,translate] duration-[350ms] hover:-translate-y-[3px] hover:border-borgona-claro hover:bg-[rgba(244,239,230,.07)]">
                <span className="flex items-center justify-between gap-2.5">
                  <span className="font-mono text-[10px] tracking-[.1em] text-borgona-claro">
                    {descarga.tipo}
                  </span>
                  <span aria-hidden="true" className="cj-flecha text-[15px] text-papel">
                    ↓
                  </span>
                </span>
                <h3 className="text-[16.5px] font-light leading-[1.35] text-papel">
                  {descarga.titulo}
                </h3>
                <span className="text-[12.5px] leading-[1.65] text-[rgba(244,239,230,.6)]">
                  {descarga.nota}
                </span>
                <span className="mt-auto pt-1 font-mono text-[10px] tracking-[.1em] text-[rgba(244,239,230,.55)]">
                  Disponible próximamente
                </span>
              </div>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}
