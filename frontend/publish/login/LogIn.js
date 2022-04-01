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

});
