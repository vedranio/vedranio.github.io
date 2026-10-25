// Shared helpers for the Playwright specs.

/** Block third-party requests (analytics, YouTube, accessibility toolbar CDN) so runs are deterministic. */
export async function blockThirdParty(page) {
  await page.route(/^https?:\/\/(?!127\.0\.0\.1)/, (route) => route.abort());
}

/** Scroll through the page so every lazy image starts loading, then wait until all have faded in. */
export async function loadAllImages(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 20));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForFunction(() => {
    const containers = [...document.querySelectorAll('.placeholder[data-large]')];
    return containers.every((c) => c.classList.contains('placholder--loaded'));
  });
  await page.waitForFunction(() => [...document.images].every((img) => img.complete));
  // Let the 1s opacity transition finish.
  await page.waitForTimeout(1100);
}
