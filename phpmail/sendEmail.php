<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';



function sendEmail($sEmail, $sName, $sha1Token){
    $mail = new PHPMailer(true);

    try {
        //Server settings
        #$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'notifymanagementapp@gmail.com';                     //SMTP username
        $mail->Password   = 'vsqunzgcdhlywwoq';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $mail->setFrom('notifymanagementapp@gmail.com', 'Notify App');
        $mail->addAddress($sEmail, $sName);     //Add a recipient
        $mail->addReplyTo('notifymanagementapp@gmail.com', 'Notificação App');

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->CharSet = 'UTF-8';
        $mail->Subject = 'Esqueci minha Senha - App Management';
        $mail->Body    = "Ola $sName, tudo bem? <br>
        Você realizou a solicitação de senha em nosso Portal. Para confirmarmos que foi realizado por você mesmo, precisamos redefini-la, para isso clique no Link abaixo:<br>
        <a href='http://localhost:8080/management/ChangePassword?tkn=$sha1Token'>CLIQUE AQUI PARA REDEFINIR SUA SENHA</a>.";

        $mail->send();

        $jSendEmail['success'] = true;
        $jSendEmail['msg'] = 'Aviso: Email de recuperação de senha encaminhado. Verifique seu Email! ';
        return $jSendEmail;
    } catch (Exception $e) {
        $jSendEmail['success'] = false;
        $jSendEmail['msg'] = 'Aviso: Não foi possível encaminhar o Email de Recuperação! ';
        return $jSendEmail;
        #return "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}