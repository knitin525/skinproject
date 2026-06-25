document.addEventListener('DOMContentLoaded', () => {
  /* Sticky header */
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* Scroll reveal */
  const els = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  els.forEach(el => io.observe(el));

  /* Hero parallax */
  const heroBody = document.querySelector('.hero__body');
  const heroBg = document.querySelector('.hero__bg img');
  if (heroBody) {
    let currentY = 0;
    let targetY = 0;
    const speed = 0.3;
    const bgSpeed = 0.12;
    const lerp = (a, b, t) => a + (b - a) * t;

    function updateParallax() {
      targetY = window.scrollY;
      currentY = lerp(currentY, targetY, 0.08);
      if (currentY < window.innerHeight) {
        heroBody.style.transform = `translateY(${-currentY * speed}px)`;
        heroBody.style.opacity = Math.max(0, 1 - (currentY / (window.innerHeight * 0.65)));
        if (heroBg) {
          heroBg.style.transform = `translateY(${currentY * bgSpeed}px) scale(1.05)`;
        }
      }
      requestAnimationFrame(updateParallax);
    }
    requestAnimationFrame(updateParallax);
  }

  /* Mobile menu */
  const toggle = document.getElementById('mobile-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('nav--open');
      toggle.classList.toggle('active');
    });
  }

  /* Smooth anchor scroll */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});
