$(document).on('click', '#arrow-down', function(event) {
    event.preventDefault();
    var viewportHeight = $(window).height();

    $('html, body').animate({
        scrollTop: viewportHeight,
        complete: function () {
            //Hide your button here
        }
    }, 2000);
});