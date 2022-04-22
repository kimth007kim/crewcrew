import React from 'react';
import styled from 'styled-components';
import MypageMainTop from '../../components/mypage/MypageMainTop';
import MypageTop from '../../components/mypage/MypageTop';

function MyPage() {
  return (
    <MainContainer>
      <MypageTop />
      <MypageMainTop />
    </MainContainer>
  );
}

export default MyPage;

const MainContainer = styled('main')`
  margin-left: 142px;
  box-sizing: border-box;
  overflow-x: hidden;
  @media screen and (max-width: 820px) {
    width: 100%;
    padding: 60px 0 70px;
    margin: 0;
  }
`;
