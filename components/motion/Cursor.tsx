'use client';

import { useEffect, useState } from 'react';
import { prefiereMenosMovimiento } from '@/lib/scroll';

/**
 * Anillo que sigue al puntero con lerp. No oculta el cursor del sistema: el
 * nativo sigue marcando la posición exacta y este anillo sólo agrega peso
 * visual. Se monta únicamente con puntero fino y sin reduced-motion.
 */
export default function Cursor() {
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    if (prefiereMenosMovimiento()) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    setActivo(true);
  }, []);

  useEffect(() => {
    if (!activo) return;
    const anillo = document.getElementById('cjCursor');
    if (!anillo) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let destinoX = x;
    let destinoY = y;
    let visible = false;
    let raf = 0;

    const lazo = () => {
      x += (destinoX - x) * 0.17;
      y += (destinoY - y) * 0.17;
      anillo.style.transform = `translate3d(${x.toFixed(1)}px,${y.toFixed(1)}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(lazo);
    };
    raf = requestAnimationFrame(lazo);

    const alMover = (e: PointerEvent) => {
      destinoX = e.clientX;
      destinoY = e.clientY;
      if (!visible) {
        visible = true;
        anillo.setAttribute('data-visible', '1');
      }
      const objetivo = (e.target as HTMLElement | null)?.closest(
        'a, button, input, [data-cursor="activo"]',
      );
      anillo.setAttribute('data-sobre', objetivo ? '1' : '0');
    };
    const alSalir = () => {
      visible = false;
      anillo.setAttribute('data-visible', '0');
    };

    window.addEventListener('pointermove', alMover, { passive: true });
    document.addEventListener('pointerleave', alSalir);
    return () => {
      window.removeEventListener('pointermove', alMover);
      document.removeEventListener('pointerleave', alSalir);
      cancelAnimationFrame(raf);
    };
  }, [activo]);

  if (!activo) return null;
  return <div id="cjCursor" aria-hidden="true" data-visible="0" data-sobre="0" />;
}
