<?php

include "confi.php";

$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$projName = $data["projName"];
$compName = $data["compName"];
$compDes = $data["compDes"];
$projDes = $data["projDes"];
$delDate = $data["delDate"];
$img_url = $data["img_url"];
$curEmail = $data["curEmail"];

$q = mysqli_query($con, "INSERT INTO req (projName,compName,compDes,projDes,delDate,img_url,curEmail) VALUES ('$projName', '$compName', '$compDes','$projDes', '$delDate','$img_url','$curEmail' )" );

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