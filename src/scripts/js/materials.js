/**
 * Created by Saladin on 22.06.2017.
 */

var main = function () {
    var buttons = $('.materials-nav button'),
        sections = $('.container section');

    buttons.click(function () {
        var target = $(this).attr('id');
        sections.removeClass('open');
        sections.each(function () {
            var current = $(this);
            if (current.is('.content-' + target) && !current.is('.open')) {
                current.addClass('open');
            } else {
                current.removeClass('open');
            }
        });
    });
};
$(document).ready(main);