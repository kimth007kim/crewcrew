window.addEventListener("DOMContentLoaded", function(){

    const modalClose = document.querySelector(".ModalClose");
    modalClose.addEventListener("click", function(){ //닫기 버튼 클릭 시 모달창 이벤트
        document.querySelector("body").classList.remove("Modal");
        document.querySelector(".ModalWrapper").classList.remove("Modal"); //사라지는 이벤트가 끝난 후 모달창 제거해야 함(0.5초후)
    });

    const loginInput = document.querySelectorAll(".LogInInput");
    loginInput.forEach(function(e){ //input focus, focusout 이벤트
        e.addEventListener("focus", function(){
            this.parentNode.classList.add("On"); //input, label에 포커스효과, error상태시 On 대신 Error 클래스 추가
            this.parentNode.classList.add("Over"); //input지우기버튼, password보기버튼 show
            this.parentNode.lastElementChild.classList.add("On"); //InputTxt show, error상태시 On 대신 Error 클래스 추가
        });
        e.addEventListener("blur", function(){
            this.parentNode.lastElementChild.classList.remove("On"); //InputTxt hide, error상태시 On 대신 Error 클래스 제거
            this.parentNode.classList.remove("Over"); //input지우기버튼, password보기버튼 hide

            if(!this.value){ //input값이 비어있을떄
                this.parentNode.classList.remove("On"); //input, label에 포커스아웃효과, error상태시 On 대신 Error 클래스 제거

            }
            
        });
    });

    const inputDel = document.querySelectorAll(".InputDel");
    inputDel.forEach(function(e){ //input 지우기 버튼 클릭 이벤트
        e.addEventListener("mousedown", function(e){
            e.preventDefault();
            this.parentNode.firstElementChild.value = "";
            this.parentNode.classList.remove("On"); //error상태시 On 대신 Error 클래스 제거
            this.parentNode.firstElementChild.blur();
            this.parentNode.firstElementChild.focus();//input 지운 후 바로 포커스되도록
        });
    });

    const buttonGo = document.querySelector(".ButtonGo");
    const contentPassword = document.querySelector(".ContentPassword");
    buttonGo.addEventListener("click", function(){ //비밀번호 찾기 누를 때 이벤트
        contentPassword.classList.add("On");
        this.style.display = "none";
    });

    const arrow = document.querySelector(".ModalArrow");
    arrow.addEventListener("click", function(){
        contentPassword.classList.remove("On");
    });

});