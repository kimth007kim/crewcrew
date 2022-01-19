/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useCallback, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

import CheckOff from '../../../assets/images/LogInCheck_off.png';
import CheckOn from '../../../assets/images/LogInCheck_on.png';
import Naver from '../../../assets/images/Naver.png';
import Kakao from '../../../assets/images/Kakao.png';

import Button from '../../../components/common/Button';
import Textfield from '../../../components/common/TextfieldEmail';
import TextfieldPW from '../../../components/common/TextfieldPW';

function LoginSection({ IsClick, HandleClick }) {
  const [IsChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [Valid, setValid] = useState(true);

  const MovePasswordFind = useCallback(() => {
    HandleClick(5);
  }, []);

  const HandleCheck = useCallback((e) => {
    setIsChecked(e.target.checked);
  }, []);

  const HandleEmailChange = (e) => {
    setEmail(e.target.value);
    setValid(false);
  };

  const HandleEmailDelete = useCallback(() => {
    setEmail('');
  }, []);

  const HandlePasswordChange = (e) => {
    setPassword(e.target.value);
    setValid(false);
  };

  const HandlePasswordDelete = useCallback(() => {
    setPassword('');
  }, []);

  const HandleSubmitLogin = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <LoginContents active={IsClick === 0}>
      <form onSubmit={HandleSubmitLogin}>
        <InputList>
          <InputLi>
            <Textfield
              type="email"
              onChange={HandleEmailChange}
              value={email}
              label="이메일"
              validMessage="가입된 이메일 주소를 입력해주세요"
              valid={false}
              onDelete={HandleEmailDelete}
            />
          </InputLi>
          <InputLi>
            <TextfieldPW
              onChange={HandlePasswordChange}
              value={password}
              label="비밀번호"
              validMessage="숫자/영문/특수문자 포함 8~20글자"
              valid={false}
              onDelete={HandlePasswordDelete}
            />
          </InputLi>
        </InputList>
        <Button size="fullregular" color="darkblue">
          로그인
        </Button>

        <SubList>
          <li>
            <InputHide type="checkbox" id="LogInCheck" checked={IsChecked} onChange={HandleCheck} />

            <LabelCheck htmlFor="LogInCheck" className="LabelCheck">
              <CheckBox active={IsChecked} />
              로그인상태유지
            </LabelCheck>
          </li>
          <li>
            <p onClick={MovePasswordFind}>비밀번호 찾기</p>
          </li>
        </SubList>
      </form>
      <DividingLine>또는 간편하게</DividingLine>
      <SnsList>
        <li>
          <ButtonNaver>
            <NaverImg src={Naver} />
            네이버 로그인
          </ButtonNaver>
        </li>
        <li>
          <ButtonKakao>
            <KakaoImg src={Kakao} />
            카카오 로그인
          </ButtonKakao>
        </li>
      </SnsList>
    </LoginContents>
  );
}

export default LoginSection;

const FadeIn = keyframes`
    from{
        opacity:0;
    } to {
        opacity:1;
    }
`;

const FadeOut = keyframes`
    from{
        opacity:1;
    } to {
        opacity:0;
    }
`;

const LoginContents = styled.div`
  transition: 0.5s;
  display: none;

  animation-duration: 0.5s;
  animation-timing-function: ease-out;

  animation-fill-mode: forwards;

  ${(props) =>
    props.active &&
    css`
      opacity: 1;
      display: block;
      animation-name: ${FadeIn};
    `}
`;

const InputList = styled.ul`
  margin: 35px 0 20px;
`;

const SubList = styled.ul`
  margin: 30px 0 58px;

  display: flex;
  & > li {
    width: 100%;
    display: flex;
    justify-content: center;
    font-size: 15px;
    font-weight: 300;
    color: #868686;
    user-select: none;
  }

  & > li > p {
    cursor: pointer;
  }
`;

const InputHide = styled.input`
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  position: absolute;
`;

const LabelCheck = styled.label`
  display: flex;
  line-height: 21px;
  cursor: pointer;
  user-select: none;
`;

const CheckBox = styled.span`
  display: block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background: url(${CheckOff});
  background-size: 100%;
  transition: background 0.2s;

  ${(props) =>
    props.active &&
    css`
      background: url(${CheckOn});
      background-size: 100%;
    `}
`;

const InputLi = styled.li`
  position: relative;
  height: 75px;
`;

const DividingLine = styled.div`
  margin: 58px auto 30px;
  font-size: 13px;
  color: #000;
  font-weight: 300;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  white-space: nowrap;
  user-select: none;

  ::after,
  ::before {
    content: '';
    display: block;
    height: 1px;
    width: 100%;
    background-color: #e2e2e2;
  }
  ::before {
    margin-right: 11px;
  }
  ::after {
    margin-left: 11px;
  }
`;

const SnsList = styled.ul`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding-bottom: 80px;
  gap: 16px;
  user-select: none;

  & > li {
    width: 100%;
  }
  @media screen and (max-width: 768px) {
    gap: 10px;
  }
`;

const ButtonNaver = styled.button`
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  transition: 0.3s;
  padding-top: 11px;
  padding-bottom: 11px;
  font-size: 13px;
  font-weight: 300;
  border-radius: 6px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: -0.05em;
  height: 40px;
  :hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }
  background-color: #03c75a;
  color: #fff;
`;
const ButtonKakao = styled.button`
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  transition: 0.3s;
  padding-top: 11px;
  padding-bottom: 11px;
  font-size: 13px;
  font-weight: 300;
  border-radius: 6px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: -0.05em;
  height: 40px;
  :hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }
  background-color: #fee500;
  font-weight: 400;
`;

const NaverImg = styled.img`
  width: 10px;
  margin-right: 6px;
`;
const KakaoImg = styled.img`
  width: 13px;
  margin-right: 4px;
  margin-top: 2px;
`;
