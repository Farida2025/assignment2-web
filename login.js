

document.addEventListener('DOMContentLoaded', function() {
    const registerPanel = document.getElementById('registerPanel');
    const loginPanel = document.getElementById('loginPanel');
    const showLoginLink = document.getElementById('showLogin');
    const showRegisterLink = document.getElementById('showRegister');
    const accessTitle = document.getElementById('accessTitle');

    function switchToLogin() {
        registerPanel.style.display = 'none';
        loginPanel.style.display = 'block';
        accessTitle.textContent = 'Welcome Back!';
    }

    function switchToRegister() {
        loginPanel.style.display = 'none';
        registerPanel.style.display = 'block';
        accessTitle.textContent = 'Register for MyFlix';
    }

    showLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchToLogin();
        clearAllMessages();
    });

    showRegisterLink.addEventListener('click', (e) => {
        e.preventDefault();
        switchToRegister();
        clearAllMessages();
    });


    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function clearAllMessages() {
        document.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
            el.style.display = 'none';
        });
        document.getElementById('regSuccessMessage').style.display = 'none';
        document.getElementById('logSuccessMessage').style.display = 'none';
    }

    const regForm = document.getElementById('registrationForm');
    regForm.addEventListener('submit', validateRegistrationForm);

    function validateRegistrationForm(event) {
        event.preventDefault();
        clearAllMessages();
        let isValid = true;

        const emailValue = document.getElementById('regEmail').value.trim();
        const passwordValue = document.getElementById('regPassword').value;
        const confirmPasswordValue = document.getElementById('regConfirmPassword').value;

        if (emailValue === '') {
            showError('regEmailError', 'Email is required.');
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            showError('regEmailError', 'Please enter a valid email format.');
            isValid = false;
        }

        if (passwordValue === '') {
            showError('regPasswordError', 'Password is required.');
            isValid = false;
        } else if (passwordValue.length < 8) {
            showError('regPasswordError', 'Password must be at least 8 characters long.');
            isValid = false;
        }

        if (confirmPasswordValue === '' || confirmPasswordValue !== passwordValue) {
            showError('regConfirmPasswordError', 'Passwords do not match or field is empty.');
            isValid = false;
        }

        if (isValid) {
            document.getElementById('regSuccessMessage').textContent = '✅ Registration Successful! Please proceed to Log In.';
            document.getElementById('regSuccessMessage').style.display = 'block';
            regForm.reset();
        }
    }


    const logForm = document.getElementById('loginForm');
    logForm.addEventListener('submit', validateLoginForm);

    function validateLoginForm(event) {
        event.preventDefault();
        clearAllMessages();
        let isValid = true;

        const emailValue = document.getElementById('logEmail').value.trim();
        const passwordValue = document.getElementById('logPassword').value;

        if (emailValue === '') {
            showError('logEmailError', 'Email is required.');
            isValid = false;
        } else if (!isValidEmail(emailValue)) {
            showError('logEmailError', 'Invalid email format.');
            isValid = false;
        }

        if (passwordValue === '') {
            showError('logPasswordError', 'Password is required.');
            isValid = false;
        }


        if (isValid) {
            document.getElementById('logSuccessMessage').textContent = '✅ Login Successful! Welcome to MyFlix.';
            document.getElementById('logSuccessMessage').style.display = 'block';
            logForm.reset();
        }
    }
});