$(document).ready(function() {
    $('.copy-btn').click(function() {
        const link = $(this).siblings('p').find('a').attr('href');

        navigator.clipboard.writeText(link).then(() => {
            alert('Link copied: ' + link);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });
});
