import { ProgressTransition, CommonFunc } from '../Common.js';

window.addEventListener('DOMContentLoaded', CommonFunc);

window.addEventListener('DOMContentLoaded', function () {
  const chooseTitle = document.querySelectorAll('.ChooseTitle');
  const UnderList = document.querySelectorAll('.ChooseListUnder');
  chooseTitle.forEach((e) => {
    //스터디,취미 클릭시 드롭다운
    e.addEventListener('click', function () {
      this.classList.add('Clicked');
      for (let i = 0; i <= chooseTitle.length - 1; i++) {
        //전체 드롭다운 on클래스해제
        document.querySelectorAll('.ChooseListDetail')[i].classList.remove('On');
        document.querySelectorAll('.ChooseListDetail')[i].style.height = '50px';
        document.querySelectorAll('.ChooseListDetail')[
          i
        ].firstElementChild.firstElementChild.disabled = false; //선택된 것 외엔 disabled 풀기
        UnderList[i].style.display = 'flex'; //전체 ChooseListUnder hide처리

        if (UnderList[i].children.length > 0 && !this.disabled) {
          //ProgressTransition 함수 관련
          UnderList[i].parentNode.classList.add('Checked');
        } else {
          UnderList[i].parentNode.classList.remove('Checked');
        }

        if (chooseTitle[i].classList.contains('Clicked')) {
          document.querySelectorAll('.InputAdd')[i].classList.add('On'); //추가 버튼 생성
        }
      }

      if (this.disabled) {
        this.parentNode.lastElementChild.classList.add('On'); //추가 버튼 생성
      } else {
        this.parentNode.lastElementChild.classList.remove('On');
      }

      const chooseListDetail = this.closest('.ChooseListDetail');
      const children = chooseListDetail.children;
      chooseListDetail.classList.add('On'); //클릭한 드롭다운 on클래스
      this.disabled = true; //드롭다운이 열린 상태에서 다시 선택되지 않게

      let chooseIndex = Array.from(document.querySelectorAll('.ChooseList')).indexOf(
        this.closest('li.ChooseList'),
      );
      UnderList[chooseIndex].style.display = 'none'; //클릭한 ChooseListUnder hide처리

      let ChooseListLength = children.length - 1;
      let ChooseListHeight =
        parseInt(window.getComputedStyle(children[1]).height) +
        parseInt(window.getComputedStyle(children[1]).paddingTop) * 2;
      chooseListDetail.style.height = 8 + 50 + ChooseListHeight * ChooseListLength + 'px';
      setTimeout(listScroll.bind(this), 300); //스크롤 위로 올라가도록

      ProgressTransition(); //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
    });
  });

  let listOffset = 0;
  function listScroll() {
    //스터디, 취미 스크롤
    listOffset = this.closest('.ChooseList').offsetTop;
    this.closest('.InputList').scrollTop = listOffset - 25;
  }

  const chooseCompete = document.querySelectorAll('.ChooseComplete');
  chooseCompete.forEach((e) => {
    //완료 버튼 클릭 시
    e.addEventListener('click', function () {
      this.closest('.ChooseListDetail').classList.remove('On');
      this.closest('.ChooseListDetail').style.height = '50px';
      this.closest('.ChooseList').lastElementChild.style.display = 'flex';
      this.closest('.ChooseListDetail').firstElementChild.firstElementChild.disabled = false; //닫을 때 disabled 풀기
      this.closest('.ChooseListDetail').firstElementChild.lastElementChild.classList.add('On'); //추가 버튼 생성

      if (this.closest('.ChooseList').lastElementChild.children.length > 0) {
        //ProgressTransition 함수 관련
        this.closest('.ChooseList').classList.add('Checked');
      } else {
        this.closest('.ChooseList').classList.remove('Checked');
      }

      ProgressTransition(); //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
    });
  });

  const chooseLast = document.querySelector('.ChooseLast').firstElementChild;
  chooseLast.addEventListener('focus', function () {
    //한줄메세지 입력시
    this.parentNode.style.marginBottom =
      parseInt(window.getComputedStyle(this.closest('.InputList')).height) - 55 + 'px';
    setTimeout(lastScroll.bind(this), 300);

    for (let i = 0; i <= chooseTitle.length - 1; i++) {
      //전체 드롭다운 올라가도록
      document.querySelectorAll('.ChooseListDetail')[i].classList.remove('On');
      document.querySelectorAll('.ChooseListDetail')[i].style.height = '50px';
      document.querySelectorAll('.ChooseListDetail')[
        i
      ].firstElementChild.firstElementChild.disabled = false; //선택된 것 외엔 disabled 풀기
      UnderList[i].style.display = 'flex'; //전체 ChooseListUnder hide처리

      if (UnderList[i].children.length > 0) {
        UnderList[i].closest('.ChooseList').classList.add('Checked');
      } else {
        UnderList[i].closest('.ChooseList').classList.remove('Checked');
      }

      if (chooseTitle[i].classList.contains('Clicked')) {
        document.querySelectorAll('.InputAdd')[i].classList.add('On'); //추가 버튼 추가
      }
    }

    ProgressTransition(); //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
  });
  chooseLast.addEventListener('blur', function () {
    this.parentNode.style.marginBottom = 0;
  });

  function lastScroll() {
    //한줄메세지 스크롤
    this.closest('.InputList').scrollTop = parseInt(
      window.getComputedStyle(this.closest('.InputList')).height,
    );
  }

  const InputAdd = document.querySelectorAll('.InputAdd');
  InputAdd.forEach((e) => {
    //추가버튼 눌러도 드롭다운되게
    e.addEventListener('click', function () {
      this.parentNode.children[0].click();
    });
  });

  const inputChoose = document.querySelectorAll('.InputChoose');
  let studyObj = {};
  let hobbyObj = {};
  inputChoose.forEach((e) => {
    e.addEventListener('change', function () {
      const isStudy = Array.from(document.querySelectorAll('.ChooseList')).indexOf(
        this.closest('.ChooseList'),
      );

      if (this.checked) {
        //동적 생성
        let choosedOption = document.createElement('li');
        choosedOption.innerHTML =
          '<label for=' +
          this.getAttribute('id') +
          ' class="LabelChoose"><p class="ChooseUnder"><em>' +
          this.value +
          '</em><span class="ChooseCancel"></span></p></label>';
        this.closest('.ChooseList').lastElementChild.appendChild(choosedOption);

        if (isStudy == 0) {
          studyObj[this.value] = choosedOption;
        } else {
          hobbyObj[this.value] = choosedOption;
        }
      } else {
        //동적 제거

        if (isStudy == 0) {
          this.closest('.ChooseList').lastElementChild.removeChild(studyObj[this.value]);
          delete studyObj[this.value];
        } else {
          this.closest('.ChooseList').lastElementChild.removeChild(hobbyObj[this.value]);
          delete hobbyObj[this.value];
        }
      }

      if (this.closest('.ChooseList').lastElementChild.children.length > 0) {
        //완료버튼 On클래스
        this.closest('.ChooseListDetail').lastElementChild.lastElementChild.classList.add('On');
      } else {
        this.closest('.ChooseListDetail').lastElementChild.lastElementChild.classList.remove('On');
        this.closest('.ChooseList').classList.remove('Checked'); //모두 제거되면 진행도 낮아지게
        ProgressTransition(); //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
      }
    });
  });
});
