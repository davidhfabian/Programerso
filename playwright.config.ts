import { defineConfig } from '@playwright/test';

// E2E de Programerso. Levanta un preview del build y juega cada lección.
export default defineConfig({
  testDir: './tests/e2e',
  timeout: 180_000,
  expect: { timeout: 30_000 },
  fullyParallel: true,
  workers: 3,
  retries: 1,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:4173',
    headless: true,
    actionTimeout: 25_000,
    navigationTimeout: 30_000,
  },
  projects: [{ name: 'chromium', use: { browserName: 'chromium' } }],
  webServer: {
    command: 'pnpm run build && pnpm run preview --port 4173 --host',
    url: 'http://localhost:4173',
    timeout: 180_000,
    reuseExistingServer: true,
  },
});
