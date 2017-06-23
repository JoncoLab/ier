/**
 * Created by Saladin on 13.06.2017.
 */
var main = function () {
    var header = document.getElementById('header'),
        headerBottom = header.getBoundingClientRect().bottom + window.pageYOffset,
        sideMenu = $('#side-menu'),
        dropDownButton = $('#info'),
        schedule = $('#schedule'),
        scheduleCourseButtons = schedule.find('nav button'),
        scheduleItems = schedule.children('[class$="course"]'),
        showScheduleButton = $('#show-schedule'),
        hideScheduleButton = schedule.children('.close'),
        upButton = $('#up-button');

    window.onscroll = function () {
        if (sideMenu.is('.visible') || upButton.is('.visible') && window.pageYOffset < headerBottom) {
            sideMenu.removeClass('visible');
            upButton.removeClass('visible');
        } else if (window.pageYOffset >= headerBottom) {
            sideMenu.addClass('visible');
            upButton.addClass('visible');
        }
    };

    dropDownButton.click(function () {
        var currentMenuItem = $(this);
        currentMenuItem.toggleClass('open');
    });

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