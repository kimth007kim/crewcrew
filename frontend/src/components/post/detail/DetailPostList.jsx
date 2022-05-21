import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import NavArrow from '@/assets/images/IconNavArrow.png';
import { useRecoilValue } from 'recoil';
import { approachFilterState, arrayFilterState, articleFilterState } from '@/atoms/post';
import Pagination from '../Pagination';
import PostCard from '../PostCard';
import Loader from '@/components/common/Loader';
import useQuery from '@/hooks/useQuery';

function DetailPostList({ data }) {
  const article = useRecoilValue(articleFilterState);
  const approach = useRecoilValue(approachFilterState);
  const filterData = useRecoilValue(arrayFilterState);

  const [pageData, setPageData] = useState(null);

  const [PostListData, setPostListData] = useState([]);
  const [postLoading, setPostLoading] = useState(false);

  const query = useQuery();

  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(query.get('page') || 1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const renderTitle = useCallback(() => {
    if (article.htmlId === 'postRecent') {
      return (
        <h4>
          <span>최근 크루원 모집글</span>
        </h4>
      );
    }
    if (article.htmlId === 'postPopular') {
      return (
        <h4>
          <span>많이 조회된 크루원 모집글</span>
        </h4>
      );
    }
    if (article.htmlId === 'postDeadline') {
      return (
        <h4>
          <span>마감임박! 크루원 모집글</span>
        </h4>
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

  const renderPostList = () => {
    if (PostListData.length > 0) {
      return (
        <>
          <PostWrapper>
            <ul>
              {PostListData.map((post) => (
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
            detail={true}
          />
        </>
      );
    }
    return null;
  };

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
    setCurrentPage(pageNum || 1);

    setPageData({
      data,
    });
    setPostListData([...data.contents]);
    setTotalPage(data.totalPages);
  }, [query.get('page')]);

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
        {postLoading ? (
          <LoadingList>
            <Loader height={80} width={80} />
          </LoadingList>
        ) : (
          renderPostList()
        )}
      </Wrapper>
    </Container>
  );
}

export default DetailPostList;

const Container = styled('section')`
  background-color: #f6f7fb;
  padding-bottom: 90px;
`;

const Wrapper = styled.div`
  max-width: 850px;
  margin: 0 auto;

  h4 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
    position: relative;
    color: #000;

    &::before {
      content: '';
      display: inline-block;
      width: 7px;
      height: 14px;
      margin-left: 8px;
      background-image: url(${NavArrow});
      background-size: 100%;
      background-repeat: no-repeat;
      margin-right: 15px;
    }
  }
  @media screen and (max-width: 820px) {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 300px) {
    padding: 0 10px;
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
  padding-top: 10px;
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

const LoadingList = styled.div`
  height: 400px;
  display: flex;
  justify-content: center;
  padding-top: 20px;
`;

const EmptyList = styled.div`
  height: 400px;
  display: flex;
  align-items: center;
  padding-top: 38px;
  flex-direction: column;

  h2 {
    font-weight: 700;
    font-size: 13px;
    line-height: 19px;
    text-align: center;

    color: #000000;
  }

  span {
    font-weight: 400;
    font-size: 13px;
    line-height: 19px;
    text-align: center;

    color: #000000;
  }

  button {
    margin-top: 20px;
    width: 74px;
    height: 30px;
    border: none;
    background: #00b7ff;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
`;
