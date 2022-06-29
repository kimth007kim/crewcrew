import { ProgressTransition, CommonFunc } from '../Common.js';

window.addEventListener('DOMContentLoaded', CommonFunc);

window.addEventListener('DOMContentLoaded', function () {
  const inputDouble = document.querySelector('.InputDouble');
  inputDouble.addEventListener('click', function () {
    //중복확인 클릭 이벤트
    this.classList.remove('On');
    this.parentNode.children[4].classList.add('On');
    this.parentNode.children[5].innerText = '사용 가능한 닉네임입니다.';
    this.parentNode.children[5].classList.add('On');
    this.parentNode.children[0].classList.add('On');
    this.parentNode.children[0].disabled = true;
    this.parentNode.classList.add('Checked');

    ProgressTransition(); //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
  });

  const profileCustom = document.querySelector('.ProfileCustom');
  const profileImg = document.querySelector('.ProfileImg');
  const profileShow = document.querySelector('.ProfileShow');
  const profileUpload = document.querySelector('#ProfileUpload');
  let isUploaded = true;
  profileCustom.addEventListener('click', function () {
    //내 사진 클릭 시 사진업로드
    if (isUploaded) {
      //처음 내 사진 클릭했을때
      profileUpload.click();
      isUploaded = false;
    } else {
      document.querySelector('.ProfileChange').classList.add('On');
      profileShow.style.backgroundColor = '#e2e2e2';
      profileImg.firstElementChild.setAttribute('src', profileURL);
      profileCustom.parentNode.classList.add('On');
      profileClassRemove(); //선택한 프로필 외에 나머지 on클래스 없애기
    }
  });

  let profileURL;
  profileUpload.addEventListener('change', function () {
    //사진 업로드 시
    this.parentNode.classList.add('On');
    document.querySelector('.ProfileTitle').style.opacity = '1';
    document.querySelector('.ProfileChange').classList.add('On');
    profileShow.style.backgroundColor = '#e2e2e2';
    profileImg.classList.remove('Grayed');

    profileURL = URL.createObjectURL(this.files[0]); //등록한 이미지 상단에 보이기
    profileImg.firstElementChild.setAttribute('src', profileURL);
  });

  const profileSelect = document.querySelectorAll('.OuterCircle');
  profileSelect.forEach((e) => {
    //프로필이미지 선택 시
    e.addEventListener('click', function () {
      let profileSrc = this.firstElementChild.firstElementChild.src;
      profileImg.firstElementChild.setAttribute('src', profileSrc);
      profileImg.classList.remove('Grayed');
      this.closest('.ProfileBox').classList.add('On');
      profileShow.style.backgroundColor = window.getComputedStyle(
        this.firstElementChild,
      ).backgroundColor;
      document.querySelector('.TxtNick').classList.remove('On');
      document.querySelector('.SelectWrapper').firstElementChild.classList.remove('On');
      document.querySelector('.ProfileTitle').style.opacity = '1';
      document.querySelector('.ProfileChange').classList.remove('On');

      profileClassRemove(); //선택한 프로필 외에 나머지 on클래스 없애기
      this.classList.add('On');
    });
  });

  function profileClassRemove() {
    //선택한 프로필 외에 나머지 on클래스 없애기
    const profileLength = profileSelect.length - 1;
    for (let i = 0; i <= profileLength; i++) {
      profileSelect[i].classList.remove('On');
    }
  }

  const profileRadio = document.querySelectorAll('.ProfileSelectRadio');
  profileRadio.forEach((e) => {
    //프로필이미지 or 사진 업로드 시 ProgressTransition증가
    e.addEventListener('click', function () {
      this.closest('.ProfileSection').classList.add('Checked');

      ProgressTransition(); //입력 완료된 input의 수에 따라 Stepbar 넓이 조절
    });
  });
});
