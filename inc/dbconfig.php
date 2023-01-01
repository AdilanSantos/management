<?php


/* Conexão com o BD */
function dbConnection(){
    $hostname = 'localhost';
    $dataBase = 'management';
    $user = 'root';
    $password = 'root';
    
    $mysqli = new mysqli($hostname, $user, $password, $dataBase);
    if ($mysqli->connect_errno) {
        return("Falha ao conectar: (". $mysqli->connect_errno .") ". $mysqli->connect_error);
    }
    return $mysqli;
}

/* Escape String */

function escapeString($string){
    $scapeString = mysqli_escape_string(dbConnection(),$string);
    return $scapeString;
}

/*Inserir, Atualizar e Deletar*/
function runQueryIUD($query){
    $mysqli = dbConnection();
    $mysqli->query($query);
    $sReturn = $mysqli->affected_rows;
    $mysqli->close();
    return $sReturn;
}

/* Select */
function runQuerySelect($query){
    $rows = [];
    $mysqli = dbConnection();
    $result = $mysqli->query($query);
    if ($result = $mysqli->query($query)) {
        while ($row = $result->fetch_assoc()) {
            $rows[] = $row;
        }
        $row = $result->fetch_assoc();
        $result->close();
    }
    
    $mysqli->close();
    return $rows;
}


