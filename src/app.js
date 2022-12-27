const container = document.querySelector('.container'),
    pwShow = document.querySelectorAll('.showHidePw'),
    pwFields = document.querySelectorAll('.password'),
    signUp = document.querySelector('.signup-text'),
    login = document.querySelector('.login-link');


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