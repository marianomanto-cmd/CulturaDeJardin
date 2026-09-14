import type { Metadata } from 'next';
import Link from 'next/link';
import PortadaInterior from '@/components/PortadaInterior';
import Revelar from '@/components/motion/Revelar';
import TextoRevelado from '@/components/motion/TextoRevelado';
import ImagenRevelada from '@/components/motion/ImagenRevelada';
import Magnetico from '@/components/motion/Magnetico';
import { GRUPOS_PRODUCTOS, type GrupoProductos, type Producto } from '@/data/productos';
import { HREF_WA } from '@/data/sitio';

export const metadata: Metadata = {
  title: 'Productos: bitácora, láminas y descargables',
  description:
    'Agenda bitácora de registro fenológico, colección de láminas botánicas de arte naturalista, papelería de semillas y planillas técnicas descargables.',
  alternates: { canonical: '/productos' },
  openGraph: {
    type: 'website',
    url: '/productos',
    title: 'Productos — Cultura de Jardín',
    description:
      'Bitácora de brotes, láminas botánicas con disección anatómica y recursos técnicos descargables.',
  },
};

function Encabezado({ grupo }: { grupo: GrupoProductos }) {
  return (
    <>
      <span className="cj-antetitulo">
        {grupo.num} · {grupo.titulo}
      </span>
      <TextoRevelado como="h2" className="cj-titulo" texto={grupo.titulo} />
      <p className="cj-cuerpo">{grupo.entrada}</p>
    </>
  );
}

function Ficha({ item }: { item: Producto }) {
  return (
    <article className="cj-ficha-producto h-full">
      <h3 className="m-0 text-[18px] font-normal leading-[1.3] text-borgona">{item.titulo}</h3>
      {item.nota ? (
        <span className="cj-script mt-1 block text-[21px] text-pino">{item.nota}</span>
      ) : null}
      <ul className="mt-4 flex list-none flex-col gap-2 p-0">
        {item.detalle.map((d) => (
          <li key={d} className="flex gap-3 text-[13.5px] leading-[1.68] text-tinta-suave">
            <span aria-hidden="true" className="mt-[8px] h-1 w-1 flex-none rounded-full bg-pino" />
            {d}
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Productos() {
  return (
    <main id="cjContenido">
      <PortadaInterior
        antetitulo="Productos"
        partes={[{ texto: 'El puente' }, { texto: 'analógico', enfasis: true }]}
        entrada="Piezas pensadas para durar y para escribirse encima, y recursos digitales que se imprimen y se completan a mano. Todo vuelve al mismo lugar: la mesa de trabajo."
        img="/assets/img/jardin-seco-santolina.webp"
        alt="Láminas botánicas, acuarelas y cuaderno de campo sobre una mesa de trabajo"
      />

      {GRUPOS_PRODUCTOS.map((g, i) => (
        <section
          key={g.slug}
          id={g.slug}
          data-sec={g.slug}
          className={`cj-seccion ${i % 2 === 0 ? 'cj-seccion--papel' : 'cj-seccion--blanco'}`}
        >
          <div className="cj-wrap">
            {g.img ? (
              <div className="grid items-start gap-[clamp(28px,4vw,64px)] grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))]">
                <Revelar className="max-w-[52ch]">
                  <Encabezado grupo={g} />
                  <div className="mt-8">
                    <ImagenRevelada
                      src={g.img}
                      alt={g.alt ?? ''}
                      proporcion="3/2"
                      sizes="(max-width:830px) 100vw, (max-width:1040px) 50vw, 620px"
                      parallax={0.07}
                      zoomHover
                    />
                  </div>
                </Revelar>
                <div className="flex flex-col gap-3.5">
                  {g.items.map((item, j) => (
                    <Revelar key={item.titulo} demora={j * 90}>
                      <Ficha item={item} />
                    </Revelar>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <Revelar className="mb-[clamp(28px,4vw,48px)] max-w-[56ch]">
                  <Encabezado grupo={g} />
                </Revelar>
                <div className="grid gap-3.5 grid-cols-[repeat(auto-fit,minmax(min(100%,272px),1fr))]">
                  {g.items.map((item, j) => (
                    <Revelar key={item.titulo} demora={j * 90} className="h-full">
                      <Ficha item={item} />
                    </Revelar>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      ))}

      <section className="cj-seccion cj-seccion--noche cj-sobre-oscuro">
        <div className="cj-wrap">
          <Revelar className="max-w-[60ch]">
            <span className="cj-antetitulo cj-antetitulo--claro">Disponibilidad</span>
            <TextoRevelado
              como="h2"
              className="cj-titulo cj-titulo--claro"
              texto="Pedidos y consultas"
            />
            <p className="cj-cuerpo cj-cuerpo--claro">
              La bitácora, las carpetas de láminas y los kits de papelería se despachan a pedido.
              Escribinos y te contamos disponibilidad, formatos y envíos. Los descargables gratuitos
              de la bitácora viven en la sección de material imprimible.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Magnetico>
                <a
                  href={HREF_WA}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cj-pildora cj-pildora--solida"
                >
                  Consultar por WhatsApp
                </a>
              </Magnetico>
              <Magnetico>
                <Link href="/#descargas" className="cj-pildora cj-pildora--linea">
                  Material imprimible
                </Link>
              </Magnetico>
            </div>
          </Revelar>
        </div>
      </section>
    </main>
  );
}
