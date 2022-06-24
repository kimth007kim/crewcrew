import { ProgressTransition, CommonFunc } from '../Common.js';

window.addEventListener('DOMContentLoaded', CommonFunc);

window.addEventListener('DOMContentLoaded', function () {
  const checkAllInput = document.querySelectorAll('.CheckAllInput'); //input 모두 체크해야 할 때
  let isMailIdChecked = false;
  let isMailDomainChecked = false;
  checkAllInput[0].addEventListener('blur', function () {
    //ProgressTransition 함수 관련
    if (this.value) {
      isMailIdChecked = true;
    } else {
      isMailIdChecked = false;
    }
    if (isMailIdChecked && isMailDomainChecked) {
      this.closest('ul.ListFlex').parentNode.classList.add('Checked');
    } else {
      this.closest('ul.ListFlex').parentNode.classList.remove('Checked');
    }

    ProgressTransition(); //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
  });
  checkAllInput[1].addEventListener('blur', function () {
    //ProgressTransition 함수 관련
    if (this.value) {
      isMailDomainChecked = true;
    } else {
      isMailDomainChecked = false;
    }
    if (isMailIdChecked && isMailDomainChecked) {
      this.closest('ul.ListFlex').parentNode.classList.add('Checked');
    } else {
      this.closest('ul.ListFlex').parentNode.classList.remove('Checked');
    }

    ProgressTransition(); //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
  });

  const inputMail = document.querySelector('.InputMail');
  const MailList = document.querySelectorAll('ul.MailList li');
  const MailListLength = MailList.length - 1; //메일 리스트의 수
  inputMail.addEventListener('focus', function () {
    //메일 도메인 input 이벤트
    const children = this.parentNode.children;
    const MailListHeight =
      parseInt(window.getComputedStyle(MailList[1]).height) +
      parseInt(window.getComputedStyle(MailList[1]).paddingTop) * 2;
    this.closest('ul.MailList').classList.add('On');
    this.closest('ul.MailList').style.height = 8 + 52 + MailListHeight * MailListLength + 'px';
    children[1].classList.add('On');
    this.closest('ul.ListFlex').parentNode.lastElementChild.classList.add('On'); // InputTxt show, error상태시 On 대신 Error 클래스 추가
    if (this.value) {
      children[2].classList.add('On');
    }
  });
  inputMail.addEventListener('blur', function () {
    //메일 도메인 input 이벤트
    const children = this.parentNode.children;
    this.closest('ul.MailList').style.height = '50px';
    this.closest('ul.ListFlex').parentNode.lastElementChild.classList.remove('On'); // InputTxt hide
    if (!this.value) {
      this.closest('ul.MailList').classList.remove('On');
      children[1].classList.remove('On');
      children[2].classList.remove('On');
    }
  });
  inputMail.addEventListener('keydown', function () {
    //메일 도메인 input 이벤트
    const children = this.parentNode.children;
    if (this.value) {
      children[2].classList.add('On');
    } else {
      children[2].classList.remove('On');
    }
  });
  MailList.forEach(function (e) {
    //메일 도메인 클릭 시 input에 value값 삽입
    e.addEventListener('mousedown', function (event) {
      const ListIndex = Array.from(MailList).indexOf(this);
      if (ListIndex != 0) {
        event.preventDefault();
        inputMail.value = this.firstElementChild.innerText;
        inputMail.blur();
        inputMail.parentNode.lastElementChild.classList.add('On');
      }
    });
  });
});
