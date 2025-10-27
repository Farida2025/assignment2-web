$(document).ready(function() {
    function lazyLoadImages() {
        $('.lazy').each(function() {
            var img = $(this);
            if (img.offset().top < $(window).scrollTop() + $(window).height() + 100) {
                // Загружаем изображение только если оно близко к видимой области
                img.attr('src', img.data('src'));
                img.removeClass('lazy');
            }
        });
    }

    // Выполняем при загрузке страницы
    lazyLoadImages();

    // Выполняем при скролле
    $(window).on('scroll', function() {
        lazyLoadImages();
    });
});
