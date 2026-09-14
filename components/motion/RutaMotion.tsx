'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { observarNuevos } from '@/lib/revelar';
import { irA, obtenerLenis } from '@/lib/scroll';

/** Tolerancia antes de dar por buena la llegada al ancla, en px. */
const MARGEN = 8;

/**
 * El layout no se desmonta al cambiar de página, así que el motor de
 * movimiento no se entera solo: hay que volver a observar los reveals de la
 * página nueva, llevar el scroll arriba y, si la URL trae ancla, viajar hasta
 * ella —porque el salto nativo del navegador y Lenis se pisan.
 *
 * El viaje se reintenta un par de veces: al aterrizar todavía faltan cargar
 * las fotos diferidas de arriba, y cada una que entra corre el destino varios
 * cientos de píxeles hacia abajo. Cualquier gesto del visitante cancela los
 * reintentos: mandar, manda él.
 */
export default function RutaMotion() {
  const ruta = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    observarNuevos();

    if (!hash || !document.querySelector(hash)) {
      obtenerLenis()?.scrollTo(0, { immediate: true });
      window.scrollTo(0, 0);
      return undefined;
    }

    const alinear = () => {
      const el = document.querySelector(hash);
      if (el && Math.abs(el.getBoundingClientRect().top) > MARGEN) irA(hash);
    };

    const temporizadores = [
      window.setTimeout(alinear, 80),
      window.setTimeout(alinear, 650),
      window.setTimeout(alinear, 1500),
    ];
    const cancelar = () => temporizadores.forEach(window.clearTimeout);
    window.addEventListener('wheel', cancelar, { once: true, passive: true });
    window.addEventListener('touchstart', cancelar, { once: true, passive: true });
    window.addEventListener('keydown', cancelar, { once: true });

    return () => {
      cancelar();
      window.removeEventListener('wheel', cancelar);
      window.removeEventListener('touchstart', cancelar);
      window.removeEventListener('keydown', cancelar);
    };
  }, [ruta]);

  return null;
}
