<?php

require('../inc/dbconfig.php');
require('../inc/functions.php');
require('../phpmail/sendEmail.php');

header("Content-Type: application/json");

$jContent = json_decode(file_get_contents('php://input'), true);

switch ($_GET['action']) {
    case 'create':
        $sSignupName =  escapeString(trim($jContent['name']));
        $sSignupEmail = escapeString( trim($jContent['email']) );
        $sSignupPwd =  escapeString(trim($jContent['password']));
        $sSignupConfirmPwd =  escapeString(trim($jContent['confirmPassword']));
        $sSigCheck = escapeString(trim($jContent['sigCheck']));

        if (!validadeEmail($sSignupEmail)) {
            $jResponse['success'] = false;
            $jResponse['msg'] = 'Aviso: Insira um Email válido!';
            echo(json_encode($jResponse));
            break;

        } else if ($sSignupPwd != $sSignupConfirmPwd) {
            $jResponse['success'] = false;
            $jResponse['msg'] = 'Aviso: As senhas não coincidem!';
            echo(json_encode($jResponse));
            break;

        }else if( strlen($sSignupPwd) < 6){
            $jResponse['success'] = false;
            $jResponse['msg'] = 'Aviso: A senha deve conter no mínimo 6 caracteres!';
            echo(json_encode($jResponse));
            break;

        } else{
            $qConsultUser = (runQuerySelect("SELECT * FROM account WHERE email='{$sSignupEmail}'"));

            if ( count($qConsultUser) >= 1) {
                $jResponse['success'] = false;
                $jResponse['msg'] = 'Aviso: O Email informado já está registrado!';
                $jResponse['log'] = $qConsultUser;
                echo(json_encode($jResponse));
                break;

            }else{
                //Codificando a senha em sh1
                $sha1Pwd = sha1($sSignupPwd);

                //Criando Usuario no BD
                $qCreateUser = (runQueryIUD("INSERT INTO account (email, name, password, sigCheck) VALUES ('{$sSignupEmail}', '{$sSignupName}', '{$sha1Pwd}', '{$sSigCheck}')"));

                if ( $qCreateUser >= 1) {
                    $jResponse['success'] = true;
                    $jResponse['msg'] = 'Aviso: Conta Criada!';
                    echo(json_encode($jResponse));
                    break;

                }else{
                    $jResponse['success'] = false;
                    $jResponse['msg'] = 'Aviso: Não foi possível criar conta!';
                    echo(json_encode($jResponse));
                    break;
                }
                
            }
            
        }

        break;

    case 'login':

        $sType = escapeString(trim($jContent['type']) );

        if ($sType == 'google'){
            $sLoginEmail = escapeString(trim($jContent['email']) );

            if (!validadeEmail($sLoginEmail)) {
                $jResponse['success'] = false;
                $jResponse['msg'] = 'Aviso: Insira um Email válido!';
                echo(json_encode($jResponse));
                break;

            } else{
                $qConsultUser = (runQuerySelect("SELECT * FROM account WHERE email='{$sLoginEmail}'"));

                if(count($qConsultUser) <= 0){
                    $jResponse['success'] = false;
                    $jResponse['msg'] = 'Aviso: Email não registrado!';
                    echo(json_encode($jResponse));
                    break;

                }else{
                    if ($qConsultUser[0]['sigCheck'] == 0) {
                        $jResponse['success'] = false;
                        $jResponse['msg'] = 'Aviso: Permissão negada para Login Google!';
                        $jResponse['sql'] = $qConsultUser[0];
                        echo(json_encode($jResponse));
                        break;
                    }else{
                        $jResponse['success'] = true;
                        $jResponse['msg'] = 'Aviso: Acesso liberado!';
                        $jResponse['sql'] = $qConsultUser[0];
                        echo(json_encode($jResponse));
                        break;
                    }
                }
            }
        }else if ($sType == 'default'){
        
            $sLoginEmail = escapeString(trim($jContent['email']) );
            $sLoginPwd =  escapeString(trim($jContent['password']));

            if (!validadeEmail($sLoginEmail)) {
                $jResponse['success'] = false;
                $jResponse['msg'] = 'Aviso: Insira um Email válido!';
                echo(json_encode($jResponse));
                break;
            }else{

                //Codificando a senha em sh1
                $sha1Pwd = sha1($sLoginPwd);

                $qConsultUser = (runQuerySelect("SELECT * FROM account WHERE email='{$sLoginEmail}' AND password='{$sha1Pwd}'"));

                if(count($qConsultUser) >= 1){
                    $jResponse['success'] = true;
                    $jResponse['msg'] = 'Aviso: Acesso Liberado!';
                    echo(json_encode($jResponse));
                    break;

                }else{
                    $jResponse['success'] = false;
                    $jResponse['msg'] = 'Aviso: Login ou Senha incorretos!';
                    echo(json_encode($jResponse));
                    break;
                }

            }

            $jResponse['success'] = false;
            $jResponse['msg'] = "Aviso: Usuario não encontrado";
            echo(json_encode($jResponse));
            break;
        }
        else{
            $jResponse['success'] = false;
            $jResponse['msg'] = 'Aviso: Erro na solicitação!';       
            echo(json_encode($jResponse));
            break;
        }
    
    case 'edit':
        break;

    case 'recoveryPassword':

        $sRecoveryEmail = escapeString( trim($jContent['email']) );

        if (!validadeEmail($sRecoveryEmail)) {
            $jResponse['success'] = false;
            $jResponse['msg'] = 'Aviso: Insira um Email válido!';
            echo(json_encode($jResponse));
            break;

        } else{
            $qConsultUser = (runQuerySelect("SELECT * FROM account WHERE email='{$sRecoveryEmail}'"));

                if(count($qConsultUser) <= 0){
                    $jResponse['success'] = false;
                    $jResponse['msg'] = 'Aviso: Email não registrado!';
                    echo(json_encode($jResponse));
                    break;

                }else{
                    #Gerando Hash para token
                    $sha1Token = gerarHash(14);
                    #Atualizando Usuario
                    $qUpdateUser = (runQueryIUD("UPDATE account  SET 'token'= '{$sha1Token}' WHERE email='{$sRecoveryEmail}' "));

                    #Enviando Email
                    $jSendEmail = sendEmail($qConsultUser[0]['email'], $qConsultUser[0]['name'], $sha1Token);

                    #Validando se Email foi enviado
                    if ($jSendEmail['success'] == false) {

                        $jResponse['success'] = $jSendEmail['success'];
                        $jResponse['msg'] = $jSendEmail['msg'];
                        echo(json_encode($jResponse));
                    }else{
                        $jResponse['success'] = $jSendEmail['success'];
                        $jResponse['msg'] = $jSendEmail['msg'];
                        echo(json_encode($jResponse));
                        break;
                    }
                    
                }
        }

        break;
    
    case 'changePassword':

        break;

    default:
        echo('{"msg":"Not Found"}');
        break;
}