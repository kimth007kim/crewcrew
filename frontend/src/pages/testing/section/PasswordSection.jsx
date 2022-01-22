/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useCallback, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Naver from '../../../assets/images/Naver.png';
import Kakao from '../../../assets/images/Kakao.png';
import Button from '../../../components/common/Button';
import Textfield from '../../../components/common/TextfieldEmail';

function PasswordSection({ HandleClick, IsClick }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [Valid, setValid] = useState(true);
  const HandleEmailChange = (e) => {
    setEmail(e.target.value);
    setValid(false);
  };

  const HandleEmailDelete = useCallback(() => {
    setEmail('');
  }, []);

  const HandleNameChange = (e) => {
    setName(e.target.value);
    setValid(false);
  };

  const HandleNameDelete = useCallback(() => {
    setName('');
  }, []);

  const HandleSubmitLogin = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <PWFindContents active={IsClick === 5}>
      <form onSubmit={HandleSubmitLogin}>
        <InputList>
          <InputLi>
            <Textfield
              type="text"
              onChange={HandleNameChange}
              value={name}
              label="이름"
              validMessage="이름을 입력해주세요"
              valid={false}
              onDelete={HandleNameDelete}
            />
          </InputLi>
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
        </InputList>
        <Button size="fullregular" color="darkblue">
          비밀번호 찾기
        </Button>
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
      <ButtonWrap>
        <Button size="fullsmall" color="darkblue" onClick={() => HandleClick(1)}>
          이메일로 회원가입하기
        </Button>
      </ButtonWrap>
    </PWFindContents>
  );
}

export default PasswordSection;

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

const PWFindContents = styled.div`
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
  padding-bottom: 15px;
  gap: 16px;

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

const ButtonWrap = styled.div`
  margin-bottom: 74px;
`;
