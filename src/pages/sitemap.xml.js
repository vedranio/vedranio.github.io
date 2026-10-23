// /sitemap.xml, at the same address as the old hand-maintained sitemap, now
// generated from the site's pages with clean (extensionless) URLs.
const pages = import.meta.glob('./*.astro');

const EXCLUDE = new Set(['404']);

export function GET({ site }) {
  const urls = Object.keys(pages)
    .map((file) => file.replace(/^\.\//, '').replace(/\.astro$/, ''))
    .filter((name) => !EXCLUDE.has(name))
    .map((name) => new URL(name === 'index' ? '/' : `/${name}`, site).href)
    .sort();

  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    urls.map((loc) => `  <url>\n    <loc>${loc}</loc>\n  </url>\n`).join('') +
    '</urlset>\n';

  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
