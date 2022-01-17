/* eslint-disable indent */
/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import styled, { css, keyframes } from 'styled-components';

function TitleRender({ IsClick, HandleClick }) {
  if (IsClick === 2) {
    return <TitleLi active={IsClick === 2}>비밀번호 찾기</TitleLi>;
  }
  if (IsClick === 0 || IsClick === 1) {
    return (
      <>
        <TitleLi active={IsClick === 0} onClick={() => HandleClick(0)}>
          로그인
        </TitleLi>
        <TitleLi active={IsClick === 1} onClick={() => HandleClick(1)}>
          회원가입
        </TitleLi>
      </>
    );
  }
}

export default TitleRender;

const FadeIn = keyframes`
    from{
        opacity:0;
    } to {
        opacity:1;
    }
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
