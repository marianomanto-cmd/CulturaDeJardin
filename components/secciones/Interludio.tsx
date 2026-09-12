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
  const [enMarcha, setEnMarcha] = useState(false);
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
    v.play().catch(() => setEnMarcha(false));
  }, [cargado, reducido]);

  const alternar = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      void v.play().catch(() => undefined);
    } else {
      v.pause();
    }
  };

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
              onPlay={() => setEnMarcha(true)}
              onPause={() => setEnMarcha(false)}
            >
              <source src="/assets/video/pradera.webm" type="video/webm" />
              <source
                src="/assets/video/pradera-sm.mp4"
                type="video/mp4"
                media="(max-width: 640px)"
              />
              <source src="/assets/video/pradera.mp4" type="video/mp4" />
            </video>
          ) : (
            <Image
              src="/assets/video/pradera-poster.jpg"
              alt=""
              aria-hidden="true"
              fill
              sizes="100vw"
              quality={72}
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

        {cargado ? (
          <button
            type="button"
            onClick={alternar}
            className="cj-sobre-oscuro absolute bottom-[clamp(16px,3vw,28px)] right-[clamp(16px,3vw,28px)] flex h-11 min-w-11 items-center gap-2 rounded-full border border-[rgba(244,239,230,.34)] bg-[rgba(7,19,15,.42)] px-4 text-[10px] uppercase tracking-[.2em] text-papel backdrop-blur-sm transition-colors duration-300 hover:border-papel hover:bg-[rgba(7,19,15,.66)]"
          >
            <span aria-hidden="true">{enMarcha ? '❚❚' : '▶'}</span>
            {enMarcha ? 'Pausar' : 'Reproducir'}
            <span className="cj-solo-lectores"> el video de la pradera</span>
          </button>
        ) : null}
      </div>
    </section>
  );
}
