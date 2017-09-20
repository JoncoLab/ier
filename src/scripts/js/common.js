/**
 * Created by Saladin on 13.06.2017.
 */
var main = function () {
    var header = document.getElementById('header'),
        headerBottom = header.getBoundingClientRect().bottom + window.pageYOffset,
        sideMenuButton = $('.side-menu-button'),
        sideMenuItem = $('.side-menu-item'),
        schedule = $('#schedule'),
        scheduleCourseButtons = schedule.find('nav button'),
        scheduleItems = schedule.children('[class$="course"]'),
        showScheduleButton = $('#side-menu #show-schedule, #main-menu #show-schedule'),
        hideScheduleButton = $('#close-schedule'),
        upButton = $('#up-button'),
        rssInput = $('#rss-email'),
        newsIt = $('.news-item'),
        activeNewsImg = $('.active-news-photo'),
        activeNewsCaption = $('.active-news-title'),
        activeNewsParagraph = $('.active-news-item p'),
        activeNewsBtn = $('.active-news-item button'),
        newsActive = $('.active-news');

    window.onscroll = function () {
        if ((sideMenuButton.is('.visible') || sideMenuItem.is('.visible') || upButton.is('.visible')) && window.pageYOffset < headerBottom) {
            sideMenuButton.removeClass('visible').removeClass('button-active');
            sideMenuItem.removeClass('menu-open');
            upButton.removeClass('visible');
        } else if (window.pageYOffset >= headerBottom) {
            sideMenuButton.addClass('visible');
            upButton.addClass('visible');
        }
    };

    newsIt.click(function () {
        var imgSrc = $(this).children('img').attr('src'),
            captionTxt = $(this).children('h3').text(),
            paragraphTxt = $(this).children('p').text();

        newsActive.fadeIn('fast');
        activeNewsImg.attr('src', imgSrc);
        activeNewsCaption.text(captionTxt);
        activeNewsParagraph.text(paragraphTxt);
    });

    activeNewsBtn.click(function () {
        newsActive.fadeOut('fast');
    });

    rssInput.focus(function () {
        var input = $(this);
        input.removeAttr('placeholder');
    });

    rssInput.blur(function () {
        var input = $(this);
        input.attr('placeholder', 'Ваша електронна пошта');
        if (input.val() != '') {
            input.css({
                'color': 'black'
            });
        }
    });

    sideMenuButton.click(function() {
        $(this).toggleClass('button-active');
        sideMenuItem.toggleClass('menu-open');
        if ($(this).is('.button-active')) {
            sideMenuItem.each(function (iterator) {
                $(this).css('transition-delay', '0.' + (iterator + 1) + 's');
            });
        } else {
            sideMenuItem.each(function (iterator) {
                $(this).css('transition-delay', '0.' + (7 - iterator) + 's');
            });
        }
    });

    sideMenuItem.hover(
        function () {
            var current = $(this);
            current.css({
                'background-color': '#5294E9',
                'transition-delay': '0s'
            });
        },
        function () {
            var current = $(this);
            current.css({
                'background-color': '#5db9e9',
                'transition-delay': '0s'
            });
            setTimeout(function () {
                sideMenuItem.each(function (iterator) {
                    $(this).css('transition-delay', '0.' + (7 - iterator) + 's');
                });
            }, 300);
        }
    );

    showScheduleButton.click(function () {
        schedule.toggleClass('show');
        scheduleItems.hide();
    });

    hideScheduleButton.click(function () {
        schedule.removeClass('show');
    });

    scheduleCourseButtons.click(function () {
        var button = $(this),
            id = button.attr('id'),
            target = schedule.children('.' + id);
        scheduleCourseButtons.removeClass('current');
        button.addClass('current');
        scheduleItems.each(function () {
            var current = $(this);
            if (current.is(target) && current.css('display') == 'none') {
                scheduleItems.slideUp(600);
                current.slideDown(600);
            }
        });
    });

    upButton.click(function () {
        var page = $('html, body');
        page.animate({
            scrollTop: 0
        }, 1000, 'swing');
    });
};
$(document).ready(main);