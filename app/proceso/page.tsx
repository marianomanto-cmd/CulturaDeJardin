import type { Metadata } from 'next';
import Link from 'next/link';
import PortadaInterior from '@/components/PortadaInterior';
import Revelar from '@/components/motion/Revelar';
import TextoRevelado from '@/components/motion/TextoRevelado';
import Magnetico from '@/components/motion/Magnetico';
import { ETAPAS } from '@/data/proceso';
import { HREF_WA } from '@/data/sitio';

export const metadata: Metadata = {
  title: 'El proceso: del terreno al registro sostenido',
  description:
    'Cinco etapas: descubrimiento, diagnóstico del terreno con brújula solar y test de sombra, propuesta con croquis y paleta binomial, implementación y registro fenológico continuo.',
  alternates: { canonical: '/proceso' },
  openGraph: {
    type: 'website',
    url: '/proceso',
    title: 'El proceso — Cultura de Jardín',
    description:
      'Cinco etapas, del primer contacto al registro sostenido. Un jardín nunca se da por terminado.',
  },
};

export default function Proceso() {
  return (
    <main id="cjContenido">
      <PortadaInterior
        antetitulo="El proceso"
        partes={[{ texto: 'Un jardín no se da por' }, { texto: 'terminado', enfasis: true }]}
        entrada="Cinco etapas, del primer contacto al registro sostenido. Ninguna empieza antes de que la anterior haya dejado algo escrito: el jardín se decide con datos propios, no con recetas."
        img="/assets/img/pradera-stipa-coreopsis.webp"
        alt="Stipa, coreopsis y salvia junto a una escalinata de piedra"
      />

      <section id="etapas" data-sec="etapas" className="cj-seccion cj-seccion--papel">
        <div className="cj-wrap">
          <ol className="cj-etapas m-0 flex list-none flex-col p-0">
            {ETAPAS.map((e) => (
              <li key={e.num} id={`etapa-${e.num}`} className="cj-etapa">
                <Revelar className="cj-etapa__cuerpo">
                  <span className="cj-etapa__num cj-dato">{e.num}</span>
                  <div className="min-w-0">
                    <TextoRevelado
                      como="h2"
                      className="cj-titulo m-0 mb-4"
                      texto={e.titulo}
                      paso={44}
                    />
                    <p className="cj-cuerpo max-w-[66ch]">{e.texto}</p>
                    {e.detalle ? (
                      <div className="mt-6 grid gap-3.5 grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))]">
                        {e.detalle.map((d) => (
                          <div
                            key={d.rotulo}
                            className="rounded-[3px] border-l-2 border-pino bg-white px-5 py-4"
                          >
                            <span className="cj-etiqueta-filtro mb-1.5 block">{d.rotulo}</span>
                            <span className="block text-[13.5px] leading-[1.7] text-tinta">
                              {d.texto}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </Revelar>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cj-seccion cj-seccion--noche cj-sobre-oscuro">
        <div className="cj-wrap">
          <Revelar className="max-w-[60ch]">
            <span className="cj-antetitulo cj-antetitulo--claro">Empezar</span>
            <TextoRevelado
              como="h2"
              className="cj-titulo cj-titulo--claro"
              texto="La primera etapa es una conversación"
            />
            <p className="cj-cuerpo cj-cuerpo--claro">
              Contanos qué terreno tenés, de dónde le entra el sol y qué esperás de él. Con eso
              alcanza para saber por dónde conviene empezar.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
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
              <Magnetico>
                <Link href="/servicios" className="cj-pildora cj-pildora--linea">
                  Ver los servicios
                </Link>
              </Magnetico>
            </div>
          </Revelar>
        </div>
      </section>
    </main>
  );
}
