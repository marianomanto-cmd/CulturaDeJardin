import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const BASE = process.env.BASE ?? 'http://localhost:3300';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

const informe = {};

for (const [nombre, vp] of [
  ['desktop', { width: 1440, height: 900 }],
  ['movil', { width: 390, height: 844 }],
]) {
  const ctx = await b.newContext({ viewport: vp });
  const p = await ctx.newPage();
  await p.addInitScript(`try{sessionStorage.setItem('cj:telon:visto','1')}catch(e){}`);
  await p.goto(BASE, { waitUntil: 'load' });
  await p.waitForTimeout(900);
  // Todo el contenido tiene que estar revelado antes de auditar contraste.
  await p.evaluate(async () => {
    const alto = document.documentElement.scrollHeight;
    for (let y = 0; y < alto; y += window.innerHeight * 0.7) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 160));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
  await p.waitForTimeout(600);

  const r = await new AxeBuilder({ page: p })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'])
    .analyze();

  informe[nombre] = {
    violaciones: r.violations.map((v) => ({
      id: v.id,
      impacto: v.impact,
      n: v.nodes.length,
      desc: v.help,
      ejemplo: v.nodes[0]?.html?.slice(0, 160),
      objetivo: v.nodes[0]?.target,
    })),
    incompletos: r.incomplete.map((v) => ({ id: v.id, n: v.nodes.length })),
    aprobados: r.passes.length,
  };

  // Estado del acordeón y del menú también se auditan.
  if (nombre === 'movil') {
    await p.getByRole('button', { name: 'Abrir menú' }).click();
    await p.waitForTimeout(600);
    const rm = await new AxeBuilder({ page: p })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
      .analyze();
    informe['movil-menu-abierto'] = {
      violaciones: rm.violations.map((v) => ({
        id: v.id,
        impacto: v.impact,
        n: v.nodes.length,
        desc: v.help,
      })),
    };
  }
  await ctx.close();
}

await b.close();
console.log(JSON.stringify(informe, null, 1));
