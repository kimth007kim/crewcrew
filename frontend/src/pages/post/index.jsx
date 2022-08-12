import React from 'react';
import styled from 'styled-components';
import Lnb from '@/components/common/Lnb/Lnb';
import PostList from '@/components/post/PostList';
import PostTop from '@/components/post/PostTop';
import ScrollButton from '@/components/common/ScrollButton';
import { Helmet } from 'react-helmet-async';

function Post() {
  return (
    <>
      <Helmet>
        <title>게시글 - 크루크루</title>
      </Helmet>
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
