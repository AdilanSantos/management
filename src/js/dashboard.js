
//Toggle e Sidebar
const body = document.querySelector("body");
const sidebar = body.querySelector(".sidebar");
const toggle = body.querySelector(".toggle");
const searchBtn = body.querySelector(".search-box");
const modeSwitch = body.querySelector(".toggle-switch");
const modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
});
searchBtn.addEventListener("click", ()=>{
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


//Validação de Session e Exibir Dashboard
if (!localStorage.getItem("session")) {
    window.location.href = "index";
}else{
    var sSession = localStorage.getItem("session");
    var jData = '{"session":"'+sSession+'"}'

    $.ajax({
        url: "api/dashboard.php?action=list",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        data: jData
    }).done(function(response){
        if (response.success == false){
            window.location.href = 'index';
        }else{
            console.log(response)
            //Inserindo informações na Dashboard
            $('#totalSales').html(response.numberTotalSalesMonth);
            $('#productBestSellers').html(response.productBestSellingMonth);
            $('#totalValue').html("R$ "+response.priceTotalSalesMonth);

            aSales = response.sales;
            sClients = '<span class="data-title">Cliente</span>'
            sNames = '<span class="data-title">Produto</span>'
            sValues = '<span class="data-title">Valor</span>';
            sAmount = '<span class="data-title">Qntd</span>';
            sDates = '<span class="data-title">Data de Criação</span>';

            for (let index = 0; index < aSales.length; index++) {

                sClients +=`
                <span class="data-list">`+ aSales[index].sale_clientName +`</span>
                `
                
                sNames += `
                    <span class="data-list">`+ aSales[index].product_name +`</span>
                    `
                sValues += `
                    <span class="data-list">R$ `+ aSales[index].sale_price +`</span>
                    `
                sAmount += `
                    <span class="data-list">`+ aSales[index].sale_quantity +`</span>
                    `
                sDates += `
                    <span class="data-list">`+ aSales[index].sale_datecreation +`</span>
                    `
    
            }
            $('.data.clients').html(sClients);
            $('.data.names').html(sNames);
            $('.data.sales').html(sValues);
            $('.data.sales-amount').html(sAmount);
            $('.data.sales-data').html(sDates);
            
        }
    }).fail(function(jqXHR, StatusCode){
        
    })
}

//Logout
$('#logout').click(function(){
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

//Fechar modal Profile
$(".btn-cancel").click(function () {
    modalProfile.classList.toggle("active")
})

//Abrir Modal de Criar/Editar Produto e Profile
const modalProfile = body.querySelector(".modal-profile");

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