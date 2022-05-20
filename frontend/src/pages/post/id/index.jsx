import Lnb from '@/components/common/Lnb/Lnb';
import DetailPostList from '@/components/post/detail/DetailPostList';
import MainDetail from '@/components/post/detail/MainDetail';
import MainTop from '@/components/post/detail/MainTop';
import ScrollButton from '@/components/post/ScrollButton';
import React from 'react';
import styled from 'styled-components';

function PostDetail() {
  return (
    <>
      <Lnb path="postDetail" />
      <MainContainer>
        <ScrollButton />
        <MainTop />
        <MainDetail />
        <DetailPostList />
      </MainContainer>
    </>
  );
}

export default PostDetail;

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
