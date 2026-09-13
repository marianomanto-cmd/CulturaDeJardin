import { chromium } from '@playwright/test';
const BASE = process.env.BASE ?? 'http://localhost:3600';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });

async function medir(nombre, { saltarTelon, red }) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  if (saltarTelon)
    await p.addInitScript(`try{sessionStorage.setItem('cj:telon:visto','1')}catch(e){}`);
  if (red) {
    const cdp = await ctx.newCDPSession(p);
    await cdp.send('Network.enable');
    await cdp.send('Network.emulateNetworkConditions', {
      offline: false,
      latency: 150,
      downloadThroughput: (1.6 * 1024 * 1024) / 8,
      uploadThroughput: (750 * 1024) / 8,
    });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
  }
  await p.addInitScript(() => {
    window.__m = { lcp: 0, cls: 0, lcpEl: '' };
    new PerformanceObserver((l) => {
      const e = l.getEntries().at(-1);
      if (e) {
        window.__m.lcp = e.startTime;
        window.__m.lcpEl = e.element?.tagName + '.' + (e.element?.className || '').slice(0, 40);
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) if (!e.hadRecentInput) window.__m.cls += e.value;
    }).observe({ type: 'layout-shift', buffered: true });
  });
  await p.goto(BASE, { waitUntil: 'load' });
  await p.waitForTimeout(7000);
  // LCP "en reposo": lo que ve alguien que todavía no hizo scroll.
  const reposo = await p.evaluate(() => ({
    lcp: window.__m.lcp,
    el: window.__m.lcpEl,
    cls: window.__m.cls,
    kb: Math.round(
      performance.getEntriesByType('resource').reduce((a, r) => a + (r.transferSize || 0), 0) /
        1024,
    ),
  }));
  await p.evaluate(async () => {
    const h = document.documentElement.scrollHeight;
    for (let y = 0; y < h; y += window.innerHeight) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 320));
    }
  });
  await p.waitForTimeout(1500);
  const m = await p.evaluate(() => ({
    ...window.__m,
    fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime ?? null,
    ttfb: performance.getEntriesByType('navigation')[0]?.responseStart ?? null,
    transferido: performance
      .getEntriesByType('resource')
      .reduce((a, r) => a + (r.transferSize || 0), 0),
    recursos: performance.getEntriesByType('resource').length,
    js: performance
      .getEntriesByType('resource')
      .filter((r) => r.name.endsWith('.js'))
      .reduce((a, r) => a + (r.transferSize || 0), 0),
  }));
  console.log(
    nombre,
    JSON.stringify({
      lcp_reposo_ms: Math.round(reposo.lcp),
      lcp_reposo_el: reposo.el,
      kb_inicial: reposo.kb,
      cls: +m.cls.toFixed(4),
      fcp_ms: Math.round(m.fcp ?? 0),
      ttfb_ms: Math.round(m.ttfb ?? 0),
      kb_tras_recorrer_todo: Math.round(m.transferido / 1024),
      js_kb: Math.round(m.js / 1024),
      recursos: m.recursos,
    }),
  );
  await ctx.close();
}

await medir('sin telón, red rápida  ', { saltarTelon: true });
await medir('con telón, red rápida  ', { saltarTelon: false });
await medir('sin telón, 3G rápida+4×', { saltarTelon: true, red: true });
await b.close();
