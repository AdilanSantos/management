//Constante para exibir perfil
const openProfile = document.querySelector('.openProfile')
const closeModal = document.querySelector('.hideProfile');
const modal = document.querySelector('#profile-modal');
const fade = document.querySelector('#profile-fade');

const toggleModal = ()=>{
    [modal, fade].forEach((el)=> el.classList.toggle('hide'));
}

[openProfile, closeModal, modal, fade].forEach((el)=>{
    el.addEventListener('click',()=> toggleModal());
});

//Editar Imagem e exibir 
const inputFile = document.querySelector('#file');
const uploadImage = document.querySelector('#upload')

inputFile.addEventListener('change', function(e){
    const inputTarget = e.target;
    const fImage = inputTarget.files[0];
    
    console.log(imagePrevious)
    

    if (fImage){
        const reader = new FileReader();
        reader.addEventListener('load', function(e){
            const readerTarget = e.target;
            $('#upload').attr("src", readerTarget.result);

            //Obtendo valores alterados
            var form_data = new FormData();
            var imgProfile = $("#file")[0].files;

            if (imgProfile.length > 0){
                form_data.append('profile_image', imgProfile[0]);
                console.log(form_data)
            }else{
                form_data.append('profile_image', '');
            }

            jData = '{"image":'+form_data+'}'
            //Requisição Ajax encaminhando os dados de Login
            $.ajax({
                
                url: "api/account.php?action=upload",
                contentType: false,
                processData: false,
                type: "POST",
                data: form_data
            }).done(function(response){
                if (response.success == true) {
                    console.log(response.msg)
                    
                }else{
                    console.log(response.msg)
                }
            }).fail(function(jqXHR, StatusCode){
                console.log(jqXHR)
            })
        });

        reader.readAsDataURL(fImage)
    }
})


const body = document.querySelector("body");
    modeToggle = body.querySelector(".mode-toggle");
    sidebar = body.querySelector("nav");
    sidebarToggle = body.querySelector(".sidebar-toggle");

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
    var sId = '3';

    jData = '{"id":"'+sId+'"}'
    //Requisição Ajax para lista configuração
    $.ajax({
        url: "api/account.php?action=list",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        data: jData
    }).done(function(response){
        if (response.success == true) {
            $('#upload').attr("src", "uploads/"+response.src+"");
            $('#profileName').val(response.name)
            $('#profileEmail').val(response.email)
            $('#profilePwd').val('')
            $('#profileConfirmPwd').val('')
            console.log(response)
        }else{
            console.log('Houve um erro ao carregar Perfil.')
        }
    }).fail(function(jqXHR, StatusCode){
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
        console.log('Preencha o Nome.')
    } 
    else if(sProfileEmail == ''){
        console.log('Preencha o Email');
    }else if(sProfilePwd.length > 0 & sProfilePwd.length < 6)
        console.log('Insira mais que 6 caracteres')
    else if(sProfilePwd!= sProfileConfirmPwd){
        console.log('As senhas não coincidem')
    }else{
        console.log('deu certo')
    }
        
    
    
    /**
    //Requisição Ajax para lista configuração
    $.ajax({
        url: "api/account.php?action=list",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        data: jData
    }).done(function(response){
        if (response.success == true) {
            $('#upload').attr("src", "uploads/"+response.src+"");
            $('#profileName').val(response.name)
            $('#profileEmail').val(response.email)
            console.log(response)
        }else{
            console.log('Houve um erro ao carregar Perfil.')
        }
    }).fail(function(jqXHR, StatusCode){
        console.log(jqXHR)
    })*/
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