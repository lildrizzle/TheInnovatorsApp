<?php

include "confi.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();
$email = $data["email"];
$datas = array();

$q = mysqli_query($con, "SELECT role FROM reg WHERE email = '$email'");

while($row = mysqli_fetch_object($q))
{
    $datas[] = $row;
}
echo json_encode($datas);
echo mysqli_error($con);


?>




