import Image from 'next/image';
import type { CSSProperties } from 'react';
import clsx from 'clsx';

interface Props {
  src: string;
  alt: string;
  /** Proporción del marco, p. ej. '4/5'. El marco reserva el espacio: CLS 0. */
  proporcion: string;
  /** Obligatorio salvo con `anchoFijo`, que resuelve el srcset por su cuenta. */
  sizes?: string;
  className?: string;
  style?: CSSProperties;
  /** Fuerza del parallax interno; 0 lo desactiva. */
  parallax?: number;
  demora?: number;
  prioridad?: boolean;
  calidad?: number;
  /** Escala extra al pasar el puntero. */
  zoomHover?: boolean;
  /**
   * Ancho máximo real de la pieza, en px. Cambia el srcset a 1x/2x en vez de
   * la lista completa de anchos. Hace falta en la marquesina: sus figuras
   * quedan fuera de pantalla en horizontal y ahí Chrome elige el candidato
   * más grande de la lista sin importar lo que diga `sizes`.
   */
  anchoFijo?: number;
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
  calidad = 92,
  zoomHover = false,
  anchoFijo,
}: Props) {
  const clases = clsx('cj-foto', zoomHover && 'cj-foto--zoom');
  const [num, den] = proporcion.split('/').map((n) => Number(n.trim()));
  const capa = anchoFijo ? (
    <Image
      src={src}
      alt={alt}
      width={anchoFijo}
      height={Math.round((anchoFijo * (den || 1)) / (num || 1))}
      quality={calidad}
      priority={prioridad}
      loading={prioridad ? undefined : 'lazy'}
      className={clsx(clases, 'absolute inset-0 h-full w-full')}
    />
  ) : (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality={calidad}
      priority={prioridad}
      loading={prioridad ? undefined : 'lazy'}
      className={clases}
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
