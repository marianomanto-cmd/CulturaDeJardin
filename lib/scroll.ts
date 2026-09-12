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

/**
 * Navegación interna completa: viaje, hash y foco.
 *
 * Mover el foco es lo que convierte un ancla en una navegación de verdad. Sin
 * esto el «Saltar al contenido» no saltea nada —el siguiente Tab vuelve al
 * principio— porque preventDefault() le quita al navegador el punto de partida
 * de la navegación secuencial. Las secciones no son focalizables por sí solas,
 * así que se les presta un tabindex="-1" al vuelo.
 */
export function irAConFoco(href: string): void {
  const el = document.querySelector<HTMLElement>(href);
  if (!el) return;
  irA(href);
  history.replaceState(null, '', href);
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1');
  // preventScroll: el viaje lo maneja Lenis; el foco no debe saltar por su cuenta.
  el.focus({ preventScroll: true });
}

export function prefiereMenosMovimiento(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
