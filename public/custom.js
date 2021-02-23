let win = $(window);

// Jquery wans't working for some reasons

win.on('scroll', function () {
    let sticky_id = document.querySelector('.menu')
    let scroll = win.scrollTop();
    if (scroll < 245) {
        sticky_id.classList.remove("scroll-header");

    } else {
        sticky_id.classList.add("scroll-header");
    }
});