'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { NAV_DESKTOP, NAV_PAGINAS, SECCIONES } from '@/data/contenido';
import { HREF_WA } from '@/data/sitio';
import { anclaInterna, bloquearScroll, irAConFoco, liberarScroll } from '@/lib/scroll';

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
  const ruta = usePathname();

  /** Al cerrar hay que reubicar el foco: si el panel se vuelve inert con el
   *  foco adentro, se cae al <body> y el teclado pierde su lugar. */
  const cerrar = useCallback((devolverFoco = true) => {
    setAbierto(false);
    if (devolverFoco && panel.current?.contains(document.activeElement)) {
      burger.current?.focus();
    }
  }, []);

  // Cambiar de página cierra el menú: si no, queda tapando la página nueva.
  useEffect(() => {
    setAbierto(false);
  }, [ruta]);

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
      // La hamburguesa entra en el ciclo aunque viva fuera del panel: es el
      // único control que cierra, y dejarla afuera la vuelve inalcanzable.
      const focos = [
        ...(burger.current ? [burger.current] : []),
        ...panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      ];
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
      if (!mq.matches) return;
      if (panel.current?.contains(document.activeElement)) burger.current?.focus();
      setAbierto(false);
    };
    mq.addEventListener('change', alCambiar);
    return () => mq.removeEventListener('change', alCambiar);
  }, []);

  /**
   * Un mismo clic hace dos cosas distintas según dónde estemos: si el destino
   * es un ancla de esta misma página la resuelve Lenis, y si no, deja que
   * Next navegue.
   */
  const alClic = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const hash = anclaInterna(href);
    if (!hash) {
      cerrar(false);
      return;
    }
    e.preventDefault();
    cerrar(false);
    window.setTimeout(() => irAConFoco(hash), 60);
  };

  const activa = (href: string) => href !== '/' && ruta === href;

  return (
    <>
      <div id="cjProg" aria-hidden="true" className="cj-progreso" />

      <header
        id="cjNav"
        data-solido={ruta === '/' ? '0' : '1'}
        data-oculto="0"
        className="fixed inset-x-0 top-0 z-[95] flex items-center justify-between gap-3.5 border-b border-transparent px-[clamp(14px,3.4vw,44px)] py-[clamp(11px,1.5vw,18px)]"
      >
        <Link href="/" onClick={(e) => alClic(e, '/#cjHero')} className="flex-none">
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
        </Link>

        <nav
          id="cjLinks"
          aria-label="Principal"
          className="cj-solo-desk min-w-0 flex-nowrap items-center gap-[clamp(11px,1.5vw,22px)]"
        >
          {NAV_DESKTOP.map((s) => (
            <Link
              key={s.href}
              href={s.href}
              data-nl={s.href.startsWith('/#') ? s.href.slice(2) : undefined}
              data-activo={activa(s.href) ? '1' : '0'}
              aria-current={activa(s.href) ? 'page' : undefined}
              onClick={(e) => alClic(e, s.href)}
              className="cj-nav-link"
            >
              {s.label}
            </Link>
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
        <nav aria-label="Principal" className="flex w-full max-w-[420px] flex-col gap-5">
          <div className="flex flex-col gap-0.5">
            <span className="cj-etiqueta-filtro mb-1 text-pino-claro">El estudio</span>
            {NAV_PAGINAS.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={(e) => alClic(e, s.href)}
                aria-current={activa(s.href) ? 'page' : undefined}
                className="cj-menu-item"
              >
                <span className="cj-dato flex-none text-[10px] text-pino-claro">{s.num}</span>
                <span>{s.label}</span>
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="cj-etiqueta-filtro mb-1 text-pino-claro">El compendio</span>
            {SECCIONES.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                onClick={(e) => alClic(e, s.href)}
                className="cj-menu-item cj-menu-item--chico"
              >
                <span className="cj-dato flex-none text-[10px] text-pino-claro">{s.num}</span>
                <span>{s.label}</span>
              </Link>
            ))}
          </div>
        </nav>
        <a
          href={HREF_WA}
          target="_blank"
          rel="noopener noreferrer"
          className="cj-pildora cj-pildora--solida mt-7"
        >
          Sumarme por WhatsApp
        </a>
      </div>
    </>
  );
}
