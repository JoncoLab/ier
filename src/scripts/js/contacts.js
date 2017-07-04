/**
 * Created by Saladin on 04.07.2017.
 */
var main = function () {
    var feedBackForm = $('#feedback-form');

    feedBackForm.submit(function (event) {
        var name = $('#name').val(),
            email = $('#email').val(),
            message = $('#message').val(),
            submitButton = $('#submit');

        event.preventDefault();

        $.ajax({
            url: 'scripts/php/feedback.php',
            data: {
                name: name,
                email: email,
                message: message
            },
            dataType: 'text',
            method: 'POST',
            success: function (data) {
                switch (data) {
                    case '+':
                        alert('Ваше повідомлення успішно надіслане!');
                        break;
                    case '-':
                        alert('Виникла проблема! Спробуйте пізніше, або зв\'яжіться з адмінінстацією сайту.');
                        break;
                    case 'err':
                        alert('Ви ввели некоректні дані!');
                        break;
                    default:
                        alert('Немає зв\'язку із поштовим сервером!');
                }
            },
            error: function () {
                alert('Немає зв\'язку із сервером!');
            },
            beforeSend: function () {
                submitButton.attr('disabled', 'disabled');
            },
            complete: function () {
                submitButton.removeAttr('disabled');
            }
        });
    });
};

$(document).ready(main);