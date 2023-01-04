<?php

//Validação de Email
function validadeEmail($email){
    $regex = "/^([a-zA-Z0-9\.]+@+[a-zA-Z]+(\.)+[a-zA-Z]{2,3})$/";
    return preg_match($regex, $email);
}

//Gerar hash aleatoria
function gerarHash($limite){
    $chave = "#0123456789ABCDEFGHIJKLMNOPQRSTUVXWYZabcdefghijklmnopqrstuvxwyz";
    $tamanhoChave = strlen($chave); // Recebe o tamanho total da String chave
    $sessao ="";
    for($i = 0; $i < $limite; $i++){//Um laço para incrementar cada caractere a Chave
      $sessao .= $chave[rand(0,$tamanhoChave-1)];
    }
    $sessao = sha1($sessao);
    return $sessao;
}