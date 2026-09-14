/** Contenido editorial de las secciones estáticas. Texto exacto del prototipo v1.0. */

export interface Estrato {
  titulo: string;
  texto: string;
  especies: string;
  img: string;
  alt: string;
}

export const ESTRATOS: readonly Estrato[] = [
  {
    titulo: 'Fondo — estructural',
    texto:
      'Define el volumen y el telón del cantero. Escala adulta calculada para no tapar los estratos delanteros con los años.',
    especies: 'Paspalum · Hydrangea macrophylla · Dietes grandiflora',
    img: '/assets/img/estrato-fondo-aguaribay.webp',
    alt: 'Árbol añoso de copa amplia con un cantero circular a su pie',
  },
  {
    titulo: 'Medio — cuerpo y textura',
    texto:
      'El corazón del relevo. Acá se resuelve la continuidad floral: matrices repetidas que se turnan entre OIP y PVO.',
    especies: 'Salvia greggii · Iris germanica · Lavandula · Echinacea',
    img: '/assets/img/pradera-stipa-coreopsis.webp',
    alt: 'Stipa, coreopsis y salvia junto a una escalinata de piedra',
  },
  {
    titulo: 'Primer plano — borde',
    texto:
      'Resuelve la transición al camino o al césped. Texturas finas y floración baja que cierran la composición.',
    especies: 'Coreopsis lanceolata · Papaver rhoeas · Farfugium',
    img: '/assets/img/estrato-borde-graminieas.webp',
    alt: 'Gramíneas y cubresuelos florecidos detrás de un cerco de cadena',
  },
];

export interface Orientacion {
  letra: string;
  nombre: string;
  titulo: string;
  texto: string;
  test: string;
}

export const ORIENTACIONES: readonly Orientacion[] = [
  {
    letra: 'N',
    nombre: 'Norte',
    titulo: 'Norte — la orientación más generosa',
    texto:
      'En el hemisferio sur el norte recibe sol durante casi todo el día y en todas las estaciones. Es la orientación de mayor insolación acumulada: ideal para especies de pleno sol, aromáticas mediterráneas y gramíneas de bajo requerimiento hídrico.',
    test: 'A las 12 h no hay sombra proyectada sobre el cantero en ninguna época del año.',
  },
  {
    letra: 'E',
    nombre: 'Este',
    titulo: 'Este — sol naciente, suave',
    texto:
      'Luz directa de la mañana, cuando la temperatura todavía es baja. Es la orientación más amable: permite floraciones delicadas y follajes que se queman con el sol de la tarde. Media sombra funcional.',
    test: 'Sol directo hasta media mañana; sombra a partir del mediodía.',
  },
  {
    letra: 'S',
    nombre: 'Sur',
    titulo: 'Sur — sombra fresca y estable',
    texto:
      'La cara de menor radiación. Sombra profunda durante buena parte del año, con humedad más constante en el sustrato. El territorio de hortensias, farfugios y follajes grandes.',
    test: 'Sin sol directo en invierno; apenas luz rasante en verano.',
  },
  {
    letra: 'O',
    nombre: 'Oeste',
    titulo: 'Oeste — la radiación exigente',
    texto:
      'Recibe el sol de la tarde, cuando el aire ya está caliente. Alta radiación vespertina que estresa follajes tiernos y acelera la demanda de riego. Reservado para especies verdaderamente rústicas.',
    test: 'Sol directo desde media tarde hasta el atardecer, con suelo recalentado.',
  },
];

export interface Lamina {
  img: string;
  nombre: string;
  detalle: string;
  alt: string;
}

export const LAMINAS: readonly Lamina[] = [
  {
    img: '/assets/img/jardin-seco-santolina.webp',
    nombre: 'Mesa de trabajo',
    detalle: 'DISECCIÓN · MORFOLOGÍA FOLIAR · RAÍZ',
    alt: 'Láminas botánicas, acuarelas y cuaderno de campo sobre una mesa de trabajo',
  },
  {
    img: '/assets/img/lilium-macizo.webp',
    nombre: 'Iris germanica',
    detalle: 'IRIDACEAE · RIZOMA · OIP',
    alt: 'Iris germanica púrpura en floración sobre su mata de hojas ensiformes',
  },
  {
    img: '/assets/img/iris-germanica.webp',
    nombre: 'Achillea millefolium',
    detalle: 'ASTERACEAE · CORIMBO · PVO',
    alt: 'Achillea millefolium de corimbos amarillos con follaje grisáceo recortado',
  },
  {
    img: '/assets/img/hero-muro-iris.webp',
    nombre: 'Narcissus poeticus',
    detalle: 'AMARYLLIDACEAE · NATURALIZADO',
    alt: 'Pradera de narcisos naturalizados junto a un arroyo de montaña',
  },
  {
    img: '/assets/img/salvia-leucantha.webp',
    nombre: 'Salvia leucantha',
    detalle: 'LAMIACEAE · ESPIGA · PVO',
    alt: 'Salvia leucantha de espigas púrpuras en un borde junto a la casa',
  },
  {
    img: '/assets/img/laminas-mesa-trabajo.webp',
    nombre: 'Cantero sobre muro',
    detalle: 'PIEDRA · IRIS · CANTERO ELEVADO',
    alt: 'Cantero elevado sobre muro de piedra con iris y arbustos por encima',
  },
  {
    img: '/assets/img/narcissus-poeticus.webp',
    nombre: 'Jardín seco',
    detalle: 'SANTOLINA · GRAVA · BAJO RIEGO',
    alt: 'Jardín seco con santolinas, gravas y un olivo joven junto a la casa',
  },
  {
    img: '/assets/img/achillea-millefolium.webp',
    nombre: 'Borde de follaje gris',
    detalle: 'TEXTURA MEDIA · BAJO RIEGO · PVO',
    alt: 'Borde seco con espigas violáceas y follajes grises de textura media',
  },
];

export interface Historia {
  anos: string;
  nombre: string;
  texto: string;
}

export const HISTORIAS: readonly Historia[] = [
  {
    anos: '1849 — 1934',
    nombre: 'Carlos Thays',
    texto:
      'La construcción de pausas urbanas, el arbolado público y la interpretación del paisaje nativo como material de proyecto.',
  },
  {
    anos: '1909 — 1994',
    nombre: 'Roberto Burle Marx',
    texto:
      'La valoración de la flora vernácula, la botánica como arte y el jardín entendido como obra abierta y dinámica.',
  },
  {
    anos: 'Contemporánea',
    nombre: 'Sonia Berjman',
    texto:
      'La protección de los parques históricos como patrimonio vivo y cultural, no como decorado congelado.',
  },
  {
    anos: 'Homenaje',
    nombre: 'Mujeres botánicas',
    texto:
      'Ynes Mexía, Helia Bravo Hollis, Carmen Olga Días, Jeanne Baret y las jardineras anónimas que sostuvieron el saber.',
  },
];

export interface Descarga {
  tipo: string;
  titulo: string;
  nota: string;
}

export const DESCARGAS: readonly Descarga[] = [
  {
    tipo: 'PLANILLA · A3',
    titulo: 'Seguimiento fenológico horizontal anual',
    nota: 'Doce columnas, una fila por especie. Para registrar brote, flor, fruto y reposo.',
  },
  {
    tipo: 'FICHA · A5',
    titulo: 'Inventario y trazabilidad de semillas',
    nota: 'Origen, fecha de recolección, viabilidad estimada y resultados de germinación.',
  },
  {
    tipo: 'PLANTILLA · IMPRIMIBLE',
    titulo: 'Sobres de recolección de semillas',
    nota: 'Modelo plegable con campos de rotulación listos para completar a mano.',
  },
  {
    tipo: 'CHECKLIST · ESTACIONAL',
    titulo: 'Verificación de manejo por estación',
    nota: 'Poda, división de matas, mulching y control hídrico según el trimestre.',
  },
];

export interface Pregunta {
  grupo: string;
  p: string;
  r: string;
}

export const FAQS: readonly Pregunta[] = [
  {
    grupo: 'MANEJO Y FITOSANIDAD',
    p: '¿Por qué las hojas de mi planta se vuelven amarillas o muestran puntas secas y quebradizas?',
    r: 'Es un diagnóstico diferencial de tres causas que se ven parecidas. La asfixia radicular por exceso de riego amarillea desde las hojas basales y deja el sustrato compacto y con olor; la falta de agua seca primero los bordes y las puntas, con la hoja curvada hacia abajo; la deficiencia de hierro —o su bloqueo por agua dura— amarillea la lámina dejando las nervaduras verdes. Revisá primero el sustrato con la prueba del puño antes de corregir el riego.',
  },
  {
    grupo: 'MANEJO Y FITOSANIDAD',
    p: '¿Cómo preparar una mezcla de sustrato adecuada para macetas sin que la tierra se apelmace con el tiempo?',
    r: 'La fórmula se piensa en tres funciones proporcionales: soporte (tierra o compost maduro), drenaje (perlita, arena gruesa o granza volcánica) y nutrición orgánica (humus, lombricompuesto). Para especies de bajo requerimiento hídrico el drenaje sube al 40 %; para follajes de sombra con demanda alta baja al 20 % y se compensa con materia orgánica retenedora. El apelmazamiento es casi siempre falta de partícula gruesa, no falta de nutrientes.',
  },
  {
    grupo: 'MANEJO Y FITOSANIDAD',
    p: '¿Cuándo y cómo realizar una poda sin comprometer la floración de la próxima temporada?',
    r: 'Depende de sobre qué madera florece la especie. La poda estructural invernal se hace en reposo y define la arquitectura. La poda de raleo tras la floración primaveral se aplica a las especies que florecen sobre madera del año anterior: si se podan en invierno se eliminan las yemas florales. Las podas en verde son intervenciones livianas durante el crecimiento activo, para despuntar y ramificar sin frenar la planta.',
  },
  {
    grupo: 'PLANIFICACIÓN Y FENOLOGÍA',
    p: '¿Qué significa que una herbácea sea de ciclo OIP o PVO y cómo se sincronizan para evitar claros en el cantero?',
    r: 'OIP designa a las herbáceas activas en Otoño–Invierno–Primavera y PVO a las de Primavera–Verano–Otoño. El relevo consiste en plantarlas entremezcladas de modo que, cuando un grupo entra en reposo y desaparece, el otro ya ocupó el volumen. La superposición se busca en los meses de transición —marzo y septiembre— para que nunca quede suelo desnudo a la vista.',
  },
  {
    grupo: 'PLANIFICACIÓN Y FENOLOGÍA',
    p: '¿Qué especies anuales permiten siembra directa en el suelo y cuáles toleran o rechazan el trasplante?',
    r: 'La clave está en el sistema radicular. Las especies de raíz pivotante —amapolas, escabiosas, zanahoria ornamental— rechazan el trasplante: se siembran directas, al voleo o en línea, y se ralean. Las de raíz fasciculada y sensible admiten siembra modular y trasplante temprano, siempre que se mueva el pan de tierra intacto y antes de que la raíz toque el fondo del alvéolo.',
  },
  {
    grupo: 'PLANIFICACIÓN Y FENOLOGÍA',
    p: '¿Cómo leer la insolación de un terreno a través de los puntos cardinales en nuestro hemisferio?',
    r: 'En el hemisferio sur el norte es la orientación de mayor insolación acumulada y el sur la de sombra más estable. La diferencia decisiva está entre el este y el oeste: el sol naciente del este llega con aire fresco y es térmicamente benigno; la radiación vespertina del oeste cae sobre suelo y aire ya recalentados. Dos canteros con las mismas horas de sol se comportan de forma distinta según de qué lado las reciban.',
  },
  {
    grupo: 'DISEÑO ARMÓNICO',
    p: '¿Cómo componer un cantero para que se vea natural pero ordenado a lo largo de los años?',
    r: 'Con tres reglas que trabajan juntas: escala adulta —se planta pensando en el tamaño final, no en el del vivero—, repetición de matrices vegetales —una misma especie vuelve a aparecer en grupos a lo largo del cantero y genera ritmo— y armonización de texturas finas, medias y gruesas en proporción estable. El orden no viene de la simetría sino de la repetición.',
  },
  {
    grupo: 'DISEÑO ARMÓNICO',
    p: '¿Cómo rescatar y documentar la evolución de mi jardín personal como una memoria viva?',
    r: 'Con una metodología de registro sostenida: fotografía desde puntos fijos en las mismas fechas, planilla de seguimiento fenológico anual, rotulación y trazabilidad de cada paquete de semillas, y notas de manejo con fecha. La memoria del jardín no es nostalgia: es el único dato real que permite decidir mejor la temporada siguiente.',
  },
];

/**
 * Navegación. Las anclas de la home se escriben absolutas (`/#x`) para que
 * también funcionen desde las páginas interiores: el manejador de clics las
 * trata como ancla interna cuando ya estamos en la home, y como navegación
 * normal cuando no.
 */
export interface Enlace {
  href: string;
  label: string;
  num: string;
}

/** Páginas propias del sitio. */
export const NAV_PAGINAS: readonly Enlace[] = [
  { href: '/servicios', label: 'Servicios', num: '01' },
  { href: '/productos', label: 'Productos', num: '02' },
  { href: '/proceso', label: 'Proceso', num: '03' },
];

/** Secciones de la home. El número es el de la sección en la página. */
export const SECCIONES: readonly Enlace[] = [
  { href: '/#esencia', label: 'Esencia', num: '01' },
  { href: '/#servicios', label: 'Servicios', num: '02' },
  { href: '/#compendio', label: 'Compendio', num: '04' },
  { href: '/#relevo', label: 'Relevo', num: '05' },
  { href: '/#canteros', label: 'Canteros', num: '06' },
  { href: '/#brujula', label: 'Brújula', num: '07' },
  { href: '/#laminas', label: 'Láminas', num: '08' },
  { href: '/#historias', label: 'Historias', num: '10' },
  { href: '/#descargas', label: 'Descargas', num: '11' },
  { href: '/#preguntas', label: 'Preguntas', num: '12' },
];

/** Lo que muestra la barra de escritorio: las páginas y cuatro anclas. */
export const NAV_DESKTOP: readonly Enlace[] = [
  ...NAV_PAGINAS,
  { href: '/#compendio', label: 'Compendio', num: '04' },
  { href: '/#relevo', label: 'Relevo', num: '05' },
  { href: '/#laminas', label: 'Láminas', num: '08' },
  { href: '/#preguntas', label: 'Preguntas', num: '12' },
];
