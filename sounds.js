let audioCtx;
function ensureAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function playBeep(freq = 880, duration = 0.18) {
  ensureAudioCtx();
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = 'sine';
  osc.frequency.value = freq;
  osc.connect(gain);
  gain.connect(audioCtx.destination);

  gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

document.addEventListener('DOMContentLoaded', () => {
  const colorBtn = document.getElementById('color-switcher-btn');
  if (colorBtn) colorBtn.addEventListener('click', () => playBeep(880, 0.18));
});
