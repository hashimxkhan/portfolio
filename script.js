document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.site-nav');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelectorAll('[data-scroll]');
  const sections = document.querySelectorAll('main section[id]');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || !targetId.startsWith('#')) {
        return;
      }

      const target = document.querySelector(targetId);
      if (!target) {
        return;
      }

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const matchingLink = document.querySelector(`.site-nav a[href="#${entry.target.id}"]`);
        if (matchingLink) {
          document.querySelectorAll('.site-nav a').forEach((a) => a.classList.remove('active'));
          matchingLink.classList.add('active');
        }
      });
    },
    { threshold: 0.38 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
});
