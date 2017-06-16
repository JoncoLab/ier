/**
 * Created by Saladin on 13.06.2017.
 */
var main = function () {
    var navigationBar = document.getElementById('main-menu'),
        navigationBarTop = navigationBar.getBoundingClientRect().top + window.pageYOffset,
        dropDownButton = $('#info'),
        schedule = $('#schedule'),
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
    });

    schedule.click(function () {
        schedule.removeClass('show');
    });

    upButton.click(function () {
        var page = $('html, body');
        page.animate({
            scrollTop: 0
        }, 1000, 'swing');
    });
};
$(document).ready(main);