window.addEventListener("DOMContentLoaded", function(){

    const InfoBody = document.querySelector(".myInfoBody");
    const InfoButton = document.querySelector(".ButtonFull3");
    let InfoBodyHeight = InfoBody.clientHeight;
    let isOn = true;
    InfoBody.style.height = 0;
    InfoButton.addEventListener("click", function(){
        if(window.innerWidth <= 820){
            isOn ? 
            (InfoBody.style.height = InfoBodyHeight + "px", 
            InfoButton.innerText = "저장") :
            (InfoBody.style.height = 0,
            InfoButton.innerText = "프로필 관리하기");
            isOn = !isOn;
        }
    });
    if(window.innerWidth <= 820){
        InfoButton.innerText = "프로필 관리하기";
    }
});