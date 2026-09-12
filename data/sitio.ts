export const SITIO = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://culturadejardin.com',
  nombre: 'Cultura de Jardín',
  lema: 'Un Estilo de Vida',
  locale: 'es_AR',
  lang: 'es-AR',
} as const;

/**
 * Número de contacto en formato internacional, sin signos: +54 9 3512 41-6749.
 * Se resuelve por variable de entorno para poder cambiarlo sin tocar el código.
 */
export const WHATSAPP = process.env.NEXT_PUBLIC_WHATSAPP ?? '5493512416749';

export const MENSAJE_WA =
  '¡Hola Cultura de Jardín! Quiero sumarme a la bitácora estacional y recibir las planillas de registro fenológico. ¿Cómo sigo?';

export const HREF_WA = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(MENSAJE_WA)}`;
