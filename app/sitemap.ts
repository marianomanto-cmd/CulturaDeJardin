import type { MetadataRoute } from 'next';
import { SITIO } from '@/data/sitio';

/** Una sola URL canónica: las once secciones son fragmentos, no páginas. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITIO.url}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
