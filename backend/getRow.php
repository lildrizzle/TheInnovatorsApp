<?php

include "confi.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$rowCol = $data["rowCol"];
$datas = array();

$q = mysqli_query($con, "SELECT * FROM (SELECT reqNum,curEmail,row_number() over() as rownum from req) as sub where rownum = '$rowCol'");

while($row = mysqli_fetch_object($q))
{
    $datas[] = $row;
}
echo json_encode($datas);
echo mysqli_error($con);


?>