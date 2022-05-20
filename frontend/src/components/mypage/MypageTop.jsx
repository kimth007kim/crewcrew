import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FilterArrowImg from '@/assets/images/IconNavArrow_Big.png';
import IconLinkIntro from '@/assets/images/IconLinkIntro.png';

function MypageTop() {
  return (
    <Container>
      <TopCont>
        <h2>
          <Link to="/mypage" />
          마이페이지
        </h2>
      </TopCont>
      <ButtonIntro />
    </Container>
  );
}

export default MypageTop;

const Container = styled('section')`
  height: 130px;
  background-color: #fff;
  border-bottom: 1px solid #e2e2e2;
  position: relative;
  overflow: hidden;
  box-sizing: content-box;
  @media screen and (max-width: 820px) {
    height: 64px;
  }
`;

const TopCont = styled('div')`
  max-width: 850px;
  width: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;

  h2 {
    font-size: 24px;
    font-weight: 700;
    line-height: 60px;
    display: flex;
    color: #000;
    align-items: center;

    a {
      display: block;
      background-image: url(${FilterArrowImg});
      background-size: 9px;
      background-repeat: no-repeat;
      background-position: 0 1px;
      width: 9px;
      height: 20px;
      padding-right: 20px;
      text-decoration: none;
      color: #868686;
      box-sizing: content-box;
    }
  }

  @media screen and (max-width: 820px) {
    width: calc(100vw - 40px);

    h2 {
      font-size: 15px;

      a {
        background-size: 8px;
        padding-right: 12px;
      }
    }
  }

  @media screen and (max-width: 300px) {
    width: calc(100vw - 20px);

    h2 {
      line-height: 30px;
    }
  }
`;
const ButtonIntro = styled('div')`
  width: 45px;
  height: 45px;
  background: url(${IconLinkIntro}) 50% 50%;
  background-size: 100% !important;
  cursor: pointer;
  position: absolute;
  top: 42px;
  right: 45px;
  opacity: 0.5;
  transition: 0.3s;

  @media screen and (max-width: 820px) {
    width: 30px;
    height: 30px;
    right: 20px;
    opacity: 1;
    top: 18px;
  }

  @media screen and (max-width: 300px) {
    right: 10px;
  }
`;
