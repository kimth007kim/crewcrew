import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import MyListButton from '../Button/MyListButton';
import PostCard from '@/components/post/PostCard';
import MyPaginationMain from '../MyPaginationMain';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import useQuery from '@/hooks/useQuery';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';

function MypagePostList() {
  const navigate = useNavigate();
  const query = useQuery();
  const cookies = new Cookies();
  const dataList = ['bookmark', 'recent'];
  const [bookmarkArr, setBookmarkArr] = useState([]);
  const [recentPostList, setRecentPostList] = useState([]);
  const [active, setActive] = useState(dataList[0]);
  const [pageData, setPageData] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(query.get('page') || 1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const { data: myData } = useSWR(['/auth/token', cookies.get('X-AUTH-TOKEN')], fetcher);
  const [bookmarkLoaded, setBookmarkLoaded] = useState(false);

  const tapBtnClick = (data) => {
    setActive(data);
  };

  const axiosGetBookmark = useCallback(
    async (page) => {
      if (!(myData && myData.data)) return false;
      try {
        const { data } = await axios.get(`/bookmark/list?page=${page}&order=recent`, {
          withCredentials: true,
          headers: {
            'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
          },
        });
        if (data.status === 200) {
          setPageData({ ...data.data });
          setBookmarkArr([...data.data.contents]);
          setTotalPage(data.data.totalPages);
        }
      } catch (error) {
        toast.error(error);
        console.dir(error);
      } finally {
        setBookmarkLoaded(true);
      }
    },
    [myData],
  );

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setPostsPerPage(10);
    } else if (window.innerWidth > 320) {
      setPostsPerPage(5);
    } else {
      setPostsPerPage(3);
    }
  };

  const LandingPost = useCallback(() => {
    navigate('/post');
  }, []);

  const renderBookmarkList = () => {
    if (bookmarkArr.length > 0) {
      return (
        <>
          <PostWrapper>
            <ul>
              {bookmarkArr.map((data) => {
                if (!data) {
                  return;
                }
                return (
                  <li key={data.boardId}>
                    <PostCard data={data} />
                  </li>
                );
              })}
            </ul>
          </PostWrapper>
          <MyPaginationMain
            data={pageData}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            totalPage={totalPage}
          />
        </>
      );
    } else {
      return (
        <EmptyList>
          <p>
            <em>스크랩한 모집글이 없습니다.</em>
            <br />
            모집글을 둘러보고 <span>관심가는 크루에 참여해보세요!</span>
          </p>
          <button type="button" onClick={LandingPost}>
            크루참여
          </button>
        </EmptyList>
      );
    }
  };

  const renderRecentPost = () => {
    if (recentPostList.length > 0) {
      return (
        <PostWrapper>
          <ul>
            {recentPostList.map((data) => {
              if (!data) {
                return;
              }
              return (
                <li key={data.boardId}>
                  <PostCard data={data} />
                </li>
              );
            })}
          </ul>
        </PostWrapper>
      );
    }
    return (
      <EmptyList>
        <p>
          <em>최근 본 모집글이 없습니다.</em>
          <br />
          모집글을 둘러보고 <span>관심가는 크루에 참여해보세요!</span>
        </p>
        <button type="button" onClick={LandingPost}>
          크루참여
        </button>
      </EmptyList>
    );
  };

  const NavigateVailidBookmarkedPage = () => {
    const pageNum = query.get('page');
    if (pageNum && pageNum >= 2 && !bookmarkArr.length) {
      navigate('/mypage');
    }
  };

  const getRecent = useCallback(
    async (postId) => {
      if (!(myData && myData.data)) return;
      try {
        const { data } = await axios.get(`/board/details/${postId}`, {
          withCredentials: true,
          headers: {
            'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
          },
        });

        if (data.status === 200) {
          return data.data;
        } else {
          return;
        }
      } catch (error) {
        toast.error(error);
        console.dir(error);
      }
    },
    [recentPostList],
  );

  const getRecentList = useCallback(async () => {
    const recentPost = JSON.parse(localStorage.getItem('recentPost'));
    if (recentPost && myData?.data) {
      let tempArr = recentPost[myData.data.uid].reverse();
      tempArr = await Promise.all(tempArr.map((postId) => getRecent(postId)));
      setRecentPostList(tempArr);
    }
  }, []);

  useEffect(() => {
    getRecentList();
  }, []);

  useEffect(() => {
    const pageNum = query.get('page');
    setCurrentPage(pageNum || 1);
    axiosGetBookmark(pageNum - 1);
  }, [query.get('page')]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    bookmarkLoaded && NavigateVailidBookmarkedPage();
  }, [bookmarkLoaded]);

  return (
    <Container>
      <Wrapper>
        <ListTap>
          {dataList.map((e) => (
            <li key={e}>
              <MyListButton data={e} active={active} onClick={() => tapBtnClick(e)} />
            </li>
          ))}
        </ListTap>
        {active === dataList[0] ? renderBookmarkList() : renderRecentPost()}
      </Wrapper>
    </Container>
  );
}

export default MypagePostList;

const Container = styled('section')`
  background-color: #f6f7fb;
  padding: 0px 0 40px;
  position: relative;
`;

const Wrapper = styled('div')`
  max-width: 850px;
  margin: auto;

  @media screen and (max-width: 820px) {
    padding: 0 20px;
  }

  @media screen and (max-width: 820px) {
    padding: 0 10px;
  }
`;

const ListTap = styled('ul')`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;

  @media screen and (max-width: 820px) {
    width: 100%;
    gap: 16px;

    li {
      width: 100%;
    }
  }
`;

const PostWrapper = styled.div`
  li {
    padding-bottom: 14px;
  }
`;

const EmptyList = styled.div`
  border-top: 1px solid #868686;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 15px;
    line-height: 22px;
    text-align: center;
    font-weight: 400;
    margin-bottom: 20px;

    em {
      font-weight: 700;
    }
  }

  button {
    width: 100px;
    height: 50px;
    padding: 0;
    border: none;
    outline: none;
    cursor: pointer;
    transition: 0.3s;
    font-size: 15px;
    font-weight: 500;
    border-radius: 10px;
    line-height: 26px;
    background-color: #00b7ff;
    color: #fff;

    :hover {
      background-color: #005ec5;
    }
  }

  @media screen and (max-width: 820px) {
    padding: 48px 0;
  }

  @media screen and (max-width: 300px) {
    span {
      display: block;
    }
  }
`;
