<?php

require('../inc/dbconfig.php');

header("Content-Type: application/json");

$jContent = json_decode(file_get_contents('php://input'), true);

switch ($$GET['action']) {
    
    
    default:
        echo 'Invalido';
        break;
}