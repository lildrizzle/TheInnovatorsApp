<!DOCTYPE html>
<html>
    <head>
</head>
<body>
    <form action="" method="POST" enctype="multipart/form-data">
    <input type= "file" name= "userfile[]" value="" multiple="">
    <input type= "submit" name= "submit" value="Upload">
    <form>
</body>
<?php

include "confi.php";

$table = 'cats';


$phpFileUploadErrors = array(
    0 => 'Success',
    1 => 'exceed',
    2 => 'u',
    3 => 'f',
    4 => 'e',
    5 => 'a',
    6 => 'ee',
    7 => 'tg',
    8 => 'd',
    9 => 'hi',
    10 => 'erer'
);

if(isset($_FILES['userfile'])){
    $file_array = reArrarFiles($_FILES['userfile']);

    for($i=0; $1<count($file_array);$i++){
        if($file_array[$i]['error'])
        {
            ?> <div class="alert alert-danger">
                <?php echo $file_array[$i['name'].' - ' $phpFileUploadErrors[$file_array[$i]['error']]];
                ?> </div> <?php
        }
          else{
              $extensions = array('jpg','png','gif','jpeg');

              $file_ext = explode('.',$file_array[$i]['name']);

              pre_r($file_ext);die;
              $file_ext = end($file_ext);

              if(!in_array($file_ext,$extensions))
              {
                  ?> <div class="alert alert-danger">
                      <?php echo "{$file_array[$i]['name']} - invalid file extension!";
                      ?> </div> <?php
              }
              else {
                  move_uploaded_file($file_array[$i]['tmp_name'],
                  'images/'.$file_array[$i]['name']
              );
              ?> <div class="alert alert-success">
                  <?php echo $file_array[$i]['name'].' - '.$phpFileUploadErrors[$file_array[$i]['error']];
                  ?> </div> <?php
              }
          }
    }

}

function reArrayFiles(&$file_post){

    $file_ary = array();
    $file_count= count($file_post['name']);
    $file_keys = array_keys($file_post);

    for ($i=0; $i<$file_count; i++)
    {
        foreach ($file_keys as $key)
        {
            $file_ary[$i][$key] = $file_post[$key][$i];
        }
    }
    return $file_ary;

}

function pre_r($array){
    echo '<pre>';
    print_r($array);
    echo '</pre>';
}
