document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('accessModal');
    const openButton = document.getElementById('openAccessModal');
    const closeButton = modal ? modal.querySelector('.close-button') : null; 
    const registerPanel = document.getElementById('registerPanel');
    const loginPanel = document.getElementById('loginPanel');
    const modalTitle = document.getElementById('modalAccessTitle');

    function openModal() {
        if (!modal) return; 
        modal.style.display = 'flex'; 
        
        if (registerPanel) registerPanel.style.display = 'block';
        if (loginPanel) loginPanel.style.display = 'none';
        if (modalTitle) modalTitle.textContent = 'Register for MyFlix';
        
        if (document.getElementById('registrationForm')) document.getElementById('registrationForm').reset();
        if (document.getElementById('loginForm')) document.getElementById('loginForm').reset();
        
        if (typeof clearAllMessages === 'function') {
             clearAllMessages(); 
        }
    }

    function closeModal() {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    if (openButton) {
        openButton.addEventListener('click', openModal);
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            closeModal();
        }
    });

});