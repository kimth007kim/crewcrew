/* eslint-disable indent */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useCallback, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Modal from '../../components/common/Modal';
import Close from '../../assets/images/ModalClose.png';

import LoginSection from './section/LoginSection';
import SignupSection from './section/SignupSection';

// eslint-disable-next-line react/jsx-wrap-multilines
function AuthModal({ closeModal, visible }) {
  const [IsClick, setIsClick] = useState(0);

  const HandleClick = useCallback((num) => {
    setIsClick(num);
  }, []);

  return (
    <Modal
      handleClose={() => {
        closeModal();
        setTimeout(() => {
          HandleClick(0);
        }, 500);
      }}
      header={
        <Header disappear={!visible}>
          <Top>
            <li />
            <li>
              <ModalClose
                onClick={() => {
                  closeModal();
                  setTimeout(() => {
                    HandleClick(0);
                  }, 500);
                }}
              />
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
          <LoginSection IsClick={IsClick} />
          <SignupSection IsClick={IsClick} />
        </Body>
      }
      visible={visible}
      size="regular"
      heightSize={685}
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
    padding: 0px 20px;
    ${(props) =>
      props.disappear &&
      css`
        animation-name: ${SizeDown};
      `}
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
