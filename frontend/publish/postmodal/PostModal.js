import { CommonFunc } from '../Common.js';

window.addEventListener('DOMContentLoaded', CommonFunc);

window.addEventListener('DOMContentLoaded', function () {
  const loginInput = document.querySelectorAll('.InputFull');
  loginInput.forEach((e) => {
    // input focus, focusout 이벤트
    e.addEventListener('focus', function () {
      const children = this.parentNode.children;
      this.classList.add('On');

      if (this.value) {
        //인풋값이 있을 때 지우기 버튼 show
        children[1].classList.add('On');
      }
    });
    e.addEventListener('blur', function () {
      const children = this.parentNode.children;
      this.classList.remove('On');

      if (!this.value) {
        //인풋값이 없을 때 지우기 버튼 hide
        children[1].classList.remove('On');
      }
    });

    e.addEventListener('keyup', function () {
      const children = this.parentNode.children;

      if (this.value) {
        children[1].classList.add('On');
      } else {
        children[1].classList.remove('On');
      }
    });
  });

  const inputDel = document.querySelectorAll('.InputDel');
  inputDel.forEach((e) => {
    // input 지우기 버튼 클릭 이벤트
    e.addEventListener('mousedown', function (event) {
      event.preventDefault();
      this.parentNode.firstElementChild.value = '';
      this.classList.remove('On');
      this.parentNode.firstElementChild.blur();
      this.parentNode.firstElementChild.focus(); // input 지운 후 바로 포커스되도록
    });
  });

  const Input = document.querySelectorAll('input');
  const ListDrop = document.querySelectorAll('.PostListDrop');
  Input.forEach((e) => {
    //다른 인풋 focus시에 드랍다운 올라가게
    e.addEventListener('focus', ListUp);
    e.addEventListener('change', ListUp);
  });
  document.querySelector('textarea').addEventListener('focus', ListUp);

  function ListUp() {
    for (let i = 0; i <= ListDrop.length - 1; i++) {
      ListDrop[i].classList.remove('On');
      ListDrop[0].style.height = '50px';
    }
  }

  const Choose = document.querySelectorAll('.InputChoose');
  Choose.forEach((e) => {
    e.addEventListener('focus', function () {
      //focus시 드랍다운
      const thisList = this.closest('.PostListDrop');
      thisList.classList.add('On');
      if (this.type == 'text') {
        const children = thisList.children;
        const listLength = children.length;
        const listHeight =
          parseInt(window.getComputedStyle(children[2]).height) +
          parseInt(window.getComputedStyle(children[1]).paddingTop);
        thisList.style.height = listHeight * listLength + 14 + 'px';
      }
    });
    e.addEventListener('change', thisListUp);
    e.addEventListener('keyup', thisListUp);
  });

  function thisListUp() {
    //value값 유무에 따라 드랍다운, 업
    const thisList = this.closest('.PostListDrop');
    if (this.value) {
      thisList.classList.remove('On');
      if (this.type == 'number') {
        if (this.value >= 10) {
          this.value = 10; //최대 10명
        }
        if (this.value <= 0) {
          this.value = 1; //최소 1명
        }
      }
    } else {
      thisList.classList.add('On');
    }
  }

  const Radio = document.querySelectorAll('input[name=PostCatDet]');
  Radio.forEach((e) => {
    //상세카테고리 하위 메뉴 클릭 시
    e.addEventListener('change', function () {
      document.querySelector('.InputPostCatDet').value = this.value;
    });
  });

  const Num = document.querySelectorAll('.num');
  Num.forEach((e) => {
    //모집인원 하위 메뉴 클릭 시
    e.addEventListener('click', function () {
      document.querySelector('.InputPostPeople').value = this.innerText;
      this.closest('.PostListDrop').classList.remove('On');
    });
  });

  const ArrowNum = document.querySelectorAll('.ArrowNum');
  ArrowNum.forEach((e) => {
    //모집인원 증가/감소 화살표 클릭 시
    e.addEventListener('click', function () {
      const People = document.querySelector('.InputPostPeople');
      let pNum = Number(People.value);
      if (People.value) {
        if (this == ArrowNum[0]) {
          if (pNum <= 9) {
            //최대 10명
            People.value = pNum + 1;
          }
        } else {
          if (pNum >= 2) {
            //최소 1명
            People.value = pNum - 1;
          }
        }
      }
    });
  });

  const ToolTipDt = document.querySelector('.ToolTipDt');
  let opacity = 0,
    Fade;
  document.querySelector('.ToolTip').addEventListener('mouseover', function () {
    clearInterval(Fade);
    Fade = setInterval(show, 20);
  });
  document.querySelector('.ToolTip').addEventListener('mouseout', function () {
    clearInterval(Fade);
    Fade = setInterval(hide, 20);
  });

  function hide() {
    opacity = Number(window.getComputedStyle(ToolTipDt).getPropertyValue('opacity'));

    if (opacity > 0) {
      opacity = opacity - 0.1;
      ToolTipDt.style.opacity = opacity;
    } else {
      clearInterval(Fade);
      ToolTipDt.style.display = 'none';
    }
  }

  function show() {
    ToolTipDt.style.display = 'block';
    opacity = Number(window.getComputedStyle(ToolTipDt).getPropertyValue('opacity'));

    if (opacity < 1) {
      opacity = opacity + 0.1;
      ToolTipDt.style.opacity = opacity;
    } else {
      clearInterval(Fade);
    }
  }
});
