/* eslint-disable indent */
/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import styled, { css, keyframes } from 'styled-components';

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

export default TitleRender;

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
