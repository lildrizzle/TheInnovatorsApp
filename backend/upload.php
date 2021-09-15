<?php
include "confi.php";

if(isset($_FILES['image'])){
    $img = uploadImage('image');
    $stmt = $bdd->prepare("INSERT INTO table1 (`id`,`image`) VALUES(':id' ,':image')");
    $stmt->execute(array(':id' => NULL, ':image' => $img));

    echo json_encode($_FILES['image']);
}

function uploadImage($imgName){
    if(isset($_FILES[$imgName])) {
        $img_tmp = $_FILES[$imgName]['tmp_name'];
        $imgFolder = 'images/';
  
        if(file_exists($img_tmp)) {
            $taille_maxi = 1000000;
            $taille = filesize($_FILES[$imgName]['tmp_name']);
            $imgsize = getimagesize($_FILES[$imgName]['tmp_name']);
            $extensions = array('.png', '.gif','.jpg','.jpeg');
            $extension = strtolower(strrchr($_FILES[$imgName]['name'],'.'));

            if ($imgsize['mime'] == 'image/jpeg') {
                $img_src = imagecreatefromjpeg($img_tmp);
            }
            elseif ($imgsize['mime'] == 'image/png') {
                $img_src = imagecreatefrompng($img_tmp);
            }
            elseif ($imgsize['mime'] == 'image/gif') {
                $img_src = imagecreatefromgif($img_tmp);
            }
            $new_width = 380;
            $new_height = 380;
            $image_finale = imagecreatetruecolor($new_width, $new_height);

            imagecopyresampled($image_finale, $img_src,0,0,0,0, $new_width,$new_height,$imgsize[0],$imgsize[1]);

            $imgName = $imgFolder. '1'.'.jpg';
            imagejpeg($image_finale,$imgName);
            return $imgName;
            
        }
    }
}
?>
