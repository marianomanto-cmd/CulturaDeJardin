import Revelar from '@/components/motion/Revelar';
import TextoRevelado from '@/components/motion/TextoRevelado';
import { Acordeon, ItemAcordeon } from '@/components/Acordeon';
import { FAQS } from '@/data/contenido';

/**
 * Sección de servidor con isla cliente: las ocho respuestas viajan completas
 * en el HTML —es lo que leen buscadores y modelos— y sólo la apertura del
 * acordeón es interactiva. Alimenta el bloque FAQPage del JSON-LD.
 */
export default function Preguntas() {
  return (
    <section id="preguntas" data-sec="preguntas" className="cj-seccion cj-seccion--blanco">
      <div className="cj-wrap">
        <Revelar className="mb-[clamp(30px,4vw,48px)] max-w-[58ch]">
          <span className="cj-antetitulo">10 · Interrogantes Clave</span>
          <TextoRevelado como="h2" className="cj-titulo" texto="Las dudas reales del cultivador" />
        </Revelar>

        <Acordeon>
          {FAQS.map((q, i) => (
            <ItemAcordeon key={q.p} indice={i} grupo={q.grupo} pregunta={q.p}>
              <p className="mb-[22px] mt-0 max-w-[76ch] text-sm leading-[1.8] text-tinta-suave">
                {q.r}
              </p>
            </ItemAcordeon>
          ))}
        </Acordeon>
      </div>
    </section>
  );
}
