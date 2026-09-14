import { HISTORIAS } from '@/data/contenido';
import Revelar from '@/components/motion/Revelar';
import TextoRevelado from '@/components/motion/TextoRevelado';

export default function Historias() {
  return (
    <section id="historias" data-sec="historias" className="cj-seccion cj-seccion--papel">
      <div className="cj-wrap">
        <Revelar className="mb-[clamp(30px,4vw,52px)] flex flex-wrap items-baseline gap-[18px]">
          <TextoRevelado
            como="h2"
            className="cj-script cj-script--medio"
            texto="Historias de raíces"
            paso={70}
          />
          <span className="cj-antetitulo">10 · Memoria Paisajística</span>
        </Revelar>

        {/* El gap de 1px sobre el fondo borgoña translúcido dibuja las divisorias de la grilla. */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-px bg-[rgba(74,0,36,.12)]">
          {HISTORIAS.map((historia, i) => (
            // El reveal va en el envoltorio: su transición de opacidad/transform
            // pisaría la del fondo si compartieran elemento con el <article>.
            <Revelar key={historia.nombre} demora={i * 80} className="flex">
              <article className="flex flex-1 flex-col gap-[14px] bg-papel p-[clamp(22px,2.6vw,34px)] transition-[background] duration-[400ms] hover:bg-white">
                <span className="font-mono text-[10px] tracking-[.1em] text-pino">
                  {historia.anos}
                </span>
                <h3 className="m-0 text-[length:clamp(19px,2.2vw,24px)] font-light leading-[1.2] text-borgona">
                  {historia.nombre}
                </h3>
                <p className="m-0 text-[13.5px] leading-[1.75] text-tinta-suave">
                  {historia.texto}
                </p>
              </article>
            </Revelar>
          ))}
        </div>

        <Revelar
          como="p"
          className="mt-[26px] max-w-[74ch] text-[13.5px] leading-[1.8] text-tinta-suave"
        >
          <strong className="font-medium text-borgona">Florigrafía.</strong> Historia de las flores,
          su uso y significado a través del tiempo — una sección dedicada al lenguaje simbólico de
          las especies cultivadas.
        </Revelar>
      </div>
    </section>
  );
}
