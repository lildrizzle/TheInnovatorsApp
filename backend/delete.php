<?php
include "confi.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$year = $data['year'];
$studentOne = $data['studentOne'];
$studentTwo = $data['studentTwo'];
$id = $_GET['id'];

$q = mysqli_query($con, "DELETE FROM student WHERE id = '{$id}' LIMIT 1");


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
