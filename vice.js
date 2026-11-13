(() => {
  const body = document.body;
  const intro = document.getElementById('intro');
  const skip = document.getElementById('skip-intro');
  const menu = document.querySelector('.header__menu');
  const nav = document.getElementById('main-nav');
  const header = document.getElementById('site-header');

  // Play the first-visit sequence once per tab, and never trap the visitor.
  let seen = false;
  try { seen = sessionStorage.getItem('galenite-vi-intro') === '1'; } catch (_) {}
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let finished = false;
  let timer;
  const endIntro = () => {
    if (finished) return;
    finished = true;
    clearTimeout(timer);
    body.classList.remove('intro-active');
    body.classList.add('intro-leaving');
    intro?.setAttribute('aria-hidden', 'true');
    try { sessionStorage.setItem('galenite-vi-intro', '1'); } catch (_) {}
    window.setTimeout(() => body.classList.remove('intro-leaving'), 750);
  };

  if (!seen && !reducedMotion && intro) {
    body.classList.add('intro-active');
    timer = window.setTimeout(endIntro, 2700);
    skip?.addEventListener('click', endIntro);
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && body.classList.contains('intro-active')) endIntro();
    });
    window.addEventListener('pagehide', endIntro, { once: true });
  } else {
    intro?.setAttribute('hidden', '');
  }

  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 36);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const closeMenu = () => {
    nav?.classList.remove('is-open');
    menu?.setAttribute('aria-expanded', 'false');
    menu?.setAttribute('aria-label', 'Открыть меню');
  };
  menu?.addEventListener('click', () => {
    const open = !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
  });
  nav?.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  window.addEventListener('keydown', (e) => { if(e.key === 'Escape') closeMenu(); });
  document.addEventListener('click', (e) => {
    if (!nav?.contains(e.target) && !menu?.contains(e.target)) closeMenu();
  });

  const reveal = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    reveal.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.classList.add('is-visible');
        observer.unobserve(target);
      });
    }, { rootMargin: '0px 0px -60px 0px', threshold: .08 });
    reveal.forEach((el) => observer.observe(el));
  }
})();