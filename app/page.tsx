import Telon from '@/components/Telon';
import SiteNav from '@/components/SiteNav';
import BotonWhatsApp from '@/components/BotonWhatsApp';
import Masthead from '@/components/secciones/Masthead';
import Esencia from '@/components/secciones/Esencia';
import Interludio from '@/components/secciones/Interludio';
import Pensamiento from '@/components/secciones/Pensamiento';
import Compendio from '@/components/secciones/Compendio';
import Relevo from '@/components/secciones/Relevo';
import Canteros from '@/components/secciones/Canteros';
import Brujula from '@/components/secciones/Brujula';
import Laminas from '@/components/secciones/Laminas';
import Historias from '@/components/secciones/Historias';
import Descargas from '@/components/secciones/Descargas';
import Preguntas from '@/components/secciones/Preguntas';
import Pie from '@/components/secciones/Pie';

/**
 * Página única. Once secciones con ancla estable; todo el texto se renderiza
 * en el servidor y sólo las piezas con estado propio son islas cliente.
 */
export default function Home() {
  return (
    <>
      <Telon />
      <SiteNav />
      {/* Un solo landmark principal: sin esto las once secciones quedan fuera
          de toda región y los lectores de pantalla no pueden saltar entre ellas. */}
      <main id="cjContenido">
        <Masthead />
        <Esencia />
        <Interludio />
        <Pensamiento />
        <Compendio />
        <Relevo />
        <Canteros />
        <Brujula />
        <Laminas />
        <Historias />
        <Descargas />
        <Preguntas />
      </main>
      <Pie />
      <BotonWhatsApp />
    </>
  );
}
