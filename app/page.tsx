import Telon from '@/components/Telon';
import Masthead from '@/components/secciones/Masthead';
import Esencia from '@/components/secciones/Esencia';
import Interludio from '@/components/secciones/Interludio';
import ServiciosCompacto from '@/components/secciones/ServiciosCompacto';
import Pensamiento from '@/components/secciones/Pensamiento';
import Compendio from '@/components/secciones/Compendio';
import Relevo from '@/components/secciones/Relevo';
import Canteros from '@/components/secciones/Canteros';
import Brujula from '@/components/secciones/Brujula';
import Laminas from '@/components/secciones/Laminas';
import ProductosCompacto from '@/components/secciones/ProductosCompacto';
import Historias from '@/components/secciones/Historias';
import Descargas from '@/components/secciones/Descargas';
import Preguntas from '@/components/secciones/Preguntas';

/**
 * Portada. Doce secciones con ancla estable; el detalle de servicios,
 * productos y proceso vive en sus propias páginas, y acá entran compactos
 * para que se entienda la oferta sin salir de la home.
 */
export default function Home() {
  return (
    <>
      <Telon />
      {/* Un solo landmark principal: sin esto las secciones quedan fuera de
          toda región y los lectores de pantalla no pueden saltar entre ellas. */}
      <main id="cjContenido">
        <Masthead />
        <Esencia />
        <Interludio />
        <ServiciosCompacto />
        <Pensamiento />
        <Compendio />
        <Relevo />
        <Canteros />
        <Brujula />
        <Laminas />
        <ProductosCompacto />
        <Historias />
        <Descargas />
        <Preguntas />
      </main>
    </>
  );
}
