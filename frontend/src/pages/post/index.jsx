import React from 'react';
import styled from 'styled-components';
import PostList from '../../components/postComponent/PostList';
import PostTop from '../../components/postComponent/PostTop';

function Post() {
  return (
    <MainContainer>
      <PostTop />
      <PostList />
    </MainContainer>
  );
}

export default Post;

const MainContainer = styled('div')`
  margin-left: 142px;
`;
