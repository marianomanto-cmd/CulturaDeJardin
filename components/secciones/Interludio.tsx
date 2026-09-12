'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { prefiereMenosMovimiento } from '@/lib/scroll';

/**
 * Interludio a sangre entre el manifiesto y el pensamiento jardinero.
 * El video pesa: no se descarga hasta que la franja está por entrar en
 * pantalla, así no compite con el LCP del masthead. Con reduced-motion queda
 * el póster fijo y la reproducción pasa a ser una decisión del visitante.
 */
export default function Interludio() {
  const marco = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [cargado, setCargado] = useState(false);
  const [reducido, setReducido] = useState(false);

  useEffect(() => {
    setReducido(prefiereMenosMovimiento());
  }, []);

  useEffect(() => {
    const el = marco.current;
    if (!el || cargado) return;
    const io = new IntersectionObserver(
      (entradas) => {
        if (!entradas[0]?.isIntersecting) return;
        io.disconnect();
        setCargado(true);
      },
      { rootMargin: '400px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [cargado]);

  // El autoplay silencioso puede ser rechazado por el navegador: el estado
  // real sale de los eventos del elemento, no de nuestra intención.
  useEffect(() => {
    const v = video.current;
    if (!v || !cargado || reducido) return;
    v.play().catch(() => undefined);
  }, [cargado, reducido]);

  return (
    <section
      aria-label="Pradera de iris y cosmos al atardecer"
      className="relative isolate overflow-hidden bg-noche"
    >
      <div ref={marco} className="relative h-[min(74vh,620px)] min-h-[320px] w-full">
        <div className="cj-parallax" data-parallax="0.07">
          {cargado ? (
            <video
              ref={video}
              className="h-full w-full object-cover"
              poster="/assets/video/pradera-poster.jpg"
              muted
              loop
              playsInline
              preload="none"
              autoPlay={!reducido}
              controls={false}
              tabIndex={-1}
              aria-hidden="true"
            >
              {/* Gana el primer <source> cuyo type soporta y cuyo media coincide:
                  los del móvil van primero o no se eligen nunca. */}
              <source
                src="/assets/video/pradera-sm.webm"
                type="video/webm"
                media="(max-width: 640px)"
              />
              <source
                src="/assets/video/pradera-sm.mp4"
                type="video/mp4"
                media="(max-width: 640px)"
              />
              <source src="/assets/video/pradera.webm" type="video/webm" />
              <source src="/assets/video/pradera.mp4" type="video/mp4" />
            </video>
          ) : (
            <Image
              src="/assets/video/pradera-poster.jpg"
              alt=""
              aria-hidden="true"
              fill
              sizes="100vw"
              quality={88}
              className="object-cover"
            />
          )}
        </div>

        {/* Velo: apoya las dos secciones que la franja separa y sostiene el contraste. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg,rgba(7,19,15,.42) 0%,rgba(7,19,15,.12) 34%,rgba(7,19,15,.14) 62%,rgba(7,19,15,.52) 100%)',
          }}
        />
      </div>
    </section>
  );
}
