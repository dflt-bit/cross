<?php

include_once 'function.php';

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$link = connectToDb();

$results = login($link, htmlspecialchars($data['login']), htmlspecialchars($data['password']));

mysqli_close($link);

die(json_encode($results));