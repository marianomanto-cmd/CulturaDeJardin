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
| LCP en reposo | 276 ms · 1,37 s con 3G rápida y CPU 4× |
| CLS | 0 |
| axe (WCAG 2.2 AA + best practice) | 0 violaciones en escritorio, móvil y menú abierto |
| Peso inicial | ~521 KB · 127 KB de JavaScript |

### Pendientes del cliente

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
  partir del material entregado por el cliente. Carga diferida, silenciado, con
  control de pausa y póster fijo bajo `prefers-reduced-motion`.
