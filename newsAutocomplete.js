$(document).ready(function() {
    const newsItems = [];

    $('.news-list .media-card').each(function() {
        const title = $(this).find('h3').text();
        newsItems.push(title);
    });

    $('#newsSearch').on('input', function() {
        const searchTerm = $(this).val().toLowerCase();
        const listContainer = $('#autocomplete-list');
        listContainer.empty();

        if (searchTerm === '') return;

        const filtered = newsItems.filter(title => title.toLowerCase().includes(searchTerm));

        filtered.forEach(title => {
            const suggestionItem = $('<div></div>')
                .addClass('autocomplete-suggestion')
                .text(title)
                .appendTo(listContainer);

            suggestionItem.on('click', function() {
                $('#newsSearch').val(title);
                listContainer.empty();
            });
        });
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('#newsSearch').length) {
            $('#autocomplete-list').empty();
        }
    });
});
