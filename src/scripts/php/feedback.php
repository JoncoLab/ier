<?php
/**
 * Created by PhpStorm.
 * User: Saladin
 * Date: 04.07.2017
 * Time: 3:27
 */

mb_internal_encoding('utf-8');
if ($_POST["name"] != '' && $_POST["email"] != '' && $_POST["message"] != '') {
    $to = 'Jonco Lab <joncolab@gmail.com>';
    $subject = 'Повідомлення із сайту факультету';
    $message = $_POST["message"];
    $headers = 'From: ' . $_POST["name"] . '<' . $_POST["email"] . '>;' . "\r\n";
    $headers .= 'BCC: joncolab@gmail.com';

    if (mail($to, $subject, $message, $headers)) {
        echo '+';
    } else {
        echo '-';
    }
} else {
    echo 'err';
}
exit();