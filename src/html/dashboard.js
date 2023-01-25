//Constante para exibir perfil
const openProfile = document.querySelector('.openProfile')
const closeModal = document.querySelector('.hideProfile');
const cancelModal = document.querySelector('#profileCancel')
const modal = document.querySelector('#profile-modal');
const fade = document.querySelector('#profile-fade');

const toggleModal = ()=>{
    [modal, fade].forEach((el)=> el.classList.toggle('hide'));
}

[openProfile, closeModal, modal, fade, cancelModal].forEach((el)=>{
    el.addEventListener('click',()=> toggleModal());
});

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

//Expandir Navbar
const body = document.querySelector("body");
    modeToggle = body.querySelector(".mode-toggle");
    sidebar = body.querySelector("nav");
    sidebarToggle = body.querySelector(".sidebar-toggle");
//Dark Mode
let getMode = localStorage.getItem("mode");
if (getMode && getMode === "dark") {
    body.classList.toggle("dark")
}


let getStatus = localStorage.getItem("status");
if (getStatus && getStatus === "close") {
    sidebar.classList.toggle("close")
}


modeToggle.addEventListener("click", ()=>{
    body.classList.toggle("dark")
    if (body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
    }else{
        localStorage.setItem("mode","light");
    }
});

sidebarToggle.addEventListener("click", ()=>{
    sidebar.classList.toggle("close");
    if (sidebar.classList.contains("close")) {
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status","open");
    }
})

//Listar Perfil

$('.openProfile').click(function(){

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
            $("#message").html(response.msg)//Message Error
            openMessageError();
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

/* Função para abrir mensagem de erro */
function openMessageError(){
    $(".alert").removeClass('hide');//removendo classe para exibir alerta
    $(".alert").addClass('show');
    $(".alert").addClass('showAlert');

    //Função para fechar mensagem após 5 segundos
    setTimeout(function(){
        $(".alert").addClass("hide");
        $(".alert").removeClass("show");
    }, 5000);
}

/* Função para fechar mensagem de erro */
$(".close-message").click(function(){
    $(".alert").addClass("hide");
    $(".alert").removeClass("show");
})

//Função para validar sessão
if (!localStorage.getItem("session")) {
    window.location.href = "index";
}else{
    var sSession = localStorage.getItem("session");
    var jData = '{"session":"'+sSession+'"}'

    $.ajax({
        url: "api/dashboard.php?action=listDashboard",
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
            $('#totalValue').html(response.priceTotalSalesMonth);

            aSales = response.sales;
            sNames = '<span class="data-title">Produto</span>'
            sValues = '<span class="data-title">Valor</span>';
            sAmount = '<span class="data-title">Quantidade</span>';
            sDates = '<span class="data-title">Data</span>';

            for (let index = 0; index < aSales.length; index++) {
                
                sNames += `
                    <span class="data-list">`+ aSales[index].product_name +`</span>
                    `
                sValues += `
                    <span class="data-list">R$ `+ aSales[index].price +`</span>
                    `
                sAmount += `
                    <span class="data-list">`+ aSales[index].quantity +`</span>
                    `
                sDates += `
                    <span class="data-list">`+ aSales[index].dataCriacao +`</span>
                    `
                
            }

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