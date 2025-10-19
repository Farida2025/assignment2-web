
function setupKeyboardNavigation() {
  const menu = document.querySelector('.menu');
  if (!menu) return;

  const items = Array.from(menu.querySelectorAll('a, button'));
  if (!items.length) return;
  items.forEach((el, i) => el.setAttribute('tabindex', i === 0 ? '0' : '-1'));

  function moveFocus(toIndex) {
    const n = items.length;
    const idx = (toIndex + n) % n;
    items.forEach(el => el.setAttribute('tabindex', '-1'));
    const target = items[idx];
    target.setAttribute('tabindex', '0');
    target.focus();
  }

  menu.addEventListener('keydown', (e) => {
    const currentIndex = items.indexOf(document.activeElement);
    if (currentIndex === -1) return;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        moveFocus(currentIndex + 1);
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        moveFocus(currentIndex - 1);
        break;
      case 'Home':
        e.preventDefault();
        moveFocus(0);
        break;
      case 'End':
        e.preventDefault();
        moveFocus(items.length - 1);
        break;
    }
  });

  const DBLCLICK_DELAY = 250;

  items.forEach((el) => {
    if (el.tagName.toLowerCase() !== 'a') return;

    let singleClickTimer = null;

    el.addEventListener('click', (e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      e.preventDefault();
      clearTimeout(singleClickTimer);
      singleClickTimer = setTimeout(() => {
        window.location.assign(el.href);
      }, DBLCLICK_DELAY);
    });

    el.addEventListener('dblclick', (e) => {
      e.preventDefault();
      clearTimeout(singleClickTimer);
      el.focus();
    });
  });
}

document.addEventListener('DOMContentLoaded', setupKeyboardNavigation);
