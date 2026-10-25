import { defineConfig, devices } from '@playwright/test';

// Tests run against the built site (dist/), served the way GitHub Pages
// serves it. Run `npm run build` first; `npm test` does both.
export default defineConfig({
  testDir: './tests',
  testMatch: /.*\.spec\.mjs/,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:4321',
    trace: 'retain-on-failure',
  },
  expect: {
    toHaveScreenshot: {
      // Small tolerance for anti-aliasing differences between machines.
      maxDiffPixelRatio: 0.01,
      animations: 'disabled',
    },
  },
  snapshotPathTemplate: '{testDir}/__screenshots__/{arg}{ext}',
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'node tests/serve.mjs dist 4321',
    url: 'http://127.0.0.1:4321/',
    reuseExistingServer: !process.env.CI,
  },
});
