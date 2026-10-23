// Once the page scrolls, the nav swaps its background class for the white,
// shadowed "stuck" style; at the very top it goes back to the page's colour.
const nav = document.getElementById('nav');

if (nav) {
  const bgClass = nav.dataset.bgClass;
  const update = () => {
    const stuck = window.scrollY > 1;
    nav.classList.toggle('nav--stuck', stuck);
    if (bgClass) nav.classList.toggle(bgClass, !stuck);
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}
