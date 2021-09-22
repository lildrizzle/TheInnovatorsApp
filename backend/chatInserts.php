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
SELECT distinct '$times','$dates','$myEmail','$mess',getEmail from responses where 
getEmail = (SELECT getEmail FROM (SELECT getEmail,row_number() over() as rownum from responses where myEmail = '$myEmail' order by id)
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