//Constantes para fechar o Modal de Alerta
const closeModal = document.querySelector('.hidePwGen');
const modal = document.querySelector('#modal');
const fade = document.querySelector('#fade');
const buttonCloseModal = document.querySelector('.close-alertBox')

//Loader icon
const loaderIcon = document.querySelector('.c-loader')

//Modal de Alerta
const toggleModal = ()=>{
    [modal, fade].forEach((el)=> el.classList.toggle('hide'));
}

[closeModal,buttonCloseModal, modal, fade].forEach((el)=>{
    el.addEventListener('click',()=> toggleModal());
});

/* Ajax Reocvery Password */
$('#sendEmail').click(function(){
    //Obtendo valores do Campo de Login
    var sRecoveryEmail = $('#recoveryEmail').val().trim();

    //Validando se é um Email válido
    if ( !validEmail(sRecoveryEmail) ) {
        $("#message").html('Insira um Email válido!')//Message Error
        openMessageError();
    }else{
        loaderIcon.classList.toggle('hide');
        $('#sendEmail').val('Enviando Email...');


        jData = '{"email":"'+sRecoveryEmail+'"}'// Corpo da Requisição

        //Requisição Ajax encaminhando os dados para recuperar Senha
        $.ajax({
            url: "api/account.php?action=recoveryPassword",
            contentType: "application/json; charset=utf-8",
            type: "POST",
            data: jData
        }).done(function(response){
            if (response.success == true) {
                loaderIcon.classList.toggle('hide')
                toggleModal()
                $('#sendEmail').val('Alterar Senha');

            }else{
                $('#sendEmail').val('Alterar Senha');
                loaderIcon.classList.toggle('hide')
                $("#message").html(response.msg);//Message Error
                openMessageError();
            }
        }).fail(function(){
            $("#message").html('Houve um erro na Requisição');//Message Error
                openMessageError()
        })
    }
    
});

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

/* Função para validar o Email */
function validEmail(email) {
    var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return regex.test(email);
}
