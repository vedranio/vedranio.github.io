# vedran.io

Personal portfolio site for Vedran Arnautovic, built with [Astro](https://astro.build) and deployed to GitHub Pages at https://www.vedran.io.

## Getting started

Needs Node 24 (see `.nvmrc`).

```bash
npm install
npm run dev        # live-reloading dev server at http://localhost:4321
```

| Command                         | What it does                                                                                                    |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `npm run dev`                   | Dev server with live reload.                                                                                    |
| `npm run build`                 | Builds the site into `dist/`.                                                                                   |
| `npm run preview`               | Builds, then serves `dist/` the way GitHub Pages does (clean URLs, 404 page, side projects such as Pizza Nerd). |
| `npm test`                      | Builds, then runs every behaviour, link, accessibility and visual test.                                         |
| `npm run test:update-snapshots` | Refreshes the stored screenshots after an intended visual change.                                               |
| `npm run lighthouse`            | Runs Lighthouse with the site's performance and accessibility budgets (needs Chrome).                           |
| `npm run lint`                  | ESLint and Prettier checks.                                                                                     |

## How the site is organised

```
src/
  layouts/BaseLayout.astro   <head>, nav and footer shared by every page
  components/                Nav, Footer, LazyImage (blur-up images), BrowserWarning
  pages/                     one .astro file per page; the file name is the URL
  scripts/                   sticky nav, copy-email button, lazy images (bundled by Astro)
  styles/app.css             site styles (colours are CSS custom properties at the top)
  assets/images/             original images; the build makes optimised WebP copies
public/                      copied as-is: CNAME, favicons, robots.txt, the résumé PDF,
                             Pizza Nerd, side_projects/, and images other sites link to
tests/                       Playwright tests and the GitHub Pages-like local server
```

- **Clean URLs.** Pages are linked without `.html` (`/about_vedran`). The build still writes `about_vedran.html`, so GitHub Pages serves both addresses and old links keep working.
- **Images.** Add originals to `src/assets/images/` and use `<LazyImage>`. The build resizes them, converts them to WebP and only loads them as they near the screen. Originals are never modified.
- **Whitespace in markup matters.** The layout relies on the gaps between some inline elements, so `.astro` files are not auto-formatted.
- **Side projects.** A finished app can be dropped into `public/<name>/`. For a single-page app with its own routes, add its path to the list in `src/pages/404.astro`, as Pizza Nerd is. The dev server doesn't serve these folder apps; use `npm run preview`.

## Deployment

`.github/workflows/site.yml` runs on every pull request and every push. It lints, builds, and runs the tests and Lighthouse. Pushes to `master` that pass are deployed to GitHub Pages.

One-time setup: in the repository's **Settings → Pages**, set **Source** to **GitHub Actions**.
