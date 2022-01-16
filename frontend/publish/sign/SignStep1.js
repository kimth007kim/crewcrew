window.addEventListener("DOMContentLoaded", function(){

    const modalClose = document.querySelector('.ModalClose');
    modalClose.addEventListener('click', () => {
        // 닫기 버튼 클릭 시 모달창 이벤트
        document.querySelector('body').classList.remove('Modal');
        document.querySelector('.ModalWrapper').classList.remove('Modal'); // 사라지는 이벤트가 끝난 후 모달창 제거해야 함(0.5초후)
    });

    const loginInput = document.querySelectorAll('.InputFull');
    loginInput.forEach((e) => {
        // input focus, focusout 이벤트
        e.addEventListener('focus', function () {
            const children = this.parentNode.children;
            this.classList.add('On'); // input에 포커스효과, error상태시 On 대신 Error 클래스 추가
            children[1].classList.add('On'); // label에 포커스효과, error상태시 On 대신 Error 클래스 추가

            if (this.value) {
                children[2].classList.add('On');
            }

            if(!this.classList.contains('ListFlex')) { //1단그리드일 떄
                this.parentNode.lastElementChild.classList.add('On'); // InputTxt show, error상태시 On 대신 Error 클래스 추가
            } else { //2단그리드일 때
                this.closest("ul.ListFlex").parentNode.lastElementChild.classList.add('On'); // InputTxt show, error상태시 On 대신 Error 클래스 추가
            }
        });
        e.addEventListener('blur', function () {
            const children = this.parentNode.children;
            this.classList.remove('Over'); // input지우기버튼, password보기버튼 hide

            if (!this.value) {
                this.classList.remove('On'); // input, label에 포커스아웃효과, error상태시 On 대신 Error 클래스 제거
                children[1].classList.remove('On');
                children[2].classList.remove('On');

                if (this.classList.contains('Password')) {
                    children[3].classList.remove('Over');
                }
            }

            if(!this.classList.contains('ListFlex')) {
                this.parentNode.lastElementChild.classList.remove('On'); // InputTxt hide
            } else {
                this.closest("ul.ListFlex").parentNode.lastElementChild.classList.remove('On'); // InputTxt hide
            }

            if(this.value){ //ProgressTransition 함수 관련
                if(!this.classList.contains('ListFlex')){ //1단 그리드일때
                    this.parentNode.classList.add('Checked');
                } else { //2단 그리드일떄
                    if(!this.classList.contains('CheckAllInput')){ //input 하나만 체크할때
                        this.closest("ul.ListFlex").parentNode.classList.add("Checked");
                    } 
                }
            } else {
                if(!this.classList.contains('ListFlex')){ //1단 그리드일때
                    this.parentNode.classList.remove('Checked');
                } else { //2단 그리드일떄
                    if(!this.classList.contains('CheckAllInput')){ //input 하나만 체크할때
                        this.closest("ul.ListFlex").parentNode.classList.remove("Checked");
                    } 
                }
            }

            ProgressTransition(); //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
        });

        e.addEventListener('keydown', function () {
            const children = this.parentNode.children;

            if (this.value) {
                children[2].classList.add('On');
                if (this.classList.contains('Password')) { //패스워드 input일 떄 passwordshow가 보이도록
                    children[3].classList.add('Over');
                }
            } else {
                children[2].classList.remove('On');
                if (this.classList.contains('Password')) {
                    children[3].classList.remove('Over');
                }
            }
        });
    });

    const checkAllInput = document.querySelectorAll(".CheckAllInput"); //input 모두 체크해야 할 때
    let isMailIdChecked = false;
    let isMailDomainChecked = false;
    checkAllInput[0].addEventListener("blur", function(){  //ProgressTransition 함수 관련
        if(this.value){
            isMailIdChecked = true;
        } else {
            isMailIdChecked = false;
        }
        if(isMailIdChecked && isMailDomainChecked){
            this.closest("ul.ListFlex").parentNode.classList.add("Checked");
        } else {
            this.closest("ul.ListFlex").parentNode.classList.remove("Checked");
        }

        ProgressTransition(); //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
    });
    checkAllInput[1].addEventListener("blur", function(){ //ProgressTransition 함수 관련
        if(this.value){
            isMailDomainChecked = true;
        } else {
            isMailDomainChecked = false;
        }
        if(isMailIdChecked && isMailDomainChecked){
            this.closest("ul.ListFlex").parentNode.classList.add("Checked");
        } else {
            this.closest("ul.ListFlex").parentNode.classList.remove("Checked");
        }

        ProgressTransition(); //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
    });

    const SignLength = document.querySelectorAll(".InputList>li").length;
    const Signwidth = 100 / SignLength; //회원가입 진행도 1개당 올라가는 width
    let SignProgress = 0; //회원가입 진행도
    function ProgressTransition() { //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
        SignProgress = document.querySelectorAll(".Checked").length;
        console.log(SignProgress);
        if (document.querySelector(".ModalContents").classList.contains("ContentSignStep1")) { //회원가입 1단계일떄
            document.querySelector(".StepSlide1").firstElementChild.style.width = SignProgress * Signwidth + "%";
        } else { //회원가입 2단계일떄
            document.querySelector(".StepSlide2").firstElementChild.style.width = SignProgress * Signwidth + "%";
        }

        if (SignProgress >= SignLength) {
            document.querySelector("button.SignStep").classList.remove("Disable");
            document.querySelector("button.SignStep").disabled = false;
        } else {
            document.querySelector("button.SignStep").classList.add("Disable");
            document.querySelector("button.SignStep").disabled = "disabled";
        }
    }


    const inputMail = document.querySelector('.InputMail');
    const MailList = document.querySelectorAll('ul.MailList li');
    const MailListLength = MailList.length - 1; //메일 리스트의 수
    inputMail.addEventListener("focus", function(){ //메일 도메인 input 이벤트
        const children = this.parentNode.children;
        this.closest("ul.MailList").classList.add("On");
        this.closest("ul.MailList").style.height = 7 + 58 + 31 * MailListLength + "px";
        children[1].classList.add("On");
        this.closest("ul.ListFlex").parentNode.lastElementChild.classList.add('On'); // InputTxt show, error상태시 On 대신 Error 클래스 추가
        if(this.value){
            children[2].classList.add("On");
        }
    });
    inputMail.addEventListener("blur", function(){ //메일 도메인 input 이벤트
        const children = this.parentNode.children;
        this.closest("ul.MailList").style.height = "50px";
        this.closest("ul.ListFlex").parentNode.lastElementChild.classList.remove('On'); // InputTxt hide
        if(!this.value){
            this.closest("ul.MailList").classList.remove("On");
            children[1].classList.remove("On");
            children[2].classList.remove("On");
        }
    });
    inputMail.addEventListener("keydown", function(){ //메일 도메인 input 이벤트
        const children = this.parentNode.children;
        if(this.value){
            children[2].classList.add("On");
        } else {
            children[2].classList.remove("On");
        }
    });
    MailList.forEach(function(e){ //메일 도메인 클릭 시 input에 value값 삽입
        e.addEventListener("mousedown", function(event){
            const ListIndex = Array.from(MailList).indexOf(this);
            if(ListIndex != 0){
                event.preventDefault();
                inputMail.value = this.firstElementChild.innerText;
                inputMail.blur();
                inputMail.parentNode.lastElementChild.classList.add("On");
            }
        });
    });

    const inputDel = document.querySelectorAll('.InputDel');
    inputDel.forEach((e) => {
        // input 지우기 버튼 클릭 이벤트
        e.addEventListener('mousedown', function (event) {
            event.preventDefault();
            this.parentNode.firstElementChild.value = '';
            this.classList.remove('On'); // error상태시 On 대신 Error 클래스 제거
            this.parentNode.firstElementChild.blur();
            this.parentNode.firstElementChild.focus(); // input 지운 후 바로 포커스되도록
            passwordShow.classList.remove('Over');
        });
    });

    const passwordShow = document.querySelector('.PasswordShow');
    const password = document.querySelector('.Password');
    let isOn = true;
    passwordShow.addEventListener('mousedown', function (e) {
        // password보기 버튼 클릭 이벤트
        e.preventDefault();
        this.parentNode.firstElementChild.blur();
        this.parentNode.firstElementChild.focus(); // 버튼 누르면 바로 포커스되도록

        if (isOn) {
        this.classList.add('On'); // error상태시 On 대신 Error 클래스 추가
        password.setAttribute('type', 'text');
        } else {
        this.classList.remove('On'); // error상태시 On 대신 Error 클래스 제거
        password.setAttribute('type', 'password');
        }

        isOn = !isOn;
    });

});