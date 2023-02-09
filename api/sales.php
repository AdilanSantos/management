<?php

require('../inc/dbconfig.php');
require('../inc/functions.php');

header("Content-Type: application/json");

$jContent = json_decode(file_get_contents('php://input'), true);

switch ($_GET['action']) {
    
    case 'create':
        $sSession = $jContent['session'];
        $sSaleId = $jContent['Chave'];
        $sSaleClientName = $jContent['ClientName'];
        $sSaleDate = $jContent['SaleDate'];
        $sSaleProductId = $jContent['SaleProductId'];
        $sSaleQuantity = $jContent['SaleQuantity'];
        $sSalePrice = $jContent['SalePrice'];
        $sDateCreation = date('Y-m-d');

        $jVerifySession = json_decode(verify_Session($sSession),true);

        if ($jVerifySession['success'] == false) {
            echo json_encode($jVerifySession);
            break;
        }else{

            if ($sSaleClientName == '') {
                $jResponse['success'] = false;
                $jResponse['sessão'] = 'active';
                $jResponse['msg'] = 'Aviso: Insira o Nome do Cliente!';
                echo (json_encode($jResponse));
                break;
            }else if($sSaleDate == ''){
                $jResponse['success'] = false;
                $jResponse['sessão'] = 'active';
                $jResponse['msg'] = 'Aviso: Insira Data de Venda!';
                echo (json_encode($jResponse));
                break;
            }else if($sSaleProductId == null){
                $jResponse['success'] = false;
                $jResponse['sessão'] = 'active';
                $jResponse['msg'] = 'Aviso: Selecione um Produto!';
                echo (json_encode($jResponse));
                break;
            }else if($sSaleQuantity == ''){
                $jResponse['success'] = false;
                $jResponse['sessão'] = 'active';
                $jResponse['msg'] = 'Aviso: Insira a Quantidade da Venda!';
                echo (json_encode($jResponse));
                break;
            }else if($sSalePrice == ''){
                $jResponse['success'] = false;
                $jResponse['sessão'] = 'active';
                $jResponse['msg'] = 'Aviso: Insira o Valor da Venda!';
                echo (json_encode($jResponse));
                break;
            }else{


                if($sSaleId == ''){
                    $qCreateSale = runQueryIUD("INSERT INTO sales (sale_clientName, sale_date, sale_datecreation, sale_product_id, sale_quantity, sale_price, user_id) VALUES ('{$sSaleClientName}', '{$sSaleDate}', '{$sDateCreation}', '{$sSaleProductId}', '{$sSaleQuantity}', '{$sSalePrice}', (SELECT account_id FROM accounts WHERE session='{$sSession}')) ");
                }else{
                    $qCreateSale = runQueryIUD("UPDATE sales SET sale_id='{$sSaleId}', sales_clientName='{$sSaleClientName}', sale_date='{$sSaleDate}', sale_product_id='{$sSaleProductId}', sale_quantity='{$sSaleQuantity}', sale_price=, user_id WHERE sales_id='{$sSaleId}'");
                }
                if ($qCreateSale >= 1) {
                    $jResponse['success'] = true;
                    $jResponse['session'] = 'active';
                    $jResponse['msg'] = 'Venda Salva!';
                    echo (json_encode($jResponse));
                    break;
                } else {
                    $jResponse['success'] = false;
                    $jResponse['session'] = 'active';
                    $jResponse['msg'] = 'Houve um erro ao salvar Venda!';
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
                break;
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
                    $sqlOrder = 'ORDER BY sale_id DESC';
                }
                        
                if($sPesquisa == ''){
                    $qSelectSales = runQuerySelect("SELECT sales.* , products.product_name FROM sales INNER JOIN products ON sales.sale_product_id = products.product_id {$sqlOrder}");
                }else{
                    $qSelectSales = runQuerySelect("SELECT sales.* , products.product_name FROM sales INNER JOIN products ON sales.sale_product_id = products.product_id WHERE sale_clientName LIKE '%{$sPesquisa}%' {$sqlOrder}");
                }

                if (count($qSelectSales) < 0) {
                    $jResponse['success'] = false;
                    $jResponse['session'] = 'active';
                    echo (json_encode($jResponse));
                    break;
                }else{

                    $aListSales = [];
                    
                    if (array_key_exists('Tudo', $jContent)) {
                        $iLimite = $iRegistroAtual;
                        $iRegistroAtual = 0;
                    }else{
                        $iLimite = $iRegistroAtual + 15;
                    }

                    for ($iRegistroAtual; $iRegistroAtual < $iLimite ; $iRegistroAtual++) {
                        if(array_key_exists($iRegistroAtual, $qSelectSales)){
                            array_push($aListSales , $qSelectSales[$iRegistroAtual]);
                            $aListSales[$iRegistroAtual]['sale_date'] = date('d/m/Y', strtotime($aListSales[$iRegistroAtual]['sale_date']));
                            $aListSales[$iRegistroAtual]['sale_datecreation'] = date('d/m/Y', strtotime($aListSales[$iRegistroAtual]['sale_datecreation']));
                        }else{
                            //Parar o Laço For
                            break;
                        }
                    }

                    $iTotalSales = count($qSelectSales);

                    $jResponse['success'] = true;
                    $jResponse['session'] = 'active';
                    $jResponse['sales'] = $aListSales;
                    $jResponse['total'] = $iTotalSales;
                    echo (json_encode($jResponse));
                    break;
                }
            }
            break;
    
        default:
        echo 'Invalido';
        break;
}