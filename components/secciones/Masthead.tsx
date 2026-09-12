import Image from 'next/image';
import TextoRevelado from '@/components/motion/TextoRevelado';
import Magnetico from '@/components/motion/Magnetico';

/**
 * Masthead. Se monta detrás del telón desde el primer frame: la foto es el
 * LCP y no espera a que la secuencia termine.
 */
export default function Masthead() {
  return (
    <section
      id="cjHero"
      data-sec="cjHero"
      aria-label="Cultura de Jardín — portada"
      className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-noche"
    >
      <div
        id="cjHeroImg"
        className="absolute inset-x-0 -top-[9%] -bottom-[9%] will-change-transform"
      >
        <Image
          src="/assets/img/hero-muro-iris.webp"
          alt="Pradera de narcisos naturalizados junto a un arroyo de montaña"
          fill
          priority
          fetchPriority="high"
          sizes="100vw"
          quality={92}
          className="object-cover opacity-90"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg,rgba(7,19,15,.8) 0%,rgba(7,19,15,.5) 26%,rgba(7,19,15,.66) 52%,rgba(7,19,15,.84) 76%,rgba(7,19,15,.96) 100%)',
        }}
      />

      <div
        id="cjHeroTxt"
        className="cj-wrap relative px-[clamp(20px,5vw,64px)] pb-[clamp(86px,8vh,112px)]"
      >
        <div className="mb-[26px] flex items-center gap-3.5">
          <span aria-hidden="true" className="h-px w-11 bg-papel" />
          <span className="text-[9.5px] uppercase tracking-[.3em] text-papel">
            Bitácora · Láminas · Jardín
          </span>
        </div>

        <TextoRevelado
          como="h1"
          paso={62}
          className="m-0 max-w-[16ch] text-[clamp(34px,7.4vw,88px)] font-extralight leading-[1.02] tracking-[-.02em] text-papel"
          partes={[{ texto: 'El jardín como' }, { texto: 'acto de presencia', enfasis: true }]}
        />

        <p className="mt-[26px] max-w-[52ch] text-[clamp(14px,1.5vw,17px)] leading-[1.72] text-papel">
          Un jardín no es solo un lugar que se cultiva; es una forma de habitar el mundo. Taxonomía
          precisa, láminas anatómicas y manejo estacional real para el hemisferio sur.
        </p>

        <div className="mt-[34px] flex flex-wrap gap-3">
          <Magnetico>
            <a href="#compendio" className="cj-pildora cj-pildora--solida">
              Explorar el compendio
            </a>
          </Magnetico>
          <Magnetico>
            <a href="#esencia" className="cj-pildora cj-pildora--linea">
              Nuestra esencia
            </a>
          </Magnetico>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-5 flex flex-col items-center gap-[7px]"
      >
        <span className="text-[8.5px] uppercase tracking-[.28em] text-[rgba(244,239,230,.6)]">
          Scroll
        </span>
        <span
          className="block h-7 w-px"
          style={{
            background: 'linear-gradient(180deg,rgba(244,239,230,.6),transparent)',
            animation: 'cjBob 2.6s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
