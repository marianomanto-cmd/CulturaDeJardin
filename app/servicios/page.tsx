import type { Metadata } from 'next';
import Link from 'next/link';
import PortadaInterior from '@/components/PortadaInterior';
import Revelar from '@/components/motion/Revelar';
import TextoRevelado from '@/components/motion/TextoRevelado';
import ImagenRevelada from '@/components/motion/ImagenRevelada';
import Magnetico from '@/components/motion/Magnetico';
import { SERVICIOS } from '@/data/servicios';
import { HREF_WA, SITIO } from '@/data/sitio';

export const metadata: Metadata = {
  title: 'Servicios: diseño de canteros, relevo y talleres',
  description:
    'Asesoría y diseño de canteros por estratos, planificación fenológica con ciclos OIP y PVO, y formación en botánica aplicada, multiplicación y podas. Hemisferio sur.',
  alternates: { canonical: '/servicios' },
  openGraph: {
    type: 'website',
    url: '/servicios',
    title: 'Servicios — Cultura de Jardín',
    description:
      'Diseño de canteros por estratos, calendarios de relevo OIP / PVO y talleres de botánica aplicada.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': SERVICIOS.map((s) => ({
    '@type': 'Service',
    '@id': `${SITIO.url}/servicios#${s.slug}`,
    name: s.titulo,
    description: s.descripcion,
    serviceType: s.titulo,
    areaServed: 'Argentina',
    audience: { '@type': 'Audience', audienceType: s.destinatarios },
    provider: { '@id': `${SITIO.url}/#org` },
  })),
};

export default function Servicios() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main id="cjContenido">
        <PortadaInterior
          antetitulo="Servicios"
          partes={[{ texto: 'El jardín como' }, { texto: 'proyecto', enfasis: true }]}
          entrada="Tres formas de trabajar un terreno: diseñarlo por estratos, sincronizar su relevo estacional, o aprender a sostenerlo con las manos. Se pueden tomar por separado o encadenados."
          img="/assets/img/estrato-borde-graminieas.webp"
          alt="Gramíneas y cubresuelos florecidos detrás de un cerco de cadena"
        />

        {SERVICIOS.map((s, i) => (
          <section
            key={s.slug}
            id={s.slug}
            data-sec={s.slug}
            className={`cj-seccion ${i % 2 === 0 ? 'cj-seccion--papel' : 'cj-seccion--blanco'}`}
          >
            <div className="cj-wrap">
              <div
                className={`grid items-start gap-[clamp(28px,4vw,64px)] grid-cols-[repeat(auto-fit,minmax(min(100%,330px),1fr))] ${
                  i % 2 === 1 ? 'md:[&>*:first-child]:order-2' : ''
                }`}
              >
                <Revelar>
                  <span className="cj-antetitulo">
                    {s.num} · {s.subtitulo ?? 'Servicio'}
                  </span>
                  <TextoRevelado como="h2" className="cj-titulo" texto={s.titulo} />
                  <p className="cj-cuerpo max-w-[58ch]">{s.descripcion}</p>

                  <h3 className="cj-etiqueta-filtro mt-9 block">Qué incluye</h3>
                  <ul className="mt-4 flex list-none flex-col gap-2.5 p-0">
                    {s.incluye.map((linea) => (
                      <li
                        key={linea}
                        className="flex gap-3 text-[14.5px] leading-[1.7] text-tinta-suave"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[9px] h-1 w-1 flex-none rounded-full bg-pino"
                        />
                        {linea}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-8 border-l-2 border-pino bg-white px-5 py-4 text-[13.5px] leading-[1.7] text-tinta">
                    <span className="cj-etiqueta-filtro mb-1.5 block">Para quién</span>
                    {s.destinatarios}
                  </p>
                </Revelar>

                <Revelar demora={110}>
                  <ImagenRevelada
                    src={s.img}
                    alt={s.alt}
                    proporcion="4/5"
                    sizes="(max-width:830px) 100vw, (max-width:1040px) 50vw, 640px"
                    parallax={0.07}
                    zoomHover
                  />
                </Revelar>
              </div>
            </div>
          </section>
        ))}

        <section className="cj-seccion cj-seccion--borgona cj-sobre-oscuro">
          <div className="cj-wrap">
            <Revelar className="max-w-[60ch]">
              <span className="cj-antetitulo cj-antetitulo--rosa">Cómo seguimos</span>
              <TextoRevelado
                como="h2"
                className="cj-titulo cj-titulo--claro"
                texto="Todo empieza por leer el lugar"
              />
              <p className="cj-cuerpo cj-cuerpo--rosa">
                Antes de proponer una sola especie hay que saber de dónde viene la luz y qué suelo
                hay debajo. El proceso completo, de la primera conversación al registro sostenido,
                está detallado en cinco etapas.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Magnetico>
                  <Link href="/proceso" className="cj-pildora cj-pildora--linea">
                    Ver el proceso
                  </Link>
                </Magnetico>
                <Magnetico>
                  <a
                    href={HREF_WA}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cj-pildora cj-pildora--solida"
                  >
                    Escribirnos
                  </a>
                </Magnetico>
              </div>
            </Revelar>
          </div>
        </section>
      </main>
    </>
  );
}
