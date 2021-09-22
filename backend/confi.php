<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH');
header('Access-Control-Allow-Headers: token, Content-Type');
header('Access-Control-Max-Age: 1728000');
header('Content-Length: 0');
header('Content-Type: text/plain');

$con = mysqli_connect("localhost", "root", "", "theinnovatorsapp") or die("could not connect DB");
$conn = mysqli_connect("localhost", "root", "", "theinnovatorsapp") or die("could not connect DB");

?>