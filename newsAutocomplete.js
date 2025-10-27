$(document).ready(function() {
    const newsItems = [];

    // Собираем все заголовки новостей
    $('.news-list .media-card').each(function() {
        const title = $(this).find('h3').text();
        newsItems.push(title);
    });

    $('#newsSearch').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        const listContainer = $('#autocomplete-list');
        listContainer.empty();

        if (searchTerm === '') return;

        // Фильтруем новости по введенному тексту
        const filtered = newsItems.filter(title => title.toLowerCase().includes(searchTerm));

        // Добавляем каждую новость как отдельную подсказку
        filtered.forEach(title => {
            const suggestionItem = $('<div></div>')
                .addClass('autocomplete-suggestion')
                .text(title)
                .appendTo(listContainer);

            // По клику на подсказку, вставляем её в input
            suggestionItem.on('click', function() {
                $('#newsSearch').val(title);
                listContainer.empty();
            });
        });
    });

    // Закрываем список, если кликаем вне input
    $(document).on('click', function(e) {
        if (!$(e.target).closest('#newsSearch').length) {
            $('#autocomplete-list').empty();
        }
    });
});
