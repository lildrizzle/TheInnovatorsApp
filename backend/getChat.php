<?php

include "confi.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$rowCol = $data["rowCol"];
$email = $data["email"];
$datas = array();

$q = mysqli_query($con, "SELECT * FROM chat where toEmail = (SELECT theirEmail FROM (SELECT theirEmail,row_number() over() as rownum from interests where myEmail = '$email')
as sub where rownum = '$rowCol' and fromEmail = '$email')
UNION SELECT * FROM chat where fromEmail = (SELECT theirEmail FROM (SELECT theirEmail,row_number() over() as rownum from interests where myEmail = '$email')
as sub where rownum = '$rowCol' and toEmail = '$email') ORDER BY `date`, `time`");
while($row = mysqli_fetch_object($q))
{
    $datas[] = $row;
}
echo json_encode($datas);
echo mysqli_error($con);


?>