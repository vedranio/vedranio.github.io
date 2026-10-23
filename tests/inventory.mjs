// Crawls a running copy of the site and records, for every page:
// title, meta tags, links, images, scripts, console errors, failed requests,
// axe accessibility violations, and full-page screenshots at three widths.
//
// Usage: node tests/inventory.mjs <baseUrl> <outDir> [--block-fonts]
//   --block-fonts  aborts web font requests so two builds can be compared
//                  pixel-for-pixel without font differences.
import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import { PAGES, WIDTHS } from './pages.mjs';

const [base, outDir, ...flags] = process.argv.slice(2);
if (!base || !outDir) {
  console.error('Usage: node tests/inventory.mjs <baseUrl> <outDir> [--block-fonts]');
  process.exit(1);
}
const blockFonts = flags.includes('--block-fonts');
const origin = new URL(base).origin;

await fs.mkdir(path.join(outDir, 'screens'), { recursive: true });
const browser = await chromium.launch();
const report = {};

for (const pagePath of PAGES) {
  const entry = { widths: {} };
  for (const width of WIDTHS) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    const consoleErrors = [];
    const failed = [];
    page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text()));
    page.on('pageerror', (e) => consoleErrors.push(String(e)));
    page.on('requestfailed', (r) => {
      if (r.url().startsWith(origin)) failed.push(r.url());
    });
    // Keep runs deterministic: no third-party requests, optionally no fonts.
    await page.route('**/*', (route) => {
      const url = route.request().url();
      if (!url.startsWith(origin)) return route.abort();
      if (blockFonts && /\.(woff2?|ttf|otf)(\?|$)/.test(url)) return route.abort();
      return route.continue();
    });
    const res = await page.goto(base + pagePath, { waitUntil: 'load' });
    // Scroll through the page so every lazy image gets requested, then settle.
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 400) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 30));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForLoadState('networkidle').catch(() => {});
    await page.waitForTimeout(1300); // image fade-in transitions are 1s
    const shot = `${pagePath.replace(/[/.]/g, '_') || 'root'}_${width}.png`;
    await page.screenshot({ path: path.join(outDir, 'screens', shot), fullPage: true });

    const w = { status: res?.status(), consoleErrors, failed, shot };
    if (width === WIDTHS[WIDTHS.length - 1]) {
      Object.assign(
        entry,
        await page.evaluate(() => ({
          title: document.title,
          meta: [...document.querySelectorAll('meta[name], meta[property]')].map((m) => [
            m.getAttribute('name') || m.getAttribute('property'),
            m.getAttribute('content'),
          ]),
          links: [...document.querySelectorAll('a')].map((a) => ({
            href: a.getAttribute('href'),
            text: a.textContent.trim().replace(/\s+/g, ' '),
            target: a.getAttribute('target'),
          })),
          images: [...document.querySelectorAll('img')].map((i) => ({
            alt: i.getAttribute('alt'),
            loaded: i.complete && i.naturalWidth > 0,
            src: i.currentSrc || i.src,
          })),
          bgImages: [...document.querySelectorAll('*')]
            .map((el) => getComputedStyle(el).backgroundImage)
            .filter((b) => b && b !== 'none' && !b.startsWith('url("data:')),
          scripts: [...document.querySelectorAll('script')].map(
            (s) => s.getAttribute('src') || `inline:${s.type || 'js'}`,
          ),
          headings: [...document.querySelectorAll('h1,h2,h3')].map(
            (h) => `${h.tagName} ${h.textContent.trim().replace(/\s+/g, ' ')}`,
          ),
          ldJson: [...document.querySelectorAll('script[type="application/ld+json"]')].length,
        })),
      );
      const axe = await new AxeBuilder({ page }).analyze();
      entry.axe = axe.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length }));
    }
    entry.widths[width] = w;
    await context.close();
  }
  report[pagePath] = entry;
  console.log(
    `${pagePath}  status=${entry.widths[WIDTHS[0]].status}  links=${entry.links?.length}  axe=${entry.axe?.length}`,
  );
}

await fs.writeFile(path.join(outDir, 'inventory.json'), JSON.stringify(report, null, 2));
await browser.close();
