// Visual regression: full-page screenshots of every page at mobile, tablet and
// desktop widths, compared with the committed images in tests/__screenshots__.
// After an intended visual change, refresh them with `npm run test:update-snapshots`.
import { test, expect } from '@playwright/test';
import { PAGES, WIDTHS } from './pages.mjs';
import { blockThirdParty, loadAllImages } from './helpers.mjs';

test.beforeEach(async ({ page }) => blockThirdParty(page));

for (const width of WIDTHS) {
  test.describe(`${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });
    // The archived case studies are long and image-heavy, so they are only
    // checked at desktop width to keep the stored screenshots small.
    const paths = width === 1280 ? PAGES : PAGES.filter((p) => !p.startsWith('/case_study--'));
    for (const path of paths) {
      test(path, async ({ page }) => {
        await page.goto(path);
        await page.evaluate(() => document.fonts.ready);
        await loadAllImages(page);
        const name = `${path === '/' ? 'home' : path.slice(1)}-${width}.png`;
        // Animated GIFs never hold still, so they are masked out.
        const gifs = page.locator('img[src*=".gif"]');
        await expect(page).toHaveScreenshot(name, { fullPage: true, mask: [gifs] });
      });
    }
  });
}
