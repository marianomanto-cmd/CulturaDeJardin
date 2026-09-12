import Revelar from '@/components/motion/Revelar';
import FormularioBitacora from '@/components/secciones/FormularioBitacora';
import { SITIO } from '@/data/sitio';

// Rótulos propios del pie: más largos que los de la navegación, que abrevia.
const ENLACES: readonly { href: string; texto: string }[] = [
  { href: '#esencia', texto: 'Nuestra esencia' },
  { href: '#compendio', texto: 'Compendio taxonómico' },
  { href: '#relevo', texto: 'Ciclos y relevo' },
  { href: '#laminas', texto: 'Láminas botánicas' },
];

// .42 de alfa sobre noche da 3,5:1 en 9 px; .62 lo lleva a 6,7:1.
const ROTULO = 'text-[9px] uppercase tracking-[.24em] text-[rgba(244,239,230,.62)]';

export default function Pie() {
  return (
    <footer className="cj-sobre-oscuro relative overflow-hidden bg-noche px-[clamp(20px,5vw,64px)] pb-9 pt-[clamp(60px,8vw,110px)]">
      <div className="cj-wrap">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] items-start gap-[clamp(28px,4vw,56px)]">
          <Revelar className="flex flex-col gap-5">
            {/* El monograma entra como máscara: el PNG recorta un plano papel. */}
            <div
              aria-hidden="true"
              className="h-[74px] w-[86px]"
              style={{
                WebkitMask: "url('/assets/cj-mark.png') no-repeat center/contain",
                mask: "url('/assets/cj-mark.png') no-repeat center/contain",
                background: 'var(--color-papel)',
              }}
            />
            <div>
              <div className="text-[15px] tracking-[.18em] text-papel">{SITIO.nombre}</div>
              <div className="cj-script mt-0.5 text-[21px] text-pino-claro">{SITIO.lema}</div>
            </div>
          </Revelar>

          <Revelar demora={80} className="flex flex-col gap-3">
            <span className={ROTULO}>Secciones</span>
            <nav aria-label="Secciones del sitio" className="flex flex-col">
              {ENLACES.map((enlace) => (
                <a
                  key={enlace.href}
                  href={enlace.href}
                  className="relative inline-flex min-h-[44px] w-fit items-center text-[13.5px] text-[rgba(244,239,230,.78)] transition-colors duration-300 after:absolute after:bottom-[11px] after:left-0 after:h-px after:w-0 after:bg-pino-claro after:transition-[width] after:duration-500 hover:text-papel hover:after:w-full focus-visible:after:w-full"
                >
                  {enlace.texto}
                </a>
              ))}
            </nav>
          </Revelar>

          <Revelar demora={160} className="flex flex-col gap-3.5">
            <span className={ROTULO}>Bitácora estacional</span>
            <p className="m-0 text-[13.5px] leading-[1.7] text-[rgba(244,239,230,.7)]">
              Avisos fenológicos ajustados al clima, la latitud y la estación en curso.
            </p>
            <FormularioBitacora />
          </Revelar>
        </div>

        <div className="mt-[clamp(40px,6vw,72px)] flex flex-wrap justify-between gap-4 border-t border-[rgba(244,239,230,.12)] pt-[22px]">
          <span className="text-[11px] text-[rgba(244,239,230,.6)]">
            © 2026 {SITIO.nombre} · Hemisferio Sur
          </span>
          <span className="font-mono text-[11px] text-[rgba(244,239,230,.6)]">
            Poppins · #157174 · #4A0024
          </span>
        </div>
      </div>
    </footer>
  );
}
