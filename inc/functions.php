<?php

//Validação de Email
function validade_Email($email){
    $regex = "/^([a-zA-Z0-9\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/";
    return preg_match($regex, $email);
}

//Gerar hash aleatoria
function generate_Hash($iLimite){
    $chave = "#0123456789ABCDEFGHIJKLMNOPQRSTUVXWYZabcdefghijklmnopqrstuvxwyz";
    $tamanhoChave = strlen($chave); // Recebe o tamanho total da String chave
    $sessao ="";
    for($i = 0; $i < $iLimite; $i++){//Um laço para incrementar cada caractere a Chave
      $sessao .= $chave[rand(0,$tamanhoChave-1)];
    }
    $sessao = sha1($sessao);
    return $sessao;
}

//Validar Sessão

function verify_Session($sSession){

  $qConsultSession = runQuerySelect("SELECT * from accounts WHERE session='{$sSession}'");
  if(count($qConsultSession) >= 1){
      $jResponse['success'] = true;
      $jResponse['msg'] = 'Sessão Ativa!';
      
      return json_encode($jResponse);
  }else{
      $jResponse['success'] = false;
      $jResponse['msg'] = 'Sessão expirada ou não existe!';
      return json_encode($jResponse);
  }
}