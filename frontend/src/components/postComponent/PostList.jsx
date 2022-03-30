import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import { approachFilterState, arrayFilterState, articleFilterState } from '../../atom/post';
import Pagination from './Pagination';
import FilterBox from './FilterBox';
import PostCard from './PostCard';

function PostList() {
  const approach = useRecoilValue(approachFilterState);
  const article = useRecoilValue(articleFilterState);
  const filterData = useRecoilValue(arrayFilterState);

  // 필터 리스트 렌더
  const renderFilterList = () => {
    if (!filterData || filterData.length === 0) {
      return null;
    }

    const renderFilter = filterData.map((item) => (
      <li key={`${item.htmlId} + ${item.name}`}>
        <FilterSpan textColor={item.color}>{item.name}</FilterSpan>
      </li>
    ));
    return renderFilter;
  };

  return (
    <Container>
      <Wrapper>
        <FilterBox />
        <PostTitle>최근 크루원 모집글</PostTitle>
        <PostDesc>새롭게 크루원을 모집하는 글을 소개해드려요.</PostDesc>
        <FilterChecked>
          {article && approach && (
            <>
              <li>
                <FilterSpan textColor={article.color}>{article.name}</FilterSpan>
              </li>
              <li>
                <FilterSpan textColor={approach.color}>{approach.name}</FilterSpan>
              </li>
            </>
          )}
          {renderFilterList()}
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

const FilterSpan = styled.span`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 24px;
  padding: 0 16px;
  color: #fff;
  font-size: 13px;
  font-weight: 300;
  border-radius: 14px;

  ${(props) =>
    props.textColor &&
    css`
      background-color: ${props.textColor};
    `}
`;

const FilterChecked = styled.ul`
  padding-top: 20px;
  padding-bottom: 42px;
  display: flex;
  flex-wrap: wrap;

  li {
    margin-right: 6px;
    margin-bottom: 6px;
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
