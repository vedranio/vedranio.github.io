// A tiny static server that resolves URLs the way GitHub Pages does, so local
// checks see the same behaviour as production:
//   /about_vedran       -> about_vedran.html
//   /pizza-nerd         -> 301 to /pizza-nerd/
//   /pizza-nerd/        -> pizza-nerd/index.html
//   anything missing    -> 404.html with a 404 status
//
// Usage: node tests/serve.mjs <dir> [port]
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const root = path.resolve(process.argv[2] || 'dist');
const port = Number(process.argv[3] || 4321);

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
};

const isFile = (p) => fs.existsSync(p) && fs.statSync(p).isFile();
const isDir = (p) => fs.existsSync(p) && fs.statSync(p).isDirectory();

const COMPRESSIBLE = /^(text\/|application\/(json|xml)|image\/svg)/;

function send(req, res, file, status = 200) {
  const ext = path.extname(file).toLowerCase();
  const type = TYPES[ext] || 'application/octet-stream';
  // GitHub Pages gzips text responses; do the same so performance checks are realistic.
  if (COMPRESSIBLE.test(type) && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) {
    res.writeHead(status, { 'Content-Type': type, 'Content-Encoding': 'gzip', Vary: 'Accept-Encoding' });
    fs.createReadStream(file).pipe(zlib.createGzip()).pipe(res);
    return;
  }
  res.writeHead(status, { 'Content-Type': type });
  fs.createReadStream(file).pipe(res);
}

export function createServer() {
  return http.createServer((req, res) => {
    const url = new URL(req.url, 'http://x');
    const rel = decodeURIComponent(url.pathname);
    const p = path.join(root, rel);
    if (!p.startsWith(root)) return res.writeHead(400).end();

    if (isFile(p)) return send(req, res, p);
    if (isDir(p)) {
      if (!rel.endsWith('/')) {
        res.writeHead(301, { Location: rel + '/' + url.search });
        return res.end();
      }
      if (isFile(path.join(p, 'index.html'))) return send(req, res, path.join(p, 'index.html'));
    }
    if (isFile(p + '.html')) return send(req, res, p + '.html');

    const notFound = path.join(root, '404.html');
    if (isFile(notFound)) return send(req, res, notFound, 404);
    res.writeHead(404).end('Not found');
  });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  createServer().listen(port, '127.0.0.1', () => {
    console.log(`Serving ${root} at http://127.0.0.1:${port}`);
  });
}
