import React from 'react';
import styled from 'styled-components';
import FilterBox from './FilterBox';
import Pagination from './Pagination';
import PostCard from './PostCard';

function PostList() {
  return (
    <Container>
      <Wrapper>
        <FilterBox />
        <PostTitle>최근 크루원 모집글</PostTitle>
        <PostDesc>이번주 새롭게 크루원을 모집하는 모집글을 소개해드려요.</PostDesc>
        <FilterChecked>
          <li>
            <span>최신 글</span>
          </li>
          <li>
            <span>온라인</span>
          </li>
        </FilterChecked>
        <PostWrapper>
          <ul>
            <li>
              <PostCard />
            </li>
            <li>
              <PostCard isDeadline />
            </li>
            <li>
              <PostCard />
            </li>
            <li>
              <PostCard />
            </li>
            <li>
              <PostCard />
            </li>
            <li>
              <PostCard />
            </li>
            <li>
              <PostCard />
            </li>
          </ul>
          <Pagination />
        </PostWrapper>
      </Wrapper>
    </Container>
  );
}

export default PostList;

const Container = styled.section`
  background-color: #f6f7fb;
  padding-bottom: 8px;
`;

const Wrapper = styled.div`
  max-width: 850px;
  margin: auto;
  position: relative;
  @media screen and (max-width: 820px) {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
`;

const PostTitle = styled.h4`
  padding-top: 174px;
  padding-bottom: 10px;
  font-size: 20px;
  font-weight: 700;
  color: #000;
  @media screen and (max-width: 820px) {
    padding-top: 136px;
    font-size: 18px;
  }
`;

const PostDesc = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: #868686;
  @media screen and (max-width: 820px) {
    margin-bottom: 24px;
    font-size: 12px;
  }
`;

const FilterChecked = styled.ul`
  padding-top: 20px;
  padding-bottom: 42px;
  display: flex;
  flex-wrap: wrap;

  li {
    margin-right: 6px;
    margin-bottom: 6px;
    span {
      display: flex;
      align-items: center;
      width: fit-content;
      height: 24px;
      padding: 0 16px;
      color: #fff;
      font-size: 13px;
      font-weight: 300;
      border-radius: 14px;
      background-color: #00b7ff;
    }
  }
  @media screen and (max-width: 820px) {
    display: none;
  }
`;

const PostWrapper = styled.div`
  li {
    padding-bottom: 14px;
  }
`;
