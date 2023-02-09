<?php

require('../inc/dbconfig.php');
require('../inc/functions.php');

header("Content-Type: application/json");

$jContent = json_decode(file_get_contents('php://input'), true);

switch ($_GET['action']) {
    
    case 'create':

        $sProductName = trim($jContent['productName']);
        $sProductPrice = trim($jContent['productPrice']);
        $sProductId = trim($jContent['chave']);
        $sSession = $jContent['session'];

        $jVerifySession = json_decode(verify_Session($sSession),true);

        if ($jVerifySession['success'] == false) {
            echo json_encode($jVerifySession);
        }else{
            if ($sProductName == '') {
                $jResponse['success'] = false;
                $jResponse['sessão'] = 'active';
                $jResponse['msg'] = 'Insira um Nome ao Produto!';
                echo (json_encode($jResponse));
                break;
            } else if( $sProductPrice == '' ){
                $jResponse['success'] = false;
                $jResponse['sessão'] = 'active';
                $jResponse['msg'] = 'Insira um Preço ao Produto!';
                echo (json_encode($jResponse));
                break;
            }else{
                if ($sProductId == '') {
                    $qProduct = runQueryIUD("INSERT INTO products (product_name, product_price, account_id) VALUES ('{$sProductName}','{$sProductPrice}', (SELECT account_id FROM accounts WHERE session='{$sSession}'))");
                }else{
                    $qProduct = runQueryIUD("UPDATE products SET product_name='{$sProductName}', product_price='{$sProductPrice}' WHERE product_id='{$sProductId}'");
                }
                if ($qProduct >= 1) {
                    $jResponse['success'] = true;
                    $jResponse['session'] = 'active';
                    $jResponse['msg'] = 'Produto Salvo!';
                    echo (json_encode($jResponse));
                    break;
                } else {
                    $jResponse['success'] = false;
                    $jResponse['session'] = 'active';
                    $jResponse['msg'] = 'Houve um erro ao salvar Produto!';
                    echo (json_encode($jResponse));
                    break;
                }
            }
        }

        break;
        
    case 'list':

        $sSession = $jContent['session'];
        $sPesquisa = escapeString(trim($jContent['Pesquisa']));
        $aOrder = $jContent['Order'];

        $orderByName = '';
        $orderByPrice = '';

        $jVerifySession = json_decode(verify_Session($sSession),true);

        if ($jVerifySession['success'] == false) {
            echo json_encode($jVerifySession);
        }else{

            if (array_key_exists('RAtual', $jContent)) {
                $iRegistroAtual = $jContent['RAtual'];
            } else{
                $iRegistroAtual = 0;
            }

            foreach ($aOrder as $jOrderBy) {
                if (array_key_exists("ProductName",$jOrderBy)) {
                    if ($jOrderBy['ProductName'] == "true") {
                        $orderByName = 'ASC';
                    } else {
                        $orderByName = 'DESC';
                    }  
                }
                if (array_key_exists("ProductPrice",$jOrderBy)) {
                    if ($jOrderBy['ProductPrice'] == "true") {
                        $orderByPrice = 'ASC';
                    } else {
                        $orderByPrice = 'DESC';
                    }  
                }
            }

            if ($orderByName != '' and $orderByPrice != '') {
                $sqlOrder = 'ORDER BY product_name '.$orderByName.', product_price '.$orderByPrice.'';
            } else if ($orderByName != ''){
                $sqlOrder = 'ORDER BY product_name '.$orderByName.'';
            }else if($orderByPrice != ''){
                $sqlOrder = 'ORDER BY product_price '.$orderByPrice.'';
            }else{
                $sqlOrder = 'ORDER BY product_id DESC';
            }
                     
            if($sPesquisa == ''){
                $qSelectProducts = runQuerySelect("SELECT * FROM products {$sqlOrder}");
            }else{
                $qSelectProducts = runQuerySelect("SELECT * FROM products WHERE product_name LIKE '%{$sPesquisa}%' {$sqlOrder}");
            }


            
            if (count($qSelectProducts) < 0) {
                $jResponse['success'] = false;
                $jResponse['session'] = 'active';
                echo (json_encode($jResponse));
                break;
            }else{

                $aListProducts = [];
                
                if (array_key_exists('Tudo', $jContent)) {
                    $iLimite = $iRegistroAtual;
                    $iRegistroAtual = 0;
                }else{
                    $iLimite = $iRegistroAtual + 15;
                }

                for ($iRegistroAtual; $iRegistroAtual < $iLimite ; $iRegistroAtual++) {
                    if(array_key_exists($iRegistroAtual, $qSelectProducts)){
                        array_push($aListProducts , $qSelectProducts[$iRegistroAtual]);
                    }else{
                        break;
                    }
                }

                $iTotalProducts = count($qSelectProducts);

                $jResponse['success'] = true;
                $jResponse['session'] = 'active';
                $jResponse['products'] = $aListProducts;
                $jResponse['total'] = $iTotalProducts;
                $jResponse['orderName'] = $orderByName;
                $jResponse['orderPrice'] = $orderByPrice;
                echo (json_encode($jResponse));
                break;
            }
        }

        break;
    
    case 'delete':

        $sSession = $jContent['session'];
        $aProductsId = $jContent['chave'];

        $jVerifySession = json_decode(verify_Session($sSession),true);

        if ($jVerifySession['success'] == false) {
            echo json_encode($jVerifySession);
            break;
        }else{
            $aProductsId = explode("," ,$aProductsId);
            foreach ($aProductsId as $id) {
                $qDeleteProduct = runQueryIUD("DELETE FROM products WHERE product_id='{$id}'");

            }

            $jResponse['success'] = true;
            $jResponse['session'] = 'active';
            $jResponse['msg'] = 'Produtos Excluidos com Sucesso!';
            echo (json_encode($jResponse));
            break;
        }

        break;

    case 'productData':
        $sSession = $jContent['session'];
        $iChave = $jContent['chave'];

        $jVerifySession = json_decode(verify_Session($sSession),true);

        if ($jVerifySession['success'] == false) {
            echo json_encode($jVerifySession);
            break;
        }else{
            if ($iChave == '') {
                $jResponse['success'] = false;
                $jResponse['msg'] = 'Chave não encontrada';
                $jResponse['session'] = 'active';
                echo json_encode($jResponse);
                break;
            }else{

                $qSelectProduct = runQuerySelect("SELECT * FROM products WHERE product_id='{$iChave}'");

                if (count($qSelectProduct)<= 0) {
                    $jResponse['success'] = false;
                    $jResponse['msg'] = 'Chave não encontrada';
                    $jResponse['session'] = 'active';
                    echo json_encode($jResponse);
                    break;
                } else {

                    $jProduct = $qSelectProduct[0];

                    $jResponse['success'] = true;
                    $jResponse['session'] = 'active';
                    $jResponse['product'] = $jProduct;
                    echo json_encode($jResponse);
                    break;
                }
                
            }
        }
        break;
    
    default:
        echo 'Invalido';
        break;
}