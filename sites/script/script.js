$('#slider1').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    dots: true,

});

$('#slider2').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
    dots: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 768,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});

$('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function (event) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

        if ($('body > .content').hasClass('active')) {
            $('#menuToggle').removeClass('active');
            $('body > .content').removeClass('active');
        }

        if (target.length) {
            event.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top
            }, 1000, function () {

                var $target = $(target);
                $target.focus();
                if ($target.is(":focus")) {
                    return false;
                } else {
                    $target.attr('tabindex', '-1');
                    $target.focus();
                };
            });
        }
    }
});


$(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var headerHeight = $('header').outerHeight();

    if (scroll >= headerHeight) {
        $("header").addClass("scroll");
    }
    else {
        $("header").removeClass("scroll");
    }
});


var lastId,
    topMenu = $("#menu"),
    topMenuHeight = topMenu.outerHeight() + 1,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
    });

$(window).on("scroll", function () {
    var pageTop = $(document).scrollTop();
    var pageBottom = pageTop + $(window).height();
    var tags = $(".sub");

    for (var i = 0; i < tags.length; i++) {
        var tag = tags[i];
        if ($(tag).position().top < pageBottom) {
            $(tag).addClass("inView")
        }
    }

    var fromTop = $(this).scrollTop() + topMenuHeight;

    var cur = scrollItems.map(function () {
        if ($(this).offset().top <= fromTop)
            return this;
    });

    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        menuItems
            .parent().removeClass("active")
            .end().filter('[href="#' + id + '"]').parent().addClass("active");
    }
})


if ($(window).height() > $('#lorem').position().top) {
    $('#lorem').addClass('inView');
}


$('#menuToggle').on('click', function () {
    $(this).toggleClass('active');
    $('body > .content').toggleClass('active');
})

