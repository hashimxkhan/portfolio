document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
        }

        const matchingLink = document.querySelector(`.site-nav a[href="#${entry.target.id}"]`);
        if (matchingLink && entry.isIntersecting) {
          document.querySelectorAll('.site-nav a').forEach((a) => a.classList.remove('active'));
          matchingLink.classList.add('active');
        }
      });
    },
    { threshold: 0.38 }
  );

  sections.forEach((section) => sectionObserver.observe(section));

  const typedRole = document.getElementById('typed-role');
  const phrases = [
    'OS & Network Systems Engineer',
    'Data Pipeline Builder',
    'Linux Developer'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let deleting = false;

  if (prefersReducedMotion) {
    if (typedRole) {
      typedRole.textContent = phrases[0];
    }
    sections.forEach((section) => section.classList.add('in-view'));
    return;
  }

  function tickType() {
    if (!typedRole) {
      return;
    }

    const currentPhrase = phrases[phraseIndex];
    typedRole.textContent = deleting
      ? currentPhrase.slice(0, charIndex--)
      : currentPhrase.slice(0, charIndex++);

    let delay = deleting ? 45 : 70;

    if (!deleting && charIndex > currentPhrase.length) {
      deleting = true;
      delay = 1200;
      charIndex = currentPhrase.length;
    } else if (deleting && charIndex < 0) {
      deleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 250;
      charIndex = 0;
    }

    window.setTimeout(tickType, delay);
  }

  tickType();

  const canvas = document.getElementById('starfield');
  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext('2d');
  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationFrameId;
  let stars = [];
  let maxDepth = 1800;
  let fov = 920;
  let centerX = 0;
  let centerY = 0;
  let cameraX = 0;
  let cameraY = 0;
  let targetCameraX = 0;
  let targetCameraY = 0;

  function resetStar(star, fresh = false) {
    star.x = (Math.random() - 0.5) * width * 2.2;
    star.y = (Math.random() - 0.5) * height * 2.2;
    star.z = fresh ? Math.random() * maxDepth + 1 : maxDepth;
    star.pz = star.z;
  }

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    centerX = width * 0.5;
    centerY = height * 0.5;
    maxDepth = Math.max(width, height) * 2.2;
    fov = Math.max(780, width * 0.62);

    const starCount = Math.floor((width * height) / 3200);
    stars = Array.from({ length: starCount }, () => {
      const star = {};
      resetStar(star, true);
      return star;
    });
  }

  function drawStarfield() {
    ctx.clearRect(0, 0, width, height);
    cameraX += (targetCameraX - cameraX) * 0.025;
    cameraY += (targetCameraY - cameraY) * 0.025;

    stars.forEach((star) => {
      star.pz = star.z;
      const warp = 0.65;
      const depthFactor = 1 - star.z / maxDepth;
      star.z -= (0.2 + depthFactor * warp) * 2.2;
      if (star.z <= 1) {
        resetStar(star);
      }

      const sx = (star.x / star.z) * fov + centerX + cameraX * depthFactor;
      const sy = (star.y / star.z) * fov + centerY + cameraY * depthFactor;
      const px = (star.x / star.pz) * fov + centerX + cameraX * depthFactor;
      const py = (star.y / star.pz) * fov + centerY + cameraY * depthFactor;

      if (sx < -60 || sx > width + 60 || sy < -60 || sy > height + 60) {
        resetStar(star);
        return;
      }

      const alpha = 0.12 + depthFactor * 0.5;
      const size = depthFactor > 0.9 ? 2 : 1;
      ctx.strokeStyle = `rgba(210, 228, 255, ${alpha})`;
      ctx.lineWidth = size;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(sx, sy);
      ctx.stroke();
      ctx.fillStyle = `rgba(240, 248, 255, ${Math.min(0.78, alpha + 0.08)})`;
      ctx.fillRect(Math.round(sx), Math.round(sy), size, size);
    });

    animationFrameId = window.requestAnimationFrame(drawStarfield);
  }

  resizeCanvas();
  animationFrameId = window.requestAnimationFrame(drawStarfield);
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('mousemove', (event) => {
    const nx = event.clientX / Math.max(width, 1) - 0.5;
    const ny = event.clientY / Math.max(height, 1) - 0.5;
    targetCameraX = nx * 28;
    targetCameraY = ny * 20;
  }, { passive: true });

  const root = document.documentElement;
  let scrollTicking = false;

  function updateScrollGradient() {
    const scrollTop = window.scrollY || window.pageYOffset;
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
    root.style.setProperty('--scroll-progress', progress.toFixed(4));
    scrollTicking = false;
  }

  function onScroll() {
    if (scrollTicking) {
      return;
    }
    scrollTicking = true;
    window.requestAnimationFrame(updateScrollGradient);
  }

  updateScrollGradient();
  window.addEventListener('scroll', onScroll, { passive: true });

  window.addEventListener('beforeunload', () => {
    window.cancelAnimationFrame(animationFrameId);
  });
});
