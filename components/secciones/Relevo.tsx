'use client';

import { useMemo, useState } from 'react';
import Revelar from '@/components/motion/Revelar';
import TextoRevelado from '@/components/motion/TextoRevelado';
import { FICHAS, MESES } from '@/data/fichas';

/** Mes de arranque del calendario. Septiembre: el relevo de primavera. */
const MES_INICIAL = 9;

function rango(meses: number[]): string {
  const nombres = meses.map((m) => MESES[m - 1]?.largo ?? '').filter(Boolean);
  return nombres.join(', ');
}

export default function Relevo() {
  const [mes, setMes] = useState(MES_INICIAL);

  const activas = useMemo(() => FICHAS.filter((f) => f.meses.includes(mes)), [mes]);
  const filas = useMemo(
    () => [...FICHAS].sort((a, b) => (a.ciclo === b.ciclo ? 0 : a.ciclo === 'PVO' ? -1 : 1)),
    [],
  );

  const nombreMes = MESES[mes - 1]?.largo ?? '';
  const pvo = activas.filter((f) => f.ciclo === 'PVO').length;
  const oip = activas.length - pvo;

  return (
    <section
      id="relevo"
      data-sec="relevo"
      className="cj-seccion cj-seccion--noche cj-sobre-oscuro overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-[6%] -top-[8%] h-[min(46vw,520px)] w-[min(46vw,520px)] bg-papel opacity-[.035]"
        style={{
          WebkitMask: "url('/assets/cj-mark.png') no-repeat center/contain",
          mask: "url('/assets/cj-mark.png') no-repeat center/contain",
        }}
      />
      <div className="cj-wrap relative">
        <Revelar className="mb-[clamp(30px,4vw,52px)] max-w-[60ch]">
          <span className="cj-antetitulo cj-antetitulo--claro">04 · Ciclos Herbáceos</span>
          <TextoRevelado
            como="h2"
            className="cj-titulo cj-titulo--claro"
            texto="El arte del relevo"
          />
          <p className="cj-cuerpo cj-cuerpo--claro">
            Las herbáceas OIP (Otoño–Invierno–Primavera) y PVO (Primavera–Verano–Otoño) se turnan en
            escena. Movete por el calendario y mirá quién sostiene el cantero cada mes.
          </p>
        </Revelar>

        <Revelar
          className="mb-[26px] flex flex-wrap gap-1.5"
          role="group"
          aria-label="Elegir mes del calendario de relevo"
        >
          {MESES.map((m, i) => (
            <button
              key={m.largo}
              type="button"
              aria-pressed={mes === i + 1}
              onClick={() => setMes(i + 1)}
              className="cj-chip cj-chip--oscuro"
            >
              <span className="cj-solo-lectores">{m.largo}</span>
              <span aria-hidden="true">{m.corto}</span>
            </button>
          ))}
        </Revelar>

        <Revelar className="mb-[22px] flex flex-wrap items-baseline gap-4 border-b border-[rgba(244,239,230,.12)] pb-5">
          <span className="cj-script text-[clamp(28px,4vw,42px)] text-pino-claro">{nombreMes}</span>
          <span className="text-[12.5px] text-[rgba(244,239,230,.7)]" aria-live="polite">
            {activas.length} especies en escena · {pvo} PVO y {oip} OIP
          </span>
        </Revelar>

        <div className="flex flex-col gap-0.5">
          {filas.map((f) => {
            const enEscena = f.meses.includes(mes);
            const color = f.ciclo === 'PVO' ? '#157174' : '#8E2A4C';
            // Sobre noche esos dos no llegan a 4,5:1 en 9 px: el texto usa su tinte claro.
            const colorTexto =
              f.ciclo === 'PVO' ? 'var(--color-pino-claro)' : 'var(--color-oip-claro)';
            return (
              <div
                key={f.nombre}
                className="grid grid-cols-[minmax(92px,26%)_1fr] items-center gap-2 rounded-[3px] px-2.5 py-[9px] transition-[background] duration-500 ease-[var(--ease-cj)]"
                style={{ background: enEscena ? 'rgba(244,239,230,.055)' : 'transparent' }}
              >
                <div className="flex min-w-0 flex-col gap-0.5 pr-3">
                  <span className="truncate text-[13px] italic text-papel">{f.nombre}</span>
                  <span
                    className="cj-dato text-[9px] tracking-[.12em]"
                    style={{ color: colorTexto }}
                  >
                    {f.ciclo}
                  </span>
                  <span className="cj-solo-lectores">
                    Activa en {rango(f.meses)}.{' '}
                    {enEscena ? `En escena en ${nombreMes}.` : `En reposo en ${nombreMes}.`}
                  </span>
                </div>
                <div aria-hidden="true" className="grid grid-cols-12 items-center gap-[3px]">
                  {MESES.map((m, i) => {
                    const activo = f.meses.includes(i + 1);
                    const actual = i + 1 === mes;
                    return (
                      <span
                        key={m.largo}
                        className="block rounded-[2px] transition-[height,background,box-shadow] duration-[550ms] ease-[var(--ease-cj)]"
                        style={{
                          height: activo ? '15px' : '4px',
                          background: activo
                            ? actual
                              ? color
                              : `${color}B3`
                            : 'rgba(244,239,230,.1)',
                          boxShadow: activo && actual ? '0 0 0 1px rgba(244,239,230,.5)' : 'none',
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        <div aria-hidden="true" className="mt-2.5 grid grid-cols-[minmax(92px,26%)_1fr] gap-2">
          <span />
          <div className="grid grid-cols-12 gap-[3px]">
            {MESES.map((m) => (
              <span
                key={m.largo}
                className="cj-dato text-center text-[8.5px] text-[rgba(244,239,230,.35)]"
              >
                {m.inicial}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-[26px] flex flex-wrap gap-[22px]">
          <span className="flex items-center gap-2 text-[11px] text-[rgba(244,239,230,.6)]">
            <span aria-hidden="true" className="h-1.5 w-4 rounded-[2px] bg-pino" />
            PVO · Primavera–Verano–Otoño
          </span>
          <span className="flex items-center gap-2 text-[11px] text-[rgba(244,239,230,.6)]">
            <span aria-hidden="true" className="h-1.5 w-4 rounded-[2px] bg-oip" />
            OIP · Otoño–Invierno–Primavera
          </span>
        </div>
      </div>
    </section>
  );
}
