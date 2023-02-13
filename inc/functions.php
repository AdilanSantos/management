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
      $jResponse['session'] = 'active';
      
      return json_encode($jResponse);
  }else{
      $jResponse['success'] = false;
      $jResponse['msg'] = 'Sessão expirada ou não existe!';
      $jResponse['session'] = 'inactive';
      return json_encode($jResponse);
  }
}

function orderSales($aOrder){
  $orderByClient = '';
  $orderByDate = '';
  $orderByDateCreation = '';
  $orderByProduct = '';
  $orderByQuantity = '';
  $orderByPrice = '';

  foreach ($aOrder as $jOrderBy) {
    if (array_key_exists("SaleClient",$jOrderBy)) {
        if ($jOrderBy['SaleClient'] == "true") {
            $orderByClient = 'ASC';
        } else {
            $orderByClient = 'DESC';
        }  
    }
    if (array_key_exists("SaleDateCreation",$jOrderBy)) {
        if ($jOrderBy['SaleDateCreation'] == "true") {
            $orderByDateCreation = 'ASC';
        } else {
            $orderByDateCreation = 'DESC';
        }  
    }
    if (array_key_exists("SaleDate",$jOrderBy)) {
        if ($jOrderBy['SaleDate'] == "true") {
            $orderByDate = 'ASC';
        } else {
            $orderByDate = 'DESC';
        }  
    }
    if (array_key_exists("SaleProduct",$jOrderBy)) {
      if ($jOrderBy['SaleProduct'] == "true") {
          $orderByProduct = 'ASC';
      } else {
          $orderByProduct = 'DESC';
      }  
    }
    if (array_key_exists("SaleQuantity",$jOrderBy)) {
      if ($jOrderBy['SaleQuantity'] == "true") {
          $orderByQuantity = 'ASC';
      } else {
          $orderByQuantity = 'DESC';
      }  
    }
    if (array_key_exists("SalePrice",$jOrderBy)) {
      if ($jOrderBy['SalePrice'] == "true") {
          $orderByPrice = 'ASC';
      } else {
          $orderByPrice = 'DESC';
      }  
    }
  }

  
  $sqlOrder = 'ORDER BY ';
  if ($orderByClient != '') {
    $sqlOrder .= 'sale_clientName '.$orderByClient.'';
  }
  if ($orderByDate != ''){
    if(strlen($sqlOrder) > 9){
      $sqlOrder .= ', ';
    }
    $sqlOrder .= 'sale_date '.$orderByDate.'';
  } 
  if ($orderByDateCreation != ''){
    if(strlen($sqlOrder) > 9){
      $sqlOrder .= ', ';
    }
    $sqlOrder .= 'sale_datecreation '.$orderByDateCreation.'';
  } 
  if ($orderByProduct != ''){
    if(strlen($sqlOrder) > 9){
      $sqlOrder .= ', ';
    }
    $sqlOrder .= 'product_name '.$orderByProduct.'';
  } 
  if ($orderByQuantity != ''){
    if(strlen($sqlOrder) > 9){
      $sqlOrder .= ', ';
    }
    $sqlOrder .= 'sale_quantity '.$orderByQuantity.'';
  } 
  if ($orderByPrice != ''){
    if(strlen($sqlOrder) > 9){
      $sqlOrder .= ', ';
    }
    $sqlOrder .= 'sale_price '.$orderByPrice.'';
  }

  if(strlen($sqlOrder) <= 9){
    $sqlOrder = 'ORDER BY sale_id DESC';
  }
  

  return $sqlOrder;
}