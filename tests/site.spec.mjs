// Behaviour checks: every page, link, script and URL the site is expected to keep.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { PAGES } from './pages.mjs';
import { blockThirdParty, loadAllImages } from './helpers.mjs';

test.beforeEach(async ({ page }) => blockThirdParty(page));

test.describe('every page', () => {
  for (const path of PAGES) {
    test(`${path} loads cleanly, with all images`, async ({ page }) => {
      const errors = [];
      const failed = [];
      page.on('pageerror', (e) => errors.push(String(e)));
      page.on('console', (m) => {
        if (m.type() === 'error' && !/ERR_FAILED/.test(m.text())) errors.push(m.text());
      });
      page.on('requestfailed', (r) => {
        if (r.url().startsWith('http://127.0.0.1')) failed.push(r.url());
      });
      const res = await page.goto(path);
      expect(res.status()).toBe(200);
      await loadAllImages(page);
      const broken = await page.evaluate(() =>
        [...document.images].filter((i) => !i.naturalWidth).map((i) => i.currentSrc || i.src),
      );
      expect(broken).toEqual([]);
      expect(failed).toEqual([]);
      expect(errors).toEqual([]);
    });

    test(`${path} has no serious accessibility violations`, async ({ page }) => {
      await page.goto(path);
      await loadAllImages(page);
      const { violations } = await new AxeBuilder({ page }).analyze();
      const serious = violations.filter((v) => ['serious', 'critical'].includes(v.impact));
      expect(serious.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
    });
  }
});

test('internal links and anchors all resolve', async ({ page, request }) => {
  // Anchors whose target sections are currently commented out on "My work".
  // The links still land on the page, as they always have.
  const knownMissingAnchors = new Set([
    'VisitorRegistrationApp',
    'DesignSprintForJoraLocal',
    'HirerVision',
    'WorkshopFacilitationAndWireframeDesign',
    'CreditCardPaymentForm',
    'CoachingAnOrgInUsabilityTesting',
    'DesignOfASettingsPage',
  ]);
  const checked = new Map();
  const problems = [];
  for (const path of PAGES) {
    await page.goto(path);
    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href')));
    for (const href of hrefs) {
      if (/^(https?:|mailto:|javascript:)/.test(href) && !href.startsWith('http://127.0.0.1')) continue;
      if (href === '#') continue;
      const url = new URL(href, page.url());
      const target = url.pathname;
      if (!checked.has(target)) {
        const res = await request.get(target);
        checked.set(target, res.status());
      }
      if (checked.get(target) !== 200) problems.push(`${path} -> ${href} (${checked.get(target)})`);
      if (url.hash && !knownMissingAnchors.has(url.hash.slice(1))) {
        const other = await (await request.get(target)).text();
        if (!other.includes(`id="${url.hash.slice(1)}"`)) problems.push(`${path} -> ${href} (missing anchor)`);
      }
    }
  }
  expect(problems).toEqual([]);
});

test('old .html addresses still work', async ({ request }) => {
  for (const path of PAGES.filter((p) => p !== '/')) {
    const res = await request.get(`${path}.html`);
    expect(res.status(), `${path}.html`).toBe(200);
  }
  expect((await request.get('/index.html')).status()).toBe(200);
});

test('removed projects are gone', async ({ request }) => {
  for (const path of [
    '/side_project--minty_ninja',
    '/side_projects/minty.ninja/',
    '/tennis/vedran-vs-luke.html',
    '/z/',
    '/for-SEEK/',
    '/happy-mothers-day-emily/',
    '/vedmas/',
    '/documentation/',
  ]) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
});

test('passthrough projects and files are served', async ({ request }) => {
  for (const path of [
    '/pizza-nerd/',
    '/side_projects/bosancica/favicon.png',
    '/resources/documents/Vedran-Arnautovic-Resume.pdf',
    '/resources/axure_libraries/FloatLabelPattern_AxureExample/index.html',
    '/resources/images/vedran_speaking_at_meetup.jpg',
    '/resources/images/vedran_profile_pic.JPG',
    '/resources/images/headshot.png',
    '/favicon.ico',
    '/favicon.png',
    '/js/tota11y.min.js',
  ]) {
    expect((await request.get(path)).status(), path).toBe(200);
  }
  expect(await (await request.get('/CNAME')).text()).toBe('www.vedran.io');
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('Sitemap: https://www.vedran.io/sitemap.xml');
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('<loc>https://www.vedran.io/about_vedran</loc>');
  expect(sitemap).not.toContain('minty');
  expect(sitemap).not.toContain('404');
});

test('nav highlights the current page and sticks on scroll', async ({ page }) => {
  const expected = {
    '/': 'Home',
    '/about_vedran': 'About me',
    '/vedrans_design_work': 'My work',
    '/side_project--walnut': 'My work',
  };
  for (const [path, label] of Object.entries(expected)) {
    await page.goto(path);
    await expect(page.locator('.nav__item--selected')).toHaveText(label);
  }
  await page.goto('/about_vedran');
  const nav = page.locator('#nav');
  await expect(nav).toHaveClass(/nav--on-white-bg/);
  await page.mouse.wheel(0, 600);
  await expect(nav).toHaveClass(/nav--stuck/);
  await expect(nav).not.toHaveClass(/nav--on-white-bg/);
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(nav).not.toHaveClass(/nav--stuck/);
  await expect(nav).toHaveClass(/nav--on-white-bg/);
});

test('footer email button copies the address', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  const label = page.locator('#email-label');
  await expect(label).toHaveText('hello@vedran.io');
  await label.hover();
  await expect(label).toHaveText('copy email');
  await page.mouse.move(0, 0);
  await expect(label).toHaveText('hello@vedran.io');
  await label.click();
  await expect(label).toHaveText('email copied');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('hello@vedran.io');
  await page.mouse.move(0, 0);
  await page.waitForTimeout(2100);
  await expect(label).toHaveText('hello@vedran.io');
});

test('old-browser warning: hidden normally, shown and dismissable on IE 8', async ({ browser }) => {
  const modern = await browser.newPage();
  await modern.goto('http://127.0.0.1:4321/');
  await expect(modern.locator('#life-is-short')).toBeHidden();
  await modern.close();

  const ie = await browser.newPage({ userAgent: 'Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)' });
  await ie.goto('http://127.0.0.1:4321/');
  await expect(ie.locator('#life-is-short')).toBeVisible();
  await ie.locator('#close-modal-button').click();
  await expect(ie.locator('#life-is-short')).toBeHidden();
  await ie.close();
});

test('unknown addresses get the 404 page', async ({ page }) => {
  const res = await page.goto('/no-such-page');
  expect(res.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText('404');
  await expect(page.getByText('You look lost')).toBeVisible();
});

test('Pizza Nerd deep links are handed back to the app', async ({ page }) => {
  // GitHub Pages answers /pizza-nerd/num-pizzas with 404.html, which hands the
  // route to the app; the app then restores the address and renders.
  await page.goto('/pizza-nerd/num-pizzas');
  await expect(page).toHaveURL(/\/pizza-nerd\/num-pizzas$/);
  await expect(page.locator('#root')).not.toBeEmpty();
});

test('home page keeps its metadata and structured data', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Vedran Arnautovic | Design leader in Melbourne');
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /design leader based in Melbourne/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    'https://www.vedran.io/resources/images/vedran_speaking_at_meetup.jpg',
  );
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(2);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://www.vedran.io/');
});
