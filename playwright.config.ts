import { defineConfig, devices } from '@playwright/test';

/**
 * El contenedor ya trae Chromium; no se descarga ninguno.
 * La suite corre contra el build de producción, que es el que se publica.
 */
export default defineConfig({
  testDir: './tests',
  timeout: 90_000,
  fullyParallel: false,
  reporter: [['list']],
  use: {
    baseURL: process.env.BASE ?? 'http://localhost:3210',
    launchOptions: { executablePath: process.env.CHROMIUM ?? '/opt/pw-browsers/chromium' },
  },
  projects: [
    {
      name: 'desktop',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
    { name: 'movil', use: { ...devices['Pixel 5'], viewport: { width: 390, height: 844 } } },
  ],
  webServer: process.env.BASE
    ? undefined
    : {
        command: 'npx next start -p 3210',
        url: 'http://localhost:3210',
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
