import ImagenRevelada from '@/components/motion/ImagenRevelada';
import Revelar from '@/components/motion/Revelar';
import TextoRevelado from '@/components/motion/TextoRevelado';

export default function Esencia() {
  return (
    <section id="esencia" data-sec="esencia" className="cj-seccion cj-seccion--papel">
      <div className="cj-wrap">
        <Revelar className="mb-[clamp(34px,5vw,62px)] flex flex-wrap items-baseline gap-[18px]">
          <TextoRevelado
            como="h2"
            className="cj-script cj-script--grande"
            texto="Nuestra esencia"
            paso={70}
          />
          <span className="cj-antetitulo">01 · Manifiesto</span>
        </Revelar>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] items-start gap-[clamp(28px,4vw,64px)]">
          <Revelar className="flex flex-col gap-[22px]">
            <p className="text-[length:clamp(17px,2vw,22px)] font-light leading-[1.62] text-tinta">
              Cultura de Jardín nace de la convicción de que un jardín es mucho más que un espacio
              verde. Es un refugio cotidiano, un lugar donde el tiempo encuentra otro ritmo y donde
              el cuidado se transforma en un acto de presencia.
            </p>
            <p className="cj-cuerpo">
              Para quienes viven esta cultura, plantar, observar, aprender y esperar forman parte de
              un mismo proceso. Cada brote es un descubrimiento, cada estación una oportunidad para
              volver a empezar y cada jardín una expresión única de quien lo habita.
            </p>
            <span aria-hidden="true" className="my-[6px] block h-[2px] w-full bg-[#00483C]" />
            <p className="cj-cuerpo">
              La marca celebra a quienes encuentran en la naturaleza su cable a tierra; a quienes
              convierten el jardín en un espacio de contemplación, inspiración y bienestar. Porque
              la naturaleza, en su aparente simpleza, posee una belleza inmensa capaz de transformar
              la manera en que vivimos nuestro día a día.
            </p>
            <p className="cj-cuerpo">
              Más que una herramienta de organización, Cultura de Jardín propone una forma de
              relacionarse con el mundo: con curiosidad, paciencia y respeto por los tiempos de la
              naturaleza.
            </p>
          </Revelar>

          <Revelar demora={120} className="flex flex-col gap-[18px]">
            <ImagenRevelada
              src="/assets/img/lilium-macizo.webp"
              alt="Iris germanica púrpura en floración sobre su mata de hojas ensiformes"
              proporcion="4/5"
              sizes="(max-width:1040px) 100vw, 640px"
              parallax={0.08}
              zoomHover
            />
            <blockquote className="border-l-2 border-pino bg-white px-6 py-[22px]">
              {/* El cuerpo manuscrito de la cita no coincide con ningún .cj-script--*: va medida propia. */}
              <p
                className="cj-script"
                style={{ fontSize: 'clamp(21px, 2.6vw, 29px)', lineHeight: 1.35 }}
              >
                “Un jardín no es solo un lugar que se cultiva; es una forma de habitar el mundo.”
              </p>
            </blockquote>
          </Revelar>
        </div>
      </div>
    </section>
  );
}
