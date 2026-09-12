import type Lenis from 'lenis';

/**
 * Singleton del scroll interpolado. El telón y el menú necesitan frenarlo y
 * soltarlo desde componentes que no son dueños de la instancia, así que vive
 * a nivel de módulo en vez de en un contexto de React.
 */
let lenis: Lenis | null = null;
let bloqueos = 0;

export function registrarLenis(instancia: Lenis | null): void {
  lenis = instancia;
  if (lenis && bloqueos > 0) lenis.stop();
}

export function obtenerLenis(): Lenis | null {
  return lenis;
}

/** Bloquea el scroll. Cuenta referencias: el telón y el menú pueden solaparse. */
export function bloquearScroll(): void {
  bloqueos += 1;
  if (bloqueos === 1) {
    lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  }
}

export function liberarScroll(): void {
  bloqueos = Math.max(0, bloqueos - 1);
  if (bloqueos === 0) {
    lenis?.start();
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
  }
}

export function hayBloqueo(): boolean {
  return bloqueos > 0;
}

export function irA(destino: string): void {
  const el = document.querySelector(destino);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el as HTMLElement, { offset: 0, duration: 1.25 });
  } else {
    el.scrollIntoView({ behavior: prefiereMenosMovimiento() ? 'auto' : 'smooth' });
  }
}

export function prefiereMenosMovimiento(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
