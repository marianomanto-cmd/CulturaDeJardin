import type { MetadataRoute } from 'next';
import { SITIO } from '@/data/sitio';

/**
 * La portada sigue siendo una sola URL —sus doce secciones son fragmentos—,
 * y cada página interior entra por derecho propio.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const ahora = new Date();
  return [
    { url: `${SITIO.url}/`, lastModified: ahora, changeFrequency: 'monthly', priority: 1 },
    {
      url: `${SITIO.url}/servicios`,
      lastModified: ahora,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${SITIO.url}/productos`,
      lastModified: ahora,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    { url: `${SITIO.url}/proceso`, lastModified: ahora, changeFrequency: 'yearly', priority: 0.7 },
  ];
}
