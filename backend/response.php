<?php

include "confi.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$messages = array();
$email = $data["email"];
$datas = array();
$r = mysqli_query($conn, "INSERT IGNORE INTO responses(getEmail,myEmail,names,surnames) SELECT DISTINCT fromEmail,'$email',name,surname FROM chat,reg WHERE toEmail = '$email' and reg.email = fromEmail" );

if($r)
{
    http_response_code(201); 
    $messages['status'] = "success";
}else{
    http_response_code(422);
    $messages['status'] = "error";
}

$q = mysqli_query($con, "SELECT distinct getEmail,names,surnames FROM responses where myEmail = '$email'");

while($row = mysqli_fetch_object($q))
{
    $datas[] = $row;
}
echo json_encode($datas);
echo mysqli_error($conn);
echo mysqli_error($con);


?>




