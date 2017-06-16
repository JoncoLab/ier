/**
 * Created by Saladin on 13.06.2017.
 */
var main = function () {
    var navigationBar = $('.main-menu'),
        menuItems = $('.menu-item, .drop-down-menu-item'),
        dropDownButton = $('#info');

    dropDownButton.click(function () {
        var currentMenuItem = $(this);
        currentMenuItem.toggleClass('open');
    });
};
$(document).ready(main);