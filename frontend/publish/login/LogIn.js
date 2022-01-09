window.addEventListener('DOMContentLoaded', () => {
  const modalTitle = document.querySelectorAll('.ModalTitle li');
  modalTitle.forEach((e) => {
    // 모달 타이틀 클릭 시 이벤트
    e.addEventListener('click', function () {
      const listClass = this.classList;
      document.querySelector('.ModalTitle li.On').classList.remove('On');
      listClass.add('On');
      if (listClass.contains('Sign')) {
        // 회원가입을 눌렀을 때
        document.querySelector('.ContentLogin').classList.remove('On'); // 로그인 콘텐츠들이 사라짐
      } else {
        // 로그인을 눌렀을 때
        document.querySelector('.ContentLogin').classList.add('On'); // 로그인 콘텐츠들이 나타남
      }
    });
  });

  const buttonLogin = document.querySelector('.ButtonLogin');
  buttonLogin.addEventListener('click', function () {
    // 로그인 버튼 클릭 시 모달창 이벤트
    document.querySelector('body').classList.add('Modal');
    document.querySelector('.ModalWrapper').classList.add('Modal'); // 사라지는 이벤트가 끝난 후 모달창 제거해야 함(0.5초후)
    this.style.zIndex = '-1'; // 개발 과정에선 무시
  });

  const modalClose = document.querySelector('.ModalClose');
  modalClose.addEventListener('click', () => {
    // 닫기 버튼 클릭 시 모달창 이벤트
    document.querySelector('body').classList.remove('Modal');
    document.querySelector('.ModalWrapper').classList.remove('Modal'); // 사라지는 이벤트가 끝난 후 모달창 제거해야 함(0.5초후)
    buttonLogin.style.zIndex = '9999'; // 개발 과정에선 무시
  });

  const loginInput = document.querySelectorAll('.InputFull');
  loginInput.forEach((e) => {
    // input focus, focusout 이벤트
    e.addEventListener('focus', function () {
      const children = this.parentNode.children;
      this.classList.add('On'); // input에 포커스효과, error상태시 On 대신 Error 클래스 추가
      children[1].classList.add('On');// label에 포커스효과, error상태시 On 대신 Error 클래스 추가
      this.parentNode.lastElementChild.classList.add('On'); // InputTxt show, error상태시 On 대신 Error 클래스 추가

      if(this.value){
        children[2].classList.add('On');

        if(this.classList.contains('Password')){
          children[3].classList.add('Over');
        }
      }
    });
    e.addEventListener('blur', function () {
      const children = this.parentNode.children;
      this.parentNode.lastElementChild.classList.remove('On'); // InputTxt hide, error상태시 On 대신 Error 클래스 제거
      this.classList.remove('Over'); // input지우기버튼, password보기버튼 hide

      if (!this.value) {
        this.classList.remove('On'); // input, label에 포커스아웃효과, error상태시 On 대신 Error 클래스 제거
        children[1].classList.remove('On');
        children[2].classList.remove('On');

        if(this.classList.contains('Password')){
          children[3].classList.remove('Over');
        }
      }
    });

    e.addEventListener('keydown', function(){
      const children = this.parentNode.children;

      if(this.value){
        children[2].classList.add('On');
        if(this.classList.contains('Password')){
          children[3].classList.add('Over');
        }
      } else {
        children[2].classList.remove('On');
        if(this.classList.contains('Password')){
          children[3].classList.remove('Over');
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
