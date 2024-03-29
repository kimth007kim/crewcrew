import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import FilterArrowImg from '@/assets/images/IconNavArrow_Big.png';
import ButtonIntro from '../common/ButtonIntro';

function MypageTop({ title = '마이페이지' }) {
  const navigate = useNavigate();

  return (
    <Container>
      <TopCont>
        <h2>
          <LinkHistory onClick={() => navigate(-1)} />
          {title}
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
  }

  @media screen and (max-width: 820px) {
    width: calc(100vw - 40px);

    h2 {
      font-size: 15px;
    }
  }

  @media screen and (max-width: 300px) {
    width: calc(100vw - 20px);

    h2 {
      line-height: 30px;
    }
  }
`;

const LinkHistory = styled('a')`
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
  cursor: pointer;

  @media screen and (max-width: 820px) {
    background-size: 8px;
    padding-right: 12px;
  }
`;
