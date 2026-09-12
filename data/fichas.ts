/**
 * Compendio taxonómico — 12 fichas binomiales.
 * `meses` son los meses (1–12) en los que la especie sostiene el cantero.
 */
export type Ciclo = 'PVO' | 'OIP';
export type Luz = 'Pleno sol' | 'Media sombra' | 'Sombra profunda';
export type Estrato = 'Fondo' | 'Medio' | 'Primer plano';

export interface Ficha {
  nombre: string;
  comun: string;
  familia: string;
  luz: Luz;
  agua: 'Bajo' | 'Medio' | 'Alto';
  escala: string;
  estrato: Estrato;
  ciclo: Ciclo;
  meses: number[];
}

export const FICHAS: readonly Ficha[] = [
  {
    nombre: 'Salvia greggii',
    comun: 'Salvia de otoño',
    familia: 'Lamiaceae',
    luz: 'Pleno sol',
    agua: 'Bajo',
    escala: '0,6 × 0,6 m',
    estrato: 'Medio',
    ciclo: 'PVO',
    meses: [9, 10, 11, 12, 1, 2, 3, 4, 5],
  },
  {
    nombre: 'Achillea millefolium',
    comun: 'Milenrama',
    familia: 'Asteraceae',
    luz: 'Pleno sol',
    agua: 'Bajo',
    escala: '0,7 × 0,5 m',
    estrato: 'Medio',
    ciclo: 'PVO',
    meses: [10, 11, 12, 1, 2, 3],
  },
  {
    nombre: 'Echinacea purpurea',
    comun: 'Equinácea',
    familia: 'Asteraceae',
    luz: 'Pleno sol',
    agua: 'Medio',
    escala: '0,9 × 0,4 m',
    estrato: 'Medio',
    ciclo: 'PVO',
    meses: [11, 12, 1, 2, 3],
  },
  {
    nombre: 'Coreopsis lanceolata',
    comun: 'Ojo de niña',
    familia: 'Asteraceae',
    luz: 'Pleno sol',
    agua: 'Bajo',
    escala: '0,5 × 0,4 m',
    estrato: 'Primer plano',
    ciclo: 'PVO',
    meses: [10, 11, 12, 1, 2, 3],
  },
  {
    nombre: 'Lavandula angustifolia',
    comun: 'Lavanda',
    familia: 'Lamiaceae',
    luz: 'Pleno sol',
    agua: 'Bajo',
    escala: '0,6 × 0,7 m',
    estrato: 'Medio',
    ciclo: 'PVO',
    meses: [10, 11, 12, 1, 2],
  },
  {
    nombre: 'Agapanthus praecox',
    comun: 'Agapanto',
    familia: 'Amaryllidaceae',
    luz: 'Media sombra',
    agua: 'Medio',
    escala: '0,8 × 0,6 m',
    estrato: 'Medio',
    ciclo: 'PVO',
    meses: [11, 12, 1, 2],
  },
  {
    nombre: 'Hydrangea macrophylla',
    comun: 'Hortensia',
    familia: 'Hydrangeaceae',
    luz: 'Sombra profunda',
    agua: 'Alto',
    escala: '1,4 × 1,4 m',
    estrato: 'Fondo',
    ciclo: 'PVO',
    meses: [11, 12, 1, 2],
  },
  {
    nombre: 'Paspalum',
    comun: 'Gramínea nativa',
    familia: 'Poaceae',
    luz: 'Pleno sol',
    agua: 'Bajo',
    escala: '1,0 × 0,6 m',
    estrato: 'Fondo',
    ciclo: 'PVO',
    meses: [10, 11, 12, 1, 2, 3, 4],
  },
  {
    nombre: 'Iris germanica',
    comun: 'Lirio barbado',
    familia: 'Iridaceae',
    luz: 'Pleno sol',
    agua: 'Bajo',
    escala: '0,8 × 0,4 m',
    estrato: 'Medio',
    ciclo: 'OIP',
    meses: [4, 5, 6, 7, 8, 9, 10, 11],
  },
  {
    nombre: 'Papaver rhoeas',
    comun: 'Amapola',
    familia: 'Papaveraceae',
    luz: 'Pleno sol',
    agua: 'Bajo',
    escala: '0,6 × 0,2 m',
    estrato: 'Primer plano',
    ciclo: 'OIP',
    meses: [7, 8, 9, 10, 11],
  },
  {
    nombre: 'Dietes grandiflora',
    comun: 'Lirio africano',
    familia: 'Iridaceae',
    luz: 'Media sombra',
    agua: 'Bajo',
    escala: '1,0 × 0,8 m',
    estrato: 'Fondo',
    ciclo: 'OIP',
    meses: [8, 9, 10, 11, 12, 1, 2, 3],
  },
  {
    nombre: 'Farfugium japonicum',
    comun: 'Farfugio',
    familia: 'Asteraceae',
    luz: 'Sombra profunda',
    agua: 'Alto',
    escala: '0,5 × 0,6 m',
    estrato: 'Primer plano',
    ciclo: 'OIP',
    meses: [4, 5, 6, 7, 8, 9],
  },
];

export const MESES: readonly { largo: string; corto: string; inicial: string }[] = [
  { largo: 'Enero', corto: 'ENE', inicial: 'E' },
  { largo: 'Febrero', corto: 'FEB', inicial: 'F' },
  { largo: 'Marzo', corto: 'MAR', inicial: 'M' },
  { largo: 'Abril', corto: 'ABR', inicial: 'A' },
  { largo: 'Mayo', corto: 'MAYO', inicial: 'M' },
  { largo: 'Junio', corto: 'JUN', inicial: 'J' },
  { largo: 'Julio', corto: 'JUL', inicial: 'J' },
  { largo: 'Agosto', corto: 'AGO', inicial: 'A' },
  { largo: 'Septiembre', corto: 'SEP', inicial: 'S' },
  { largo: 'Octubre', corto: 'OCT', inicial: 'O' },
  { largo: 'Noviembre', corto: 'NOV', inicial: 'N' },
  { largo: 'Diciembre', corto: 'DIC', inicial: 'D' },
];

export const LUCES: readonly string[] = ['Todas', 'Pleno sol', 'Media sombra', 'Sombra profunda'];
export const CICLOS: readonly string[] = ['Todos', 'PVO', 'OIP'];
