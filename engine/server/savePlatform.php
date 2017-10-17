<?php
header("Access-Control-Allow-Origin: *");
$name = addslashes($_POST['name']);
$time = addslashes($_POST['time']);

$host = "localhost";
$user = "";
$password = "";
$database = "maze";
$port = 0;

$link = mysqli_connect($host, $user, $password, $database, $port);

$sql = "INSERT INTO top_platform (name, time, date) VALUES ('$name', '$time', NOW())";
mysqli_query($link, $sql);
