// Blur-up images (see components/LazyImage.astro). The blurred placeholder
// fades in first; the full image is fetched when the container nears the
// viewport, then fades in over the placeholder.

function load(container) {
  const small = container.querySelector('img.img-small');
  const { large: src, srcset, alt, shadow } = container.dataset;

  // 1. Show the small placeholder once it has loaded.
  if (small) {
    if (small.complete && small.naturalWidth) small.classList.add('loaded');
    else small.addEventListener('load', () => small.classList.add('loaded'), { once: true });
  }

  // 2. Load the full image and fade it in over the placeholder.
  const img = new Image();
  img.alt = alt || '';
  img.decoding = 'async';
  img.onload = () => {
    container.classList.add('placholder--loaded');
    small?.classList.add('hidden');
    img.classList.add('loaded');
    if (shadow) img.classList.add(shadow);
  };
  if (srcset) {
    // Let the browser pick the right size for the container and screen density.
    img.sizes = `${Math.max(container.clientWidth, 1)}px`;
    img.srcset = srcset;
  }
  img.src = src;
  container.appendChild(img);
}

const containers = document.querySelectorAll('.placeholder[data-large]');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        observer.unobserve(entry.target);
        load(entry.target);
      }
    },
    { rootMargin: '600px 0px' },
  );
  containers.forEach((c) => observer.observe(c));
} else {
  containers.forEach(load);
}
