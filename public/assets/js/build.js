$(function() {
    $.getJSON('artist.json', function(data) {
        var template = $('#president-template').html();
        var info = Mustache.to_html(template, data);
        $('#anchor').html(info);
    });
});