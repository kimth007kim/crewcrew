import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FilterArrowImg from '@/assets/images/IconNavArrow_Big_Rev.png';
import ButtonIntro from '../common/ButtonIntro';

function MypageSubTop({ title = '내가 참여요청한 크루' }) {
  return (
    <Container>
      <TopCont>
        <h2>
          <Link to="/mypage">마이페이지</Link>
          {title}
        </h2>
      </TopCont>
      <ButtonIntro />
    </Container>
  );
}

export default MypageSubTop;

const Container = styled('section')`
  height: 130px;
  background-color: #fff;
  border-bottom: 1px solid #e2e2e2;
  position: relative;
  overflow: hidden;
  box-sizing: content-box;
  @media screen and (max-width: 820px) {
    height: 44px;
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
      display: flex;
      padding-right: 20px;
      text-decoration: none;
      color: #868686;
      width: fit-content;
      height: auto;
      color: #000;
      align-items: center;
      box-sizing: content-box;

      &::after {
        content: '';
        display: block;
        background: url(${FilterArrowImg}) right/9px 20px no-repeat;
        width: 9px;
        height: 20px;
        margin-left: 20px;
      }
    }
  }

  @media screen and (max-width: 820px) {
    width: calc(100vw - 40px);

    h2 {
      font-size: 15px;

      a {
        background-size: 8px;
        padding-right: 8px;
        margin: 0;

        &::after {
          margin-left: 8px;
          background-size: 8px;
        }
      }
    }
  }

  @media screen and (max-width: 300px) {
    width: calc(100vw - 20px);

    h2 {
      line-height: 30px;
      a {
        padding-right: 6px;
        &::after {
          margin-left: 6px;
        }
      }
    }
  }
`;
