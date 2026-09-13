import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/** El telón corre una vez por sesión; para auditar se salta. */
async function saltarTelon(page: Page) {
  await page.addInitScript(() => {
    try {
      sessionStorage.setItem('cj:telon:visto', '1');
    } catch {
      /* modo privado */
    }
  });
}

/** Recorre la página entera para disparar reveals e imágenes diferidas. */
async function recorrer(page: Page) {
  await page.evaluate(async () => {
    const alto = document.documentElement.scrollHeight;
    for (let y = 0; y < alto; y += window.innerHeight * 0.7) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 160));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
  await page.waitForTimeout(600);
}

test.describe('Cultura de Jardín', () => {
  test('no deja violaciones de accesibilidad', async ({ page }) => {
    await saltarTelon(page);
    await page.goto('/');
    await recorrer(page);
    const r = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
      .analyze();
    expect(r.violations.map((v) => `${v.id} (${v.nodes.length})`)).toEqual([]);
  });

  test('el contenido no depende del telón ni del JavaScript de movimiento', async ({ browser }) => {
    const ctx = await browser.newContext({ javaScriptEnabled: false });
    const page = await ctx.newPage();
    await page.goto('/');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByText('Fichas botánicas binomiales')).toBeVisible();
    // Las doce fichas salen del servidor: sin JS siguen estando.
    await expect(page.getByRole('heading', { name: 'Farfugium japonicum' })).toBeVisible();
    await expect(page.locator('#cjCurtain')).toBeHidden();
    await ctx.close();
  });

  test('con reduced-motion el telón no corre y todo se ve de entrada', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto('/');
    await page.waitForTimeout(900);
    await expect(page.locator('#cjCurtain')).toBeHidden();
    await expect(page.locator('#cjHeroTxt')).toHaveCSS('opacity', '1');
    await ctx.close();
  });

  test('el compendio filtra y avisa cuando no queda ninguna ficha', async ({ page }) => {
    await saltarTelon(page);
    await page.goto('/');
    await page.locator('#compendio').scrollIntoViewIfNeeded();
    await expect(page.getByText('12 / 12 fichas')).toBeVisible();
    await page.getByRole('button', { name: 'Sombra profunda', exact: true }).click();
    await expect(page.getByText('2 / 12 fichas')).toBeVisible();
    await page.getByRole('button', { name: 'PVO', exact: true }).click();
    await expect(page.getByText('1 / 12 fichas')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Hydrangea macrophylla' })).toBeVisible();
    await page.getByRole('button', { name: 'OIP', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Farfugium japonicum' })).toBeVisible();
    await page.getByRole('button', { name: 'Todas', exact: true }).click();
    await page.getByRole('button', { name: 'Todos', exact: true }).click();
    await expect(page.getByText('12 / 12 fichas')).toBeVisible();
  });

  test('el calendario de relevo responde al mes elegido', async ({ page }) => {
    await saltarTelon(page);
    await page.goto('/');
    await page.locator('#relevo').scrollIntoViewIfNeeded();
    await expect(page.getByText('5 especies en escena · 1 PVO y 4 OIP')).toBeVisible();
    await page.getByRole('button', { name: 'Enero', exact: true }).click();
    await expect(page.getByText('9 especies en escena · 8 PVO y 1 OIP')).toBeVisible();
  });

  test('la brújula funciona con flechas del teclado', async ({ page }) => {
    await saltarTelon(page);
    await page.goto('/');
    await page.locator('#brujula').scrollIntoViewIfNeeded();
    const norte = page.getByRole('tab', { name: 'Norte' });
    await norte.focus();
    await expect(norte).toHaveAttribute('aria-selected', 'true');
    await page.keyboard.press('ArrowRight');
    await expect(page.getByRole('tab', { name: 'Este', exact: true })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    await expect(page.getByText('Este — sol naciente, suave')).toBeVisible();
    await page.keyboard.press('ArrowLeft');
    await expect(norte).toHaveAttribute('aria-selected', 'true');
  });

  test('el acordeón abre y cierra una sola respuesta por vez', async ({ page }) => {
    await saltarTelon(page);
    await page.goto('/');
    await page.locator('#preguntas').scrollIntoViewIfNeeded();
    const botones = page.locator('#preguntas button[aria-expanded]');
    await expect(botones).toHaveCount(8);
    await botones.first().click();
    await expect(botones.first()).toHaveAttribute('aria-expanded', 'true');
    await botones.nth(1).click();
    await expect(botones.first()).toHaveAttribute('aria-expanded', 'false');
    await expect(botones.nth(1)).toHaveAttribute('aria-expanded', 'true');
  });

  test('el menú móvil atrapa el foco y cierra con Escape', async ({ page }, info) => {
    test.skip(info.project.name !== 'movil', 'sólo aplica bajo el quiebre de 1040 px');
    await saltarTelon(page);
    await page.goto('/');
    const burger = page.getByRole('button', { name: 'Abrir menú' });
    await burger.click();
    await expect(page.getByRole('button', { name: 'Cerrar menú' })).toBeVisible();
    await expect(page.locator('#cjMenu')).toHaveAttribute('data-abierto', '1');
    await page.keyboard.press('Escape');
    await expect(page.locator('#cjMenu')).toHaveAttribute('data-abierto', '0');
    await expect(burger).toBeFocused();
  });

  test('el SEO estructural está en el HTML del servidor', async ({ request }) => {
    const html = await (await request.get('/')).text();
    expect(html).toContain('lang="es-AR"');
    expect((html.match(/<h1/g) ?? []).length).toBe(1);
    expect(html).toContain('"@type":"FAQPage"');
    expect(html).toContain('OIP designa a las herbáceas activas');
    expect(html).toContain('rel="canonical"');
    // Las ocho preguntas del marcado replican las de la página.
    expect((html.match(/"@type":"Question"/g) ?? []).length).toBe(8);
    const robots = await (await request.get('/robots.txt')).text();
    expect(robots).toContain('GPTBot');
    expect(robots).toContain('ClaudeBot');
    const llms = await (await request.get('/llms.txt')).text();
    expect(llms).toContain('# Cultura de Jardín');
    const sitemap = await (await request.get('/sitemap.xml')).text();
    expect(sitemap).toContain('<loc>');
  });

  test('las anclas internas mueven el foco y escriben el hash', async ({ page }) => {
    await saltarTelon(page);
    await page.goto('/');
    await page.waitForTimeout(600);

    // El enlace de salto tiene que saltear de verdad.
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Saltar al contenido' })).toBeFocused();
    await page.keyboard.press('Enter');
    await page.waitForTimeout(900);
    expect(await page.evaluate(() => document.activeElement?.id)).toBe('cjHero');

    // Un ancla del cuerpo: foco al destino y hash en la URL. Se usa la del pie
    // porque la barra se retira al bajar y su enlace queda fuera de pantalla.
    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);
    await page.locator('footer').getByRole('link', { name: 'Compendio taxonómico' }).click();
    await page.waitForTimeout(1200);
    expect(await page.evaluate(() => document.activeElement?.id)).toBe('compendio');
    expect(new URL(page.url()).hash).toBe('#compendio');
  });

  test('el telón deja el resto del sitio fuera del tabulador mientras corre', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(900);
    await expect(page.locator('#cjCurtain')).toBeVisible();
    const estado = await page.evaluate(() => ({
      main: document.querySelector('main')?.hasAttribute('inert'),
      nav: document.getElementById('cjNav')?.hasAttribute('inert'),
      pie: document.querySelector('footer')?.hasAttribute('inert'),
    }));
    expect(estado).toEqual({ main: true, nav: true, pie: true });

    // «Saltar intro» abre los paneles de verdad, no corta sobre negro.
    await page.getByRole('button', { name: 'Saltar intro' }).click();
    await page.waitForTimeout(250);
    const paneles = await page.evaluate(() => ({
      top: getComputedStyle(document.getElementById('cjTop')!).transform,
      inerteMain: document.querySelector('main')?.hasAttribute('inert'),
    }));
    expect(paneles.top).not.toBe('none');
    expect(paneles.inerteMain).toBe(false);
    await page.waitForTimeout(1600);
    await expect(page.locator('#cjCurtain')).toBeHidden();
  });

  test('el menú móvil devuelve el foco a la hamburguesa y la incluye en el ciclo', async ({
    page,
  }, info) => {
    test.skip(info.project.name !== 'movil', 'sólo aplica bajo el quiebre de 1040 px');
    await saltarTelon(page);
    await page.goto('/');
    const burger = page.getByRole('button', { name: 'Abrir menú' });
    await burger.click();
    // Tabular hasta el final del ciclo tiene que volver a la hamburguesa.
    const focosDelCiclo: string[] = [];
    for (let i = 0; i < 13; i += 1) {
      await page.keyboard.press('Tab');
      focosDelCiclo.push(
        await page.evaluate(() => document.activeElement?.getAttribute('aria-label') ?? ''),
      );
    }
    expect(focosDelCiclo).toContain('Cerrar menú');
  });

  test('con reduced-motion el compendio filtra sin dejar las fichas invisibles', async ({
    browser,
  }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto('/');
    await page.locator('#compendio').scrollIntoViewIfNeeded();
    await page.getByRole('button', { name: 'Pleno sol', exact: true }).click();
    await page.waitForTimeout(500);
    const opacidades = await page.evaluate(() =>
      [...document.querySelectorAll('#compendio article')].map((a) =>
        Number(getComputedStyle(a).opacity),
      ),
    );
    expect(opacidades.length).toBeGreaterThan(0);
    expect(Math.min(...opacidades)).toBe(1);
    await ctx.close();
  });

  test('con reduced-motion la galería de láminas se puede recorrer', async ({ browser }) => {
    const ctx = await browser.newContext({ reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    await page.goto('/');
    await page.locator('#laminas').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    const cinta = await page.evaluate(() => {
      const w = document.querySelector('.cj-marquesina-wrap') as HTMLElement;
      return {
        overflowX: getComputedStyle(w).overflowX,
        desplazable: w.scrollWidth > w.clientWidth,
      };
    });
    expect(cinta.overflowX).toBe('auto');
    expect(cinta.desplazable).toBe(true);
    await ctx.close();
  });

  test('el móvil recibe la variante liviana del video', async ({ page }, info) => {
    test.skip(info.project.name !== 'movil', 'la variante chica es sólo hasta 640 px');
    await saltarTelon(page);
    await page.goto('/');
    await page.locator('#esencia').scrollIntoViewIfNeeded();
    await page.waitForTimeout(600);
    await page.mouse.wheel(0, 1800);
    await page.waitForTimeout(2500);
    const src = await page.evaluate(() => document.querySelector('video')?.currentSrc ?? '');
    expect(src).toContain('pradera-sm.');
  });

  test('las cuatro orientaciones de la brújula salen del servidor', async ({ request }) => {
    const html = await (await request.get('/')).text();
    for (const t of [
      'Norte — la orientación más generosa',
      'Este — sol naciente, suave',
      'Sur — sombra fresca y estable',
      'Oeste — la radiación exigente',
    ]) {
      expect(html).toContain(t);
    }
    // Y los cuatro paneles tienen id propio: uno compartido sería id duplicado.
    expect((html.match(/id="brujula-panel-/g) ?? []).length).toBe(4);
  });

  test('el menú móvil se puede recorrer en una pantalla baja', async ({ browser }, info) => {
    test.skip(info.project.name !== 'movil', 'sólo aplica bajo el quiebre de 1040 px');
    const ctx = await browser.newContext({ viewport: { width: 390, height: 600 } });
    const page = await ctx.newPage();
    await saltarTelon(page);
    await page.goto('/');
    await page.getByRole('button', { name: 'Abrir menú' }).click();
    await page.waitForTimeout(600);
    const panel = page.locator('#cjMenu');
    await expect(panel).toHaveCSS('overflow-y', 'auto');
    // El CTA del final tiene que ser alcanzable de verdad.
    const cta = page.getByRole('link', { name: 'Sumarme por WhatsApp' });
    await cta.scrollIntoViewIfNeeded();
    await expect(cta).toBeInViewport();
    await ctx.close();
  });

  test('el botón flotante no tapa la última línea del pie', async ({ page }) => {
    await saltarTelon(page);
    await page.goto('/');
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForTimeout(900);
    const solapa = await page.evaluate(() => {
      const fab = document.getElementById('cjWa')!.getBoundingClientRect();
      const linea = [...document.querySelectorAll('footer span')]
        .find((s) => s.textContent?.includes('Poppins'))!
        .getBoundingClientRect();
      const x = Math.max(0, Math.min(fab.right, linea.right) - Math.max(fab.left, linea.left));
      const y = Math.max(0, Math.min(fab.bottom, linea.bottom) - Math.max(fab.top, linea.top));
      return (x * y) / (linea.width * linea.height);
    });
    expect(solapa).toBe(0);
  });

  test('ningún objetivo interactivo baja del mínimo de 24×24 (WCAG 2.5.8)', async ({ page }) => {
    await saltarTelon(page);
    await page.goto('/');
    await recorrer(page);
    const chicos = await page.evaluate(() => {
      const malos: string[] = [];
      document.querySelectorAll('a, button').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) return;
        const cs = getComputedStyle(el);
        if (cs.display === 'inline') return; // enlaces dentro de párrafos
        if (r.height < 24 || r.width < 24) {
          malos.push(
            `${el.tagName}.${(el.className || '').toString().slice(0, 30)} ${Math.round(r.width)}×${Math.round(r.height)}`,
          );
        }
      });
      return malos;
    });
    expect(chicos).toEqual([]);
  });
});
