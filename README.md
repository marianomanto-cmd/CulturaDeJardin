# Cultura de Jardín

Sitio single page, mobile first. Next.js 15 (App Router) · React 19 · TypeScript
estricto · Tailwind v4 · Lenis.

Implementación del paquete de handoff v1.0 (septiembre 2026): once secciones que
se dinamizan al scroll, precedidas por un telón de entrada que entinta el
monograma y se abre hacia el masthead. Toda la navegación es interna por anclas.

## Puesta en marcha

```bash
npm install
cp .env.example .env.local     # número de WhatsApp y origen canónico
npm run dev                    # http://localhost:3000
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | servidor de desarrollo |
| `npm run build` / `npm start` | build de producción y su servidor |
| `npm run typecheck` | `tsc --noEmit` con strict + `noUncheckedIndexedAccess` |
| `npm run lint` | ESLint (config de Next) |
| `npm run format` | Prettier |
| `npm test` | suite de Playwright: axe, teclado, sin JS, reduced-motion, SEO |
| `npm run analyze` | build con el analizador de bundle |

La suite usa el Chromium ya instalado en el contenedor
(`/opt/pw-browsers/chromium`); no descarga navegadores. Para apuntarla a otro
origen: `BASE=https://… npx playwright test`.

## Variables de entorno

| Variable | Para qué |
|---|---|
| `NEXT_PUBLIC_WHATSAPP` | número en formato internacional sin signos |
| `NEXT_PUBLIC_SITE_URL` | origen canónico: alimenta metadatos, JSON-LD, sitemap y robots |

## Estructura

```
app/
  layout.tsx        fuentes, metadatos, JSON-LD y la compuerta previa al pintado
  page.tsx          las once secciones dentro de un único <main>
  globals.css       tokens de marca en @theme y el sistema de clases .cj-*
  robots.ts         permite explícitamente GPTBot, ClaudeBot, PerplexityBot…
  sitemap.ts        una sola URL canónica: las secciones son fragmentos
components/
  Telon.tsx         secuencia de entrada, una vez por sesión
  SiteNav.tsx       navegación; el quiebre de 1040 px lo resuelve CSS
  Acordeon.tsx      isla cliente de la sección de interrogantes
  motion/           primitivas de movimiento (ver abajo)
  secciones/        una por sección de la página
data/               fichas, contenido editorial y datos del sitio
tests/              suite de Playwright y scripts de medición
```

## Sistema de movimiento

Un solo `requestAnimationFrame` (`components/motion/MotionProvider.tsx`)
concentra Lenis, el pintado por frame y el `IntersectionObserver` compartido.
Todo lo visual vive en CSS; el JavaScript sólo escribe atributos.

| Primitiva | Efecto |
|---|---|
| `Revelar` | la pieza sube 26 px y aparece |
| `TextoRevelado` | titular revelado palabra por palabra, cada una en su máscara |
| `ImagenRevelada` | cortina de `clip-path` + escala que se suelta, con parallax opcional |
| `Magnetico` | atracción del puntero, sólo con mouse fino |
| `Contador` | conteo ascendente al entrar en pantalla |
| `Cursor` | anillo que sigue al puntero sin ocultar el cursor del sistema |

Tres decisiones que conviene conocer antes de tocar esto:

- **El `clip-path` nunca va en el elemento observado.** Recorta también el
  rectángulo que mide el `IntersectionObserver`: la razón de intersección queda
  en cero, el reveal no se dispara nunca y la foto no aparece más. Por eso
  `ImagenRevelada` observa el envoltorio y recorta una capa interna.
- **La máscara de cada palabra recorta los dos ejes.** `overflow: hidden` no se
  puede limitar a la vertical: si un eje deja de ser `visible`, el otro pasa a
  `auto`. El rasgo descendente de la «p» de Rouge Script se va de costado, no
  sólo hacia abajo, así que `.cj-palabra` lleva relleno en los cuatro lados con
  margen negativo que devuelve el borde exacto. El valor sale de medir: contra
  el mismo texto sin máscara, 0,2em laterales ya dan cero píxeles de diferencia.
  Si se cambia el relleno inferior hay que revisar el viaje de la palabra
  (`translate3d(0, 170%, 0)`), que tiene que superar la caja completa.
- **El estado oculto sólo se aplica bajo `html[data-cj-reveal]`**, atributo que
  pone un script bloqueante en el `<head>` y que un failsafe retira si React no
  llega a montar. Sin JavaScript no se oculta nada.
- **Las clases propias viven en `@layer components`**, para que las utilidades
  de Tailwind sigan ganando cuando una sección las usa.

`prefers-reduced-motion` apaga el telón, los reveals, el parallax, la marquesina
y el cursor. El contenido no depende de ninguno de ellos.

## Estado de la entrega

Medido sobre el build de producción, escritorio 1440×900:

| | |
|---|---|
| LCP en reposo | 284 ms · 1,31 s con 3G rápida y CPU 4× |
| CLS | 0 |
| axe (WCAG 2.2 AA + best practice) | 0 violaciones en escritorio, móvil y menú abierto |
| Peso inicial | ~588 KB · 127 KB de JavaScript |

### Fotografías: el paquete topa en 1600 px

Los doce archivos entregados miden 1600 px de ancho como máximo (uno, 1536) y
venían en WebP con calidad 0,76. Los originales que menciona el handoff —JPEG de
300 dpi, entre 2 y 8 MB— no vinieron en el paquete.

Qué se hizo con lo que hay:

- Los masters se volvieron a codificar en WebP calidad 95 con un realce suave.
  Su peso no viaja al visitante: son sólo la entrada de `next/image`, así que
  conviene guardarlos lo más limpios posible.
- La calidad de entrega subió de 76 a 92. A 76, el AVIF empastaba el follaje y
  la grava; el salto se nota en cualquier foto con textura fina.
- La marquesina de láminas pedía el candidato de 1920 px para cajas de 380 px:
  Chrome elige el mayor del `srcset` cuando la figura queda fuera de pantalla en
  horizontal, sin importar lo que diga `sizes`. Se resolvió con medida
  intrínseca (`anchoFijo`), que acota el `srcset` a 1x/2x. Son unos 3 MB menos.

**Lo que no se puede resolver desde acá:** el masthead ocupa el ancho completo,
así que en una pantalla retina de 1440 px pide 2880 px y el archivo tiene 1600.
Para que el hero se vea nítido en retina hacen falta los originales.

### Pendientes del cliente

0. **Fotografías originales** en su resolución completa, sobre todo la del
   masthead.
1. **Láminas botánicas definitivas.** La galería usa fotografías de las especies;
   las ilustraciones anatómicas entran en el mismo slot 3:4 sin tocar el layout.
2. **PDFs de las cuatro descargas.** Hoy las tarjetas informan
   «Disponible próximamente». No son enlaces: un enlace que no lleva a ningún
   lado es una trampa de accesibilidad.
3. **Endpoint del alta de newsletter.** El formulario del pie valida y avisa que
   todavía no hay backend conectado; nunca simula un alta que no ocurrió.

### Fotografías: los nombres de archivo no coinciden con su contenido

Al auditar las doce imágenes del paquete contra el manifiesto de la sección 07
del handoff aparecieron varias que muestran algo distinto de lo que su nombre y
su texto alternativo declaraban. Los archivos se conservan con su nombre
original; lo que se corrigió fue **a qué slot va cada foto y qué dice su `alt`**,
porque un alt que describe otra cosa es un defecto de accesibilidad y de SEO.

| Archivo | Qué muestra en realidad |
|---|---|
| `hero-muro-iris` | pradera de narcisos naturalizados junto a un arroyo |
| `iris-germanica` | Achillea millefolium amarilla con follaje grisáceo |
| `pradera-salvias` | cantero de vereda con alstroemerias y arbustos |
| `jardin-seco-santolina` | láminas botánicas y cuaderno sobre mesa de trabajo |
| `laminas-mesa-trabajo` | cantero elevado sobre muro de piedra |
| `lilium-macizo` | Iris germanica púrpura en floración |
| `narcissus-poeticus` | jardín seco con santolinas y gravas |
| `achillea-millefolium` | borde seco de follaje gris |

Los otros cuatro (`pradera-stipa-coreopsis`, `estrato-fondo-aguaribay`,
`estrato-borde-graminieas`, `salvia-leucantha`) sí coinciden.

Conviene renombrar los archivos en origen. Mientras tanto, cada pie de la
galería apunta a la foto que de verdad muestra esa especie.

## Desvíos respecto del handoff, y por qué

- **Sin `motion`/framer.** Todas las transiciones del prototipo son de CSS y el
  reveal es un `IntersectionObserver` compartido, como pide la propia sección 02
  del handoff. Declararlas en React habría empujado al cliente secciones que hoy
  se renderizan enteras en el servidor, que es justo lo que el documento pide
  evitar para el SEO.
- **El quiebre de 1040 px lo resuelve CSS**, no un `resize` en JavaScript: el
  HTML del servidor sirve para cualquier ancho y no hay desajuste de hidratación.
- **El header se retira al bajar y vuelve al subir**, además del estado papel con
  blur pasado el 78 % del masthead que especifica el handoff.
- **Botón «Saltar intro»** en el telón: 5,9 s de espera forzada es mucho. Escape
  también lo cierra.
- **El acordeón mide la altura real** en vez del `max-height: 460px` del
  prototipo, que recorta respuestas largas en pantallas angostas.
- **Contraste.** Varios textos de 9–11,5 px del prototipo no llegaban a 4,5:1.
  Se oscureció `--color-gris-dato` (`#8a8177` → `#726a5e`), se agregó
  `--color-oip-claro` (`#d9849b`) para el rótulo de ciclo sobre fondo noche y se
  subieron las opacidades de los rótulos del pie.
- **Interludio en video** entre el manifiesto y el pensamiento jardinero, a
  partir del material entregado por el cliente, recortado antes del rótulo
  «muy pronto». Carga diferida, silenciado y póster fijo bajo
  `prefers-reduced-motion`. Va **sin control de pausa** por decisión de diseño:
  el criterio 2.2.2 de WCAG pide un mecanismo para detener el movimiento
  automático de más de cinco segundos, y acá lo único que lo cubre es
  `prefers-reduced-motion`. Si hiciera falta cumplirlo de forma estricta, el
  control puede volver mostrándose sólo al pasar el puntero o al recibir foco.
