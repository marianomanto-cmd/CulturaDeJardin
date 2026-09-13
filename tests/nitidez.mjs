import { chromium } from '@playwright/test';
const BASE = process.env.BASE ?? 'http://localhost:3800';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
for (const dpr of [1, 2]) {
  const p = await (
    await b.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: dpr })
  ).newPage();
  await p.addInitScript(`try{sessionStorage.setItem('cj:telon:visto','1')}catch(e){}`);
  await p.goto(BASE, { waitUntil: 'load' });
  await p.evaluate(async () => {
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += window.innerHeight * 0.6) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 260));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 600));
  });
  await p.waitForTimeout(1500);
  const r = await p.evaluate((dpr) => {
    return [...document.querySelectorAll('img')].map((im) => {
      const rect = im.getBoundingClientRect();
      const u = new URL(im.currentSrc || im.src, location.href);
      const w = u.searchParams.get('w');
      const q = u.searchParams.get('q');
      const archivo = decodeURIComponent(u.searchParams.get('url') || u.pathname)
        .split('/')
        .pop();
      const necesita = Math.round(rect.width * dpr);
      return {
        archivo,
        servido: w ? +w : null,
        q: q ? +q : null,
        cssW: Math.round(rect.width),
        necesita,
        ratio: w ? +(w / Math.max(1, necesita)).toFixed(2) : null,
        natural: im.naturalWidth,
        sec: im.closest('section')?.id || im.closest('footer') ? 'pie' : '-',
      };
    });
  }, dpr);
  console.log(`\n===== DPR ${dpr} =====`);
  for (const x of r) {
    const flag = x.ratio !== null && x.ratio < 0.95 ? '  ← SE ESTIRA' : '';
    console.log(
      `${(x.archivo || '').padEnd(34)} css ${String(x.cssW).padStart(4)} · necesita ${String(x.necesita).padStart(4)} · servido ${String(x.servido).padStart(4)} (q${x.q}) · ratio ${x.ratio}${flag}`,
    );
  }
  await p.context().close();
}
await b.close();
