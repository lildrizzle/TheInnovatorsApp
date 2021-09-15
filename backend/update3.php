<?php
include "confi.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();

$devType = $data['devType'];

$email = $data['email'];

$q = mysqli_query($con, " UPDATE profile SET devType = '$devType' WHERE  email = '$email'");


if($q)
{
    http_response_code(201);
    $message['status'] = "success";
}else{
    http_response_code(422);
    $message['status'] = "error";
}
echo json_encode($data);
echo mysqli_error($con);
?>