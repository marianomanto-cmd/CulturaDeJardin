import { chromium } from '@playwright/test';
import { mkdirSync } from 'node:fs';

const BASE = process.env.BASE || 'http://localhost:3000';
const OUT =
  process.env.OUT ||
  '/tmp/claude-0/-home-user-CulturaDeJardin/66568d8a-2a03-5c0c-981f-792947bd46dd/scratchpad/qa';
mkdirSync(OUT, { recursive: true });

const errores = [];

async function nuevaPagina(browser, viewport, opts = {}) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1, ...opts });
  const page = await ctx.newPage();
  page.on('console', (m) => {
    if (m.type() === 'error') errores.push(`[console ${viewport.width}] ${m.text()}`);
  });
  page.on('pageerror', (e) => errores.push(`[pageerror ${viewport.width}] ${e.message}`));
  page.on('requestfailed', (r) => {
    const u = r.url();
    if (!u.startsWith(BASE)) return;
    errores.push(`[404? ${viewport.width}] ${u} — ${r.failure()?.errorText}`);
  });
  return { ctx, page };
}

const saltarTelon = `try{sessionStorage.setItem('cj:telon:visto','1')}catch(e){}`;

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

  // ---- 1 · Secuencia del telón, desktop -------------------------------
  {
    const { ctx, page } = await nuevaPagina(browser, { width: 1440, height: 900 });
    await page.goto(BASE, { waitUntil: 'domcontentloaded' });
    for (const t of [400, 1200, 2400, 3300, 3900, 4700, 5400, 6400]) {
      await page.waitForTimeout(t - (page.__t || 0));
      page.__t = t;
      await page.screenshot({ path: `${OUT}/telon-${String(t).padStart(4, '0')}.png` });
    }
    await ctx.close();
  }

  // ---- 2 · Página completa, desktop y mobile ---------------------------
  for (const [nombre, vp] of [
    ['desk', { width: 1440, height: 900 }],
    ['movil', { width: 390, height: 844 }],
  ]) {
    const { ctx, page } = await nuevaPagina(browser, vp, {
      isMobile: nombre === 'movil',
      hasTouch: nombre === 'movil',
    });
    await page.addInitScript(saltarTelon);
    await page.goto(BASE, { waitUntil: 'load' });
    await page.waitForTimeout(800);

    // Recorre la página para disparar todos los reveals y las imágenes lazy.
    await page.evaluate(async () => {
      const alto = document.documentElement.scrollHeight;
      for (let y = 0; y < alto; y += window.innerHeight * 0.6) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 220));
      }
      window.scrollTo(0, 0);
      await new Promise((r) => setTimeout(r, 500));
    });
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/${nombre}-completa.png`, fullPage: true });

    // Recortes por sección.
    for (const id of [
      'cjHero',
      'esencia',
      'pensamiento',
      'compendio',
      'relevo',
      'canteros',
      'brujula',
      'laminas',
      'historias',
      'descargas',
      'preguntas',
    ]) {
      const el = page.locator(`#${id}`);
      if (await el.count()) {
        await el.scrollIntoViewIfNeeded();
        await page.waitForTimeout(450);
        await page.screenshot({ path: `${OUT}/${nombre}-${id}.png` });
      }
    }
    await ctx.close();
  }

  // ---- 3 · Estados interactivos ---------------------------------------
  {
    const { ctx, page } = await nuevaPagina(
      browser,
      { width: 390, height: 844 },
      { isMobile: true, hasTouch: true },
    );
    await page.addInitScript(saltarTelon);
    await page.goto(BASE, { waitUntil: 'load' });
    await page.waitForTimeout(600);
    await page.getByRole('button', { name: 'Abrir menú' }).click();
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${OUT}/movil-menu.png` });
    await page.keyboard.press('Escape');
    await page.waitForTimeout(400);
    await ctx.close();
  }
  {
    const { ctx, page } = await nuevaPagina(browser, { width: 1440, height: 900 });
    await page.addInitScript(saltarTelon);
    await page.goto(BASE, { waitUntil: 'load' });
    await page.locator('#compendio').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Sombra profunda', exact: true }).click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/desk-compendio-filtrado.png` });
    await page.getByRole('button', { name: 'PVO', exact: true }).click();
    await page.waitForTimeout(600);
    await page.screenshot({ path: `${OUT}/desk-compendio-vacio.png` });

    await page.locator('#relevo').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.getByRole('button', { name: 'Julio', exact: true }).click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${OUT}/desk-relevo-julio.png` });

    await page.locator('#brujula').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.getByRole('tab', { name: 'Oeste' }).click();
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${OUT}/desk-brujula-oeste.png` });

    await page.locator('#preguntas').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await page.locator('#preguntas button').first().click();
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${OUT}/desk-preguntas-abierta.png` });
    await ctx.close();
  }

  // ---- 4 · Sin JavaScript ---------------------------------------------
  {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      javaScriptEnabled: false,
    });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'load' });
    await page.waitForTimeout(700);
    await page.screenshot({ path: `${OUT}/desk-sin-js.png`, fullPage: true });
    await ctx.close();
  }

  // ---- 5 · prefers-reduced-motion --------------------------------------
  {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      reducedMotion: 'reduce',
    });
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'load' });
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${OUT}/desk-reduced-motion.png` });
    const telonVisible = await page.locator('#cjCurtain').isVisible();
    const heroOpacidad = await page
      .locator('#cjHeroTxt')
      .evaluate((el) => getComputedStyle(el).opacity);
    console.log(JSON.stringify({ reducedMotion: { telonVisible, heroOpacidad } }));
    await ctx.close();
  }

  await browser.close();
  console.log(JSON.stringify({ errores }, null, 2));
})();
