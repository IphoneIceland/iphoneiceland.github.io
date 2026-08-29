// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Sticky header scroll state
const header = document.getElementById('header');
const onScroll = () => {
  if (window.scrollY > 20) header.classList.add('is-scrolled');
  else header.classList.remove('is-scrolled');
};
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const primaryNav = document.getElementById('primaryNav');
if (navToggle && primaryNav) {
  const setOpen = (open) => {
    primaryNav.classList.toggle('is-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  };
  navToggle.addEventListener('click', () => setOpen(navToggle.getAttribute('aria-expanded') !== 'true'));
  // close after tapping a link
  primaryNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  // close on Escape
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });
}

// Reveal on scroll (respects reduced-motion via CSS)
const revealables = document.querySelectorAll('.section__head, .tour, .about__text, .about__image, .contact__inner');
if ('IntersectionObserver' in window) {
  revealables.forEach(el => el.classList.add('reveal'));
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12 });
  revealables.forEach(el => io.observe(el));
}
