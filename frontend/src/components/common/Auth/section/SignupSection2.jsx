/* eslint-disable indent */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

import axios from 'axios';
import CameraImg from '../../../../assets/images/Camera.png';
import CameraOnImg from '../../../../assets/images/Camera_on.png';
import CheckImg from '../../../../assets/images/Checked_on.png';
import Profile1 from '../../../../assets/images/Profile1.png';
import Profile2 from '../../../../assets/images/Profile2.png';
import Profile3 from '../../../../assets/images/Profile3.png';
import Profile4 from '../../../../assets/images/Profile4.png';
import Profile5 from '../../../../assets/images/Profile5.png';
import Textfield from '../../TextfieldEmail';
import Button from '../../Button';
import { emojiSlice, spaceSlice } from '../../../../utils';
import Progress from './Progress';
import { sectionProgress2, nickNameState, uploadFileImgState } from '@/atoms/register';

const Profile = [
  {
    src: Profile1,
    bg: '#00b7ff',
  },
  {
    src: Profile2,
    bg: '#8ED819',
  },
  {
    src: Profile3,
    bg: '#ff0045',
  },
  {
    src: Profile4,
    bg: '#8d2bf5',
  },
  {
    src: Profile5,
    bg: '#ffd458',
  },
];

function SignupSection2({ IsClick, HandleClick }) {
  const [nickname, setNickname] = useRecoilState(nickNameState);
  const [nicknameValid, setNicknameValid] = useState(false);
  const [validMessage, setValidMessage] = useState(
    '앞으로 사용할 닉네임을 입력해주세요. (10자 이내)',
  );
  const [doubleCheck, setDoubleCheck] = useState(false);
  const [uploadFileImg, setUploadFileImg] = useState(null);
  const [grayed, setGrayed] = useState(true);
  const [isUpload, setIsUpload] = useState(false);
  const [isImg, setIsImg] = useState(false);
  const [myFileImg, setMyFileImg] = useRecoilState(uploadFileImgState);

  const [StepActive, setStepActive] = useState(false);
  const uploadRef = useRef(null);
  const bgShowRef = useRef(null);
  const myImgRef = useRef(null);
  const imgTitleRef = useRef(null);
  const imgChangeRef = useRef(null);
  const [ProgressF, setProgressF] = useRecoilState(sectionProgress2);

  const HandleNicknameChange = useCallback((e) => {
    const value = emojiSlice(spaceSlice(e.target.value)).slice(0, 10);
    setNickname(value);
    setDoubleCheck(false);
    setValidMessage('앞으로 사용할 닉네임을 입력해주세요. (10자 이내)');
  }, []);

  const HandleNicknameDelete = useCallback(() => {
    setNickname('');
    setNicknameValid(false);
    setDoubleCheck(false);
  }, []);

  const HandleCheckNickname = useCallback(
    (e) => {
      e.preventDefault();
      async function axiosPost() {
        try {
          const { data } = await axios.get(`/auth/user/nickname/${nickname}`);
          switch (data.status) {
            case 200:
              setDoubleCheck(true);
              setValidMessage('사용 가능한 닉네임입니다.');
              break;
            case 1007:
              setValidMessage(data.message);
              setNicknameValid(true);
              break;
            default:
              break;
          }
        } catch (error) {
          toast.error('알 수 없는 오류가 발생했습니다. 새로고침 후 다시 시도해주시길 바랍니다');
          console.dir(error);
        }
      }
      axiosPost();
    },
    [nickname],
  );

  const HandleImgUpload = useCallback(
    (e) => {
      e.preventDefault();
      if (!isUpload) {
        uploadRef.current.click();
      } else {
        const profileUrl = URL.createObjectURL(uploadFileImg);
        bgShowRef.current.style.backgroundColor = '#e2e2e2';
        myImgRef.current.firstElementChild.setAttribute('src', profileUrl);
        setMyFileImg(uploadFileImg);
        setIsImg(true);
      }
    },
    [isUpload, uploadFileImg],
  );

  const deleteFiles = useCallback(() => {
    if (uploadFileImg) {
      return null;
    }
    setUploadFileImg(null);
    setIsUpload(false);
    setIsImg(false);

    uploadRef.current.value = '';
  }, [uploadFileImg]);

  const HandleImgFileChange = useCallback(
    (e) => {
      const fileImg = e.target.files[0];
      if (!fileImg) {
        return null;
      }
      const filesize = Number((fileImg.size / 1024 / 1024).toFixed(4));
      if (filesize >= 10) {
        deleteFiles();

        toast.error('이미지 사이즈가 너무 큽니다.');
        return null;
      }

      if (!(fileImg && fileImg.type.startsWith('image/'))) {
        deleteFiles();

        toast.error('잘못된 파일입니다.');
        return null;
      }

      setUploadFileImg(fileImg);
      setIsUpload(true);
      setMyFileImg(fileImg);

      const profileUrl = URL.createObjectURL(fileImg);
      bgShowRef.current.style.backgroundColor = '#e2e2e2';
      myImgRef.current.firstElementChild.setAttribute('src', profileUrl);
      setGrayed(false);
      setIsImg(true);
    },
    [uploadFileImg],
  );

  const HandleDefaultImgChange = useCallback((p, i) => {
    myImgRef.current.firstElementChild.setAttribute('src', p.src);
    bgShowRef.current.style.backgroundColor = p.bg;
    setMyFileImg(i + 1);
    setGrayed(false);
    setIsImg(false);
  }, []);

  const HandleNextStep = useCallback(() => {
    if (!StepActive) {
      return 0;
    }
    HandleClick(3);
  }, [StepActive]);

  const CheckProgressF = useCallback(
    (index) => {
      const Check = ProgressF.map((p) => {
        if (p.index === index) {
          return {
            ...p,
            check: 1,
          };
        }
        return p;
      });
      setProgressF([...Check]);
    },
    [ProgressF],
  );

  const NotCheckProgressF = useCallback(
    (index) => {
      const Check = ProgressF.map((p) => {
        if (p.index === index) {
          return {
            ...p,
            check: 0,
          };
        }
        return p;
      });
      setProgressF([...Check]);
    },
    [ProgressF],
  );

  useEffect(() => {
    if (nickname.length >= 2 && !nicknameValid && doubleCheck) {
      CheckProgressF(0);
    } else {
      NotCheckProgressF(0);
    }
  }, [nicknameValid, nickname, doubleCheck]);

  useEffect(() => {
    if (myFileImg) {
      CheckProgressF(1);
    } else {
      NotCheckProgressF(1);
    }
  }, [myFileImg]);

  useEffect(() => {
    const stepComplete = ProgressF.filter((p) => p.check === 1).length;
    if (stepComplete >= 2) {
      setStepActive(true);
    } else {
      setStepActive(false);
    }
  }, [ProgressF]);

  useEffect(() => {
    if (IsClick === 0) {
      deleteFiles();
      setNickname('');
      setUploadFileImg(null);
      setDoubleCheck(false);
      setProgressF([
        {
          index: 0,
          check: 0,
        },
        {
          index: 1,
          check: 0,
        },
      ]);
    }
  }, [IsClick]);

  return (
    <SignupContents active={IsClick === 2}>
      <InputList>
        <InputLi>
          <Textfield
            type="text"
            onChange={HandleNicknameChange}
            value={nickname}
            label="닉네임"
            validMessage={validMessage}
            valid={nicknameValid}
            onDelete={HandleNicknameDelete}
          />
          <InputDouble
            active={nickname.length >= 2 && !doubleCheck}
            onMouseDown={HandleCheckNickname}
          >
            중복확인
          </InputDouble>
          <InputChecked active={doubleCheck} />
        </InputLi>
        <ProfileSection>
          <ProfileBox>
            <ProfileShow ref={bgShowRef}>
              <ProfileTitle ref={imgTitleRef} active={isImg || myFileImg}>
                프로필 사진
              </ProfileTitle>
              <ProfileChange
                onClick={() => uploadRef.current.click()}
                ref={imgChangeRef}
                active={isImg}
              >
                사진변경
              </ProfileChange>
              <ProfileImg ref={myImgRef} grayed={grayed}>
                <img src={`${Profile1}`} alt="" />
              </ProfileImg>
              <ProfileBg />
            </ProfileShow>
            <ProfileSelect>
              <SelectWrapper>
                <div>
                  <InputHide type="radio" id="ProfileCustom" />
                  <InputHide
                    type="file"
                    accept="image/jpeg, image/png"
                    ref={uploadRef}
                    onChange={HandleImgFileChange}
                  />
                  <InputLabel htmlFor="ProfileCustom" onClick={HandleImgUpload} active={isUpload}>
                    <span />
                    <p>내 사진</p>
                  </InputLabel>
                </div>
                <div>
                  <ProfileList>
                    {Profile.map((p, i) => (
                      <li key={p.src + p.bg}>
                        <InputHide type="radio" id={`ProfileCustom${i}`} />
                        <OuterCircle
                          htmlFor={`ProfileCustom${i}`}
                          bg={p.bg}
                          onClick={() => HandleDefaultImgChange(p, i)}
                          active={myFileImg === i + 1}
                        >
                          <InnerCircle bg={p.bg}>
                            <img src={`${p.src}`} alt="" />
                          </InnerCircle>
                        </OuterCircle>
                      </li>
                    ))}
                  </ProfileList>
                </div>
              </SelectWrapper>
            </ProfileSelect>
          </ProfileBox>
        </ProfileSection>
      </InputList>
      <ButtonWrap>
        <Button size="fullregular" color="darkblue" disabled={!StepActive} onClick={HandleNextStep}>
          거의 다 왔어요!
        </Button>
      </ButtonWrap>
      <Progress />
    </SignupContents>
  );
}

export default SignupSection2;

const FadeIn = keyframes`
    from{
        opacity:0;
    } to {
        opacity:1;
    }
`;

const SignupContents = styled.div`
  transition: 0.5s;
  display: none;

  animation-duration: 0.5s;
  animation-timing-function: ease-out;

  animation-fill-mode: forwards;

  ${(props) =>
    props.active &&
    css`
      display: block;
      animation-name: ${FadeIn};
    `}
`;

const InputList = styled.ul`
  padding: 35px 0 20px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 320px;
  box-sizing: content-box;
  padding: 25px 0 20px;
  scroll-behavior: smooth;
  @media screen and (max-width: 820px) {
    height: calc(var(--vh, 1vh) * 100)-393px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const InputLi = styled.li`
  position: relative;
  height: 75px;
`;

const InputDouble = styled.div`
  font-size: 10px;
  color: #fff;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 20px;
  background-color: #707070;
  border-radius: 10px;
  position: absolute;
  display: none;
  top: 15px;
  right: 48px;
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      display: flex;
    `}
`;

const InputChecked = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  display: none;
  top: 15px;
  right: 48px;
  background: url(${CheckImg});
  background-size: 100%;
  cursor: default;
  ${(props) =>
    props.active &&
    css`
      display: flex;
    `}
`;

const ProfileSection = styled.li`
  position: relative;
  height: 230px;
  box-sizing: border-box;
  @media screen and (max-width: 820px) {
    height: 290px;
  }
`;

const ProfileBox = styled.div`
  width: 100%;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  overflow: hidden;
`;

const ProfileShow = styled.div`
  height: 160px;
  background-color: #e2e2e2;

  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;

  transition: 0.5s;
  @media screen and (max-width: 820px) {
    height: 218px;
  }
`;

const ProfileTitle = styled.p`
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 13px;
  color: #fff;
  z-index: 1;
  opacity: 0;
  transition: 0.3s;
  ${(props) =>
    props.active &&
    css`
      opacity: 1;
    `}
`;

const ProfileChange = styled.label`
  font-size: 10px;
  color: #fff;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 20px;
  background-color: #707070;
  border-radius: 10px;
  position: absolute;
  display: none;
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 1;
  ${(props) =>
    props.active &&
    css`
      display: flex;
    `}
`;

const ProfileImg = styled.div`
  width: 160px;
  height: 160px;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(0);
    opacity: 1;

    transition: 0.5s;
    ${(props) =>
      props.grayed &&
      css`
        filter: grayscale(100%);
        opacity: 0.5;
      `}
  }
  @media screen and (max-width: 820px) {
    width: 218px;
    height: 218px;
  }
`;

const ProfileBg = styled.div`
  width: 148px;
  height: 148px;
  top: calc(50% - (148px / 2));
  left: calc(50% - (148px / 2));
  position: absolute;
  border-radius: 50%;
  background: transparent;
  -webkit-box-shadow: 0 0 0 300px #000;
  box-shadow: 0 0 0 300px #000;
  opacity: 0.3;
  @media screen and (max-width: 820px) {
    width: 202px;
    height: 202px;
    top: calc(50% - (202px / 2));
    left: calc(50% - (202px / 2));
  }
`;

const ProfileSelect = styled.div``;
const SelectWrapper = styled.div`
  display: flex;
  height: 70px;

  & > div {
    height: 100%;
  }

  & > div:first-child {
    width: 88px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > div:last-child {
    display: flex;
    overflow: hidden;
    width: 100%;
  }

  & > div:last-child::before {
    content: '';
    display: block;
    width: 1px;
    height: 50px;
    background-color: #e2e2e2;
    margin-top: 10px;
  }
`;

const ProfileList = styled.ul`
  width: 100%;
  height: 100%;
  overflow-x: auto;
  display: flex;
  position: relative;

  & > li {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 820px) {
    & > li:first-child {
      margin-left: 8px;
    }
    & > li {
      min-width: 62px;
    }
    & > li:last-child {
      margin-right: 8px;
    }
  }
`;

const OuterCircle = styled.label`
  width: 54px;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid #e2e2e2;
  transition: 0.3s;
  cursor: pointer;
  box-sizing: content-box;

  ${(props) =>
    props.bg &&
    css`
      :hover {
        border-color: ${props.bg};
      }
    `}
  ${(props) =>
    props.active &&
    css`
      border-color: ${props.bg};
    `}
`;

const InnerCircle = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  box-sizing: content-box;

  ${(props) =>
    props.bg &&
    css`
      background-color: ${props.bg};
    `}

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InputHide = styled.input`
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  position: absolute;
`;

const InputLabel = styled.label`
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 3px;
  background-color: #fff;
  transition: 0.3s;

  & > span {
    display: block;
    width: 23px;
    height: 16px;
    background: url(${CameraImg}) 50% 50%;
    background-size: 100%;
    transition: 0.3s;
  }

  & > p {
    font-size: 13px;
    font-weight: 300;
    color: #000;
    margin-top: 5px;
    transition: 0.3s;
  }
  :hover {
    background-color: #00b7ff;

    & > p {
      color: #fff;
    }
    & > span {
      background: url(${CameraOnImg}) 50% 50%;
      background-size: 100%;
    }
  }
  ${(props) =>
    props.active &&
    css`
      background-color: #00b7ff;

      & > p {
        color: #fff;
      }
      & > span {
        background: url(${CameraOnImg}) 50% 50%;
        background-size: 100%;
      }
    `}
`;

const ButtonWrap = styled.div`
  margin: 30px 0 10px;
  @media screen and (max-width: 820px) {
    margin-top: 15px;
  }
`;
