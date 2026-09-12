'use client';

import { useMemo, useState } from 'react';
import clsx from 'clsx';
import Revelar from '@/components/motion/Revelar';
import TextoRevelado from '@/components/motion/TextoRevelado';
import { CICLOS, FICHAS, LUCES, type Ficha } from '@/data/fichas';

function Tarjeta({ f, i }: { f: Ficha; i: number }) {
  const esPVO = f.ciclo === 'PVO';
  return (
    <article
      className="flex flex-col gap-[13px] rounded-[3px] border border-[rgba(74,0,36,.09)] bg-white p-5 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-[3px] hover:border-pino hover:shadow-[0_12px_28px_rgba(74,0,36,.07)]"
      style={{
        animation: 'cjUp .5s cubic-bezier(.2,.7,.2,1) both',
        animationDelay: `${Math.min(i, 11) * 35}ms`,
      }}
    >
      <div className="flex items-start justify-between gap-2.5">
        <span className="cj-dato text-[9.5px] text-gris-dato">{f.familia}</span>
        <span
          className={clsx(
            'cj-dato flex-none rounded-[3px] px-2 py-1 text-[9px] tracking-[.1em]',
            esPVO ? 'bg-[rgba(21,113,116,.12)] text-pino' : 'bg-[rgba(142,42,76,.12)] text-oip',
          )}
        >
          {f.ciclo}
        </span>
      </div>
      <h3 className="m-0 text-[17.5px] font-normal italic leading-[1.25] text-borgona">
        {f.nombre}
      </h3>
      <span className="text-[12.5px] text-tinta-suave">{f.comun}</span>
      <span aria-hidden="true" className="h-px bg-[rgba(74,0,36,.09)]" />
      <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-[11.5px]">
        <dt className="tracking-[.05em] text-gris-dato">Luz</dt>
        <dd className="m-0 text-tinta">{f.luz}</dd>
        <dt className="tracking-[.05em] text-gris-dato">Agua</dt>
        <dd className="m-0 text-tinta">{f.agua}</dd>
        <dt className="tracking-[.05em] text-gris-dato">Escala</dt>
        <dd className="m-0 text-tinta">{f.escala}</dd>
        <dt className="tracking-[.05em] text-gris-dato">Estrato</dt>
        <dd className="m-0 text-tinta">{f.estrato}</dd>
      </dl>
    </article>
  );
}

export default function Compendio() {
  const [luz, setLuz] = useState('Todas');
  const [ciclo, setCiclo] = useState('Todos');

  const fichas = useMemo(
    () =>
      FICHAS.filter(
        (f) => (luz === 'Todas' || f.luz === luz) && (ciclo === 'Todos' || f.ciclo === ciclo),
      ),
    [luz, ciclo],
  );

  return (
    <section id="compendio" data-sec="compendio" className="cj-seccion cj-seccion--papel">
      <div className="cj-wrap">
        <Revelar className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[56ch]">
            <span className="cj-antetitulo">03 · Compendio Taxonómico</span>
            <TextoRevelado como="h2" className="cj-titulo" texto="Fichas botánicas binomiales" />
            <p className="cj-cuerpo">
              Organizadas por familia, requerimiento lumínico, régimen hídrico y comportamiento
              fenológico. Filtrá por lo que tenés en el terreno.
            </p>
          </div>
          <div className="cj-dato tracking-[.08em] text-pino" aria-live="polite">
            {fichas.length} / {FICHAS.length} fichas
          </div>
        </Revelar>

        <Revelar className="mb-7 flex flex-col gap-3">
          <div
            role="group"
            aria-label="Filtrar por requerimiento lumínico"
            className="flex flex-wrap items-center gap-2.5"
          >
            <span className="cj-etiqueta-filtro">Luz</span>
            {LUCES.map((l) => (
              <button
                key={l}
                type="button"
                aria-pressed={luz === l}
                onClick={() => setLuz(l)}
                className="cj-chip"
              >
                {l}
              </button>
            ))}
          </div>
          <div
            role="group"
            aria-label="Filtrar por ciclo"
            className="flex flex-wrap items-center gap-2.5"
          >
            <span className="cj-etiqueta-filtro">Ciclo</span>
            {CICLOS.map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={ciclo === c}
                onClick={() => setCiclo(c)}
                className="cj-chip"
              >
                {c}
              </button>
            ))}
          </div>
        </Revelar>

        {/* La key fuerza el remontaje: cada filtrado vuelve a escalonar la entrada. */}
        <div
          key={`${luz}|${ciclo}`}
          className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,250px),1fr))] gap-3.5"
        >
          {fichas.map((f, i) => (
            <Tarjeta key={f.nombre} f={f} i={i} />
          ))}
        </div>

        {fichas.length === 0 ? (
          <p className="mt-7 text-sm text-gris-dato">
            Ninguna ficha cumple esa combinación. Probá con otro régimen hídrico.
          </p>
        ) : null}
      </div>
    </section>
  );
}
