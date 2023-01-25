
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

//Alternar para Dark Mode
modeSwitch.addEventListener("click", ()=>{
    body.classList.toggle("dark");

    if (body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
    }else{
        localStorage.setItem("mode","light");
    }

    if (body.classList.contains("dark")) {
        modeText.innerText ="Light Mode"
    }else{
        modeText.innerText ="Dark Mode"
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