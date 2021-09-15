<?php
include "confi.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();



$q = mysqli_query($con, "DELETE FROM interests where id not in ( select * from (select max(id) from interests group by theirEmail) as a)");


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




//delete from users where id not in ( select * from (select max(id) from users group by theirEmail) as a);

//$q = mysqli_query($con, "DELETE FROM student WHERE id = '{$id}' LIMIT 1");
