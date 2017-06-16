/**
 * Created by Saladin on 13.06.2017.
 */
var main = function () {
    var navigationBar = document.getElementById('main-menu'),
        navigationBarTop = navigationBar.getBoundingClientRect().top + window.pageYOffset,
        dropDownButton = $('#info'),
        schedule = $('#schedule'),
        scheduleCourseButtons = schedule.find('nav button'),
        scheduleItems = schedule.children('[class$="course"]'),
        showScheduleButton = $('header .show-schedule'),
        upButton = $('#up-button');

    window.onscroll = function () {
        if (navigationBar.classList.contains('fixed') && window.pageYOffset < navigationBarTop) {
            navigationBar.classList.remove('fixed');
        } else if (window.pageYOffset >= navigationBarTop) {
            navigationBar.classList.add('fixed');
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