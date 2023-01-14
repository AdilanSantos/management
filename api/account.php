<?php

require('../inc/dbconfig.php');
require('../inc/functions.php');
require('../phpmail/sendEmail.php');

header("Content-Type: application/json");

$jContent = json_decode(file_get_contents('php://input'), true);

switch ($_GET['action']) {
    case 'create':
        $sSignupName =  escapeString(trim($jContent['name']));
        $sSignupEmail = escapeString(trim($jContent['email']));
        $sSignupPwd =  escapeString(trim($jContent['password']));
        $sSignupConfirmPwd =  escapeString(trim($jContent['confirmPassword']));
        $sSigCheck = escapeString(trim($jContent['sigCheck']));

        if (!validadeEmail($sSignupEmail)) {
            $jResponse['success'] = false;
            $jResponse['msg'] = 'Insira um Email válido!';
            echo (json_encode($jResponse));
            break;
        } else if ($sSignupPwd != $sSignupConfirmPwd) {
            $jResponse['success'] = false;
            $jResponse['msg'] = 'As senhas não coincidem!';
            echo (json_encode($jResponse));
            break;
        } else if (strlen($sSignupPwd) < 6) {
            $jResponse['success'] = false;
            $jResponse['msg'] = 'A senha deve conter no mínimo 6 caracteres!';
            echo (json_encode($jResponse));
            break;
        } else {
            $qConsultUser = (runQuerySelect("SELECT * FROM account WHERE email='{$sSignupEmail}'"));

            if (count($qConsultUser) >= 1) {
                $jResponse['success'] = false;
                $jResponse['msg'] = 'O Email informado já está registrado!';
                $jResponse['log'] = $qConsultUser;
                echo (json_encode($jResponse));
                break;
            } else {
                //Codificando a senha em sh1
                $sha1Pwd = sha1($sSignupPwd);

                //Criando Usuario no BD
                $qCreateUser = (runQueryIUD("INSERT INTO account (email, name, password, sigCheck) VALUES ('{$sSignupEmail}', '{$sSignupName}', '{$sha1Pwd}', '{$sSigCheck}')"));

                if ($qCreateUser >= 1) {
                    $jResponse['success'] = true;
                    $jResponse['msg'] = 'Conta Criada!';
                    echo (json_encode($jResponse));
                    break;
                } else {
                    $jResponse['success'] = false;
                    $jResponse['msg'] = 'Não foi possível criar conta!';
                    echo (json_encode($jResponse));
                    break;
                }
            }
        }

        break;

    
    case 'login':

        $sType = escapeString(trim($jContent['type']));

        if ($sType == 'google') {
            $sLoginEmail = escapeString(trim($jContent['email']));

            if (!validadeEmail($sLoginEmail)) {
                $jResponse['success'] = false;
                $jResponse['msg'] = 'Insira um Email válido!';
                echo (json_encode($jResponse));
                break;
            } else {
                $qConsultUser = (runQuerySelect("SELECT * FROM account WHERE email='{$sLoginEmail}'"));

                if (count($qConsultUser) <= 0) {
                    $jResponse['success'] = false;
                    $jResponse['msg'] = 'Email não registrado!';
                    echo (json_encode($jResponse));
                    break;
                } else {
                    if ($qConsultUser[0]['sigCheck'] == 0) {
                        $jResponse['success'] = false;
                        $jResponse['msg'] = 'Permissão negada para Login Google!';
                        $jResponse['sql'] = $qConsultUser[0];
                        echo (json_encode($jResponse));
                        break;
                    } else {
                        $jResponse['success'] = true;
                        $jResponse['msg'] = 'Acesso liberado!';
                        $jResponse['sql'] = $qConsultUser[0];
                        echo (json_encode($jResponse));
                        break;
                    }
                }
            }
        } else if ($sType == 'default') {

            $sLoginEmail = escapeString(trim($jContent['email']));
            $sLoginPwd =  escapeString(trim($jContent['password']));

            if (!validadeEmail($sLoginEmail)) {
                $jResponse['success'] = false;
                $jResponse['msg'] = 'Insira um Email válido!';
                echo (json_encode($jResponse));
                break;
            } else {

                //Codificando a senha em sh1
                $sha1Pwd = sha1($sLoginPwd);

                $qConsultUser = (runQuerySelect("SELECT * FROM account WHERE email='{$sLoginEmail}' AND password='{$sha1Pwd}'"));

                if (count($qConsultUser) >= 1) {
                    $jResponse['success'] = true;
                    $jResponse['msg'] = 'Acesso Liberado!';
                    echo (json_encode($jResponse));
                    break;
                } else {
                    $jResponse['success'] = false;
                    $jResponse['msg'] = 'Login ou Senha incorretos!';
                    echo (json_encode($jResponse));
                    break;
                }
            }

            $jResponse['success'] = false;
            $jResponse['msg'] = "Usuario não encontrado";
            echo (json_encode($jResponse));
            break;
        } else {
            $jResponse['success'] = false;
            $jResponse['msg'] = 'Erro na solicitação!';
            echo (json_encode($jResponse));
            break;
        }

    case 'upload':

        if (isset($_FILES['profile_image'])) {

            #Obtendo imagem
            $imgName = $_FILES['profile_image']['name'];
            $imgSize = $_FILES['profile_image']['size'];
            $tmpName = $_FILES['profile_image']['tmp_name'];
            $error = $_FILES['profile_image']['error'];

            if ($error === 0) {
                if ($imgSize >100000000) {
                    $jResponse['success'] = false;
                    $jResponse['msg'] = "Tamanho do arquivo muito grande!";

                    echo json_encode($jResponse);
                    break;
                }else{

                    #Obtendo tipo de arquivo
                    $imgEx = pathinfo($imgName,PATHINFO_EXTENSION);

                    $imgExLc = strtolower($imgEx);

                    $allowedEx = array("jpeg", "jpg", "png");

                    #Validando se o tipo de arquivo é permitido
                    if (in_array($imgExLc, $allowedEx)) {
                        
                        #Salvando foto em uploads
                        $newImgName = uniqid('IMG-', true).'.'.$imgExLc;

                        $imgUploadPath = "../uploads/".$newImgName;

                        move_uploaded_file($tmpName, $imgUploadPath);

                        #Salvando foto no BD
                        $qInsertPhoto = runQueryIUD("UPDATE account SET imageName='{$newImgName}' WHERE id='3' ");

                        if ($qInsertPhoto >= 1) {
                            $jResponse['success'] = true;
                            $jResponse['msg'] = "Imagem alterada com sucesso!";
                            $jResponse['src'] = $newImgName;
                            echo json_encode($jResponse);
                            break;
                        }else{
                            $jResponse['success'] = false;
                            $jResponse['msg'] = "Houve um erro ao salvar imagem!";
                            $jResponse['sql'] =$qInsertPhoto;
                            echo json_encode($jResponse);
                            break;
                        }

                    }else{
                        $jResponse['success'] = false;
                        $jResponse['msg'] = "Tipo de arquivo não permitido.";
                        echo json_encode($jResponse);
                        break;
                    }

                    $jResponse['success'] = true;
                    $jResponse['msg'] = "Tamanho do arquivo muito grande!";

                    echo json_encode($jResponse);
                    break;
                }
                
            }else{
                #error message
                $jResponse['success'] = false;
                $jResponse['msg'] = "Erro ocorreu";

                echo json_encode($jResponse);
                break;
            }
        }
        $jResponse['success'] = false;
        $jResponse['msg'] = "Sem arquivo";
        echo json_encode($jResponse);

        break;

    case 'list':
        $sId = $jContent['id'];

        $qListUser = runQuerySelect("SELECT * from account WHERE id='{$sId}'");
        if ($qListUser >= 1) {
            $jResponse['success'] = true;
            $jResponse['name'] = $qListUser[0]['name'];
            $jResponse['email'] = $qListUser[0]['email'];
            $jResponse['src'] = $qListUser[0]['imageName'];
            echo json_encode($jResponse);
            break;

        }else{
            $jResponse['success'] = true;
            $jResponse['msg'] = 'Não foi possível listar informação';
            echo json_encode($jResponse);
            break;
        }
        break;

    case 'recoveryPassword':

        $sRecoveryEmail = escapeString(trim($jContent['email']));

        if (!validadeEmail($sRecoveryEmail)) {
            $jResponse['success'] = false;
            $jResponse['msg'] = 'Insira um Email válido!';
            echo (json_encode($jResponse));
            break;
        } else {
            $qConsultUser = (runQuerySelect("SELECT * FROM account WHERE email='{$sRecoveryEmail}'"));

            if (count($qConsultUser) <= 0) {
                $jResponse['success'] = false;
                $jResponse['msg'] = 'Email não registrado!';
                echo (json_encode($jResponse));
                break;
            } else {
                #Gerando Hash para token
                $sha1Token = gerarHash(14);
                #Atualizando Usuario
                $qUpdateUser = (runQueryIUD("UPDATE account  SET token= '{$sha1Token}' WHERE email='{$sRecoveryEmail}' "));

                #Enviando Email
                $jSendEmail = sendEmail($qConsultUser[0]['email'], $qConsultUser[0]['name'], $sha1Token);

                #Validando se Email foi enviado
                if ($jSendEmail['success'] == false) {

                    $jResponse['success'] = $jSendEmail['success'];
                    $jResponse['msg'] = $jSendEmail['msg'];
                    echo (json_encode($jResponse));
                } else {
                    $jResponse['success'] = $jSendEmail['success'];
                    $jResponse['msg'] = $jSendEmail['msg'];
                    $jResponse['sql'] = $qUpdateUser;
                    echo (json_encode($jResponse));
                    break;
                }
            }
        }

        break;

    case 'changePassword':
        $sChangePwd = escapeString(trim($jContent['password']));
        $sChangeConfirmPwd = escapeString(trim($jContent['confirmPassword']));
        $sChangeToken = escapeString(trim($jContent['token']));

        if ($sChangePwd != $sChangeConfirmPwd) {
            $jResponse['success'] = false;
            $jResponse['msg'] = 'As senhas não coincidem!';
            echo (json_encode($jResponse));
            break;
        } else if (strlen($sChangePwd) < 6) {
            $jResponse['success'] = false;
            $jResponse['msg'] = 'A senha deve conter no mínimo 6 caracteres!';
            echo (json_encode($jResponse));
            break;
        } else {
            #Senha em Sha1
            $sha1Pwd = sha1($sChangePwd);
            
            #Gerando novo Token para utilizar
            $newToken = gerarHash(14);

            $qUpdatePassword = (runQueryIUD("UPDATE account  SET password= '{$sha1Pwd}', token='{$newToken}'  WHERE token='{$sChangeToken}' "));
            
            if ($qUpdatePassword >= 1) {
                $jResponse['success'] = true;
                $jResponse['msg'] = 'Senha Alterada com sucesso!';
                echo (json_encode($jResponse));
                break;
            } else {
                $jResponse['success'] = false;
                $jResponse['msg'] = 'Não foi possível alterar a Senha!';
                echo (json_encode($jResponse));
                break;
            }
        
        }
        break;

    case 'validateToken':
        $sToken = escapeString(trim($jContent['token']));

        $qConsultToken = (runQuerySelect("SELECT * FROM account WHERE token='{$sToken}'"));

        if (count($qConsultToken) <= 0) {
            $jResponse['success'] = false;
            $jResponse['msg'] = 'Token Expirado ou não existe!';
            echo (json_encode($jResponse));
            break;
        } else {
            $jResponse['success'] = true;
            $jResponse['msg'] = 'Token Ativo!';
            echo (json_encode($jResponse));
            break;
        }

        break;

    case 'validateEmail':
        
        break;
    
    default:
        echo ('{"msg":"Not Found"}');
        break;
}
