import type { CSSProperties, ElementType, ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
  children: ReactNode;
  /** Retardo en ms. */
  demora?: number;
  como?: ElementType;
  className?: string;
  style?: CSSProperties;
  id?: string;
  /** Atributos sueltos (role, aria-*) que van al elemento raíz. */
  [extra: string]: unknown;
}

/**
 * Reveal base: la pieza sube 26 px y aparece cuando cruza el viewport.
 * Sólo escribe atributos; el estado oculto y la transición viven en CSS,
 * así sin JS el contenido queda visible.
 */
export default function Revelar({
  children,
  demora = 0,
  como: Como = 'div',
  className,
  style,
  id,
  ...resto
}: Props) {
  return (
    <Como
      id={id}
      data-reveal=""
      className={className}
      style={{ ...style, ...({ '--cj-reveal-delay': `${demora}ms` } as CSSProperties) }}
      {...resto}
    >
      {children}
    </Como>
  );
}

export function RevelarLista({
  children,
  className,
  style,
  paso = 90,
  como: Como = 'div',
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  paso?: number;
  como?: ElementType;
}) {
  return (
    <Como
      className={clsx('cj-lista-revelada', className)}
      style={{ ...style, ...({ '--cj-paso': `${paso}ms` } as CSSProperties) }}
    >
      {children}
    </Como>
  );
}
