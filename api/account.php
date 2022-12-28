<?php

header("Content-Type: application/json");

$jBody = json_decode(file_get_contents('php://input'), true);

switch ($_GET['action']) {
    case 'create':
        echo(json_encode('Em construção!'));
        break;

    case 'login':
        $login['success'] = false;
        $login['msg'] = "Aviso: Usuario não encontrado";
        echo(json_encode($login));
        break;
    
    default:
        echo('{"msg":"Not Found"}');
        break;
}