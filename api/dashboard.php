<?php

require('../inc/dbconfig.php');
require('../inc/functions.php');

header("Content-Type: application/json");

$jContent = json_decode(file_get_contents('php://input'), true);

switch ($_GET['action']) {
    
    case 'list':

        $sSession = $jContent['session'];

        $jVerifySession = json_decode(verify_Session($sSession),true);

        if ($jVerifySession['success'] == false) {
            echo json_encode($jVerifySession);
        }else{
            
            $qSelectDashboard = runQuerySelect("SELECT sales.* , products.product_name FROM sales INNER JOIN products ON sales.sale_product_id = products.product_id WHERE sale_active='S' ORDER BY sale_id DESC");
            

            $fPriceTotalSalesMonth = 0;
            $aProducts = [];
            $aSalesDashboard = [];
            for ($i=0; $i < count($qSelectDashboard); $i++) { 
                $fPriceTotalSalesMonth = $fPriceTotalSalesMonth + $qSelectDashboard[$i]['sale_price'];
                array_push($aProducts, $qSelectDashboard[$i]['product_name']);
                
            
                if (count($aSalesDashboard) < 15) {
                    array_push($aSalesDashboard, $qSelectDashboard[$i]);
                    $aSalesDashboard[$i]['sale_date'] = date('d/m/Y', strtotime($qSelectDashboard[$i]['sale_date']));
                    $aSalesDashboard[$i]['sale_datecreation'] = date('d/m/Y', strtotime($qSelectDashboard[$i]['sale_datecreation']));
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