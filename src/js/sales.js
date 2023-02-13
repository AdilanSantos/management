//Toggle e Sidebar
const body = document.querySelector("body");
const sidebar = body.querySelector(".sidebar");
const toggle = body.querySelector(".toggle");
const searchBtn = body.querySelector(".search-box");
const modeSwitch = body.querySelectorAll(".toggle-switch");
const modeText = body.querySelector(".mode-text");
const tBody = body.querySelector("tbody");


toggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});
searchBtn.addEventListener("click", () => {
    sidebar.classList.remove("close");
})
//Abrir menu Mobile

$(".mobile-toggle").click(function(){
    if($(".mobile-menu").hasClass("active")){
        closeMobileMenu();
    }else{
        openMobileMenu();
    }
    
})

//Função para Fechar Mobile Menu
function closeMobileMenu(){
    $(".mobile-toggle").removeClass("uil uil-multiply");
    $(".mobile-toggle").addClass("uil uil-bars");
    $(".mobile-menu").removeClass("active");
}
//Função para Abrir Mobile Menu
function openMobileMenu() {
    $(".mobile-toggle").removeClass("uil uil-bars");
    $(".mobile-toggle").addClass("uil uil-multiply");
    $(".mobile-menu").addClass("active");
}

//Fechar Mobile menu ao clicar na opção

$(".mobile-menu li a").click(function(){
    closeMobileMenu()
})

//Alternar para Dark Mode
$(".toggle-switch").on("click", () => {
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
    } else {
        localStorage.setItem("mode", "light");
    }

    if (body.classList.contains("dark")) {
        modeText.innerText = "Light Mode"
    } else {
        modeText.innerText = "Dark Mode"
    }
})

let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
    body.classList.toggle("dark")
}

let getStatus = localStorage.getItem("status");
if (getStatus && getStatus === "close") {
    sidebar.classList.toggle("close")
}

// Função para abrir mensagem de erro 
function openMessageError() {
    $(".alert").removeClass('hide'); //removendo classe para exibir alerta
    $(".alert").addClass('show');
    $(".alert").addClass('showAlert');

    //Função para fechar mensagem após 5 segundos
    setTimeout(function () {
        $(".alert").addClass("hide");
        $(".alert").removeClass("show");
        $(".alert").removeClass("showAlert");
    }, 5000);
}

// Fechar mensagem de erro 
$(".close-message").click(function () {
    $(".alert").addClass("hide");
    $(".alert").removeClass("show");
    $(".alert").removeClass("showAlert");
})


//Abrir Modal de Criar/Editar Produto e Profile
const modalProfile = body.querySelector(".modal-profile");
const modalSale = body.querySelector(".modal-sales")
const modalDisable = body.querySelector(".modal-Confirm")
$(".newSale").click(function(){
    modalSale.classList.toggle("active")
    $("#saleQuantity").val('1')
})

//Abrir modal de Desativar Venda
$(".disableSale").click(function(){
    iProductsSelected = 0
    $("tbody").find("tr :checked").each(function () {
        iProductsSelected++;
    });
    $("#SalesSelected").html(iProductsSelected+" Registro(s)")
    modalDisable.classList.toggle("active")
})

$(".btnConfirmCancel").click(function(){
    
    modalDisable.classList.toggle("active")
})

//Desativar/Ativar Venda
$(".btnConfirmDisable").click(function(){
    aSalesID = []
    $("tbody").find("tr :checked").each(function () {
        aSalesID.push(this.value)
    });

    aSalesID = JSON.stringify(aSalesID);
    jData = '{"session":"'+sSession+'","chave": '+aSalesID+', "disable":"'+sDisable+'"}'
    $.ajax({
        url: "api/sales.php?action=disable",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        data: jData
    }).done(function(response){
        if (response.success == false) {
            if (response.session == 'inactive') {
                window.location.href = 'index';
            } else {
                $("#message").html('Aviso: Houve um erro!') //Message Error
                openMessageError();
            }
        }else{
            modalDisable.classList.toggle("active")
            listSales(sSession, orderByClient, orderByDateCreation, orderByDate, orderByProduct, orderByQuantity, orderByPrice, sActive)
        }
    }).fail(function(jqXHR){
        console.log(jqXHR)
    })
})
//Fechar Modal
$(".btn-CloseModal").click(function () {
    modalSale.classList.toggle("active")
})

$(".btn-cancel").click(function () {
    modalProfile.classList.toggle("active")
})

//Salvar Venda
$(".btn-Save").click(function(){
    sSaleId = $("#salesId").val();
    sSaleClientName = $("#saleClient").val();
    sSaleData = $("#saleData").val();
    sSaleProductId = $(".productsList").val();
    sSaleQuantity = $("#saleQuantity").val();
    sSalePrice = $("#salePrice").val();

    if (sSaleClientName == '') {
        $("#message").html('Aviso: Insira o Nome do Cliente!') //Message Error
        openMessageError();
    } else if(sSaleData == ''){
        $("#message").html('Aviso: Insira Data de Venda!') //Message Error
        openMessageError();
    }else if(sSaleProductId == null){
        $("#message").html('Aviso: Selecione um Produto!') //Message Error
        openMessageError();
    }else if (sSaleQuantity == '') {
        $("#message").html('Aviso: Insira a Quantidade da Venda!') //Message Error
        openMessageError();
    } else if(sSalePrice == ''){
        $("#message").html('Aviso: Insira o Valor da Venda!') //Message Error
        openMessageError();
    }else{

        jData = '{"session":"'+sSession+'", "Chave":"'+sSaleId+'", "ClientName":"'+sSaleClientName+'", "SaleDate":"'+sSaleData+'", "SaleProductId":"'+sSaleProductId+'","SaleQuantity":"'+sSaleQuantity+'", "SalePrice":"'+sSalePrice+'"}'

        $.ajax({
            url: "api/sales.php?action=create",
            contentType: "application/json; charset=utf-8",
            type: "POST",
            data: jData
        }).done(function (response) {
            console.log(response)
            if (response.success == true) {
                modalSale.classList.toggle("active");
                $("#message").html(response.msg);
                openMessageError();
                clearSaleModal();
                var bTudo = "true";
                listSales(sSession, orderByClient, orderByDateCreation, orderByDate, orderByProduct, orderByQuantity, orderByPrice, sActive, bTudo);

            } else {
                if (response.session == 'inactive') {
                    window.location.href('index')

                }else{
                    $("#message").html(response.msg); //Message Error
                    openMessageError();
                }
                    
            }
            
        }).fail(function (StatusCode) {
            console.log(StatusCode);
            $("#message").html('Erro: Não foi possivel realizar a ação.'); //Message Error
            openMessageError();
        })
    }

    
})

//Limpar campos Venda

function clearSaleModal() {
    $('#saleClient').val('');
    $('#saleData').val('');
    $('.productsList').select2('data', {id: null, text: null});
    $('#saleQuantity').val('')
    $('#salePrice').val('')
}

//Editar Perfil
$('#profileSave').click(function(){
    var sProfileName = $('#profileName').val().trim();
    var sProfileEmail = $('#profileEmail').val().trim();
    var sProfilePwd = $('#profilePwd').val().trim();
    var sProfileConfirmPwd = $('#profileConfirmPwd').val().trim();

    if(sProfileName == ''){
        $("#message").html('Preencha o campo Nome!')//Message Error
        openMessageError();
    }else if(sProfilePwd.length > 0 & sProfilePwd.length < 6){
        $("#message").html('A senha deve conter no mínimo 6 caracteres!')//Message Error
        openMessageError();
    }else if(sProfilePwd!= sProfileConfirmPwd){
        $("#message").html('As senhas não coincidem!')//Message Error
        openMessageError();
    }else{

        jData = '{"name":"'+sProfileName+'", "email":"'+sProfileEmail+'","password":"'+sProfilePwd+'","confirmPassword":"'+sProfileConfirmPwd+'"}'
        
        console.log(jData)
        //Requisição Ajax para Editar Perfil
        $.ajax({
            url: "api/account.php?action=editProfile",
            contentType: "application/json; charset=utf-8",
            type: "POST",
            data: jData
        }).done(function(response){
            if (response.success == true) {
                $('#profileName').val(response.name)
                $("#message").html(response.msg)//Message
                openMessageError();
                console.log(response)
            }else{
                console.log(response)
                $("#message").html(response.msg)//Message 
                openMessageError();
            }
        }).fail(function(jqXHR, StatusCode){
            $("#message").html('Houve um erro ao Salvar Perfil')//Message
            openMessageError();
        })
    }
})


//Abril Profile
$(".btnProfile").click(function () {
    modalProfile.classList.toggle("active");
    jData = '{"session":"'+sSession+'"}'
    //Requisição Ajax para lista configuração
    $.ajax({
        url: "api/account.php?action=listProfile",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        data: jData
    }).done(function(response){
        if (response.success == true) {
            if (response.src != null) {
                $('#upload').attr("src", "uploads/"+response.src+"");
            }
            $('#profileName').val(response.name)
            $('#profileEmail').val(response.email)
            $('#profilePwd').val('')
            $('#profileConfirmPwd').val('')

            console.log(response)
            
        }else{
            window.location.href = 'index';
        }
    }).fail(function(jqXHR){
        console.log(jqXHR)
    })
})

//Editar Imagem e exibir 
const inputFile = document.querySelector('#file');
const uploadImage = document.querySelector('#upload')

inputFile.addEventListener('change', function(e){
    const inputTarget = e.target;
    const fImage = inputTarget.files[0];
    var imgCurrent = $('#upload').attr('src');

    if (fImage){
        const reader = new FileReader();
        reader.addEventListener('load', function(e){
            
            //Obtendo valores alterados
            var form_data = new FormData();
            var imgProfile = $("#file")[0].files;

            if (imgProfile.length > 0){
                form_data.append('profile_image', imgProfile[0]);
                form_data.append('imgCurrent', imgCurrent)
                form_data.append('session', sSession)
                //Requisição Ajax encaminhando os dados de Login
                $.ajax({
                    
                    url: "api/account.php?action=uploadImage",
                    contentType: false,
                    processData: false,
                    type: "POST",
                    data: form_data
                }).done(function(response){
                    if (response.success == true) {
                        console.log(response)
                        $('#upload').attr("src", "uploads/"+response.src+"");
                        $("#message").html('Imagem alterada com sucesso!')//Message Error
                        openMessageError();
                    }else{
                        $("#message").html('Não foi possível alterar a Imagem de Perfil.')//Message Error
                        openMessageError();
                    }
                }).fail(function(response){
                    $("#message").html(response.msg)//Message Error
                    openMessageError();
                })
            }else{
                    $("#message").html('Houve um erro para Inserir Imagem!')//Message Error
                    openMessageError();
                }
        });
        

        reader.readAsDataURL(fImage)
    }
})

//Logout
$('.logout').click(function(){
    console.log('clicou')
    jData = '{"session":"'+sSession+'"}'

    $.ajax({
        url: "api/account.php?action=logout",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        data: jData
    }).done(function(response){
        if (response.success == true) {
            window.location.href ='index';
            
        }else{
            $("#message").html(response.msg)//Message Error
            openMessageError();
        }
    }).fail(function(jqXHR){
        console.log(jqXHR)
    })
})

//Select2
$(document).ready(function() {
    $('.productsList').select2({
        width: "100%",
        background:"black",
        language: {
            searching: function() {
                return "Pesquisando...";
            },
            noResults: function(){
                return "Produto não encontrado!";
            }
        },
        ajax:{
            url: "api/product.php?action=list",
            dataType: "json",
            type: "POST",
            delay: 250,
            headers: {
                "Content-Type": "application/json"
            },
            data: function (params) {
                
                if (!params.term) {
                    sPesquisa = '';
                } else {
                    sPesquisa = params.term;
                }
                var jData = '{"session":"'+sSession+'", "Pesquisa":"'+sPesquisa+'", "Order": []}';
                return jData;
            },
            processResults: function (data) {
                var response = []
                data.products.forEach( product => {
                    response.push({"id": ""+product.product_id+"", "text": ""+product.product_name+""})
                });
                
                return {
                  results: response
                };
            }
        }

    });

    $(".clientList").select2({
        width: "100%"
    })
});

//Lista de Vendas
if (!localStorage.getItem("session")) {
    window.location.href = "index";
} else {
    var sSession = localStorage.getItem("session");
    var iRAtual = 0;
    var sActive = "S"
    var sDisable = "N"
    orderByClient = '';
    orderByDate = '';
    orderByDateCreation = '';
    orderByProduct = '';
    orderByQuantity = '';
    orderByPrice = '';
    listSales(sSession, orderByClient, orderByDateCreation, orderByDate, orderByProduct, orderByQuantity, orderByPrice, sActive)
}

//Listar Vendas
function listSales(sSession, orderByClient, orderByDateCreation, orderByDate, orderByProduct, orderByQuantity, orderByPrice, sActive, bTudo){
    $(".refresh").addClass("active");
    $(".refresh-table button").prop("disabled", true);

    var sPesquisa = $(".input-SearchBox").val().trim();
    var order = [];

    if (orderByClient != "") {
        order.push(orderByClient);
    }
    if(orderByDateCreation != ""){
        order.push(orderByDateCreation);
    }
    if(orderByDate != ""){
        order.push(orderByDate);
    }
    if(orderByProduct != ""){
        order.push(orderByProduct);
    }
    if(orderByQuantity != ""){
        order.push(orderByQuantity);
    }
    if(orderByPrice != ""){
        order.push(orderByPrice);
    }

    order = JSON.stringify(order);

    if (iRAtual == 0) {
        var jData = '{"session":"' + sSession + '", "Active":"'+sActive+'", "Pesquisa":"'+sPesquisa+'", "Order": '+order+'}'
    }else{
        if(!bTudo){
            var jData = '{"session":"' + sSession + '", "RAtual":"'+iRAtual+'","Active":"'+sActive+'", "Pesquisa":"'+sPesquisa+'", "Order": '+order+'}';
        }else{

            var jData = '{"session":"' + sSession + '", "Tudo": "'+bTudo+'", "RAtual":"'+$("tbody tr").length+'", "Active":"'+sActive+'", "Pesquisa":"'+sPesquisa+'", "Order": '+order+' }';
        }
        
    }

    $.ajax({
        url: "api/sales.php?action=list",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        data: jData
    }).done(function (response) {
        if (response.success == false) {
            if (response.session == 'inactive') {
                window.location.href = 'index';
            } else {
                $("#message").html('Aviso: Houve um erro!') //Message Error
                openMessageError();
            }

        } else {
            console.log(response)
            sTbodySales = ''
            sMobileCard = '';
            
            aSales = response.sales;
            if (aSales == 0) {
                $('tbody').html('');
                $(".card-content").html('');
            }else{
                for(i =0; i< aSales.length; i++) {
                    iSaleId = aSales[i].sale_id;
                    sSaleClientName = aSales[i].sale_clientName
                    sSaleProductName = aSales[i].product_name;
                    sSaleDate = aSales[i].sale_date;
                    sSaleDateCreation = aSales[i].sale_datecreation;
                    sSaleQuantity = aSales[i].sale_quantity;
                    fSalePrice = aSales[i].sale_price;

                    sTbodySales += `
                        <tr>
                            <th><input type="checkbox" value="`+ iSaleId +`"></th>
                            <td><span class="data-list">`+sSaleClientName+`</span></td>
                            <td><span class="data-list">`+sSaleDateCreation+`</span></td>
                            <td><span class="data-list">`+sSaleDate+`</span></td>
                            <td><span class="data-list">`+sSaleProductName+`</span></td>
                            <td><span class="data-list">`+sSaleQuantity+`</span></td>
                            <td><span class="data-list">R$ `+fSalePrice+`</span></td>
                        </tr>`;

                    sMobileCard +=`
                        <div class="row">
                                <div class="mobile-card">
                                    
                                    <div class="card-text">
                                        <input type="checkbox" value="`+ iSaleId +`">
                                    </div>

                                    <div class="card-text">
                                        <span class="card-list">Cliente: `+sSaleClientName+`</span>
                                    </div>
                                    
                                    <div class="card-text">
                                        <span class="card-list">Data Criação: `+sSaleDateCreation+`</span>
                                    </div>

                                    <div class="card-text">
                                        <span class="card-list">Data de Venda: `+sSaleDate+`</span>
                                    </div>
                                    
                                    <div class="card-text">
                                        <span class="card-list">Produto: `+sSaleProductName+`</span>
                                    </div>

                                    <div class="card-text">
                                        <span class="card-list">Quantidade: `+sSaleQuantity+`</span>
                                    </div>
                                    
                                    <div class="card-text">
                                        <span class="card-list">Valor: `+fSalePrice+`</span>
                                    </div>
        
                                </div>
                            </div>
                    `
                };
                if (iRAtual == 0 || bTudo == 'true') {
                    $('tbody').html(sTbodySales);
                    $(".card-content").html(sMobileCard);
                } else {
                    $('tbody').append(sTbodySales);
                    $(".card-content").append(sMobileCard)
                }
            }
            
            var itensExibidos =  $("tbody tr").length;
            $('.total').html(itensExibidos+'/'+response.total)

            if (itensExibidos >= response.total) {
                $('.pager button').prop('disabled', true)
            }else{
                $('.pager button').prop('disabled', false)
            }
            
        }
    }).fail(function () {
        $("#message").html('Aviso: Houve um erro!') //Message Error
        openMessageError();
    })
   
    $(".refresh").removeClass("active");
    $(".refresh-table button").prop("disabled", false);
}

//Refresh Button
$(".refresh").click(function(){
    iRAtual = 0;
    listSales(sSession, orderByClient, orderByDateCreation, orderByDate, orderByProduct, orderByQuantity, orderByPrice, sActive)
})

//Paginação
$(".pager button").click(function(){
    iRAtual += 15;
    if ($("tbody tr").length < iRAtual) {
        iRAtual = $("tbody tr").length
    }
    
    listSales(sSession, orderByClient, orderByDateCreation, orderByDate, orderByProduct, orderByQuantity, orderByPrice, sActive)
})


//Resgatar valor do Produto
$(".productsList").on("change", function(){
    sSaleProductId = $(".productsList").val();
    productData(sSession, sSaleProductId)
})

//Função para obter valor do Produto
function productData(sSession, iProductId) {
    jData = '{"session":"'+sSession+'", "chave":"'+iProductId+'"}'
    $.ajax({
        url: "api/product.php?action=productData",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        data: jData
    }).done(function(response){
        if (response.success == true) {
            console.log(response.product_price)
            $("#saleProductPrice").val(response.product.product_price)
            calcValue();
        }else{
            if (response.session == "inactive") {
                window.location.href ='index';
            } else {
                $("#message").html(response.msg)//Message Error
                openMessageError();
            }
        }
    }).fail(function(jqXHR){
        console.log(jqXHR)
    })
}

//Calcular Preço do Produto x Quantidade
$("#saleQuantity").on("change", function(){
    calcValue();
})

$("#saleProductPrice").on("change", function(){
    calcValue();
})

function calcValue(){
    iQntd = $("#saleQuantity").val();
    fPrice = $("#saleProductPrice").val();

    fNewPrice = iQntd * fPrice;
    $("#salePrice").val(fNewPrice);
}


//Marcar todas as CheckBox
$('.AllCheckBox').click(function(){
    var AllInput = tBody.querySelectorAll('input');

    inputToggle = this.checked;
    
    AllInput.forEach((AllInput)=>{
        AllInput.checked = inputToggle;
    })

    if (inputToggle == true) {
        $(".disableSale").addClass("active");
    } else {
        $(".disableSale").removeClass("active");
    }
    
})

//Função para Exibir o botão Excluir
$("table").on("click", ":checkbox", function(){
    inputCheckBox = this;
    rowSelected = $(inputCheckBox).closest("tr")

    if ($(inputCheckBox).is(":checked")) {
        rowSelected.addClass("selected")
    }else{
        rowSelected.removeClass("selected")
    }
    modalTable = $(inputCheckBox).closest(".sales-Data")
    console.log(modalTable)
    countCheckboxSelected = 0;
    modalTable.find("tr :checked").each(function () {
        countCheckboxSelected++
    });
    console.log(countCheckboxSelected)
    if (countCheckboxSelected >= 1) {
        $(".disableSale").addClass("active");
    }else{
        $(".disableSale").removeClass("active");
    }
})

//Editar Registro
//Editar Registro
$(".card-content").on("click", ".row", function(){
    $("#message").html('Não é possível Editar Venda!')//Message Error
    openMessageError();
    
})

$("tbody").on("click", "tr td", function(){
    $("#message").html('Não é possível Editar Venda!')//Message Error
    openMessageError();
})


//Ordenar Lista por Ordem Alfabetica
countOrderClient = 0;
countOrderDate = 0;
countOrderDateCreation = 0;
countOrderProduct = 0;
countOrderQuantity = 0;
countOrderPrice = 0;

//Ordenar Cliente
$("thead th:nth-child(2)").on("click",function(){
    countOrderClient ++;
    iconOrder = $(this).find("i");
    
    if (countOrderClient == 1) {
        orderByClient = {'SaleClient': 'false'}
        $(iconOrder).addClass("uil uil-sort-amount-down");
    } else if (countOrderClient == 2){
        orderByClient = {'SaleClient': 'true'}
        $(iconOrder).removeClass("uil uil-sort-amount-down");
        $(iconOrder).addClass("uil uil-sort-amount-up")
        
    } else {
        orderByClient = ''
        countOrderClient = 0;
        $(iconOrder).removeClass("uil uil-sort-amount-up");
    }

    iRAtual = 0;
    listSales(sSession, orderByClient, orderByDateCreation, orderByDate, orderByProduct, orderByQuantity, orderByPrice, sActive)
})


//Ordenar Data Criação
$("thead th:nth-child(3)").on("click",function(){
    countOrderDateCreation ++;
    iconOrder = $(this).find("i");

    if (countOrderDateCreation == 1) {
        orderByDateCreation = {'SaleDateCreation': 'false'}
        $(iconOrder).addClass("uil uil-sort-amount-down");
        
    } else if (countOrderDateCreation == 2){
        orderByDateCreation = {'SaleDateCreation': 'true'}
        $(iconOrder).removeClass("uil uil-sort-amount-down");
        $(iconOrder).addClass("uil uil-sort-amount-up")
    } else {
        orderByDateCreation = ''
        countOrderDateCreation = 0;
        $(iconOrder).removeClass("uil uil-sort-amount-up");
    }

    iRAtual = 0;
    listSales(sSession, orderByClient, orderByDateCreation, orderByDate, orderByProduct, orderByQuantity, orderByPrice, sActive)
})

//Ordenar Data 
$("thead th:nth-child(4)").on("click",function(){
    countOrderDate ++;
    iconOrder = $(this).find("i");
    if (countOrderDate == 1) {
        orderByDate = {'SaleDate': 'false'}
        $(iconOrder).addClass("uil uil-sort-amount-down");
    } else if (countOrderDate == 2){
        orderByDate = {'SaleDate': 'true'}
        $(iconOrder).removeClass("uil uil-sort-amount-down");
        $(iconOrder).addClass("uil uil-sort-amount-up")
    } else {
        orderByDate = ''
        countOrderDate = 0;
        $(iconOrder).removeClass("uil uil-sort-amount-up");
    }

    iRAtual = 0;
    listSales(sSession, orderByClient, orderByDateCreation, orderByDate, orderByProduct, orderByQuantity, orderByPrice, sActive)
})

//Ordenar Produto
$("thead th:nth-child(5)").on("click",function(){
    countOrderProduct ++;
    iconOrder = $(this).find("i");

    if (countOrderProduct == 1) {
        orderByProduct = {'SaleProduct': 'false'}
        $(iconOrder).addClass("uil uil-sort-amount-down");

    } else if (countOrderProduct == 2){
        orderByProduct = {'SaleProduct': 'true'}
        $(iconOrder).removeClass("uil uil-sort-amount-down");
        $(iconOrder).addClass("uil uil-sort-amount-up")

    } else {
        orderByProduct = ''
        countOrderProduct = 0;
        $(iconOrder).removeClass("uil uil-sort-amount-up");
    }

    iRAtual = 0;
    listSales(sSession, orderByClient, orderByDateCreation, orderByDate, orderByProduct, orderByQuantity, orderByPrice, sActive)
})

//Ordenar Quantidade
$("thead th:nth-child(6)").on("click",function(){
    countOrderQuantity ++;
    iconOrder = $(this).find("i");

    if (countOrderQuantity == 1) {
        orderByQuantity = {'SaleQuantity': 'false'}
        $(iconOrder).addClass("uil uil-sort-amount-down");

    } else if (countOrderQuantity == 2){
        orderByQuantity = {'SaleQuantity': 'true'}
        $(iconOrder).removeClass("uil uil-sort-amount-down");
        $(iconOrder).addClass("uil uil-sort-amount-up")

    } else {
        orderByQuantity = ''
        countOrderQuantity = 0;
        $(iconOrder).removeClass("uil uil-sort-amount-up");
    }

    iRAtual = 0;
    listSales(sSession, orderByClient, orderByDateCreation, orderByDate, orderByProduct, orderByQuantity, orderByPrice, sActive)
})

//Ordenar Valor
$("thead th:nth-child(7)").on("click",function(){
    countOrderPrice ++;
    iconOrder = $(this).find("i");

    if (countOrderPrice == 1) {
        orderByPrice = {'SalePrice': 'false'}
        $(iconOrder).addClass("uil uil-sort-amount-down");

    } else if (countOrderPrice == 2){
        orderByPrice = {'SalePrice': 'true'}
        $(iconOrder).removeClass("uil uil-sort-amount-down");
        $(iconOrder).addClass("uil uil-sort-amount-up")

    } else {
        orderByPrice = ''
        countOrderPrice = 0;
        $(iconOrder).removeClass("uil uil-sort-amount-up");
    }

    iRAtual = 0;
    listSales(sSession, orderByClient, orderByDateCreation, orderByDate, orderByProduct, orderByQuantity, orderByPrice, sActive)
})


//Pesquisa
$(".btnSearch").click(function(){
    iRAtual = 0;
    listSales(sSession, orderByClient, orderByDateCreation, orderByDate, orderByProduct, orderByQuantity, orderByPrice, sActive)
})

$(".input-SearchBox").keyup(function(e){
    if (e.keyCode == 13 ) {
        iRAtual = 0;
        listSales(sSession, orderByClient, orderByDateCreation, orderByDate, orderByProduct, orderByQuantity, orderByPrice, sActive)
    }
})

//Alternar entre Ativos e Inativos
$(".optionsDropdown").on("change", "input", function(){
    sActive = $(this).val();
    if (sActive == 'S') {
        sDisable = 'N'
        $(".disableSale i").removeClass("uil uil-check");
        $(".disableSale i").addClass("uil uil-multiply")
        $(".disableSale").removeClass("active");
        $(".disableSale").removeClass("green");
        
    } else {
        sDisable = 'S'
        $(".disableSale i").removeClass("uil uil-multiply");
        $(".disableSale i").addClass("uil uil-check")
        $(".disableSale").removeClass("active");
        $(".disableSale").addClass("green");
    }
    $(".AllCheckBox").prop('checked', false); 
    iRAtual = 0;
    listSales(sSession, orderByClient, orderByDateCreation, orderByDate, orderByProduct, orderByQuantity, orderByPrice, sActive)
})

$(".optionIcon").click(function(){
    $(".optionsDropdown").toggle("active")
})