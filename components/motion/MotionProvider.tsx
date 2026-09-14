'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { BREAKPOINT } from '@/lib/constantes';
import { iniciarRevelador, detenerRevelador } from '@/lib/revelar';
import { anclaInterna, irAConFoco, prefiereMenosMovimiento, registrarLenis } from '@/lib/scroll';

interface Capa {
  el: HTMLElement;
  fuerza: number;
  centro: number;
  alto: number;
}

/**
 * Motor de movimiento del sitio. Monta una sola vez y concentra:
 *   · Lenis (scroll interpolado, lerp 0.085) y su rAF
 *   · el pintado por frame: barra de progreso, parallax y estado del header
 *   · el IntersectionObserver compartido de los reveals
 * Todo el pintado ocurre en un único requestAnimationFrame: un solo layout
 * read por frame y escrituras sólo cuando el valor cambió.
 */
export default function MotionProvider() {
  useEffect(() => {
    const reducido = prefiereMenosMovimiento();
    const raiz = document.documentElement;
    let vivo = true;
    let lenis: Lenis | null = null;

    iniciarRevelador(reducido);

    // ---- Lenis ------------------------------------------------------------
    if (!reducido) {
      lenis = new Lenis({
        lerp: 0.085,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
        smoothWheel: true,
        syncTouch: false,
      });
      registrarLenis(lenis);
    }

    // ---- Capas de parallax ------------------------------------------------
    let capas: Capa[] = [];
    const medirCapas = () => {
      if (reducido) return;
      capas = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]')).map((el) => {
        const r = el.getBoundingClientRect();
        const top = r.top + window.scrollY;
        return {
          el,
          fuerza: parseFloat(el.dataset.parallax || '0.12') || 0.12,
          centro: top + r.height / 2,
          alto: r.height,
        };
      });
    };

    const barra = document.getElementById('cjProg');
    const nav = document.getElementById('cjNav');
    const heroImg = document.getElementById('cjHeroImg');

    let ultimaY = -1;
    let ultimoSolido: boolean | null = null;
    let ultimoOculto: boolean | null = null;
    let ultimaSeccion: string | null = null;
    let yPrevia = 0;
    let heroEnRango = true;

    const pintar = () => {
      const y = window.scrollY || raiz.scrollTop || 0;
      const vh = window.innerHeight || 1;
      if (y === ultimaY) return;
      const baja = y > yPrevia;
      yPrevia = y;
      ultimaY = y;

      // Barra de progreso
      if (barra) {
        const h = Math.max(1, raiz.scrollHeight - vh);
        barra.style.transform = `scaleX(${Math.min(1, y / h)})`;
      }

      // Parallax del masthead: la foto se mueve a 0,24 del scroll.
      if (heroImg) {
        const enRango = y < vh * 1.4;
        if (enRango) heroImg.style.transform = `translate3d(0,${(y * 0.24).toFixed(2)}px,0)`;
        if (enRango !== heroEnRango) {
          heroEnRango = enRango;
          heroImg.style.willChange = enRango ? 'transform' : 'auto';
        }
      }

      // Parallax genérico de las fotos de sección.
      if (capas.length) {
        for (const c of capas) {
          const delta = y + vh / 2 - c.centro;
          if (Math.abs(delta) > vh + c.alto) continue;
          c.el.style.transform = `translate3d(0,${(delta * c.fuerza).toFixed(2)}px,0)`;
        }
      }

      // Header: papel + blur pasado el 78 % del masthead.
      const solido = y > vh * 0.78;
      if (solido !== ultimoSolido) {
        ultimoSolido = solido;
        nav?.setAttribute('data-solido', solido ? '1' : '0');
      }

      // Header: se retira al bajar y vuelve al subir, una vez fuera del masthead.
      const oculto = solido && baja && y > vh * 1.15 && !raiz.hasAttribute('data-cj-menu');
      if (oculto !== ultimoOculto) {
        ultimoOculto = oculto;
        nav?.setAttribute('data-oculto', oculto ? '1' : '0');
      }

      // Sección activa: la que cruza el 42 % del viewport.
      let actual = '';
      const secciones = document.querySelectorAll<HTMLElement>('[data-sec]');
      for (const s of secciones) {
        const r = s.getBoundingClientRect();
        if (r.top <= vh * 0.42 && r.bottom > vh * 0.42) actual = s.dataset.sec || '';
      }
      if (actual !== ultimaSeccion) {
        ultimaSeccion = actual;
        document.querySelectorAll<HTMLElement>('[data-nl]').forEach((a) => {
          a.setAttribute('data-activo', a.dataset.nl === actual ? '1' : '0');
        });
      }
    };

    // ---- Anclas internas: el viaje lo hace Lenis, no el salto nativo -----
    const alClic = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }
      const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href) return;
      const hash = anclaInterna(href);
      if (!hash) return;
      e.preventDefault();
      irAConFoco(hash);
    };
    document.addEventListener('click', alClic);

    // ---- Marquesina: la duración sale del ancho real recorrido ------------
    // Así la velocidad es constante sin importar cuántas láminas haya.
    let roMarquesina: ResizeObserver | null = null;
    const cintas = Array.from(document.querySelectorAll<HTMLElement>('.cj-marquesina'));
    const medirCintas = () => {
      for (const cinta of cintas) {
        const mitad = cinta.scrollWidth / 2;
        if (mitad > 0) cinta.style.animationDuration = `${Math.max(28, mitad / 42)}s`;
      }
    };
    // Fuera de pantalla la cinta no aporta nada y sigue componiendo una capa
    // enorme en cada frame.
    let ioCinta: IntersectionObserver | null = null;
    if (cintas.length && typeof IntersectionObserver !== 'undefined') {
      ioCinta = new IntersectionObserver(
        (entradas) => {
          for (const e of entradas) {
            const el = e.target as HTMLElement;
            el.style.animationPlayState = e.isIntersecting ? '' : 'paused';
            el.style.willChange = e.isIntersecting ? 'transform' : 'auto';
          }
        },
        { rootMargin: '200px 0px' },
      );
      cintas.forEach((c) => ioCinta?.observe(c));
    }
    if (cintas.length) {
      medirCintas();
      window.setTimeout(medirCintas, 900);
      if (typeof ResizeObserver !== 'undefined') {
        roMarquesina = new ResizeObserver(medirCintas);
        cintas.forEach((c) => roMarquesina?.observe(c));
      }
    }

    const loop = (t: number) => {
      if (!vivo) return;
      lenis?.raf(t);
      pintar();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    // Sin Lenis (reduced-motion) el scroll nativo necesita su propio disparo.
    let pendiente = 0;
    const alScroll = () => {
      if (pendiente) return;
      pendiente = requestAnimationFrame(() => {
        pendiente = 0;
        pintar();
      });
    };
    if (reducido) window.addEventListener('scroll', alScroll, { passive: true });

    // ---- Medidas dependientes del tamaño ---------------------------------
    let anchoPrevio = window.innerWidth;
    const alRedimensionar = () => {
      medirCapas();
      ultimaY = -1;
      pintar();
      if (Math.abs(window.innerWidth - anchoPrevio) > 0) {
        anchoPrevio = window.innerWidth;
        raiz.setAttribute('data-cj-bp', window.innerWidth < BREAKPOINT ? 'movil' : 'desk');
      }
    };
    raiz.setAttribute('data-cj-bp', window.innerWidth < BREAKPOINT ? 'movil' : 'desk');
    window.addEventListener('resize', alRedimensionar, { passive: true });

    medirCapas();
    // Las fotos lazy cambian el alto del documento: se remide al terminar la carga.
    window.addEventListener('load', alRedimensionar, { once: true });
    const remedida = window.setTimeout(medirCapas, 1200);
    pintar();

    return () => {
      vivo = false;
      window.clearTimeout(remedida);
      if (pendiente) cancelAnimationFrame(pendiente);
      document.removeEventListener('click', alClic);
      window.removeEventListener('resize', alRedimensionar);
      window.removeEventListener('scroll', alScroll);
      roMarquesina?.disconnect();
      ioCinta?.disconnect();
      detenerRevelador();
      registrarLenis(null);
      lenis?.destroy();
    };
  }, []);

  return null;
}
