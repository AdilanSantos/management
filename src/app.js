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
let allCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789^!$%&|[](){}:;.,*+-#@<>~";

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

const generatePassword = () =>{
    let newPassword = "";

    for (let i = 0; i < rangeInput.value; i++){
        let randomNumbers = Math.floor(Math.random()* allCharacters.length);
        newPassword += allCharacters[randomNumbers];
        
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

/* Validação Login */

$('#login').click(function(){
    var sLoginEmail = $('#logEmail').val();//Obtendo os dados preenchidos
    var sLoginPwd = $('#logEmail').val();//Obtendo os dados preenchidos

    jData = '{"email":"'+sLoginEmail+'","password":"'+sLoginPwd+'"}'// Corpo da Requisição

    //Requisição Ajax encaminhando os dados de Login
    $.ajax({
        url: "https://adilansantos.github.io/api/account.php?action=login",
        contentType: "application/json; charset=utf-8",
        type: "POST",
        data: jData
    }).done(function(response){
        console.log(response)
    })
    
});