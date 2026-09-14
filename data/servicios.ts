/**
 * Cartera de servicios. El texto es del modelo operativo del cliente; sólo se
 * normalizó el espaciado y se usó la raya larga de los ciclos (OIP
 * Otoño–Invierno–Primavera) que ya usa el resto del sitio.
 */
export interface Servicio {
  slug: string;
  num: string;
  titulo: string;
  /** Nombre corto para la home y la navegación. */
  corto: string;
  subtitulo?: string;
  /** Una línea que resume el servicio; es la que va en la home. */
  resumen: string;
  descripcion: string;
  destinatarios: string;
  incluye: readonly string[];
  img: string;
  alt: string;
}

export const SERVICIOS: readonly Servicio[] = [
  {
    slug: 'diseno-de-canteros',
    num: '01',
    titulo: 'Asesoría y diseño de canteros',
    corto: 'Diseño de canteros',
    resumen:
      'Proyectos de jardín planificados por etapas, adaptados a la luz real del terreno y a matrices de bajo mantenimiento.',
    descripcion:
      'Planificación de proyectos de jardines en etapas, adaptados a entornos específicos —pleno sol, media sombra y sombra— y a matrices vegetales de bajo mantenimiento. Cada propuesta parte de la escala adulta de las especies, no del tamaño con el que salen del vivero.',
    destinatarios: 'Público en general, aficionados, jardineros e interesados en el tema.',
    incluye: [
      'Lectura de la orientación y del régimen de luz del terreno',
      'Paleta vegetal binomial por estratos: fondo, medio y primer plano',
      'Croquis zonificado a escala con distancias adultas',
      'Plan de sustratos y mulching',
    ],
    img: '/assets/img/estrato-borde-graminieas.webp',
    alt: 'Gramíneas y cubresuelos florecidos detrás de un cerco de cadena',
  },
  {
    slug: 'consultoria-fenologica',
    num: '02',
    titulo: 'Planificación y consultoría fenológica',
    corto: 'Consultoría fenológica',
    subtitulo: 'El arte del relevo',
    resumen:
      'Calendarios de plantación que combinan ciclos OIP y PVO para que el cantero nunca quede con claros.',
    descripcion:
      'Diagramación técnica de calendarios de plantación y relevo estacional, combinando especies OIP (Otoño–Invierno–Primavera) y PVO (Primavera–Verano–Otoño) para asegurar canteros con dinamismo y floración continua, sin vacíos vegetativos.',
    destinatarios: 'Jardines particulares, proyectos de jardines y áreas verdes en general.',
    incluye: [
      'Matriz de relevo mes a mes sobre las especies del proyecto',
      'Superposición buscada en los meses de transición: marzo y septiembre',
      'Cronograma de siembra, división de matas y reposición',
      'Planilla de seguimiento fenológico para registrar lo que pasa de verdad',
    ],
    img: '/assets/img/pradera-stipa-coreopsis.webp',
    alt: 'Stipa, coreopsis y salvia junto a una escalinata de piedra',
  },
  {
    slug: 'formacion-y-talleres',
    num: '03',
    titulo: 'Formación y talleres',
    corto: 'Formación y talleres',
    subtitulo: 'El pensamiento jardinero',
    resumen:
      'Cursos teóricos y prácticos de botánica aplicada, multiplicación, podas y manejo del suelo.',
    descripcion:
      'Cursos teóricos y prácticos sobre botánica aplicada, multiplicación agámica —esquejes leñosos y semileñosos, acodo, división de matas—, podas estacionales, manejo del suelo, y florigrafía e historia del paisaje.',
    destinatarios: 'Público general, amantes de la naturaleza, estudiantes y viveristas.',
    incluye: [
      'Botánica aplicada y nomenclatura binomial',
      'Multiplicación agámica: esquejes, acodo y división de matas',
      'Podas estacionales y manejo del suelo',
      'Florigrafía e historia del paisaje',
    ],
    img: '/assets/img/jardin-seco-santolina.webp',
    alt: 'Láminas botánicas, acuarelas y cuaderno de campo sobre una mesa de trabajo',
  },
];
