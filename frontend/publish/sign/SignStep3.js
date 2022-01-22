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

            if (!this.classList.contains('ListFlex')) { //1단그리드일 떄
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

                if (this.classList.contains('Password')) { //비밀번호 확인 버튼 제거
                    children[3].classList.remove('Over');
                } else if (this.classList.contains('InputNick')) { //중복확인 버튼 제거
                    children[3].classList.remove('On');
                }
            }

            if (!this.classList.contains('ListFlex')) {
                this.parentNode.lastElementChild.classList.remove('On'); // InputTxt hide
            } else {
                this.closest("ul.ListFlex").parentNode.lastElementChild.classList.remove('On'); // InputTxt hide
            }

            if (this.value) { //ProgressTransition 함수 관련
                if (!this.classList.contains('InputNick')) { //중복확인이 아닐 때
                    if (!this.classList.contains('ListFlex')) { //1단 그리드일때
                        this.parentNode.classList.add('Checked');
                    } else { //2단 그리드일떄
                        if (!this.classList.contains('CheckAllInput')) { //input 하나만 체크할때
                            this.closest("ul.ListFlex").parentNode.classList.add("Checked");
                        }
                    }
                }
            } else {
                if (!this.classList.contains('ListFlex')) { //1단 그리드일때
                    this.parentNode.classList.remove('Checked');
                } else { //2단 그리드일떄
                    if (!this.classList.contains('CheckAllInput')) { //input 하나만 체크할때
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
                } else if (this.classList.contains('InputNick')) { //중복확인 필요할 때
                    children[3].classList.add('On');
                }
            } else {
                children[2].classList.remove('On');
                if (this.classList.contains('Password')) {
                    children[3].classList.remove('Over');
                } else if (this.classList.contains('InputNick')) {
                    children[3].classList.remove('On');
                }
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
            //passwordShow.classList.remove('Over');  //비밀번호 input 있을 떄

            if (this.parentNode.children[0].classList.contains("InputNick")) { //중복확인 input일 때
                inputDouble.classList.remove("On");
                this.parentNode.children[0].disabled = false;
                this.parentNode.children[4].classList.remove("On");
                this.parentNode.children[5].innerText = "앞으로 사용할 닉네임을 입력해주세요. (10자 이내)";
            }

            this.parentNode.firstElementChild.blur();
            this.parentNode.firstElementChild.focus(); // input 지운 후 바로 포커스되도록
        });
    });

    const chooseTitle = document.querySelectorAll(".ChooseTitle");
    const UnderList = document.querySelectorAll(".ChooseListUnder");
    chooseTitle.forEach((e) => { //스터디,취미 클릭시 드롭다운
        e.addEventListener("click", function(){
            this.classList.add("Clicked");
            for(let i = 0; i<=chooseTitle.length - 1; i++){ //전체 드롭다운 on클래스해제
                document.querySelectorAll(".ChooseListDetail")[i].classList.remove("On");
                document.querySelectorAll(".ChooseListDetail")[i].style.height = "50px";
                document.querySelectorAll(".ChooseListDetail")[i].firstElementChild.firstElementChild.disabled = false; //선택된 것 외엔 disabled 풀기
                UnderList[i].style.display = "flex"; //전체 ChooseListUnder hide처리

                if(UnderList[i].children.length > 0 && !this.disabled){ //ProgressTransition 함수 관련
                    UnderList[i].parentNode.classList.add("Checked");
                } else {
                    UnderList[i].parentNode.classList.remove("Checked");
                }

                if(chooseTitle[i].classList.contains("Clicked")){
                    document.querySelectorAll(".InputAdd")[i].classList.add("On");
                }
            }

            if(this.disabled){
                this.parentNode.lastElementChild.classList.add("On"); //추가 버튼 생성
            } else {
                this.parentNode.lastElementChild.classList.remove("On"); 
            }

            const chooseListDetail = this.closest(".ChooseListDetail");
            const children = chooseListDetail.children;
            chooseListDetail.classList.add("On"); //클릭한 드롭다운 on클래스
            this.disabled = true; //드롭다운이 열린 상태에서 다시 선택되지 않게

            let chooseIndex = Array.from(document.querySelectorAll(".ChooseList")).indexOf(this.closest("li.ChooseList"));
            UnderList[chooseIndex].style.display = "none";//클릭한 ChooseListUnder hide처리
            
            let ChooseListLength = children.length - 1;
            let ChooseListHeight = parseInt(window.getComputedStyle(children[1]).height) + parseInt(window.getComputedStyle(children[1]).paddingTop)*2;
            chooseListDetail.style.height = 8 + 50 + ChooseListHeight * ChooseListLength + "px";
            setTimeout(listScroll.bind(this), 300); //스크롤 위로 올라가도록

            ProgressTransition(); //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
        });
    });

    let listOffset = 0;
    function listScroll(){ //스터디, 취미 스크롤
        listOffset = this.closest(".ChooseList").offsetTop;
        this.closest(".InputList").scrollTop = listOffset - 25;
        console.log(listOffset);
    }

    const chooseCompete = document.querySelectorAll(".ChooseComplete");
    chooseCompete.forEach((e) => { //완료 버튼 클릭 시
        e.addEventListener("click", function(){
            this.closest(".ChooseListDetail").classList.remove("On");
            this.closest(".ChooseListDetail").style.height = "50px";
            this.closest(".ChooseList").lastElementChild.style.display = "flex";
            this.closest(".ChooseListDetail").firstElementChild.firstElementChild.disabled = false; //닫을 때 disabled 풀기
            this.closest(".ChooseListDetail").firstElementChild.lastElementChild.classList.add("On"); //추가 버튼 생성

            if(this.closest(".ChooseList").lastElementChild.children.length > 0){ //ProgressTransition 함수 관련
                this.closest(".ChooseList").classList.add("Checked");

            } else {
                this.closest(".ChooseList").classList.remove("Checked");
            }

            ProgressTransition(); //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
        });
    });

    const chooseLast = document.querySelector(".ChooseLast").firstElementChild;
    chooseLast.addEventListener("focus", function(){ //한줄메세지 입력시
        this.parentNode.style.marginBottom = parseInt(window.getComputedStyle(this.closest(".InputList")).height) - 55 + "px";
        setTimeout(lastScroll.bind(this), 300);

        for(let i = 0; i<=chooseTitle.length - 1; i++){ //전체 드롭다운 올라가도록
            document.querySelectorAll(".ChooseListDetail")[i].classList.remove("On");
            document.querySelectorAll(".ChooseListDetail")[i].style.height = "50px";
            document.querySelectorAll(".ChooseListDetail")[i].firstElementChild.firstElementChild.disabled = false; //선택된 것 외엔 disabled 풀기
            UnderList[i].style.display = "flex"; //전체 ChooseListUnder hide처리

            if(UnderList[i].children.length > 0){
                UnderList[i].closest(".ChooseList").classList.add("Checked");
            } else {
                UnderList[i].closest(".ChooseList").classList.remove("Checked");
            }

            if(chooseTitle[i].classList.contains("Clicked")){
                document.querySelectorAll(".InputAdd")[i].classList.add("On"); //추가 버튼 추가
            }
        }

        ProgressTransition(); //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
    });
    chooseLast.addEventListener("blur", function(){
        this.parentNode.style.marginBottom = 0;
    });

    function lastScroll(){ //한줄메세지 스크롤
        this.closest(".InputList").scrollTop = parseInt(window.getComputedStyle(this.closest(".InputList")).height);
    }

    const InputAdd = document.querySelectorAll(".InputAdd");
    InputAdd.forEach((e) => { //추가버튼 눌러도 드롭다운되게
        e.addEventListener("click", function(){
            this.parentNode.children[0].click();
        });
    });

    const inputChoose = document.querySelectorAll(".InputChoose");
    let studyObj = {};
    let hobbyObj = {};
    inputChoose.forEach((e) =>{
        e.addEventListener("change", function(){
            const isStudy = Array.from(document.querySelectorAll(".ChooseList")).indexOf(this.closest(".ChooseList"));

            if(this.checked){ //동적 생성
                let choosedOption = document.createElement("li");
                choosedOption.innerHTML = '<label for='+this.getAttribute('id')+' class="LabelChoose"><p class="ChooseUnder"><em>'+this.value+'</em><span class="ChooseCancel"></span></p></label>';
                this.closest(".ChooseList").lastElementChild.appendChild(choosedOption);
                
                if(isStudy == 0){
                    studyObj[this.value] = choosedOption; 
                } else {
                    hobbyObj[this.value] = choosedOption;
                }
                
            } else { //동적 제거

                if(isStudy == 0){
                    this.closest(".ChooseList").lastElementChild.removeChild(studyObj[this.value]); 
                    delete studyObj[this.value];
                } else {
                    this.closest(".ChooseList").lastElementChild.removeChild(hobbyObj[this.value]); 
                    delete hobbyObj[this.value];
                }
            }

            if(this.closest(".ChooseList").lastElementChild.children.length > 0){ //완료버튼 On클래스
                this.closest(".ChooseListDetail").lastElementChild.lastElementChild.classList.add("On");
            } else {
                this.closest(".ChooseListDetail").lastElementChild.lastElementChild.classList.remove("On");
                this.closest(".ChooseList").classList.remove("Checked"); //모두 제거되면 진행도 낮아지게
                ProgressTransition(); //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
            }
        });
    });

    const SignLength = document.querySelectorAll(".InputList>li").length;
    const Signwidth = 100 / SignLength; //회원가입 진행도 1개당 올라가는 width
    let SignProgress = 0; //회원가입 진행도
    function ProgressTransition() { //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
        SignProgress = document.querySelectorAll(".Checked").length;
        if (document.querySelector(".ModalContents").classList.contains("ContentSignStep1")) { //회원가입 1단계일떄
            document.querySelector(".StepSlide1").firstElementChild.style.width = SignProgress * Signwidth + "%";
        } else if(document.querySelector(".ModalContents").classList.contains("ContentSignStep2")) { //회원가입 2단계일떄
            document.querySelector(".StepSlide2").firstElementChild.style.width = SignProgress * Signwidth + "%";
        } else { //회원가입 3단계일떄
            document.querySelector(".StepSlide3").firstElementChild.style.width = SignProgress * Signwidth + "%";
        }

        if (SignProgress >= SignLength) {
            document.querySelector("button.SignStep").classList.remove("Disable");
            document.querySelector("button.SignStep").disabled = false;
        } else {
            document.querySelector("button.SignStep").classList.add("Disable");
            document.querySelector("button.SignStep").disabled = "disabled";
        }
    }
});