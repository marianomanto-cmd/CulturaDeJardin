'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { observarNuevos } from '@/lib/revelar';
import { irA, obtenerLenis } from '@/lib/scroll';

/**
 * El layout no se desmonta al cambiar de página, así que el motor de
 * movimiento no se entera solo: hay que volver a observar los reveals de la
 * página nueva, llevar el scroll arriba y, si la URL trae ancla, viajar hasta
 * ella —porque el salto nativo del navegador y Lenis se pisan.
 */
export default function RutaMotion() {
  const ruta = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    const lenis = obtenerLenis();

    if (hash && document.querySelector(hash)) {
      // Un frame de margen: el destino tiene que existir y estar medido.
      const t = window.setTimeout(() => irA(hash), 80);
      observarNuevos();
      return () => window.clearTimeout(t);
    }

    lenis?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    observarNuevos();
    return undefined;
  }, [ruta]);

  return null;
}
