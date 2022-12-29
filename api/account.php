<?php

include('../inc/dbconfig.php');
include('../inc/functions.php');

header("Content-Type: application/json");

$jContent = json_decode(file_get_contents('php://input'), true);

switch ($_GET['action']) {
    case 'create':
        $sSignupName =  $jContent['name'];
        $sSignupEmail = $jContent['email'];
        $sSignupPwd =  $jContent['password'];
        $sSignupConfirmPwd =  $jContent['confirmPassword'];

        if (!validadeEmail($sSignupEmail)) {
            $jResponse['success'] = false;
            $jResponse['msg'] = 'Aviso: Insira um Email válido!';
            echo(json_encode($jResponse));

        } else if ($sSignupPwd != $sSignupConfirmPwd) {
            $jResponse['success'] = false;
            $jResponse['msg'] = 'Aviso: As senhas não coincidem!';
            echo(json_encode($jResponse));

        }else{
            $qConsultUser = (runQuerySelect("SELECT * FROM account WHERE email='{$sSignupEmail}'"));
            
            $iLineQuery = count($qConsultUser);

            if ( $iLineQuery >= 1) {
                $jResponse['success'] = false;
                $jResponse['msg'] = 'Aviso: O Email informado já está registrado!';
                $jResponse['log'] = $qConsultUser;
                echo(json_encode($jResponse));
                break;
            }else{
                $jResponse['success'] = false;
                $jResponse['msg'] = 'Aviso: Conta Criada!';
                echo(json_encode($jResponse));
            }
        }

        break;

    case 'login':
        $sLoginEmail = $jContent['email'];
        $sLoginPwd = $jContent['email'];

        
        $jResponse['success'] = false;
        $jResponse['msg'] = "Aviso: Usuario não encontrado";
        echo(json_encode($jResponse));
        break;
    
    case 'edit':
        break;
    
    default:
        echo('{"msg":"Not Found"}');
        break;
}