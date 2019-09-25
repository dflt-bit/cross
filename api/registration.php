<?php

include_once 'function.php';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$link = connectToDb();

$result = registration(
    $link,
    htmlspecialchars($data['name']),
    htmlspecialchars($data['last-name']),
    htmlspecialchars($data['login-registration']),
    htmlspecialchars($data['password']),
    htmlspecialchars($data['repeat-password'])
);

mysqli_close($link);

die(json_encode($result));