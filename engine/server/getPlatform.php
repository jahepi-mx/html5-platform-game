<?php
header("Access-Control-Allow-Origin: *");
$host = "localhost";
$user = "";
$password = "";
$database = "maze";
$port = 0;

$link = mysqli_connect($host, $user, $password, $database, $port);

$data = array();
$data['times'] = array();

$sql = "SELECT name, time FROM top_platform ORDER BY time ASC LIMIT 10";
$rs = mysqli_query($link, $sql);

while ($row = mysqli_fetch_object($rs)) {
    $data['times'][] = array(
        'name' => $row->name,
        'time' => $row->time,
    );
}

echo json_encode($data);
