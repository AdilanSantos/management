<?php

require('../inc/dbconfig.php');
require('../inc/functions.php');

header("Content-Type: application/json");

$jContent = json_decode(file_get_contents('php://input'), true);

switch ($_GET['action']) {
    
    case 'listDashboard':

        $sSession = $jContent['session'];

        $jVerifySession = json_decode(verify_Session($sSession),true);

        if ($jVerifySession['success'] == false) {
            echo json_encode($jVerifySession);
        }else{
            
            $qSelectDashboard = runQuerySelect("SELECT *, DATE_FORMAT(date,'%d/%m/%Y') AS dataCriacao FROM products WHERE user_id=(SELECT user_id FROM accounts WHERE session='{$sSession}')");

            $fPriceTotalSalesMonth = 0;
            $aProducts = [];
            $aSalesDashboard = [];
            for ($i=0; $i < count($qSelectDashboard); $i++) { 
                $fPriceTotalSalesMonth = $fPriceTotalSalesMonth + $qSelectDashboard[$i]['price'];
                array_push($aProducts, $qSelectDashboard[$i]['product_name']);

                if (count($aSalesDashboard) < 15) {
                    array_push($aSalesDashboard, $qSelectDashboard[$i]);
                }
            }

            $aOrderedProducts = array_count_values($aProducts);
            arsort($aOrderedProducts);
            $sProductBestSellingMonth = array_keys($aOrderedProducts)[0];

            $jResponse['numberTotalSalesMonth'] = count($qSelectDashboard);
            $jResponse['productBestSellingMonth'] = $sProductBestSellingMonth;
            $jResponse['priceTotalSalesMonth'] = $fPriceTotalSalesMonth;
            $jResponse['sales'] = $aSalesDashboard;
            echo json_encode($jResponse);
        }

        break;
    
    default:
        echo 'Invalido';
        break;
}