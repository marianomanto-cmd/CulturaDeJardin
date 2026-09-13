import type { Metadata, Viewport } from 'next';
import { Poppins, Rouge_Script } from 'next/font/google';
import './globals.css';
import { SITIO } from '@/data/sitio';
import { FAQS } from '@/data/contenido';
import MotionProvider from '@/components/motion/MotionProvider';
import Cursor from '@/components/motion/Cursor';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-poppins',
});

const rouge = Rouge_Script({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  variable: '--font-rouge',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITIO.url),
  title: 'Cultura de Jardín — Fichas botánicas, canteros y relevo estacional',
  description:
    'Compendio taxonómico, láminas anatómicas y guías de manejo para el hemisferio sur: ciclos OIP y PVO, canteros por estratos, orientación solar y planillas de registro fenológico descargables.',
  applicationName: SITIO.nombre,
  authors: [{ name: SITIO.nombre }],
  creator: SITIO.nombre,
  publisher: SITIO.nombre,
  keywords: [
    'jardinería',
    'paisajismo',
    'botánica',
    'fichas botánicas',
    'ciclos OIP y PVO',
    'diseño de canteros',
    'hemisferio sur',
    'registro fenológico',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: SITIO.locale,
    siteName: SITIO.nombre,
    url: '/',
    title: 'Cultura de Jardín — El jardín como acto de presencia',
    description:
      'Taxonomía binomial, láminas botánicas y manejo estacional real para el hemisferio sur. Ciclos OIP y PVO, canteros por estratos y material imprimible.',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Pradera de narcisos naturalizados junto a un arroyo de montaña',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cultura de Jardín — El jardín como acto de presencia',
    description:
      'Taxonomía binomial, láminas botánicas y manejo estacional real para el hemisferio sur.',
    images: [
      { url: '/og.jpg', alt: 'Pradera de narcisos naturalizados junto a un arroyo de montaña' },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export const viewport: Viewport = {
  themeColor: '#07130F',
  width: 'device-width',
  initialScale: 1,
};

/**
 * JSON-LD en un único @graph. Las preguntas se derivan del mismo módulo que
 * pinta la sección 10, así el marcado replica palabra por palabra lo que está
 * en la página — requisito para que Google no lo descarte.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITIO.url}/#org`,
      name: SITIO.nombre,
      slogan: SITIO.lema,
      description:
        'Proyecto editorial de jardinería y paisajismo para el hemisferio sur: bitácora física, láminas botánicas y guías de manejo estacional.',
      url: `${SITIO.url}/`,
      logo: `${SITIO.url}/assets/cj-lockup.png`,
      knowsAbout: [
        'jardinería',
        'paisajismo',
        'botánica',
        'fenología',
        'diseño de canteros',
        'propagación vegetal',
        'ciclos herbáceos OIP y PVO',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITIO.url}/#site`,
      url: `${SITIO.url}/`,
      name: SITIO.nombre,
      inLanguage: SITIO.lang,
      publisher: { '@id': `${SITIO.url}/#org` },
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITIO.url}/#faq`,
      mainEntity: FAQS.map((q) => ({
        '@type': 'Question',
        name: q.p,
        acceptedAnswer: { '@type': 'Answer', text: q.r },
      })),
    },
  ],
};

/**
 * Compuerta previa al pintado. Decide si el telón corre de verdad y sólo
 * entonces oculta masthead, navegación y reveals. El failsafe destraba todo
 * si React nunca llega a montar.
 */
const SCRIPT_COMPUERTA = `(function(){var d=document.documentElement;try{
var q=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var v=false;try{v=sessionStorage.getItem('cj:telon:visto')==='1'}catch(e){}
if(!q){d.setAttribute('data-cj-reveal','1');if(!v){d.setAttribute('data-cj-curtain','corriendo')}}
}catch(e){}
setTimeout(function(){if(!d.hasAttribute('data-cj-vivo')){d.removeAttribute('data-cj-reveal');d.removeAttribute('data-cj-curtain')}},4000);})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITIO.lang} className={`${poppins.variable} ${rouge.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_COMPUERTA }} />
        <a href="#cjHero" className="cj-saltar">
          Saltar al contenido
        </a>
        {children}
        <MotionProvider />
        <Cursor />
      </body>
    </html>
  );
}
