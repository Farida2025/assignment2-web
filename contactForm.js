
function displayFeedback(isSuccess, message) {
    const feedbackElement = document.getElementById('formFeedback');
    if (!feedbackElement) return;

    feedbackElement.textContent = message;
    
    if (isSuccess) {
        feedbackElement.style.backgroundColor = '#d4edda'; 
        feedbackElement.style.color = '#155724';           
        feedbackElement.style.borderColor = '#c3e6cb';
    } else {
        feedbackElement.style.backgroundColor = '#f8d7da'; 
        feedbackElement.style.color = '#721c24';           
        feedbackElement.style.borderColor = '#f5c6cb';
    }
    
    feedbackElement.style.display = 'block';
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const submitBtn = document.getElementById('submitBtn');
    const feedbackElement = document.getElementById('formFeedback');

    if (feedbackElement) feedbackElement.style.display = 'none';

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const apiUrl = 'https://jsonplaceholder.typicode.com/posts'; 

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            displayFeedback(true, '✅ Message Sent Successfully! We will respond soon.');
            form.reset(); 
        } else {
            displayFeedback(false, `❌ Submission Failed. Server returned: ${response.status}`);
        }

    } catch (error) {
        console.error('Network Error:', error);
        displayFeedback(false, '❌ Network Error. Please check your connection and try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
});