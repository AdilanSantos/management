/* Constantes do Modal de Login e Criar Conta */
const container = document.querySelector('.container');
const pwShow = document.querySelectorAll('.showHidePw');
const pwFields = document.querySelectorAll('.password');
const signUp = document.querySelector('.signup-text');
const login = document.querySelector('.login-link');

/* Constantes do Gerador de Senha */
const passwordInput = document.querySelector('.password-box input');
const copyIcon = document.querySelector('.password-box .copy-icon');
const rangeInput = document.querySelector('.range-box input');
const sliderNumber = document.querySelector('.range-box .slider-number');
const generateButton = document.querySelector('.generate-button');

const aCaracters = Array.from(Array(26)).map((_, i)=> i + 97);
const aLowercaseCaracters = aCaracters.map((item) => String.fromCharCode(item));
const aUppercaseCaracters = aLowercaseCaracters.map((item) => item.toUpperCase());

const aNumbers =[0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const aSymbols = ["!", "@", "#", "$", "%"];

/* Constantes para exibir o Modal de Gerar Senha */
const openModal = document.querySelector('.showPwGen');
const closeModal = document.querySelector('.hidePwGen');
const modal = document.querySelector('#modal');
const fade = document.querySelector('#fade');

/* Menu de Registro de Conta */
pwShow.forEach(eyeIcon=>{
    eyeIcon.addEventListener('click', ()=>{
        pwFields.forEach(pwField=>{
            if(pwField.type === "password"){
                pwField.type = "text";

                pwShow.forEach(icon =>{
                    icon.classList.replace('uil-eye-slash', 'uil-eye')
                })
            }else{
                pwField.type = "password"

                pwShow.forEach(icon =>{
                    icon.classList.replace('uil-eye', 'uil-eye-slash')
                })
            }
        })
    })
})

signUp.addEventListener("click",()=>{
    container.classList.add("active");
});

login.addEventListener("click", ()=>{
    container.classList.remove("active");
})

/* Gerador de Senha */

let aAllCaracters = [];

aAllCaracters = aNumbers.concat(aLowercaseCaracters).concat(aUppercaseCaracters).concat(aSymbols);
const generatePassword = () =>{
    let newPassword = "";

    for (let i = 0; i < rangeInput.value; i++){
        const randomNumbers = Math.floor(Math.random() * aAllCaracters.length);
        newPassword += aAllCaracters[randomNumbers];
        
    }
    passwordInput.value = newPassword;
    copyIcon.classList.replace("uil-file-check-alt", "uil-copy");//Replace do icone
}
rangeInput.addEventListener("input", ()=>{
    sliderNumber.innerText = rangeInput.value;
    generatePassword()
})

copyIcon.addEventListener('click', ()=>{
    navigator.clipboard.writeText(passwordInput.value);
    copyIcon.classList.replace("uil-copy", "uil-file-check-alt");//Replace do icone
});

generatePassword();
generateButton.addEventListener("click", generatePassword);

/* Exibir Gerador de Senha */

const toggleModal = ()=>{
    [modal, fade].forEach((el)=> el.classList.toggle('hide'));
}

[openModal, closeModal, modal, fade].forEach((el)=>{
    el.addEventListener('click',()=> toggleModal());
});

/* Valida????o Login */
$('#login').click(function(){
    //Obtendo valores do Campo de Login
    var sLoginEmail = $('#logEmail').val().trim();
    var sLoginPwd = $('#logPwd').val().trim();

    //Validando se ?? um Email v??lido
    if ( !validEmail(sLoginEmail) ) {
        $("#message").html('Insira um Email v??lido!')//Message Error
        openMessageError();
    }
    //Validando se senha est?? preenchida
    else if (sLoginPwd == '') {
        $("#message").html('Preencha o campo de Senha!')//Message Error
        openMessageError();
    }else{

        jData = '{"email":"'+sLoginEmail+'","password":"'+sLoginPwd+'", "type": "default"}'// Corpo da Requisi????o

        //Requisi????o Ajax encaminhando os dados de Login
        $.ajax({
            url: "api/account.php?action=login",
            contentType: "application/json; charset=utf-8",
            type: "POST",
            data: jData
        }).done(function(response){
            if (response.success == true) {
                localStorage.setItem("session", response.session)
                //Direcionando para pagina Logado
                window.location.href = 'Dashboard';
            }else{
                console.log(response)
                $("#message").html(response.msg);//Message Error
                openMessageError();
            }
        }).fail(function(jqXHR, StatusCode){
            console.log(jqXHR)
        })
    }
    
});

$('#create-account').click(function(){
    //Obtendo valores do Campo de Registro
    var sSignupName =$('#sigName').val().trim();
    var sSignupEmail = $('#sigEmail').val().trim();
    var sSignupPwd = $('#sigPwd').val().trim();
    var sSignupConfirmPwd = $('#sigConfirmPwd').val().trim();

    if( $('#sigCheck').is(':checked') ){
        var sSigCheck = 1;
    }else{
        var sSigCheck = 0;
    }

    //Valida????es de Campos
    if (sSignupName == '') {
        $("#message").html('Preencha o campo Nome!')//Message Error
        openMessageError();
    } else if ( !validEmail(sSignupEmail) ){
        $("#message").html('Insira um Email v??lido!')//Message Error
        openMessageError();
    } else if(sSignupPwd == ''){
        $("#message").html('Preencha o campo de Senha!')//Message Error
        openMessageError();
    } else if(sSignupConfirmPwd == ''){
        $("#message").html('Preencha o campo de Confirmar Senha!')//Message Error
        openMessageError();
    } else if(sSignupPwd.length < 6){
        $("#message").html('A senha deve conter no m??nimo 6 caracteres!')//Message Error
        openMessageError();
    }else if(sSignupPwd != sSignupConfirmPwd){
        $("#message").html('As senhas n??o coincidem!')//Message Error
        openMessageError();
    } else{
        // Corpo da Requisi????o
        jData = '{"name":"'+sSignupName+'", "email":"'+sSignupEmail+'","password":"'+sSignupPwd+'","confirmPassword":"'+sSignupConfirmPwd+'", "sigCheck": "'+sSigCheck+'"}'
        
        //Requisi????o Ajax encaminhando os dados de Registro
        $.ajax({
            url: "api/account.php?action=create",
            contentType: "application/json; charset=utf-8",
            type: "POST",
            data: jData
        }).done(function(response){
            console.log(response)
            if (response.success == true) {
                
                window.location.href = 'Dashboard';

            }else{
                
                $("#message").html(response.msg);//Message Error
                openMessageError();
            }
        }).fail(function(jqXHR, StatusCode){
            console.log(StatusCode);
            $("#message").html('Erro: N??o foi possivel realizar a a????o.');//Message Error
            openMessageError();
        })
    }
})

/* Fun????o para abrir mensagem de erro */
function openMessageError(){
    $(".alert").removeClass('hide');//removendo classe para exibir alerta
    $(".alert").addClass('show');
    $(".alert").addClass('showAlert');

    //Fun????o para fechar mensagem ap??s 5 segundos
    setTimeout(function(){
        $(".alert").addClass("hide");
        $(".alert").removeClass("show");
    }, 5000);
}

/* Fun????o para fechar mensagem de erro */
$(".close-message").click(function(){
    $(".alert").addClass("hide");
    $(".alert").removeClass("show");
})

/* Fun????o para validar o Email */
function validEmail(email) {
    var regex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return regex.test(email);
}

/* Fun????o bot??o Google */

//Fun????o para redirecionar o usuario quando realizar Login Google
function handleCredentialResponse(response) {
    jResponseGoogle = parseJwt(response.credential);
    jData = '{"email":"'+jResponseGoogle.email+'", "type":"google"}'

    $.ajax({
        url: "api/account.php?action=login",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        data: jData
    }).done(function(response){
        if (response.success == true) {
            console.log('Mensagem com Sucesso')
            //Direcionando para pagina Logado
            window.location.href = 'Dashboard';
        }else{
            $("#message").html(response.msg);//Message Error
            openMessageError();
        }
    }).fail(function(jqXHR, StatusCode){
        console.log(jqXHR)
    })
    
}


