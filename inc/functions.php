<?php

//Validação de Email
function validadeEmail($email){
    $regex = "/^([a-zA-Z0-9\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/";
    return preg_match($regex, $email);
}

