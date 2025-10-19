function setupHoverPreviews() {
  const cards = Array.from(document.querySelectorAll('.hover-preview-card'));

  function stopAllExcept(except) {
    cards.forEach(c => {
      if (c === except) return;
      const v = c.querySelector('video.preview');
      if (v) v.pause();
      c.classList.remove('is-playing');
    });
  }

  cards.forEach(card => {
    const wrap = card.querySelector('.poster-wrap');
    const video = wrap?.querySelector('video.preview');
    const src = card.getAttribute('data-preview');
    if (!wrap || !video || !src) return;

    let loaded = false;

    const start = () => {
      stopAllExcept(card);
      if (!loaded) { video.src = src; loaded = true; }
      video.currentTime = 0;
      video.play().catch(() => {});
      card.classList.add('is-playing');
    };

    const stop = () => {
      video.pause();
      card.classList.remove('is-playing');
    };

    card.addEventListener('mouseenter', start);
    card.addEventListener('mouseleave', stop);
    card.addEventListener('focusin', start);
    card.addEventListener('focusout', stop);

    card.addEventListener('touchstart', () => {
      start();
      setTimeout(stop, 1500);
    }, { passive: true });
  });
}

document.addEventListener('DOMContentLoaded', setupHoverPreviews);
