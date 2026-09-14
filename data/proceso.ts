/** Las cinco etapas del proceso, del primer contacto al registro sostenido. */
export interface Etapa {
  num: string;
  titulo: string;
  texto: string;
  detalle?: readonly { rotulo: string; texto: string }[];
}

export const ETAPAS: readonly Etapa[] = [
  {
    num: '01',
    titulo: 'Descubrimiento y conexión',
    texto:
      'El punto de entrada es la web o la bitácora física, por sus códigos QR. Ahí están el manifiesto, los ensayos históricos y el herbario: el lugar donde cada uno reconoce su afinidad con el pensamiento jardinero y empieza a nombrar lo que necesita de su terreno.',
  },
  {
    num: '02',
    titulo: 'Diagnóstico y relevamiento',
    texto:
      'La ronda de reconocimiento. Antes de proponer nada hay que leer el lugar, y eso lo hace quien lo habita todos los días.',
    detalle: [
      {
        rotulo: 'Lectura del entorno',
        texto:
          'Orientación con la brújula solar, tipo de luz con el test de sombra, suelo existente y requerimiento hídrico.',
      },
      {
        rotulo: 'Lista de deseos',
        texto:
          'El carácter esperado del jardín: rincones silvestres, presencia de polinizadores, flor de corte, descanso o contemplación.',
      },
    ],
  },
  {
    num: '03',
    titulo: 'Propuesta y herramientas',
    texto: 'Según el camino elegido, la entrega toma una forma u otra.',
    detalle: [
      {
        rotulo: 'En productos',
        texto:
          'Despacho de la bitácora física y de las carpetas de láminas, más los accesos digitales a planillas y recursos.',
      },
      {
        rotulo: 'En diseño y asesoría',
        texto:
          'Anteproyecto con croquis zonificados a escala, paleta vegetal binomial por estratos, plan de sustratos y cronograma de relevo OIP / PVO.',
      },
    ],
  },
  {
    num: '04',
    titulo: 'Implementación y labores de campo',
    texto:
      'Se acompaña la ejecución física o la siembra guiada: preparación del terreno y formulación del sustrato —proporciones de tierra, compost, perlita y humus, con mulching protector—, plantación respetando distancias adultas y compatibilidad ecológica, y las técnicas de propagación que cada especie pide: directa, bajo cubierta o al voleo.',
  },
  {
    num: '05',
    titulo: 'Registro vivo y evolución continua',
    texto:
      'Un jardín nunca se da por terminado. El registro mensual sostiene todo lo demás: monitoreo de brotación, floración y fructificación; ajuste del riego según la estación; checklists de podas de formación, podas en verde, desrame sanitario y cosecha de semillas. Y soporte estacional por la plataforma cuando aparece la duda.',
  },
];
