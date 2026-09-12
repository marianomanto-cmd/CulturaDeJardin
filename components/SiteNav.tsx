'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { NAV_DESKTOP, SECCIONES } from '@/data/contenido';
import { HREF_WA } from '@/data/sitio';
import { bloquearScroll, irA, liberarScroll } from '@/lib/scroll';

/**
 * Navegación. El único quiebre estructural del sitio —1040 px— lo resuelve
 * CSS, no JavaScript: las dos variantes se renderizan siempre y la media
 * query decide cuál se ve. Así el HTML del servidor sirve para cualquier
 * ancho y no hay desajuste de hidratación.
 */
export default function SiteNav() {
  const [abierto, setAbierto] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const cerrar = useCallback(() => setAbierto(false), []);

  useEffect(() => {
    const raiz = document.documentElement;
    if (abierto) {
      raiz.setAttribute('data-cj-menu', '1');
      bloquearScroll();
      panel.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    }
    return () => {
      if (abierto) {
        raiz.removeAttribute('data-cj-menu');
        liberarScroll();
      }
    };
  }, [abierto]);

  useEffect(() => {
    if (!abierto) return;
    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        cerrar();
        burger.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !panel.current) return;
      // Trampa de foco: con el menú abierto el tabulador no puede salirse.
      const focos = panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      const primero = focos[0];
      const ultimo = focos[focos.length - 1];
      if (!primero || !ultimo) return;
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };
    window.addEventListener('keydown', alTeclear);
    return () => window.removeEventListener('keydown', alTeclear);
  }, [abierto, cerrar]);

  // El panel móvil deja de tener sentido si la pantalla crece más allá del quiebre.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1040px)');
    const alCambiar = () => {
      if (mq.matches) setAbierto(false);
    };
    mq.addEventListener('change', alCambiar);
    return () => mq.removeEventListener('change', alCambiar);
  }, []);

  const irYCerrar = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    cerrar();
    // Esperamos a que el scroll se libere antes de pedirle a Lenis el viaje.
    window.setTimeout(() => irA(href), 60);
  };

  return (
    <>
      <div id="cjProg" aria-hidden="true" className="cj-progreso" />

      <header
        id="cjNav"
        data-solido="0"
        data-oculto="0"
        className="fixed inset-x-0 top-0 z-[95] flex items-center justify-between gap-3.5 border-b border-transparent px-[clamp(14px,3.4vw,44px)] py-[clamp(11px,1.5vw,18px)]"
      >
        <a href="#cjHero" onClick={(e) => irYCerrar(e, '#cjHero')} className="flex-none">
          <span className="cj-solo-lectores">Cultura de Jardín — volver al inicio</span>
          <span
            id="cjNavMark"
            aria-hidden="true"
            className="block h-[34px] w-10"
            style={{
              WebkitMask: "url('/assets/cj-mark.png') no-repeat center/contain",
              mask: "url('/assets/cj-mark.png') no-repeat center/contain",
            }}
          />
        </a>

        <nav
          id="cjLinks"
          aria-label="Secciones"
          className="cj-solo-desk items-center gap-[clamp(11px,1.5vw,22px)] min-w-0 flex-nowrap"
        >
          {NAV_DESKTOP.map((s) => (
            <a
              key={s.href}
              href={s.href}
              data-nl={s.href.slice(1)}
              data-activo="0"
              onClick={(e) => irYCerrar(e, s.href)}
              className="cj-nav-link"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <button
          ref={burger}
          type="button"
          onClick={() => setAbierto((v) => !v)}
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={abierto}
          aria-controls="cjMenu"
          className="cj-solo-movil h-[46px] w-[46px] flex-none flex-col items-center justify-center gap-[5px] border-0 bg-transparent p-0"
        >
          <span className={clsx('cj-barra', abierto && 'cj-barra--a')} />
          <span className={clsx('cj-barra', abierto && 'cj-barra--b')} />
        </button>
      </header>

      <div
        id="cjMenu"
        ref={panel}
        data-abierto={abierto ? '1' : '0'}
        inert={!abierto}
        className="cj-menu"
      >
        <nav aria-label="Secciones" className="flex w-full max-w-[420px] flex-col gap-0.5">
          {SECCIONES.map((s) => (
            <a
              key={s.href}
              href={s.href}
              onClick={(e) => irYCerrar(e, s.href)}
              className="flex items-baseline gap-3.5 border-b border-[rgba(244,239,230,.12)] px-1 py-[15px] text-[21px] font-extralight tracking-[.01em] text-papel"
            >
              <span className="cj-dato flex-none text-[10px] text-pino-claro">{s.num}</span>
              <span>{s.label}</span>
            </a>
          ))}
        </nav>
        <a
          href={HREF_WA}
          target="_blank"
          rel="noopener noreferrer"
          className="cj-pildora cj-pildora--solida mt-[30px]"
        >
          Sumarme por WhatsApp
        </a>
      </div>
    </>
  );
}
