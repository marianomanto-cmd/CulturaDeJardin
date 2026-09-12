'use client';

import {
  createContext,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

interface Estado {
  abierta: number | null;
  alternar: (i: number) => void;
}

const Contexto = createContext<Estado>({ abierta: null, alternar: () => {} });

/**
 * Isla cliente del acordeón. El contenido de cada respuesta lo renderiza el
 * servidor y llega acá como children: lo interactivo es sólo la apertura.
 */
export function Acordeon({ children }: { children: ReactNode }) {
  const [abierta, setAbierta] = useState<number | null>(null);
  const alternar = (i: number) => setAbierta((v) => (v === i ? null : i));
  return (
    <Contexto.Provider value={{ abierta, alternar }}>
      <div className="flex flex-col">
        {children}
        <div className="border-t border-[rgba(74,0,36,.12)]" />
      </div>
    </Contexto.Provider>
  );
}

export function ItemAcordeon({
  indice,
  grupo,
  pregunta,
  children,
}: {
  indice: number;
  grupo: string;
  pregunta: string;
  children: ReactNode;
}) {
  const { abierta, alternar } = useContext(Contexto);
  const abierto = abierta === indice;
  const interior = useRef<HTMLDivElement>(null);
  const [alto, setAlto] = useState(0);
  const id = useId();

  // La altura se mide en lugar de toparse con un max-height fijo: una
  // respuesta larga en pantalla angosta puede pasar los 460 px del prototipo.
  useLayoutEffect(() => {
    const el = interior.current;
    if (!el) return;
    const medir = () => setAlto(el.scrollHeight);
    medir();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const alRedimensionar = () => {
      if (interior.current) setAlto(interior.current.scrollHeight);
    };
    window.addEventListener('resize', alRedimensionar, { passive: true });
    return () => window.removeEventListener('resize', alRedimensionar);
  }, []);

  return (
    <div className="border-t border-[rgba(74,0,36,.12)]">
      <h3 className="m-0">
        <button
          type="button"
          onClick={() => alternar(indice)}
          aria-expanded={abierto}
          aria-controls={`${id}-panel`}
          id={`${id}-boton`}
          className="flex w-full items-start justify-between gap-5 border-0 bg-transparent py-[22px] text-left"
        >
          <span className="flex min-w-0 flex-col gap-1.5">
            <span className="cj-dato text-[9px] tracking-[.16em] text-pino">{grupo}</span>
            <span className="text-[clamp(15px,1.7vw,18px)] font-light leading-[1.45] text-borgona">
              {pregunta}
            </span>
          </span>
          <span
            aria-hidden="true"
            className="flex-none text-[19px] font-extralight leading-none text-pino transition-transform duration-[550ms] ease-[var(--ease-cj)]"
            style={{ transform: abierto ? 'rotate(135deg)' : 'rotate(0deg)' }}
          >
            +
          </span>
        </button>
      </h3>
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-boton`}
        inert={!abierto}
        className="overflow-hidden transition-[height,opacity] duration-[600ms] ease-[var(--ease-cj)]"
        style={{ height: abierto ? `${alto}px` : 0, opacity: abierto ? 1 : 0 }}
      >
        <div ref={interior}>{children}</div>
      </div>
    </div>
  );
}
