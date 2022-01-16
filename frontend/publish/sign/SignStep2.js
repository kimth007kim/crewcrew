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

    const inputDouble = document.querySelector(".InputDouble");
    inputDouble.addEventListener("click", function () { //중복확인 클릭 이벤트
        this.classList.remove("On");
        this.parentNode.children[4].classList.add("On");
        this.parentNode.children[5].innerText = "사용 가능한 닉네임입니다.";
        this.parentNode.children[5].classList.add("On");
        this.parentNode.children[0].classList.add("On");
        this.parentNode.children[0].disabled = true;
        this.parentNode.classList.add("Checked");

        ProgressTransition(); //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
    });

    const profileCustom = document.querySelector(".ProfileCustom");
    const profileImg = document.querySelector(".ProfileImg");
    const profileShow = document.querySelector(".ProfileShow");
    const profileUpload = document.querySelector("#ProfileUpload");
    profileCustom.addEventListener("click", function () { //내 사진 클릭 시 사진업로드
        profileUpload.click();
    });

    profileUpload.addEventListener("change", function () { //사진 업로드 시
        this.parentNode.classList.add("On");
        document.querySelector(".ProfileTitle").style.opacity = "1";
        document.querySelector(".ProfileChange").style.opacity = "1";
        profileShow.style.backgroundColor = "#e2e2e2";
        profileImg.classList.remove("Grayed");

        const profileURL = URL.createObjectURL(this.files[0]); //등록한 이미지 상단에 보이기
        profileImg.firstElementChild.setAttribute("src", profileURL);
    });

    const profileSelect = document.querySelectorAll(".OuterCircle");
    profileSelect.forEach((e) => { //프로필이미지 선택 시
        e.addEventListener("click", function () {
            let profileSrc = this.firstElementChild.firstElementChild.src;
            profileImg.firstElementChild.setAttribute("src", profileSrc);
            profileImg.classList.remove("Grayed");
            this.closest(".ProfileBox").classList.add("On");
            profileShow.style.backgroundColor = window.getComputedStyle(this.firstElementChild).backgroundColor;
            document.querySelector(".TxtNick").classList.remove("On");
            document.querySelector(".SelectWrapper").firstElementChild.classList.remove("On");
            document.querySelector(".ProfileTitle").style.opacity = "1";
            document.querySelector(".ProfileChange").style.opacity = "0";
        });
    });

    const profileRadio = document.querySelectorAll(".ProfileSelectRadio");
    profileRadio.forEach((e) => { //프로필이미지 or 사진 업로드 시 ProgressTransition증가
        e.addEventListener("click", function () {
            this.closest(".ProfileSection").classList.add("Checked");

            ProgressTransition(); //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
        });
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

});