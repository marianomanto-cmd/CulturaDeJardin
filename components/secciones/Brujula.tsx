'use client';

import { useRef, useState } from 'react';
import clsx from 'clsx';
import Revelar from '@/components/motion/Revelar';
import TextoRevelado from '@/components/motion/TextoRevelado';
import { ORIENTACIONES } from '@/data/contenido';

/** Posición de cada punto cardinal sobre el dial. */
const POSICION = [
  'top-[6%] left-1/2 -ml-[23px]',
  'right-[6%] top-1/2 -mt-[23px]',
  'bottom-[6%] left-1/2 -ml-[23px]',
  'left-[6%] top-1/2 -mt-[23px]',
];

export default function Brujula() {
  const [activa, setActiva] = useState(0);
  const botones = useRef<(HTMLButtonElement | null)[]>([]);
  const o = ORIENTACIONES[activa] ?? ORIENTACIONES[0]!;

  // Patrón de pestañas: las flechas recorren el dial sin salir del grupo.
  const alTeclear = (e: React.KeyboardEvent) => {
    const paso =
      e.key === 'ArrowRight' || e.key === 'ArrowDown'
        ? 1
        : e.key === 'ArrowLeft' || e.key === 'ArrowUp'
          ? -1
          : 0;
    if (!paso) return;
    e.preventDefault();
    const siguiente = (activa + paso + ORIENTACIONES.length) % ORIENTACIONES.length;
    setActiva(siguiente);
    botones.current[siguiente]?.focus();
  };

  return (
    <section id="brujula" data-sec="brujula" className="cj-seccion cj-seccion--papel">
      <div className="cj-wrap">
        <Revelar className="mb-[clamp(30px,4vw,52px)] max-w-[58ch]">
          <span className="cj-antetitulo">06 · La Brújula del Jardinero</span>
          <TextoRevelado como="h2" className="cj-titulo" texto="Leer la insolación del terreno" />
          <p className="cj-cuerpo">
            Comportamiento de las orientaciones en el hemisferio sur. El sol naciente del Este no
            equivale a la alta radiación vespertina del Oeste.
          </p>
        </Revelar>

        <div className="grid items-center gap-[clamp(24px,3vw,48px)] grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))]">
          <Revelar className="flex justify-center">
            <div
              role="tablist"
              aria-label="Orientación del terreno"
              aria-orientation="horizontal"
              onKeyDown={alTeclear}
              className="relative grid aspect-square w-[min(78vw,320px)] place-items-center rounded-full border border-[rgba(74,0,36,.16)]"
            >
              <div
                aria-hidden="true"
                className="absolute inset-[14%] rounded-full border border-dashed border-[rgba(74,0,36,.14)]"
              />
              {ORIENTACIONES.map((x, i) => (
                <button
                  key={x.letra}
                  ref={(el) => {
                    botones.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`brujula-tab-${x.letra}`}
                  aria-selected={activa === i}
                  aria-controls="brujula-panel"
                  tabIndex={activa === i ? 0 : -1}
                  onClick={() => setActiva(i)}
                  className={clsx(
                    'absolute h-[46px] w-[46px] rounded-full border text-[13px] tracking-[.06em] transition-[background,border-color,color,transform] duration-500',
                    POSICION[i],
                    activa === i
                      ? 'scale-110 border-pino bg-pino text-papel'
                      : 'scale-100 border-[rgba(74,0,36,.2)] bg-papel text-borgona',
                  )}
                >
                  <span className="cj-solo-lectores">{x.nombre}</span>
                  <span aria-hidden="true">{x.letra}</span>
                </button>
              ))}
              <div className="pointer-events-none text-center">
                <span className="cj-script block text-[34px]">{o.nombre}</span>
                <span className="mt-1 block text-[9px] uppercase tracking-[.24em] text-pino">
                  Hemisferio Sur
                </span>
              </div>
            </div>
          </Revelar>

          <Revelar
            demora={110}
            className="flex flex-col gap-[18px]"
            id="brujula-panel"
            role="tabpanel"
            aria-labelledby={`brujula-tab-${o.letra}`}
            tabIndex={0}
          >
            <h3 className="m-0 text-[clamp(20px,2.4vw,26px)] font-light text-borgona">
              {o.titulo}
            </h3>
            <p className="m-0 text-[15px] leading-[1.78] text-tinta-suave">{o.texto}</p>
            <div className="border-l-2 border-pino bg-white px-5 py-[18px]">
              <span className="mb-[7px] block text-[9px] uppercase tracking-[.22em] text-gris-dato">
                Test de sombra
              </span>
              <p className="m-0 text-[13.5px] leading-[1.7] text-tinta">{o.test}</p>
            </div>
          </Revelar>
        </div>
      </div>
    </section>
  );
}
