/** Único punto de quiebre estructural del sitio. */
export const BREAKPOINT = 1040;

/** Curva de la marca. Idéntica al token --ease-cj de globals.css. */
export const EASE_CJ = 'cubic-bezier(.22,.61,.24,1)';

/** Marca de sesión: la secuencia completa del telón corre una vez por sesión. */
export const CLAVE_TELON = 'cj:telon:visto';

/** Secuencia del telón, en ms desde el montaje. */
export const TELON = {
  retiroLogo: 3150,
  costura: 3780,
  apertura: 4480,
  desmontaje: 5900,
} as const;
