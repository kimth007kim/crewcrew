import React from 'react';
import styled from 'styled-components';
import PostList from '../../components/postComponent/PostList';
import PostTop from '../../components/postComponent/PostTop';
import ScrollButton from '../../components/postComponent/ScrollButton';

function Post() {
  return (
    <MainContainer>
      <ScrollButton />
      <PostTop />
      <PostList />
    </MainContainer>
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
