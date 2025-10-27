$(document).ready(function() {
  $('#movieSearch').on('input', function() {
    const query = $(this).val().toLowerCase();

    $('#movies-list .media-card').each(function() {
      const title = $(this).find('h3').text().toLowerCase();
      if (title.includes(query)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  });
});
