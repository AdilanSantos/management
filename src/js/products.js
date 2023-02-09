//Toggle e Sidebar
const body = document.querySelector("body");
const sidebar = body.querySelector(".sidebar");
const toggle = body.querySelector(".toggle");
const searchBtn = body.querySelector(".search-box");
const modeSwitch = body.querySelectorAll(".toggle-switch");
const modeText = body.querySelector(".mode-text");
const tBody = body.querySelector(".L-Products");


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
const modalProduct = body.querySelector(".modal-container");
const modalProfile = body.querySelector(".modal-profile");

$(".newProduct").click(function () {
    clearInputs();
    modalProduct.classList.toggle("active");
})

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

//Limpar campos p/ Criar Produto
function clearInputs(){
    $('.title-Modal').html("Criar Produto");
    $('.btn-Save').html("Criar");
    $('#productId').val('')
    $(".input-codProduct").removeClass("active")
}

//Fechar Modal
$(".btn-CloseModal").click(function () {
    modalProduct.classList.toggle("active")
    $('#productName').val('')
    $('#productPrice').val('')
})

$(".btn-cancel").click(function () {
    modalProfile.classList.toggle("active")
})

//Salvar Produto BD
$('.btn-Save').click(function () {
    sProductName = $('#productName').val().trim()
    sProductPrice = $('#productPrice').val().trim()
    sProductId = $('#productId').val()
    if (sProductName == '') {
        $("#message").html('Aviso: Insira o Nome do Produto!') //Message Error
        openMessageError();
    } else if (sProductPrice == '') {
        $("#message").html('Aviso: Insira um Valor!') //Message Error
        openMessageError();
    } else {
        jData = '{"session":"' + sSession + '", "chave":"'+sProductId+'", "productName":"' + sProductName + '","productPrice":"' + sProductPrice + '"}'

        $.ajax({
            url: "api/product.php?action=create",
            contentType: "application/json; charset=utf-8",
            type: "POST",
            data: jData
        }).done(function (response) {
            console.log(response)
            if (response.success == true) {
                $('#productName').val('')
                $('#productPrice').val('')

                var bTudo = "true";
                listProducts(sSession,'','', bTudo);
                
                modalProduct.classList.toggle("active")
                $("#message").html(response.msg);
                openMessageError();

            } else {
                if (response.session == 'inactive') {
                    window.location.href('index')
                } else {
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

//Lista Produtos
if (!localStorage.getItem("session")) {
    window.location.href = "index";
} else {
    var sSession = localStorage.getItem("session");
    var iRAtual = 0;
    var orderByPrice = "";
    var orderByName = "";
    listProducts(sSession,orderByName ,orderByPrice);
}

//Refresh na lista de Produtos
$(".refresh").click(function(){
    iRAtual = 0;
    listProducts(sSession,orderByName,orderByPrice);
})

//Função para listar Produtos
function listProducts(sSession, orderByName, orderByPrice ,bTudo) {
    
    $(".refresh").addClass("active");
    $(".refresh-table button").prop("disabled", true);

    var sPesquisa = $(".input-SearchBox").val().trim();
    var order = [];
    if (orderByName != "") {
        order.push(orderByName);
    }
    if(orderByPrice != ""){
        order.push(orderByPrice);
    }

    order = JSON.stringify(order);

    if (iRAtual == 0) {
        var jData = '{"session":"' + sSession + '", "Pesquisa":"'+sPesquisa+'", "Order": '+order+'}'
    }else{
        if(!bTudo){
            var jData = '{"session":"' + sSession + '", "RAtual":"'+iRAtual+'", "Pesquisa":"'+sPesquisa+'", "Order": '+order+'}';
        }else{

            var jData = '{"session":"' + sSession + '", "Tudo": "'+bTudo+'", "RAtual":"'+$(".L-Products tr").length+'", "Pesquisa":"'+sPesquisa+'", "Order": '+order+' }';
        }
        
    }

    $.ajax({
        url: "api/product.php?action=list",
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
            sLineProduct = ''
            sMobileCard = '';
            
            aProducts = response.products;
            if (aProducts == 0) {
                $('.L-Products').html('');
                $(".card-content").html('');
            }else{
                for(i =0; i< aProducts.length; i++) {
                    iProductId = aProducts[i].product_id
                    sProductName = aProducts[i].product_name
                    fProductPrice = aProducts[i].product_price
                    sLineProduct += `
                        <tr>
                            <th><input type="checkbox" value="`+ iProductId +`"></th>
                            <td><span class="data-list">` + sProductName + `</span></td>
                            <td><span class="data-list">R$ ` + fProductPrice + `</span></td>
                        </tr>`;

                    sMobileCard +=`
                        <div class="row">
                                <div class="mobile-card">
                                    
                                    <div class="card-text">
                                        <input type="checkbox" value="`+iProductId+`">
                                    </div>
                                    <div class="card-text">
                                        <span class="card-list">Produto: `+sProductName+`</span>
                                    </div>
                                    <div class="card-text">
                                        <span class="card-list">Valor: `+fProductPrice+`</span>
                                    </div>
        
                                </div>
                            </div>
                    `
                };
                if (iRAtual == 0 || bTudo == 'true') {
                    $('.L-Products').html(sLineProduct);
                    $(".card-content").html(sMobileCard);
                } else {
                    $('.L-Products').append(sLineProduct);
                    $(".card-content").append(sMobileCard)
                }
            }
            
            var itensExibidos =  $(".L-Products tr").length;
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

//Paginação
$(".pager button").click(function(){
    iRAtual += 15;
    if ($(".L-Products tr").length < iRAtual) {
        iRAtual = $(".L-Products tr").length
    }
    
    listProducts(sSession,orderByName,orderByPrice);
})

//Pesquisa
$(".btnSearch").click(function(){
    iRAtual = 0;
    listProducts(sSession,orderByName,orderByPrice);
})

$(".input-SearchBox").keyup(function(e){
    if (e.keyCode == 13 ) {
        iRAtual = 0;
        listProducts(sSession,orderByName,orderByPrice);
    }
})

//Marcar todas as CheckBox
$('.AllCheckBox').click(function(){
    var AllInput = tBody.querySelectorAll('input');

    inputToggle = this.checked;
    
    AllInput.forEach((AllInput)=>{
        AllInput.checked = inputToggle;
    })

    if (inputToggle == true) {
        $(".deleteProduct").addClass("active");
    } else {
        $(".deleteProduct").removeClass("active");
    }
    
})

//Função para Exibir o botão Excluir
$(".L-Products").on("click", ":checkbox", function(){
    inputCheckBox = this;
    rowSelected = $(inputCheckBox).closest("tr")

    if ($(inputCheckBox).is(":checked")) {
        rowSelected.addClass("selected")
    }else{
        rowSelected.removeClass("selected")
    }
    modalTable = $(inputCheckBox).closest(".activity")
    countCheckboxSelected = 0;
    modalTable.find("tr :checked").each(function () {
        countCheckboxSelected++
    });
    if (countCheckboxSelected >= 1) {
        modalTable.find(".deleteProduct").addClass("active")
    }else{
        modalTable.find(".deleteProduct").removeClass("active")
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

//Confirmar Exclusão/ Cancelar Exclusão
$(".deleteProduct").click(function(){
    iProductsSelected = 0
    $(".L-Products").find("tr :checked").each(function () {
        iProductsSelected++;
    });
    $("#ProductsSelected").html(iProductsSelected+" Registro(s)")
    $(".modal-Confirm").addClass("active")
})

$(".btnConfirmCancel").click(function(){
    $(".modal-Confirm").removeClass("active")
})

$(".btnConfirmDelete").click(function(){
    aProductsID = []
    $(".L-Products").find("tr :checked").each(function () {
        aProductsID.push(this.value)
    });
    console.log(aProductsID)
    jData = '{"session":"'+sSession+'","chave": "'+aProductsID+'"}'

    $.ajax({
        url: "api/product.php?action=delete",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        data: jData
    }).done(function(response){
        if (response.success == true) {
            console.log(response)
            $(".modal-Confirm").removeClass("active")

            iRAtual = 0;
            listProducts(sSession,orderByName ,orderByPrice);
        }else{
            if (response.session == 'inactive') {
                window.location.href('index')
            } else {
                $("#message").html(response.msg)//Message Error
                openMessageError();
            }
            
        }
    }).fail(function(jqXHR){
        console.log(jqXHR)
    })
})

//Fechar modal com ESC
$(".modal-container").keyup(function(e){
    if (e.keyCode == 27 ) {
        modalProduct.classList.toggle("active");
    }
})

//Editar Registro
$(".card-content").on("click", ".row", function(){
    row = $(this).closest(".row")
    iProductId = $(row).find(".card-text input").val()
    
    jData = '{"session":"'+sSession+'", "chave":"'+iProductId+'"}'

    $.ajax({
        url: "api/product.php?action=productData",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        data: jData
    }).done(function(response){
        if (response.success == true) {
            $('#productName').val(response.product.product_name);
            $('#productPrice').val(response.product.product_price);
            $('.title-Modal').html("Editar Produto");
            $('.btn-Save').html("Salvar");
            $('#productId').val(response.product.product_id);
            modalProduct.classList.toggle("active");
            $(".input-codProduct").addClass("active")
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
    
})

$("tbody").on("click", "tr td", function(){
    trLine = $(this).closest("tr")
    iProductId = $(trLine).find("th input").val()
    
    jData = '{"session":"'+sSession+'", "chave":"'+iProductId+'"}'
    $.ajax({
        url: "api/product.php?action=productData",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        data: jData
    }).done(function(response){
        if (response.success == true) {
            $('#productName').val(response.product.product_name);
            $('#productPrice').val(response.product.product_price);
            $('.title-Modal').html("Editar Produto");
            $('.btn-Save').html("Salvar");
            $('#productId').val(response.product.product_id);
            modalProduct.classList.toggle("active");
            $(".input-codProduct").addClass("active")
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
})

//Ordenar Lista por Ordem Alfabetica
countOrderName = 0;
countOrderPrice = 0;
//Ordenar Nome Produto
$("thead th:nth-child(2)").on("click",function(){
    countOrderName ++;
    console.log(this)
    iconOrder = $(this).find("i");
    console.log(iconOrder)
    if (countOrderName == 1) {
        orderByName = {'ProductName': 'false'}
        $(iconOrder).addClass("uil uil-sort-amount-down");
    } else if (countOrderName == 2){
        orderByName = {'ProductName': 'true'}
        $(iconOrder).removeClass("uil uil-sort-amount-down");
        $(iconOrder).addClass("uil uil-sort-amount-up")
        
    } else {
        orderByName = ''
        countOrderName = 0;
        $(iconOrder).removeClass("uil uil-sort-amount-up");
    }

    iRAtual = 0;
    listProducts(sSession,orderByName,orderByPrice)
})


//Ordenar Valor
$("thead th:nth-child(3)").on("click",function(){
    countOrderPrice ++;
    iconOrder = $(this).find("i");
    if (countOrderPrice == 1) {
        orderByPrice = {'ProductPrice': 'false'}
        $(iconOrder).addClass("uil uil-sort-amount-down");
    } else if (countOrderPrice == 2){
        orderByPrice = {'ProductPrice': 'true'}
        $(iconOrder).removeClass("uil uil-sort-amount-down");
        $(iconOrder).addClass("uil uil-sort-amount-up")
    } else {
        orderByPrice = ''
        countOrderPrice = 0;
        $(iconOrder).removeClass("uil uil-sort-amount-up");
    }

    iRAtual = 0;
    listProducts(sSession,orderByName, orderByPrice)
})