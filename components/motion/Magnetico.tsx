'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import clsx from 'clsx';
import { prefiereMenosMovimiento } from '@/lib/scroll';

interface Props {
  children: ReactNode;
  /** Proporción del desplazamiento del puntero que sigue la pieza. */
  fuerza?: number;
  /** Tope del desplazamiento, en px. */
  tope?: number;
  className?: string;
}

/**
 * Atracción magnética del puntero, sólo con mouse fino y sin reduced-motion.
 * En touch y teclado el elemento no se mueve: el efecto es puramente estético
 * y nunca desplaza el objetivo táctil.
 */
export default function Magnetico({ children, fuerza = 0.32, tope = 14, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefiereMenosMovimiento()) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let raf = 0;
    let destinoX = 0;
    let destinoY = 0;
    let x = 0;
    let y = 0;
    let activo = false;

    const lazo = () => {
      x += (destinoX - x) * 0.16;
      y += (destinoY - y) * 0.16;
      el.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0)`;
      if (Math.abs(destinoX - x) > 0.1 || Math.abs(destinoY - y) > 0.1) {
        raf = requestAnimationFrame(lazo);
      } else {
        raf = 0;
        if (!activo) el.style.transform = '';
      }
    };

    const arrancar = () => {
      if (!raf) raf = requestAnimationFrame(lazo);
    };

    const alMover = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      destinoX = Math.max(-tope, Math.min(tope, (e.clientX - (r.left + r.width / 2)) * fuerza));
      destinoY = Math.max(-tope, Math.min(tope, (e.clientY - (r.top + r.height / 2)) * fuerza));
      arrancar();
    };
    const alEntrar = () => {
      activo = true;
    };
    const alSalir = () => {
      activo = false;
      destinoX = 0;
      destinoY = 0;
      arrancar();
    };

    el.addEventListener('pointerenter', alEntrar);
    el.addEventListener('pointermove', alMover);
    el.addEventListener('pointerleave', alSalir);
    return () => {
      el.removeEventListener('pointerenter', alEntrar);
      el.removeEventListener('pointermove', alMover);
      el.removeEventListener('pointerleave', alSalir);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [fuerza, tope]);

  return (
    <span ref={ref} className={clsx('cj-magnetico', className)}>
      {children}
    </span>
  );
}
