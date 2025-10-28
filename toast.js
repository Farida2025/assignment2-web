function showToast(message, duration = 3000) {
  const container = document.getElementById('toast-container');
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  
  container.appendChild(toast);
  
  setTimeout(() => toast.classList.add('show'), 100);
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, duration);
}

document.querySelectorAll('.favorite-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const movieName = btn.closest('.media-card').querySelector('h3').textContent;
    showToast(`${movieName} added to favorites!`);
  });
});
