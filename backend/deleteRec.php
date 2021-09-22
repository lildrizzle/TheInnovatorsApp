<?php
include "confi.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$ids = $data["ids"];
$message = array();



$q = mysqli_query($con, "DELETE FROM interests where id = '$ids' ");


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



