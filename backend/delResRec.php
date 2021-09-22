<?php
include "confi.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$datas = json_decode($input,true);
$theEmail = $data["theEmail"];
$frEmail = $data["frEmail"];
$message = array();
$messages = array();



$q = mysqli_query($con, "DELETE FROM chat where toEmail = '$frEmail' and fromEmail = '$theEmail' ");


if($q)
{
    http_response_code(201);
    $message['status'] = "success";
}else{
    http_response_code(422);
    $message['status'] = "error";
}

$query = mysqli_query($con, "DELETE FROM responses where getEmail = '$theEmail' and myEmail = '$frEmail' ");


if($query)
{
    http_response_code(201);
    $messages['status'] = "success";
}else{
    http_response_code(422);
    $messages['status'] = "error";
}
echo json_encode($datas);


echo json_encode($data);
echo mysqli_error($con);



