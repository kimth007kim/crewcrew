import { CommonFunc } from '../Common.js';

window.addEventListener('DOMContentLoaded', CommonFunc);

window.addEventListener('DOMContentLoaded', function () {
  const arrow = document.querySelector('.ModalArrow');
  arrow.addEventListener('click', function () {
    contentPassword.classList.remove('On');
  });
  const buttonGo = document.querySelector('.ButtonGo');
  const contentPassword = document.querySelector('.ContentPassword');
  buttonGo.addEventListener('click', function () {
    //비밀번호 찾기 누를 때 이벤트
    contentPassword.classList.add('On');
    this.style.display = 'none';
  });
});
