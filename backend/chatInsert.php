<?php

include "confi.php";

$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$rowCol = $data["rowCol"];
$myEmail = $data["myEmail"];

$mess = $data["mess"];
$times = $data["times"];
$dates = $data["dates"];

$q = mysqli_query($con, "INSERT INTO chat  (`time`,`date`,fromEmail,message, toEmail) 
SELECT '$times','$dates','$myEmail','$mess',theirEmail from interests where 
theirEmail = (SELECT theirEmail FROM (SELECT theirEmail,row_number() over() as rownum from interests where myEmail = '$myEmail')
 as sub where rownum = '$rowCol')");

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