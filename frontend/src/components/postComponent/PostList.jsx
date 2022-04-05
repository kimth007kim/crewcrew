import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { approachFilterState, arrayFilterState, articleFilterState } from '../../atom/post';
import Pagination from './Pagination';
import FilterBox from './FilterBox';
import PostCard from './PostCard';

function PostList() {
  const article = useRecoilValue(articleFilterState);
  const approach = useRecoilValue(approachFilterState);
  const filterData = useRecoilValue(arrayFilterState);
  const [PostListData, setPostListData] = useState([]);

  const renderTitle = useCallback(() => {
    if (article.htmlId === 'postRecent') {
      return (
        <>
          <PostTitle>최근 크루원 모집글</PostTitle>
          <PostDesc>새롭게 크루원을 모집하는 글을 소개해드려요!</PostDesc>
        </>
      );
    }
    if (article.htmlId === 'postPopular') {
      return (
        <>
          <PostTitle>많이 조회된 크루원 모집글</PostTitle>
          <PostDesc>유저들이 많이 찾은 모집글을 소개해드려요!</PostDesc>
        </>
      );
    }
    if (article.htmlId === 'postDeadline') {
      return (
        <>
          <PostTitle>마감임박! 크루원 모집글</PostTitle>
          <PostDesc>마감이 임박한 모집글을 소개해드려요!</PostDesc>
        </>
      );
    }
  }, [article]);
  // 필터 리스트 렌더
  const renderFilterList = (data) => {
    if (!data || data.length === 0) {
      return null;
    }
    const filterArray = data;

    const renderFilter = filterArray.map((item) => (
      <li key={`${item.htmlId} + ${item.name}`}>
        <FilterSpan textColor={item.color}>{item.name}</FilterSpan>
      </li>
    ));
    return renderFilter;
  };

  useEffect(() => {
    async function axiosGet() {
      try {
        const context = {
          params: {},
        };
        const { data } = await axios.get('/board/list', context);
        console.log(data.data);

        switch (data.status) {
          case 200:
            setPostListData(data.data.contents);
            break;
          case 2001:
          case 2301:
            toast.error(data.message);
            break;

          default:
            break;
        }
      } catch (error) {
        toast.error(error);
        console.dir(error);
      }
    }
    axiosGet();
  }, []);

  return (
    <Container>
      <Wrapper>
        <FilterBox />
        {renderTitle()}
        <FilterChecked>
          {article && approach && (
            <>
              <li>
                <FilterSpan textColor={article.color}>{article.name}</FilterSpan>
              </li>
              {renderFilterList(approach)}
            </>
          )}
          {renderFilterList(filterData)}
        </FilterChecked>
        <PostWrapper>
          <ul>
            {PostListData.length > 0 &&
              PostListData.map((post) => (
                <li key={post.boardId}>
                  <PostCard data={post} />
                </li>
              ))}
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
  @media screen and (max-width: 820px) {
    padding: 0 10px;
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
