<?php

include "confi.php";

$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$name = $data["name"];
$surname = $data["surname"];
$email = $data["email"];
$password = $data["password"];
$val1 = "Any";
$val2 = "Any";
$q = mysqli_query($con, "INSERT INTO reg (name,surname,email,password) VALUES ('$name', '$surname', '$email','$password')");
$q = mysqli_query($con, "INSERT INTO profile (name,surname,email,devType,appType) VALUES ('$name', '$surname', '$email', '$val1', '$val2')");

if($q)
{
    http_response_code(201); 
    $message['status'] = "success";
}else{
    http_response_code(422);
    $message['status'] = "error";
}

echo json_encode($message);
echo mysqli_error($con);
?>