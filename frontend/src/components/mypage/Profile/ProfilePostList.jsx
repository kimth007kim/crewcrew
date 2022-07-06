import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import MyListButton from '../Button/MyListButton';
import PostCard from '@/components/post/PostCard';
import PagenationProfile from '@/components/mypage/Profile/PagenationProfile';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import useQuery from '@/hooks/useQuery';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';

function ProfilePostList() {
  const navigate = useNavigate();
  const query = useQuery();
  const uid = useParams().uid;
  const cookies = new Cookies();
  const dataList = ['recruit', 'participate'];
  const [userBoardAccepted, setUserBoardAccepted] = useState([]);
  const [userBoardRecruited, setUserBoardRecruited] = useState([]);
  const [active, setActive] = useState(localStorage.getItem('listCategory'));
  const [pageData, setPageData] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(query.get('page') || 1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const { data: myData } = useSWR(['/auth/token', cookies.get('X-AUTH-TOKEN')], fetcher);
  const [postLoaded, setPostLoaded] = useState(false);

  const tapBtnClick = (data) => {
    data === dataList[0]
      ? (localStorage.listCategory = 'recruit')
      : (localStorage.listCategory = 'participate');
    setActive(localStorage.getItem('listCategory'));
  };

  const getUserBoardAccepted = useCallback(
    async (page) => {
      if (!myData?.data) return false;
      try {
        const { data } = await axios.get(`/profile/board/accepted/${uid}?page=${page}`);
        if (data.status === 200) {
          setUserBoardRecruited([]);
          setUserBoardAccepted([...data.data.contents]);
          setPageData({ ...data.data });
          setTotalPage(data.data.totalPages);
        }
      } catch (error) {
        toast.error(error);
        console.dir(error);
      } finally {
        setPostLoaded(true);
      }
    },
    [myData],
  );

  const getUserBoardRecruited = useCallback(
    async (page) => {
      if (!myData?.data) return false;
      try {
        const { data } = await axios.get(`/profile/board/recruited/${uid}?page=${page}`);
        if (data.status === 200) {
          setUserBoardAccepted([]);
          setUserBoardRecruited([...data.data.contents]);
          setPageData({ ...data.data });
          setTotalPage(data.data.totalPages);
        }
      } catch (error) {
        toast.error(error);
        console.dir(error);
      } finally {
        setPostLoaded(true);
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

  const renderRecruitList = () => {
    if (userBoardRecruited.length > 0) {
      return (
        <>
          <PostWrapper>
            <ul>
              {userBoardRecruited.map((data) => (
                <li key={data.boardId}>
                  <PostCard data={data} />
                </li>
              ))}
            </ul>
          </PostWrapper>
          <PagenationProfile
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

  const renderParticipatePost = () => {
    if (userBoardAccepted.length > 0) {
      return (
        <>
          <PostWrapper>
            <ul>
              {userBoardAccepted.map((data) => (
                <li key={data.boardId}>
                  <PostCard data={data} />
                </li>
              ))}
            </ul>
          </PostWrapper>
          <PagenationProfile
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

  const NavigateVailidPartiPage = (cat = dataList[0]) => {
    const pageNum = query.get('page');
    if (pageNum && pageNum >= 2) {
      cat === dataList[0]
        ? !userBoardRecruited.length && navigate(`/profile/${uid}`)
        : !userBoardAccepted.length && navigate(`/profile/${uid}`);
    }
  };

  useEffect(() => {
    const pageNum = query.get('page');
    setCurrentPage(pageNum || 1);
    active === dataList[0] ? getUserBoardRecruited(pageNum - 1) : getUserBoardAccepted(pageNum - 1);
    NavigateVailidPartiPage(active);
  }, [query.get('page'), active]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    if (localStorage.getItem('listCategory') === null) {
      localStorage.listCategory = 'recruit';
      setActive(localStorage.getItem('listCategory'));
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    postLoaded && NavigateVailidPartiPage();
    return () => {
      setPostLoaded(false);
    };
  }, [postLoaded]);

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
        {active === dataList[0] ? renderRecruitList() : renderParticipatePost()}
      </Wrapper>
    </Container>
  );
}

export default ProfilePostList;

const Container = styled('section')`
  background-color: #f6f7fb;
  padding: 60px 0 40px;
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
