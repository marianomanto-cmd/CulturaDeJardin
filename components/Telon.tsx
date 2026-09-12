'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { CLAVE_TELON, TELON } from '@/lib/constantes';
import { bloquearScroll, liberarScroll } from '@/lib/scroll';

/**
 * Telón de entrada. El monograma no se redibuja: es el PNG del manual
 * entintado con dos máscaras compuestas —el alfa del logo y un gradiente del
 * doble de alto que barre de abajo hacia arriba—. mask-composite: intersect
 * muestra sólo la intersección, así el trazo aparece sin deformar una curva.
 *
 * Quién decide si corre: el script bloqueante del layout, antes del primer
 * pintado. Acá sólo se ejecuta la secuencia. El orden retirar → coser → abrir
 * es un requisito: si la costura se adelanta, corta el monograma al medio.
 */
export default function Telon() {
  const [corriendo, setCorriendo] = useState(false);
  const temporizadores = useRef<number[]>([]);
  const bloqueado = useRef(false);
  const cerrado = useRef(false);

  const terminar = useCallback(() => {
    if (cerrado.current) return;
    cerrado.current = true;
    temporizadores.current.forEach(clearTimeout);
    temporizadores.current = [];

    const raiz = document.documentElement;
    raiz.setAttribute('data-cj-curtain', 'abriendo');
    if (bloqueado.current) {
      bloqueado.current = false;
      liberarScroll();
    }
    window.setTimeout(() => {
      raiz.removeAttribute('data-cj-curtain');
      setCorriendo(false);
    }, 1400);
  }, []);

  useEffect(() => {
    const raiz = document.documentElement;
    if (raiz.getAttribute('data-cj-curtain') !== 'corriendo') return;

    try {
      sessionStorage.setItem(CLAVE_TELON, '1');
    } catch {
      /* modo privado: el telón vuelve a correr, no es un error */
    }

    setCorriendo(true);
    bloquearScroll();
    bloqueado.current = true;

    const at = (ms: number, fn: () => void) => {
      temporizadores.current.push(window.setTimeout(fn, ms));
    };
    const $ = (id: string) => document.getElementById(id);

    // 1 · el logo se retira ANTES de que aparezca la costura
    at(TELON.retiroLogo, () => {
      const intro = $('cjIntro');
      if (intro) {
        intro.style.opacity = '0';
        intro.style.transform = 'translate3d(0,-18px,0)';
      }
    });
    // 2 · costura de luz sobre el telón ya vacío
    at(TELON.costura, () => {
      const seam = $('cjSeam');
      if (seam) seam.style.transform = 'scaleX(1)';
    });
    // 3 · el telón se abre desde esa costura
    at(TELON.apertura, () => {
      const top = $('cjTop');
      const bot = $('cjBot');
      const seam = $('cjSeam');
      if (top) top.style.transform = 'translate3d(0,-100%,0)';
      if (bot) bot.style.transform = 'translate3d(0,100%,0)';
      if (seam) {
        seam.style.transition = 'opacity .6s ease, transform 1.2s var(--ease-cj)';
        seam.style.opacity = '0';
      }
      document.documentElement.setAttribute('data-cj-curtain', 'abriendo');
      if (bloqueado.current) {
        bloqueado.current = false;
        liberarScroll();
      }
    });
    at(TELON.desmontaje, () => {
      cerrado.current = true;
      document.documentElement.removeAttribute('data-cj-curtain');
      setCorriendo(false);
    });

    const alTeclear = (e: KeyboardEvent) => {
      if (e.key === 'Escape') terminar();
    };
    window.addEventListener('keydown', alTeclear);

    const pendientes = temporizadores.current;
    return () => {
      window.removeEventListener('keydown', alTeclear);
      pendientes.forEach(clearTimeout);
      if (bloqueado.current) {
        bloqueado.current = false;
        liberarScroll();
      }
    };
  }, [terminar]);

  return (
    <div id="cjCurtain" className="fixed inset-0 z-[120]" aria-hidden={!corriendo}>
      <div
        id="cjTop"
        className="absolute inset-x-0 top-0 h-[50.3%] bg-noche"
        style={{ transition: 'transform 1.2s cubic-bezier(.76,0,.24,1)' }}
      />
      <div
        id="cjBot"
        className="absolute inset-x-0 bottom-0 h-[50.3%] bg-noche"
        style={{ transition: 'transform 1.2s cubic-bezier(.76,0,.24,1)' }}
      />
      <div
        id="cjSeam"
        className="absolute left-[6vw] right-[6vw] top-1/2 h-px origin-center scale-x-0"
        style={{
          background: 'linear-gradient(90deg,transparent,#157174 20%,#157174 80%,transparent)',
          transition: 'transform .9s cubic-bezier(.65,0,.35,1)',
        }}
      />
      <div
        id="cjIntro"
        className="absolute inset-0 flex flex-col items-center justify-center gap-[clamp(16px,2.6vw,30px)]"
        style={{ transition: 'opacity .6s ease, transform .9s cubic-bezier(.4,0,.2,1)' }}
      >
        <div className="relative w-[clamp(168px,29vw,286px)] aspect-[1/0.84]">
          <div
            id="cjMark"
            className="absolute inset-0 bg-papel"
            style={{
              WebkitMaskImage:
                "url('/assets/cj-mark.png'),linear-gradient(to top,#000 0 47%,rgba(0,0,0,0) 53%)",
              maskImage:
                "url('/assets/cj-mark.png'),linear-gradient(to top,#000 0 47%,rgba(0,0,0,0) 53%)",
              WebkitMaskSize: 'contain,100% 200%',
              maskSize: 'contain,100% 200%',
              WebkitMaskRepeat: 'no-repeat,no-repeat',
              maskRepeat: 'no-repeat,no-repeat',
              WebkitMaskPosition: 'center center,0% 0%',
              maskPosition: 'center center,0% 0%',
              WebkitMaskComposite: 'source-in',
              maskComposite: 'intersect',
              animation: 'cjDraw 2.1s cubic-bezier(.6,.05,.3,1) .35s both',
            }}
          />
          <div
            id="cjNib"
            className="absolute inset-x-[4%] top-0 h-0.5"
            style={{
              background:
                'linear-gradient(90deg,transparent,rgba(95,169,160,.95) 30%,rgba(95,169,160,.95) 70%,transparent)',
              animation: 'cjNib 2.1s cubic-bezier(.6,.05,.3,1) .35s both',
            }}
          />
        </div>
        <div
          className="flex flex-col items-center gap-[9px]"
          style={{ animation: 'cjFade 1.1s ease 2.05s both' }}
        >
          <div className="text-[clamp(21px,4.4vw,38px)] font-light tracking-[.17em] text-papel">
            Cultura de Jardín
          </div>
          <div className="cj-script text-[clamp(19px,3vw,27px)] text-pino-claro">
            Un Estilo de Vida
          </div>
        </div>
      </div>

      {corriendo ? (
        <button
          type="button"
          onClick={terminar}
          className="absolute right-[clamp(16px,3vw,32px)] top-[clamp(16px,3vw,32px)] min-h-11 rounded-full border border-[rgba(244,239,230,.3)] px-5 text-[10px] uppercase tracking-[.2em] text-papel transition-colors duration-300 hover:border-papel hover:bg-[rgba(244,239,230,.08)]"
        >
          Saltar intro
        </button>
      ) : null}
    </div>
  );
}
