/* eslint-disable indent */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useCallback, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Modal from '../../components/common/Modal';
import Close from '../../assets/images/ModalClose.png';
import CheckOff from '../../assets/images/LogInCheck_off.png';
import CheckOn from '../../assets/images/LogInCheck_on.png';
import Naver from '../../assets/images/Naver.png';
import Kakao from '../../assets/images/Kakao.png';

import Textfield from '../../components/common/TextfieldEmail';
import TextfieldPW from '../../components/common/TextfieldPW';
import Button from '../../components/common/Button';

// eslint-disable-next-line react/jsx-wrap-multilines
function AuthModal({ closeModal, visible }) {
  const [IsClick, setIsClick] = useState(0);
  const [IsChecked, setIsChecked] = useState(false);
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Valid, setValid] = useState(true);

  const HandleClick = useCallback((num) => {
    setIsClick(num);
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
    <Modal
      handleClose={closeModal}
      header={
        <Header disappear={!visible}>
          <Top>
            <li />
            <li>
              <ModalClose onClick={closeModal} />
            </li>
          </Top>
          <Title>
            <TitleLi active={IsClick === 0} onClick={() => HandleClick(0)}>
              로그인
            </TitleLi>
            <TitleLi active={IsClick === 1} onClick={() => HandleClick(1)}>
              회원가입
            </TitleLi>
          </Title>
        </Header>
      }
      body={
        <Body>
          <LoginContents active={IsClick === 0}>
            <form onSubmit={HandleSubmitLogin}>
              <InputList>
                <InputLi>
                  <Textfield
                    type="email"
                    onChange={HandleEmailChange}
                    value={Email}
                    label="이메일"
                    validMessage="가입된 이메일 주소를 입력해주세요"
                    valid={false}
                    onDelete={HandleEmailDelete}
                  />
                </InputLi>
                <InputLi>
                  <TextfieldPW
                    onChange={HandlePasswordChange}
                    value={Password}
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
                  <InputHide
                    type="checkbox"
                    id="LogInCheck"
                    checked={IsChecked}
                    onChange={HandleCheck}
                  />

                  <LabelCheck htmlFor="LogInCheck" className="LabelCheck">
                    <CheckBox active={IsChecked} />
                    로그인상태유지
                  </LabelCheck>
                </li>
                <li>
                  <p>비밀번호 찾기</p>
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
        </Body>
      }
      visible={visible}
      size="regular"
    />
  );
}

export default AuthModal;

const SizeDown = keyframes`
    from{
      height: 114px;
    } to {
      height: 0px;
    }
`;

const SizeUp = keyframes`
    from{
      height: 0;
    } to {
      height: 114px;
    }
`;

const Header = styled.div`
  width: 100%;
  padding: 0 40px;
  background-color: #fff;
  box-sizing: border-box;
  z-index: 1;
  transition: 0.5s;
  color: #868686;
  border-radius: 20px 20px 0 0;

  @media screen and (max-width: 768px) {
    animation-duration: 0.5s;
    animation-timing-function: ease-out;
    animation-name: ${SizeUp};
    animation-fill-mode: forwards;
    ${(props) =>
      props.disappear &&
      css`
        animation-name: ${SizeDown};
      `}
    padding: 0px 20px;
  }
`;

const Top = styled.ul`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  margin-bottom: 35px;
  margin-top: 48px;
  @media screen and (max-width: 768px) {
    margin-top: 40px;
    margin-bottom: 45px;
  }
`;

const ModalClose = styled.span`
  display: block;
  width: 14px;
  height: 14px;
  background: url(${Close});
  background-size: 100%;
  cursor: pointer;
  margin-right: 10px;
  @media screen and (max-width: 768px) {
    margin-right: 0;
  }
`;

const Title = styled.ul`
  display: flex;
  padding-bottom: 10px;
`;

const TitleLi = styled.li`
  width: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 18px;
  font-weight: 300;
  cursor: pointer;
  transition: 0.5s;
  height: 45px;

  ${(props) =>
    props.active &&
    css`
      font-size: 32px;
      color: #000;
      font-weight: 700;
      cursor: default;
    `}
`;

const Body = styled.div`
  padding: 0 40px;
  background-color: #fff;
  z-index: 1;
  transition: 0.5s;
  color: #868686;
  @media screen and (max-width: 768px) {
    padding: 0 20px;
    width: 100%;
    margin-top: -1px;
    border-radius: 0;
    height: calc(100vh - 194px);
    overflow-y: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const LoginContents = styled.div`
  opacity: 0;
  transition: 0.5s;

  ${(props) =>
    props.active &&
    css`
      opacity: 1;
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
