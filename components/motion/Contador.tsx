'use client';

import { useEffect, useRef, useState } from 'react';
import { prefiereMenosMovimiento } from '@/lib/scroll';

interface Props {
  valor: number;
  /** Duración del conteo, en ms. */
  duracion?: number;
  className?: string;
  sufijo?: string;
}

/**
 * Conteo ascendente al entrar en pantalla. El valor final ya está en el HTML
 * del servidor: si no hay JS o hay reduced-motion, se ve el número y listo.
 */
export default function Contador({ valor, duracion = 1100, className, sufijo = '' }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [actual, setActual] = useState(valor);
  const corrido = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || corrido.current) return;
    if (prefiereMenosMovimiento()) return;

    const io = new IntersectionObserver(
      (entradas) => {
        const e = entradas[0];
        if (!e?.isIntersecting || corrido.current) return;
        corrido.current = true;
        io.disconnect();
        const inicio = performance.now();
        const paso = (t: number) => {
          const p = Math.min(1, (t - inicio) / duracion);
          const suave = 1 - Math.pow(1 - p, 3);
          setActual(Math.round(valor * suave));
          if (p < 1) requestAnimationFrame(paso);
        };
        setActual(0);
        requestAnimationFrame(paso);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [valor, duracion]);

  return (
    <span ref={ref} className={className}>
      {actual}
      {sufijo}
    </span>
  );
}
