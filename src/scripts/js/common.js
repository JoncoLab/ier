/**
 * Created by Saladin on 13.06.2017.
 */
var main = function () {
    var navigationBar = $('.main-menu'),
        menuItems = $('.menu-item, .drop-down-menu-item'),
        dropDownButton = $('#info'),
        schedule = $('#schedule'),
        showScheduleButton = $('header .show-schedule');

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
};
$(document).ready(main);