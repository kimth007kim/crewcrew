/* eslint-disable indent */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useCallback, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Modal from '../../components/common/Modal';
import Close from '../../assets/images/ModalClose.png';
import Arrow from '../../assets/images/Arrow.png';

import LoginSection from './section/LoginSection';
import SignupSection from './section/SignupSection';
import PasswordSection from './section/PasswordSection';
import TitleRender from './component/TitleRender';
import SignupSection2 from './section/SignupSection2';
import SignupSection3 from './section/SignupSection3';
import SignupSection4 from './section/SignupSection4';

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
        IsClick !== 4 ? (
          <Header disappear={!visible}>
            <Top>
              <li>
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
              </li>
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
              <TitleRender IsClick={IsClick} HandleClick={HandleClick} />
            </Title>
          </Header>
        ) : (
          <CompleteHeader>
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
          </CompleteHeader>
        )
      }
      body={
        <Body>
          <LoginSection IsClick={IsClick} HandleClick={HandleClick} />
          <SignupSection IsClick={IsClick} HandleClick={HandleClick} />
          <SignupSection2 IsClick={IsClick} HandleClick={HandleClick} />
          {IsClick === 3 && <SignupSection3 IsClick={IsClick} HandleClick={HandleClick} />}
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

const CompleteHeader = styled.div`
  height: 108px;
  padding: 0 40px;
  padding-bottom: 10px;
  box-sizing: content-box;
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
  height: 18px;
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
