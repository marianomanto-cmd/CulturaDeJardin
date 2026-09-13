/**
 * Un único IntersectionObserver para todos los reveals del sitio.
 * Cada elemento se desobserva al aparecer y libera su will-change a los 1400 ms:
 * costo sostenido cero una vez que la sección ya entró.
 */
let io: IntersectionObserver | null = null;
/**
 * Segundo observador, con un margen amplio, que sólo enciende el will-change
 * poco antes de que la pieza entre. Encenderlo de entrada en todos promovía
 * 65 capas de golpe durante la carga, y las que nunca llegaban a intersectar
 * se quedaban con la promesa colgada para siempre.
 */
let armador: IntersectionObserver | null = null;
let reducido = false;

const MARCA_OBSERVADO = 'data-rv-obs';

export function iniciarRevelador(sinMovimiento: boolean): void {
  reducido = sinMovimiento;
  document.documentElement.setAttribute('data-cj-vivo', '1');

  if (reducido) {
    // Con reduced-motion no hay transición: se muestra todo y se suelta el CSS.
    document.documentElement.removeAttribute('data-cj-reveal');
    document
      .querySelectorAll<HTMLElement>('[data-reveal]')
      .forEach((el) => el.setAttribute('data-rv', '1'));
    return;
  }

  if (!armador) {
    armador = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) {
            if (!el.hasAttribute('data-rv')) el.style.willChange = 'opacity, transform';
          } else if (!el.hasAttribute('data-rv')) {
            el.style.willChange = 'auto';
          }
        }
      },
      { rootMargin: '350px 0px 350px 0px' },
    );
  }
  if (!io) {
    io = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          if (!e.isIntersecting) continue;
          const el = e.target as HTMLElement;
          el.setAttribute('data-rv', '1');
          io?.unobserve(el);
          armador?.unobserve(el);
          window.setTimeout(() => {
            el.style.willChange = 'auto';
          }, 1400);
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -8% 0px' },
    );
  }
  observarNuevos();
}

/** Vuelve a barrer el DOM tras un cambio de estado que montó elementos nuevos. */
export function observarNuevos(): void {
  if (reducido) {
    document
      .querySelectorAll<HTMLElement>('[data-reveal]:not([data-rv])')
      .forEach((el) => el.setAttribute('data-rv', '1'));
    return;
  }
  if (!io) return;
  const nuevos = document.querySelectorAll<HTMLElement>(`[data-reveal]:not([${MARCA_OBSERVADO}])`);
  nuevos.forEach((el) => {
    el.setAttribute(MARCA_OBSERVADO, '1');
    armador?.observe(el);
    io?.observe(el);
  });
}

export function detenerRevelador(): void {
  io?.disconnect();
  io = null;
  armador?.disconnect();
  armador = null;
  document.documentElement.removeAttribute('data-cj-vivo');
}
