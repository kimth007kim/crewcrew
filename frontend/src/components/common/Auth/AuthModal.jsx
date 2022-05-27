/* eslint-disable indent */
/* eslint-disable react/jsx-wrap-multilines */
// eslint-disable-next-line react/jsx-wrap-multilines
import React, { useCallback, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Modal from '../Modal';
import Close from '@/assets/images/ModalClose.png';
import Arrow from '@/assets/images/Arrow.png';

import LoginSection from './section/LoginSection';
import SignupSection from './section/SignupSection';
import PasswordSection from './section/PasswordSection';
import SignupSection2 from './section/SignupSection2';
import SignupSection3 from './section/SignupSection3';
import SignupSection4 from './section/SignupSection4';

function TitleRender({ IsClick, HandleClick }) {
  const SignupClick = () => {
    if (IsClick >= 2) {
      return undefined;
    }

    HandleClick(1);
  };
  return (
    <>
      <TitleLi
        active={IsClick === 0}
        onClick={() => HandleClick(0)}
        fade={IsClick === 0 || IsClick === 1 || IsClick === 2}
        left={IsClick === 2 || IsClick === 3 || IsClick === 4}
      >
        {(IsClick === 0 || IsClick === 1) && '로그인'}
      </TitleLi>

      <TitleLi
        active={IsClick === 1 || IsClick === 2 || IsClick === 3}
        onClick={SignupClick}
        fade={IsClick === 0 || IsClick === 1 || IsClick === 2 || IsClick === 3}
      >
        회원가입
      </TitleLi>
      <TitleLi active={IsClick === 5} fade={IsClick === 5}>
        비밀번호 찾기
      </TitleLi>
    </>
  );
}

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
        IsClick !== 4 ? (
          <Header disappear={!visible}>
            <Top>
              <div>
                {IsClick === 5 && (
                  <ModalArrow onClick={() => HandleClick(0)}>
                    <ArrowImg src={Arrow} />
                    로그인
                  </ModalArrow>
                )}
                {IsClick >= 2 && IsClick <= 3 && (
                  <ModalArrow onClick={() => HandleClick(IsClick - 1)}>
                    <ArrowImg src={Arrow} />
                    이전 단계
                  </ModalArrow>
                )}
              </div>
              <div>
                <ModalClose
                  onClick={() => {
                    closeModal();
                    setTimeout(() => {
                      HandleClick(0);
                    }, 500);
                  }}
                />
              </div>
            </Top>
            <Title>
              <TitleRender IsClick={IsClick} HandleClick={HandleClick} />
            </Title>
          </Header>
        ) : (
          <CompleteHeader>
            <Top>
              <div />
              <div>
                <ModalClose
                  onClick={() => {
                    closeModal();
                    setTimeout(() => {
                      HandleClick(0);
                    }, 500);
                  }}
                />
              </div>
            </Top>
          </CompleteHeader>
        )
      }
      body={
        <Body>
          <LoginSection IsClick={IsClick} HandleClick={HandleClick} closeModal={closeModal} />
          <SignupSection IsClick={IsClick} HandleClick={HandleClick} />
          <SignupSection2 IsClick={IsClick} HandleClick={HandleClick} />
          <SignupSection3 IsClick={IsClick} HandleClick={HandleClick} />
          {IsClick === 4 && (
            <SignupSection4 IsClick={IsClick} closeModal={closeModal} HandleClick={HandleClick} />
          )}
          <PasswordSection IsClick={IsClick} HandleClick={HandleClick} />
        </Body>
      }
      visible={visible}
      size="regular"
      heightSize={685}
    />
  );
}

export default AuthModal;

const Header = styled.div`
  width: 100%;
  padding: 0 40px;
  background-color: #fff;
  box-sizing: border-box;
  z-index: 1;
  transition: 0.5s;
  color: #868686;
  border-radius: 20px 20px 0 0;

  @media screen and (max-width: 820px) {
    padding: 0px 20px;
    margin-bottom: 1px;
  }
`;

const CompleteHeader = styled.div`
  height: 108px;
  padding: 0 40px;
  padding-bottom: 10px;
  box-sizing: content-box;
  @media screen and (max-width: 820px) {
    padding: 0 20px;
    padding-bottom: 10px;
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 35px;
  margin-top: 48px;
  height: 18px;
  @media screen and (max-width: 820px) {
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
  @media screen and (max-width: 820px) {
    margin-right: 0;
  }
`;

const ModalArrow = styled.p`
  font-size: 18px;
  color: #868686;
  cursor: pointer;
  line-height: 1;
  font-weight: 300;
`;

const ArrowImg = styled.img`
  width: 8px;
  margin-right: 15px;
`;

const Title = styled.ul`
  display: flex;
  padding-bottom: 10px;
  transition: all 0.5s;
  box-sizing: content-box;
`;

const Body = styled.div`
  padding: 0 40px;
  background-color: #fff;
  z-index: 1;
  transition: 0.5s;
  color: #868686;
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 820px) {
    padding: 0 20px;
    width: 100%;
    margin-top: -1px;
    border-radius: 0;
    height: calc(var(--vh, 1vh) * 100)-194px;
    transition: 0.5s;

    overflow-y: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const FadeIn = keyframes`
    from{
        opacity:0;
    } to {
        opacity:1;
    }
`;

const LeftToCenter = keyframes`
  from {
    width: 100%;
  } to {
    width: 0%;
  }
`;

const TitleLi = styled.li`
  width: 100%;

  justify-content: center;

  align-items: center;
  font-size: 18px;
  font-weight: 300;
  cursor: pointer;
  transition: 0.5s;
  height: 45px;

  display: none;
  opacity: 0;
  user-select: none;

  animation-duration: 1s;
  animation-timing-function: ease-out;

  animation-fill-mode: forwards;

  ${(props) =>
    props.fade &&
    css`
      opacity: 1;
      display: flex;
      animation-name: ${FadeIn};
    `}

  ${(props) =>
    props.left &&
    css`
      animation-duration: 0.3s;

      animation-name: ${LeftToCenter};
    `}


  ${(props) =>
    props.active &&
    css`
      font-size: 32px;
      color: #000;
      font-weight: 700;
      cursor: default;
    `}
`;
