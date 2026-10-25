// @ts-check
import { defineConfig } from 'astro/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Astro copies every imported image into the build at its original size, even
 * when pages only use the optimised WebP versions. This removes the files in
 * _astro/ that nothing in the built site refers to, so they are not deployed.
 */
function pruneUnusedAssets() {
  return {
    name: 'prune-unused-assets',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const root = fileURLToPath(dir);
        const assetsDir = path.join(root, '_astro');
        const texts = [];
        const walk = async (d) => {
          for (const entry of await fs.readdir(d, { withFileTypes: true })) {
            const p = path.join(d, entry.name);
            if (entry.isDirectory()) await walk(p);
            else if (/\.(html|css|js|xml)$/.test(entry.name)) texts.push(await fs.readFile(p, 'utf8'));
          }
        };
        await walk(root);
        const all = texts.join('\n');
        let removed = 0;
        for (const name of await fs.readdir(assetsDir)) {
          if (/\.(css|js)$/.test(name)) continue;
          if (!all.includes(name)) {
            await fs.rm(path.join(assetsDir, name));
            removed++;
          }
        }
        logger.info(`removed ${removed} unreferenced files from _astro/`);
      },
    },
  };
}

export default defineConfig({
  site: 'https://www.vedran.io',
  // Emit about_vedran.html (not about_vedran/index.html). GitHub Pages serves
  // it at both /about_vedran and /about_vedran.html, so old links keep working
  // while the site links to the clean, extensionless form.
  build: {
    format: 'file',
  },
  trailingSlash: 'never',
  // Keep whitespace between elements as written: the layout relies on the
  // gaps between inline-block elements (nav items, header image and intro).
  compressHTML: false,
  integrations: [pruneUnusedAssets()],
});
