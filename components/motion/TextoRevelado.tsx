import { Fragment, type CSSProperties, type ElementType, type ReactNode } from 'react';
import clsx from 'clsx';

export interface Parte {
  texto: string;
  clase?: string;
  /** Envuelve la parte en <em>, para el acento manuscrito de los titulares. */
  enfasis?: boolean;
}

interface Props {
  /** Texto plano. Alternativa simple a `partes`. */
  texto?: string;
  /** Tramos con estilo propio dentro del mismo titular. */
  partes?: Parte[];
  como?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Retardo entre palabras, en ms. */
  paso?: number;
  /** Retardo inicial del bloque, en ms. */
  demora?: number;
  id?: string;
}

/**
 * Titular con revelado por palabras: cada palabra viaja desde abajo dentro de
 * su propia máscara. Se renderiza en el servidor —el texto completo viaja en
 * el HTML, con sus espacios reales— y la animación es puro CSS disparado por
 * el observer compartido.
 */
export default function TextoRevelado({
  texto,
  partes,
  como: Como = 'span',
  className,
  style,
  paso = 52,
  demora = 0,
  id,
}: Props) {
  const tramos: Parte[] = partes ?? [{ texto: texto ?? '' }];
  let indice = 0;
  const nodos: ReactNode[] = [];

  tramos.forEach((tramo, t) => {
    const palabras = tramo.texto.split(/\s+/).filter(Boolean);
    palabras.forEach((palabra, p) => {
      const i = indice++;
      const interior = (
        <span className="cj-palabra__in" style={{ transitionDelay: `${demora + i * paso}ms` }}>
          {palabra}
        </span>
      );
      nodos.push(
        <Fragment key={`${t}-${p}`}>
          <span className={clsx('cj-palabra', tramo.enfasis && 'cj-enfasis', tramo.clase)}>
            {tramo.enfasis ? <em className="cj-em">{interior}</em> : interior}
          </span>
          {p < palabras.length - 1 || t < tramos.length - 1 ? ' ' : ''}
        </Fragment>,
      );
    });
  });

  return (
    <Como id={id} className={clsx('cj-texto', className)} style={style} data-reveal="texto">
      {nodos}
    </Como>
  );
}
