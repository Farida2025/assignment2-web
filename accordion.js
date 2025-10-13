document.addEventListener('DOMContentLoaded', function() {
    const questions = document.querySelectorAll('.faq-question');

    questions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;

            this.classList.toggle('active');

            if (answer.style.maxHeight) {
                answer.style.maxHeight = null;
                answer.style.padding = '0 15px';
            } else {
                answer.style.maxHeight = answer.scrollHeight + "px";
                answer.style.padding = '15px 15px 25px';
            }
        });
    });
});