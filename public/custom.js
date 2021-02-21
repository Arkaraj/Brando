let win = $(window);

win.on('scroll', function () {
    let sticky_id = $('.menu')
    let scroll = win.scrollTop();
    if (scroll < 245) {
        sticky_id.removeClass("scroll-header");

    } else {
        sticky_id.addClass("scroll-header");


    }
});

win.on('load', () => {
    let backDrop = $('.MovieWrapper')
    if (backDrop) {
        backDrop.style.backgroundSize = 'cover'
    }
})