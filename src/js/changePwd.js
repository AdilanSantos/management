/* Constantes para obter parametros da URL */
const urlParams = new URLSearchParams(window.location.search);
const modalMessageError = document.querySelector('.messageError');
const modalWrapper = document.querySelector('.wrapper');

/* Constantes Exibir senha digitada */
const pwShow = document.querySelectorAll('.showHidePw');
const pwFields = document.querySelectorAll('.password');

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


/* Menu de Alteração de Senha */
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


if (!urlParams.get('tkn')) {
    window.location.href = 'index.html'
}else{
    $sToken = urlParams.get('tkn');
    console.log($sToken)
    jData = '{"token":"'+$sToken+'"}'
    $.ajax({
        url: "api/account.php?action=validateToken",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        data: jData
    }).done(function(response){
        if (response.success == false) {
            modalWrapper.classList.toggle('hide');
            modalMessageError.classList.replace('hide', 'active')
            /*window.location.href = 'index.html';*/
        }
    }).fail(function(){
        modalWrapper.classList.toggle('hide');
        modalMessageError.classList.replace('hide', 'active')
    })
}

$('#changePwd-Btn').click(function(){
    var sRecPwd = $('#recPwd').val().trim();
    var sRecConfirmPwd = $('#recConfirmPwd').val().trim();

    if(sRecPwd == ''){
        $("#message").html('Aviso: Preencha o campo de Senha!')//Message Error
        openMessageError();
    } else if(sRecConfirmPwd == ''){
        $("#message").html('Aviso: Preencha o campo de Confirmar Senha!')//Message Error
        openMessageError();
    } else if(sRecPwd.length < 6){
        $("#message").html('Aviso: A senha deve conter no mínimo 6 caracteres!')//Message Error
        openMessageError();
    }else if(sRecPwd != sRecConfirmPwd){
        $("#message").html('Aviso: As senhas não coincidem!')//Message Error
        openMessageError();
    } else{
        jData ='{"password":"'+sRecPwd+'","confirmPassword":"'+sRecConfirmPwd+'", "token":"'+$sToken+'" }'
        console.log(jData)
        $.ajax({
            url: "api/account.php?action=changePassword",
            contentType: "application/json; charset=utf-8",
            type: "POST",
            data: jData
        }).done(function(response){
            console.log(response)
            if (response.success == true) {
                
                $("#message").html(response.msg);//Message Error
                openMessageError();

            }else{
                
                $("#message").html(response.msg);//Message Error
                openMessageError();
            }
        }).fail(function( StatusCode){
            console.log(StatusCode);
            $("#message").html('Erro: Não foi possivel realizar a ação.');//Message Error
            openMessageError();
        })
    }
})