import Image from 'next/image';
import type { CSSProperties } from 'react';
import clsx from 'clsx';

interface Props {
  src: string;
  alt: string;
  /** Proporción del marco, p. ej. '4/5'. El marco reserva el espacio: CLS 0. */
  proporcion: string;
  sizes: string;
  className?: string;
  style?: CSSProperties;
  /** Fuerza del parallax interno; 0 lo desactiva. */
  parallax?: number;
  demora?: number;
  prioridad?: boolean;
  calidad?: number;
  /** Escala extra al pasar el puntero. */
  zoomHover?: boolean;
}

/**
 * Foto con revelado de cortina: el marco abre de abajo hacia arriba con
 * clip-path mientras la imagen suelta una escala de 1,12 a 1. El contenedor
 * declara la proporción, así que el reveal no mueve una línea de layout.
 *
 * El clip-path NO puede vivir en el elemento observado: recorta también el
 * rectángulo que mide el IntersectionObserver, la razón de intersección queda
 * en cero y el reveal nunca se dispara. Por eso el observado es el envoltorio
 * y el recorte baja a .cj-marco.
 */
export default function ImagenRevelada({
  src,
  alt,
  proporcion,
  sizes,
  className,
  style,
  parallax = 0,
  demora = 0,
  prioridad = false,
  calidad = 76,
  zoomHover = false,
}: Props) {
  const capa = (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality={calidad}
      priority={prioridad}
      loading={prioridad ? undefined : 'lazy'}
      className={clsx('cj-foto', zoomHover && 'cj-foto--zoom')}
    />
  );

  return (
    <div
      data-reveal="cortina"
      className={clsx('cj-cortina', className)}
      style={{
        ...style,
        aspectRatio: proporcion,
        ...({ '--cj-reveal-delay': `${demora}ms` } as CSSProperties),
      }}
    >
      <div className="cj-marco">
        {parallax > 0 ? (
          <div className="cj-parallax" data-parallax={String(parallax)}>
            {capa}
          </div>
        ) : (
          capa
        )}
      </div>
    </div>
  );
}
