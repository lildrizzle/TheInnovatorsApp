<?php

include "confi.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$rowCol = $data["rowCol"];
$email = $data["email"];
$datas = array();

$q = mysqli_query($con, "SELECT * FROM (SELECT getEmail,row_number() over() as rownum from responses where myEmail = '$email' order by id) as sub where rownum = '$rowCol'");

while($row = mysqli_fetch_object($q))
{
    $datas[] = $row;
}
echo json_encode($datas);
echo mysqli_error($con);


?>