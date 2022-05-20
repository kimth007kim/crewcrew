import React from 'react';
import styled from 'styled-components';
import Lnb from '@/components/common/Lnb/Lnb';
import PostList from '@/components/post/PostList';
import PostTop from '@/components/post/PostTop';
import ScrollButton from '@/components/post/ScrollButton';

function Post() {
  return (
    <>
      <Lnb path="post" />
      <MainContainer>
        <ScrollButton />
        <PostTop />
        <PostList />
      </MainContainer>
    </>
  );
}

export default Post;

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
