/** Cartera de productos: piezas físicas de colección y recursos digitales. */
export interface Producto {
  titulo: string;
  nota?: string;
  detalle: readonly string[];
}

export interface GrupoProductos {
  slug: string;
  num: string;
  titulo: string;
  entrada: string;
  /** Opcional: hay grupos que se leen mejor sin foto. */
  img?: string;
  alt?: string;
  items: readonly Producto[];
}

export const GRUPOS_PRODUCTOS: readonly GrupoProductos[] = [
  {
    slug: 'fisicos',
    num: '01',
    titulo: 'Piezas físicas y editoriales',
    entrada:
      'Objetos pensados para durar y para escribirse encima. La bitácora y las láminas son el puente analógico del proyecto: lo que queda en la mesa de trabajo cuando la pantalla se apaga.',
    img: '/assets/img/jardin-seco-santolina.webp',
    alt: 'Láminas botánicas, acuarelas y cuaderno de campo sobre una mesa de trabajo',
    items: [
      {
        titulo: 'Agenda Bitácora',
        nota: '«Viaje al jardín: Bitácora de brotes y algo más…»',
        detalle: [
          'Libro-objeto de planificación atemporal y registro fenológico de doce meses',
          'Fichas de campo para siembra, repique, poda, trasplante y control sanitario',
          'Espacios para croquis a escala, cuadrículas de diseño y memoria viva del jardín',
          'Códigos QR que abren los recursos ampliados de la plataforma web',
        ],
      },
      {
        titulo: 'Colección de láminas botánicas',
        nota: 'Arte naturalista',
        detalle: [
          'Reproducciones en papel de alta calidad, en estilo grabado y acuarela científica',
          'Disección anatómica: capítulo floral, morfología foliar, fruto, semilla y sistema radicular',
          'Salvia greggii, Iris germanica, Papaver rhoeas, Echinacea purpurea, Hydrangea macrophylla, entre otras',
          'Formatos individuales enmarcables o carpetas de colección temáticas',
        ],
      },
      {
        titulo: 'Papelería especializada y kits',
        detalle: [
          'Sobres ilustrados para recolección, catalogación y conservación de semillas, con campos de trazabilidad',
          'Cuadernillos complementarios de campo',
          'Etiquetas botánicas resistentes a la intemperie',
          'Descargables que completan la bitácora',
        ],
      },
    ],
  },
  {
    slug: 'digitales',
    num: '02',
    titulo: 'Recursos digitales',
    entrada:
      'Lo que se imprime, se completa a mano y vuelve al jardín. Formatos de consulta técnica y de planificación, pensados para usarse con la bitácora al lado.',
    items: [
      {
        titulo: 'Planillas técnicas y cuadros de gestión',
        detalle: [
          'Matriz horizontal de seguimiento fenológico',
          'Inventario y trazabilidad de lotes de semillas',
          'Cronogramas de mantenimiento estacional',
        ],
      },
      {
        titulo: 'Monografías y fichas técnicas',
        detalle: [
          'Fichas binomiales completas por familia vegetal',
          'Agrupaciones por ciclo OIP y PVO',
          'Tablas de compatibilidad entre especies',
        ],
      },
      {
        titulo: 'Guías temáticas especializadas',
        detalle: [
          'Compostaje técnico',
          'Formulación de sustratos',
          'Poda estacional',
          'Multiplicación por esquejes y acodos',
        ],
      },
    ],
  },
];
