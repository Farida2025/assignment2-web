$(document).ready(function() {

    function lazyLoadImages() {
        $('.lazy-load').each(function() {
            const $img = $(this);

            if ($img.attr('src')) return;

            const windowBottom = $(window).scrollTop() + $(window).height();
            const imgTop = $img.offset().top;

            if (imgTop < windowBottom + 100) {
                $img.attr('src', $img.data('src')); 
                $img.on('load', function() {
                    $img.hide().fadeIn(1200); 
                });
            }
        });
    }

    $(window).on('scroll resize', lazyLoadImages);
    lazyLoadImages(); 
});
