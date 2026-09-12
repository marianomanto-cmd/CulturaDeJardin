'use client';

import Image from 'next/image';
import { useState } from 'react';
import clsx from 'clsx';
import Revelar from '@/components/motion/Revelar';
import TextoRevelado from '@/components/motion/TextoRevelado';
import { ESTRATOS } from '@/data/contenido';

const LUZ = [
  { rotulo: 'Pleno sol', dato: '6 h+ de sol directo' },
  { rotulo: 'Media sombra', dato: '3–5 h, sol de mañana' },
  { rotulo: 'Sombra profunda', dato: 'Luz indirecta todo el día' },
];

export default function Canteros() {
  const [activo, setActivo] = useState(1);

  return (
    <section id="canteros" data-sec="canteros" className="cj-seccion cj-seccion--blanco">
      <div className="cj-wrap">
        <Revelar className="mb-[clamp(30px,4vw,52px)] max-w-[58ch]">
          <span className="cj-antetitulo">05 · Diseño de Canteros</span>
          <TextoRevelado como="h2" className="cj-titulo" texto="Tres estratos, una sola escena" />
          <p className="cj-cuerpo">
            Escala adulta, repetición de matrices vegetales y armonización de texturas finas, medias
            y gruesas. Tocá cada estrato para ver su función.
          </p>
        </Revelar>

        <div className="grid items-start gap-[clamp(24px,3vw,48px)] grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))]">
          <div className="flex flex-col gap-2.5">
            {ESTRATOS.map((e, i) => {
              const seleccionado = activo === i;
              return (
                <button
                  key={e.titulo}
                  type="button"
                  aria-pressed={seleccionado}
                  onClick={() => setActivo(i)}
                  className={clsx(
                    'block w-full rounded-[3px] border p-5 text-left transition-[background,border-color,color] duration-500',
                    seleccionado
                      ? 'border-borgona bg-borgona text-papel'
                      : 'border-[rgba(74,0,36,.16)] bg-transparent text-tinta hover:border-pino',
                  )}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className="cj-dato text-[10px]"
                      style={{ color: seleccionado ? '#F4EFE6' : '#157174' }}
                    >
                      {`0${i + 1}`}
                    </span>
                    <span className="text-base font-normal">{e.titulo}</span>
                  </span>
                  <span className="mt-2 block text-left text-[13px] leading-[1.68] opacity-90">
                    {e.texto}
                  </span>
                  <span className="cj-dato mt-2.5 block text-[10px] opacity-80">{e.especies}</span>
                </button>
              );
            })}
          </div>

          <Revelar demora={100} className="flex flex-col gap-3.5">
            <div className="cj-cortina aspect-[4/3]" data-reveal="cortina">
              <div className="cj-marco bg-noche">
                {/* Las tres fotos se montan juntas y sólo cambia la opacidad:
                  el cruce es instantáneo y no hay recarga al alternar. */}
                {ESTRATOS.map((e, i) => (
                  <Image
                    key={e.img}
                    src={e.img}
                    alt={e.alt}
                    fill
                    sizes="(max-width:1040px) 100vw, 620px"
                    quality={92}
                    loading="lazy"
                    className="cj-foto"
                    style={{ opacity: activo === i ? 1 : 0 }}
                    aria-hidden={activo !== i}
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,140px),1fr))] gap-2.5">
              {LUZ.map((l) => (
                <div key={l.rotulo} className="rounded-[3px] bg-papel p-3.5">
                  <span className="block text-[9px] uppercase tracking-[.2em] text-gris-dato">
                    {l.rotulo}
                  </span>
                  <span className="mt-[5px] block text-[13px] text-tinta">{l.dato}</span>
                </div>
              ))}
            </div>
          </Revelar>
        </div>
      </div>
    </section>
  );
}
