/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled, { css } from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { approachFilterState, arrayFilterState, articleFilterState } from '../../atom/post';
import Pagination from './Pagination';
import FilterBox from './FilterBox';
import PostCard from './PostCard';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function PostList() {
  const article = useRecoilValue(articleFilterState);
  const approach = useRecoilValue(approachFilterState);
  const filterData = useRecoilValue(arrayFilterState);
  const [pageData, setPageData] = useState(null);

  const [PostListData, setPostListData] = useState([]);

  const query = useQuery();
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(query.get('page'));
  const [postsPerPage, setPostsPerPage] = useState(10);

  const renderTitle = useCallback(() => {
    if (query.get('search')) {
      return (
        <>
          <PostTitle>
            '{query.get('search')}
            '에 대한 모집글
          </PostTitle>
          <PostDesc>
            검색하신 '{query.get('search')}
            '을 포함하는 제목과 내용을 검색했어요!
          </PostDesc>
        </>
      );
    }
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
  }, [article, query.get('search')]);
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

  const axiosGetFilter = useCallback(async (page, search) => {
    try {
      const postFilter = JSON.parse(localStorage.getItem('postFilter'));

      const order = postFilter.article.value;
      const access = postFilter.approach.map((data) => data.value);
      const categoryIds = postFilter.categorylist.map((data) => data.value);

      const params = new URLSearchParams();
      if (search) {
        params.append('keyword', search);
      } else {
        params.append('order', order);
        params.append('approach', access);
        if (categoryIds[0] !== '0') {
          params.append('categoryIds', categoryIds);
        }
      }
      if (page) {
        params.append('page', page - 1);
      }
      const context = {
        params,
      };
      const { data } = await axios.get('/board/list', context);

      switch (data.status) {
        case 200:
          setPageData({
            ...data.data,
          });
          setPostListData([...data.data.contents]);
          setTotalPage(data.data.totalPages);
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
  }, []);

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setPostsPerPage(10);
    } else if (window.innerWidth > 320) {
      setPostsPerPage(5);
    } else {
      setPostsPerPage(3);
    }
  };

  useEffect(() => {
    const pageNum = query.get('page');
    const pageSearch = query.get('search');
    setCurrentPage(pageNum || 1);
    if (pageSearch && pageNum) {
      return axiosGetFilter(pageNum, pageSearch);
    }
    if (pageSearch) {
      return axiosGetFilter(1, pageSearch);
    }
    if (pageNum) {
      return axiosGetFilter(pageNum);
    }
    axiosGetFilter();
  }, [query.get('page'), query.get('search')]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container>
      <Wrapper>
        <FilterBox handleGetAxios={axiosGetFilter} />
        {renderTitle()}
        <FilterChecked>
          {!query.get('search') && article && approach && (
            <>
              <li>
                <FilterSpan textColor={article.color}>{article.name}</FilterSpan>
              </li>
              {renderFilterList(approach)}
            </>
          )}
          {!query.get('search') && renderFilterList(filterData)}
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
        </PostWrapper>
        <Pagination
          data={pageData}
          currentPage={currentPage}
          postsPerPage={postsPerPage}
          totalPage={totalPage}
        />
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
