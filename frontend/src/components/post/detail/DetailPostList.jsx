import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import NavArrow from '@/assets/images/IconNavArrow.png';
import { useRecoilState } from 'recoil';
import { approachFilterState, arrayFilterState, articleFilterState } from '@/atoms/post';
import Pagination from '../Pagination';
import PostCard from '../PostCard';
import Loader from '@/components/common/Loader';
import useQuery from '@/hooks/useQuery';
import { allFilter } from '@/frontDB/filterDB';
import { Link } from 'react-router-dom';

function DetailPostList({ data }) {
  const [approach, setApproach] = useRecoilState(approachFilterState);
  const [article, setArticle] = useRecoilState(articleFilterState);
  const [filterData, setFilterData] = useRecoilState(arrayFilterState);

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
          <Link to="/post" />
          <span>최근 크루원 모집글</span>
        </h4>
      );
    }
    if (article.htmlId === 'postPopular') {
      return (
        <h4>
          <Link to="/post" />
          <span>많이 조회된 크루원 모집글</span>
        </h4>
      );
    }
    if (article.htmlId === 'postDeadline') {
      return (
        <h4>
          <Link to="/post" />
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
              {PostListData.map((post, i) => (
                <li key={post.boardId + post.uid + i * 10}>
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

  useEffect(() => {
    const postFilter = JSON.parse(localStorage.getItem('postFilter'));

    const filterContext = {
      article,
      approach,
      categorylist: [...allFilter],
    };

    if (postFilter) {
      const approaches = postFilter.approach.sort((a, b) => a.index - b.index);
      const categories = postFilter.categorylist.sort((a, b) => a.index - b.index);
      filterContext.article = postFilter.article;
      filterContext.approach = [...approaches];
      filterContext.categorylist = [...categories];
    }

    localStorage.postFilter = JSON.stringify(filterContext);
    setArticle({
      ...filterContext.article,
    });
    setApproach([...filterContext.approach]);
    setFilterData([...filterContext.categorylist]);
  }, []);

  return (
    <Container>
      <FilterWrapper>
        {renderTitle()}
        <FilterCheckedWrapper>
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
        </FilterCheckedWrapper>
      </FilterWrapper>
      <SectionWrapper>
        {postLoading ? (
          <LoadingList>
            <Loader height={80} width={80} />
          </LoadingList>
        ) : (
          renderPostList()
        )}
      </SectionWrapper>
    </Container>
  );
}

export default DetailPostList;

const Container = styled('section')`
  background-color: #f6f7fb;
  padding-bottom: 90px;
`;

const FilterWrapper = styled.div`
  max-width: 850px;
  margin: 0 auto;

  h4 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 10px;
    position: relative;
    color: #000;
    display: flex;
    align-items: center;

    a {
      content: '';
      display: inline-block;
      width: 12px;
      height: 18px;
      margin-left: 8px;
      background-image: url(${NavArrow});
      background-size: 7px 14px;
      background-repeat: no-repeat;
      background-position: center;
      margin-right: 10px;
    }
  }
  @media screen and (max-width: 820px) {
    padding: 0;
    background-color: #fff;
    margin-bottom: 30px;
    display: flex;
    border-top: 1px solid #e2e2e2;
    border-bottom: 1px solid #e2e2e2;
    height: 66px;

    h4 {
      text-indent: -9999em;
      min-width: 64px;
      height: 64px;
      border-right: 1px solid #e2e2e2;

      a {
        position: absolute;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        margin: 0;
      }
    }
  }
`;

const SectionWrapper = styled.div`
  max-width: 850px;
  margin: auto;
  position: relative;

  @media screen and (max-width: 820px) {
    padding: 0 20px;
  }

  @media screen and (max-width: 820px) {
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

  @media screen and (max-width: 820px) {
    white-space: nowrap;
  }
`;

const FilterCheckedWrapper = styled.div`
  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 820px) {
    width: 100%;
    overflow-x: auto;
  }
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
    align-items: center;
    padding: 0 8px;
    width: auto;
    height: 100%;
    flex-wrap: nowrap;
    gap: 10px;

    li {
      margin: 0;
    }
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
