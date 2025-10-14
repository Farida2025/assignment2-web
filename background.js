
document.addEventListener('DOMContentLoaded', function() {
    const colorButton = document.getElementById('colorChangeBtn');

    if (!colorButton) return; 

    function getRandomColor() {
        const randomHex = Math.floor(Math.random() * 16777215).toString(16);
        return '#' + randomHex.padStart(6, '0');
    }

    colorButton.addEventListener('click', function() {
        const newColor = getRandomColor();
        
        document.body.style.background = newColor; 

    });
});