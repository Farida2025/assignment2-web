const backgroundColors = [
  'linear-gradient(to bottom, #8B0000, #000)',
  'linear-gradient(to bottom, #00008B, #1C1C1C)',
  'linear-gradient(to bottom, #228B22, #000)',
  '#333333'
];

let currentColorIndex = 0;

function setupColorSwitcher() {
  const switcherButton = document.getElementById('color-switcher-btn');
  const bodyElement = document.body;

  if (!switcherButton) return;

  switcherButton.addEventListener('click', function () {
    currentColorIndex = (currentColorIndex + 1) % backgroundColors.length;
    const newColor = backgroundColors[currentColorIndex];
    bodyElement.style.background = newColor;
    console.log(`Background changed to: ${newColor}`);
  });
}

document.addEventListener('DOMContentLoaded', setupColorSwitcher);
