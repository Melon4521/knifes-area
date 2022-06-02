<?php
/* Здесь проверяется существование переменных */
if (isset($_POST['name'])) {$name = $_POST['name'];}
if (isset($_POST['phone'])) {$phone = $_POST['phone'];}
if (isset($_POST['email'])) {$emailCl = $_POST['email'];}
if (isset($_POST['cart'])) {$cart = $_POST['cart'];}
/* Сюда впишите свою эл. почту */
$myaddress1 = "vlad123astral@gmail.com"; // кому отправляем


//Письмо в магазин с заказом

/* А здесь прописывается текст сообщения, \n - перенос строки */
$mes1 = "Заказ\n
==========================================\n
Имя: $name\n
Контакт: $phone\n
E-mail: $emailCl\n
==========================================\n
Данные корзины\n
$cart
";

/* А эта функция как раз занимается отправкой письма на указанный вами email */
$sub='Order'; //сабж
$email=$emailCl; // от кого
$send=mail($myaddress1,$sub,$mes1,"Content-type:text/plain; charset = UTF-8\r\nFrom:$email");

//Письмо отправителю о заказе

$myaddress2 = $emailCl; // кому отправляем
 
/* А здесь прописывается текст сообщения, \n - перенос строки */
$mes2 = "Вы отправили заказ в knifes-area.intermir.ru\n
==========================================\n
Имя: $name\n
Контакт: $phone\n
E-mail: $emailCl\n
==========================================\n
Данные корзины\n
$cart
";

/* А эта функция как раз занимается отправкой письма на указанный вами email */
$sub='Ваш заказ'; //сабж
$email='shop@intermir.ru'; // от кого
$send=mail($myaddress2,$sub,$mes2,"Content-type:text/plain; charset = UTF-8\r\nFrom:$email");

ini_set('short_open_tag', 'On');
header('Refresh: 5; URL=https://knifes-area.intermir.ru/');

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <meta http-equiv="refresh" content="5; url=index.html">
    <title>Спасибо за заказ!</title>
    <script type="text/javascript">
        setTimeout("location.replace('https://knifes-area.intermir.ru/')", 5000);
    </script>
</head>
<body>
    <div style="max-width: 1000px; width: 100%; padding: 0 20px; margin: 0 auto;">
		<h1 style="font-size: 40px;">Спасибо за заказ!</h1>
		<p style="font-size: 20px;">В ближайшее время с Вами свяжутся.</p>
		<br><p style="font-size: 20px;">Вас перенаправят на страницу магазина через 5 секунд</p>
    </div>
</body>
</html>