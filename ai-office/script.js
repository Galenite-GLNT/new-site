function setupReveal() {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

function setupVideoPlayback() {
  const videos = document.querySelectorAll('video');
  if (!videos.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.08, rootMargin: '180px 0px 180px 0px' });

  videos.forEach(video => {
    video.muted = true;
    video.playsInline = true;
    observer.observe(video);
  });
}

function setupOfficeTilt() {
  const section = document.getElementById('office');
  const card = document.getElementById('officeCard');
  if (!section || !card) return;

  let ticking = false;
  let lastTransform = '';

  const updateTilt = () => {
    ticking = false;

    const rect = section.getBoundingClientRect();
    const viewport = window.innerHeight || 1;
    const progress = (viewport - rect.top) / (viewport + rect.height);
    const clamped = Math.max(0, Math.min(1, progress));

    const rotateX = 30 + (-60 * clamped);
    const translateY = (0.5 - clamped) * 30;
    const scale = 0.97 + Math.sin(clamped * Math.PI) * 0.03;
    const nextTransform = `perspective(1900px) rotateX(${rotateX.toFixed(2)}deg) translate3d(0, ${translateY.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`;

    if (nextTransform !== lastTransform) {
      card.style.transform = nextTransform;
      lastTransform = nextTransform;
    }
  };

  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(updateTilt);
  };

  requestUpdate();
  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate, { passive: true });
}

setupReveal();
setupVideoPlayback();
setupOfficeTilt();
