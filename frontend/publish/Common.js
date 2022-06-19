window.addEventListener('DOMContentLoaded', function () {
  const body = document.querySelector('body');
  const buttonTop = document.querySelector('.ScrollTop');
  const buttonBottom = document.querySelector('.ScrollBottom');
  function scrollButton() {
    window.scrollY <= 100
      ? buttonTop?.classList.add('Disable')
      : buttonTop?.classList.remove('Disable');
    window.scrollY >= body.offsetHeight - screen.availHeight
      ? buttonBottom?.classList.add('Disable')
      : buttonBottom?.classList.remove('Disable');
  }
  scrollButton();

  window.addEventListener('scroll', scrollButton); //스크롤 버튼 이벤트

  buttonTop?.addEventListener('click', function () {
    //스크롤 버튼 이벤트
    if (!this.classList.contains('Disable')) {
      window.scrollTo(0, 0);
    }
  });

  buttonBottom?.addEventListener('click', function () {
    //스크롤 버튼 이벤트
    if (!this.classList.contains('Disable')) {
      window.scrollTo(0, body.offsetHeight);
    }
  });

  function lnbOpen(e) {
    if (e.classList.contains('NavArrow')) {
      if (!e.closest('header').classList.contains('On')) {
        e.closest('header').classList.add('On');
        e.classList.add('On');
        e.nextElementSibling.classList.add('On');
        e.parentNode.nextElementSibling.classList.add('On');
      } else {
        e.closest('header').classList.remove('On');
        e.classList.remove('On');
        e.nextElementSibling.classList.remove('On');
        e.parentNode.nextElementSibling.classList.remove('On');
      }
    } else {
      if (!e.closest('header').classList.contains('On')) {
        e.closest('header').classList.add('On');
        e.previousElementSibling.children[1].classList.add('On');
        e.previousElementSibling.children[2].classList.add('On');
        e.classList.add('On');
      } else {
        e.closest('header').classList.remove('On');
        e.previousElementSibling.children[1].classList.remove('On');
        e.previousElementSibling.children[2].classList.remove('On');
        e.classList.remove('On');
      }
    }
  }
  document.addEventListener('click', function (e) {
    const thisclass = e.target.classList;
    if (thisclass.contains('NavArrow') || thisclass.contains('NavHam')) {
      const navArrow = e.target;
      lnbOpen(navArrow);
    }
  });

  const pagination = document.querySelector('.PaginationWrapper');
  function paginationAppend() {
    //브라우저 사이즈에 따른 페이지네이션 생성

    if (pagination !== null) {
      let div, divLength, i, pageNum, paginationChild;
      i = 0;

      while (pagination.hasChildNodes()) {
        //페이지네이션 초기화
        pagination.removeChild(pagination.firstChild);
      }

      if (window.innerWidth > 768) {
        //페이지네이션 갯수 설정
        divLength = 14;
      } else if (window.innerWidth > 320) {
        divLength = 9;
      } else {
        divLength = 7;
      }

      for (i; i < divLength; i++) {
        //페이지네이션 생성
        div = document.createElement('div');
        if (i != 0 && i != 1 && i != divLength - 2 && i != divLength - 1) {
          pageNum = document.createTextNode(i - 1);
          div.appendChild(pageNum);
        }
        pagination.appendChild(div);
      }

      paginationChild = pagination.children; //페이지네이션 Arrow 지정
      paginationChild[0].classList.add('Prev2');
      paginationChild[1].classList.add('Prev');
      paginationChild[2].classList.add('On');
      paginationChild[paginationChild.length - 2].classList.add('Next');
      paginationChild[paginationChild.length - 1].classList.add('Next2');
    }
  }

  paginationAppend();
  window.addEventListener('resize', paginationAppend);

  const modalClose = document.querySelector('.ModalClose');
  modalClose?.addEventListener('click', () => {
    // 닫기 버튼 클릭 시 모달창 이벤트
    document.querySelector('body').classList.remove('Modal');
    document.querySelector('.ModalWrapper').classList.remove('Modal'); // 사라지는 이벤트가 끝난 후 모달창 제거해야 함(0.5초후)
  });

  const loginInput = document.querySelectorAll('.InputFull');
  loginInput?.forEach((e) => {
    // input focus, focusout 이벤트
    e.addEventListener('focus', function () {
      const children = this.parentNode.children;
      this.classList.add('On'); // input에 포커스효과, error상태시 On 대신 Error 클래스 추가
      children[1].classList.add('On'); // label에 포커스효과, error상태시 On 대신 Error 클래스 추가

      if (this.value) {
        children[2].classList.add('On');

        if (this.classList.contains('Password')) {
          children[3].classList.add('Over');
        }
      }

      if (!this.classList.contains('ListFlex')) {
        //1단그리드일 떄
        this.parentNode.lastElementChild.classList.add('On'); // InputTxt show, error상태시 On 대신 Error 클래스 추가
      } else {
        //2단그리드일 때
        this.closest('ul.ListFlex').parentNode.lastElementChild.classList.add('On'); // InputTxt show, error상태시 On 대신 Error 클래스 추가
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
        } else if (this.classList.contains('InputNick')) {
          //중복확인 버튼 제거
          children[3].classList.remove('On');
        }
      }

      if (!this.classList.contains('ListFlex')) {
        this.parentNode.lastElementChild.classList.remove('On'); // InputTxt hide
      } else {
        this.closest('ul.ListFlex').parentNode.lastElementChild.classList.remove('On'); // InputTxt hide
      }

      if (this.value) {
        //ProgressTransition 함수 관련
        if (!this.classList.contains('InputNick')) {
          if (!this.classList.contains('ListFlex')) {
            //1단 그리드일때
            this.parentNode.classList.add('Checked');
          } else {
            //2단 그리드일떄
            if (!this.classList.contains('CheckAllInput')) {
              //input 하나만 체크할때
              this.closest('ul.ListFlex').parentNode.classList.add('Checked');
            }
          }
        }
      } else {
        if (!this.classList.contains('ListFlex')) {
          //1단 그리드일때
          this.parentNode.classList.remove('Checked');
        } else {
          //2단 그리드일떄
          if (!this.classList.contains('CheckAllInput')) {
            //input 하나만 체크할때
            this.closest('ul.ListFlex').parentNode.classList.remove('Checked');
          }
        }
      }
      ProgressTransition(); //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
    });

    e.addEventListener('keyup', function () {
      const children = this.parentNode.children;

      if (this.value) {
        children[2].classList.add('On');
        if (this.classList.contains('Password')) {
          children[3].classList.add('Over');
        } else if (this.classList.contains('InputNick')) {
          //중복확인 필요할 때
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
  const inputDouble = document.querySelector('.InputDouble');
  inputDel?.forEach((e) => {
    // input 지우기 버튼 클릭 이벤트
    e.addEventListener('mousedown', function (event) {
      event.preventDefault();
      this.parentNode.firstElementChild.value = '';
      this.classList.remove('On'); // error상태시 On 대신 Error 클래스 제거

      if (this.parentNode.children[0].classList.contains('InputNick')) {
        //중복확인 input일 때
        inputDouble?.classList.remove('On');
        this.parentNode.children[0].disabled = false;
        this.parentNode.children[4].classList.remove('On');
        this.parentNode.children[5].innerText = '앞으로 사용할 닉네임을 입력해주세요. (10자 이내)';
      }

      this.parentNode.firstElementChild.blur();
      this.parentNode.firstElementChild.focus(); // input 지운 후 바로 포커스되도록
      if (this.parentNode.children[0].classList.contains('Password')) {
        passwordShow?.classList.remove('Over');
      }
    });
  });

  const passwordShow = document.querySelector('.PasswordShow');
  const password = document.querySelector('.Password');
  let isOn = true;
  passwordShow?.addEventListener('mousedown', function (e) {
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

const SignLength = document.querySelectorAll('.InputList>li')?.length;
const Signwidth = 100 / SignLength; //회원가입 진행도 1개당 올라가는 width
let SignProgress = 0; //회원가입 진행도
export const ProgressTransition = () => {
  //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
  if (document.querySelector('.StepSlide') !== null) {
    SignProgress = document.querySelectorAll('.Checked').length;
    console.log(SignProgress);
    if (document.querySelector('.ModalContents').classList.contains('ContentSignStep1')) {
      //회원가입 1단계일떄
      document.querySelector('.StepSlide1').firstElementChild.style.width =
        SignProgress * Signwidth + '%';
    } else {
      //회원가입 2단계일떄
      document.querySelector('.StepSlide2').firstElementChild.style.width =
        SignProgress * Signwidth + '%';
    }

    if (SignProgress >= SignLength) {
      document.querySelector('button.SignStep').classList.remove('Disable');
      document.querySelector('button.SignStep').disabled = false;
    } else {
      document.querySelector('button.SignStep').classList.add('Disable');
      document.querySelector('button.SignStep').disabled = 'disabled';
    }
  }
};
