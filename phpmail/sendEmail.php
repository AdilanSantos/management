<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';



function sendEmail($sEmail, $sName, $sMensagem, $sTitulo){
    $mail = new PHPMailer(true);

    try {
        //Server setting
        #$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'notifymanagementapp@gmail.com';                     //SMTP username
        $mail->Password   = 'aeyadovscldmpzin';                               //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
        $mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $mail->setFrom('notifymanagementapp@gmail.com', 'Notify App');
        $mail->addAddress($sEmail, $sName);     //Add a recipient
        $mail->addReplyTo('notifymanagementapp@gmail.com', 'Notificação App');

        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->CharSet = 'UTF-8';
        $mail->Subject = $sTitulo;
        $mail->Body    = $sMensagem;
        $mail->send();

        $jSendEmail['success'] = true;
        return $jSendEmail;
    } catch (Exception $e) {
        $jSendEmail['success'] = false;
        $jSendEmail['msg'] = ;
        return $jSendEmail;
        #return "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
