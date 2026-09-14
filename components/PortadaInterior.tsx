import Image from 'next/image';
import TextoRevelado, { type Parte } from '@/components/motion/TextoRevelado';

interface Props {
  antetitulo: string;
  partes: Parte[];
  entrada: string;
  img: string;
  alt: string;
}

/**
 * Portada de página interior. Banda corta —no pantalla completa— para que el
 * contenido empiece arriba del pliegue: estas páginas se leen, no se admiran.
 */
export default function PortadaInterior({ antetitulo, partes, entrada, img, alt }: Props) {
  return (
    <section className="cj-portada cj-sobre-oscuro">
      <div className="absolute inset-0">
        <Image
          src={img}
          alt={alt}
          fill
          priority
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
            'linear-gradient(180deg,rgba(7,19,15,.86) 0%,rgba(7,19,15,.52) 34%,rgba(7,19,15,.72) 66%,rgba(7,19,15,.94) 100%)',
        }}
      />
      <div className="cj-wrap relative">
        <div className="mb-6 flex items-center gap-3.5">
          <span aria-hidden="true" className="h-px w-11 bg-papel" />
          <span className="text-[9.5px] uppercase tracking-[.3em] text-papel">{antetitulo}</span>
        </div>
        <TextoRevelado
          como="h1"
          paso={58}
          className="m-0 max-w-[18ch] text-[clamp(30px,5.6vw,64px)] font-extralight leading-[1.06] tracking-[-.02em] text-papel"
          partes={partes}
        />
        <p className="mt-6 max-w-[58ch] text-[clamp(14px,1.5vw,17px)] leading-[1.72] text-[rgba(244,239,230,.82)]">
          {entrada}
        </p>
      </div>
    </section>
  );
}
