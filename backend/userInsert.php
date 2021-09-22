<?php

include "confi.php";

$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$rowCol = $data["rowCol"];
$myEmail = $data["myEmail"];
//$theirEmail = $data["theirEmail"];



$q = mysqli_query($con, "INSERT IGNORE INTO interests (myEmail,proName,coName, theirEmail) SELECT '$myEmail',projName,compName,curEmail from req where curEmail = (SELECT curEmail FROM (SELECT reqNum,curEmail,row_number() over() as rownum from req) as sub where rownum = '$rowCol')");

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