$(document).ready(function() {
    $('#faqSearch').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();

        $('.faq-item p').each(function() {
            const originalText = $(this).text();

            if (searchTerm === '') {
                $(this).html(originalText); 
            } else {
                const regex = new RegExp(`(${searchTerm})`, 'gi');
                const newText = originalText.replace(regex, '<span class="highlight">$1</span>');
                $(this).html(newText);
            }
        });
    });
});
