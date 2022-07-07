import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Cookies } from 'react-cookie';
import useSWR from 'swr';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import LogoTxt from '@/assets/images/LogoTxt.png';

import NavIconPlus from '@/assets/images/NavIconPlus.png';
import PostCardSlide from '@/components/home/PostCardSlide';
import AuthModal from '../Auth/AuthModal';
import fetcher from '@/utils/fetcher';
import useModal from '@/hooks/useModal';
import NavCard from './NavCard';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { changedBookmark } from '@/atoms/post';
import { contiCards } from '@/frontDB/filterDB';
import NavButton from './NavButton';

function NavContainer() {
  const [bookmarkArr, setBookmarkArr] = useState([]);
  const [changeBookmarked, setchangeBookmarked] = useRecoilState(changedBookmark);
  const cookies = new Cookies();
  const { data: myData, mutate } = useSWR(['/auth/token', cookies.get('X-AUTH-TOKEN')], fetcher);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [Dialog, openModal, closeModal] = useModal();
  const handleClick = useCallback(() => {
    openModal();
  }, []);

  const locateMypage = useCallback(() => {
    navigate('/mypage');
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      const { data } = await axios.delete('/auth/logout', {
        withCredentials: true,
      });
      switch (data.status) {
        case 200:
          cookies.remove('X-AUTH-TOKEN');

          mutate('/auth/token');
          if (pathname.startsWith('/mypage')) {
            navigate('/', { replace: true });
          }
          if (window && window.location) {
            window.location.reload();
          }
          break;
        case 1900:
          toast.error(data.message);
          break;

        default:
          toast.error(data.message);
          break;
      }
    } catch (error) {
      console.dir(error);
    }
  }, []);

  const axiosGetBookmark = useCallback(async () => {
    if (!myData?.data) {
      return;
    }
    try {
      const { data } = await axios.get('/bookmark/list?order=bookmarked', {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      data.status === 200 && setBookmarkArr([...data.data.contents]);
    } catch (error) {
      toast.error(error);
      console.dir(error);
    }
  }, [myData]);

  useEffect(() => {
    axiosGetBookmark();
    return () => {
      setBookmarkArr([]);
    };
  }, [myData, changeBookmarked]);

  const renderBookmarked = () => {
    return (
      <>
        {bookmarkArr.length > 0 &&
          bookmarkArr.map((data) => (
            <BookmarkLi key={`${data.boardId}bookmarked`}>
              <PostCardSlide data={data} cookies={cookies.get('X-AUTH-TOKEN')} isLnb={true} />
            </BookmarkLi>
          ))}
      </>
    );
  };

  return (
    <>
      <NavCont>
        <Navh1>
          <NavLink to="/">
            <LogoTxtImg src={LogoTxt} alt="CrewCrew" />
          </NavLink>
        </Navh1>
        <NavContInner>
          {myData?.data ? (
            <Navh1p>
              {`${myData.data.nickName}님,`}
              <br />
              크루크루에 오신 것을 환영합니다!
            </Navh1p>
          ) : (
            <Navh1p>
              목표를 향해 항해하는
              <br />
              크루크루에 오신 것을 환영합니다!
            </Navh1p>
          )}
          <NavButtonList>
            {myData?.data ? (
              <>
                <NavButton title="마이 페이지" clickFunc={locateMypage} />
                <NavButton ghost title="로그아웃" clickFunc={handleLogout} />
              </>
            ) : (
              <>
                <NavButton title="로그인/회원가입" clickFunc={handleClick} />
                <NavButton ghost title="서비스 소개" />
              </>
            )}
          </NavButtonList>
          {myData?.data ? (
            <>
              <Navh2>내가 스크랩한 모집글</Navh2>
              <Navh2p>내가 스크랩한 글의 현황을 확인하세요!</Navh2p>
            </>
          ) : (
            <>
              <Navh2>CREW 4 U</Navh2>
              <Navh2p>나에게 딱 맞는 크루원을 찾고 있었다면, 잘 찾아오셨어요!</Navh2p>
            </>
          )}

          {myData?.data ? (
            <NavPostCardWrapper>
              <ul>
                {renderBookmarked()}
                <BookmarkLi>
                  <NavCardPlusPost to="/post">
                    <PlusIcon />
                    <span>모집글 둘러보러 가기</span>
                  </NavCardPlusPost>
                </BookmarkLi>
              </ul>
            </NavPostCardWrapper>
          ) : (
            <NavCardList>
              {contiCards.length > 0 &&
                contiCards.map((ele, i) => (
                  <NavCard
                    title={ele.title}
                    p={ele.desc}
                    reverse={ele.reverse}
                    number={i + 1}
                    img={ele.img}
                    color={ele.color}
                    key={ele.title + ele.number}
                  />
                ))}
            </NavCardList>
          )}
        </NavContInner>
      </NavCont>

      {/* 모달 영역 */}
      <AuthModal closeModal={closeModal} visible={Dialog} size="large" />
    </>
  );
}

export default NavContainer;

const LogoTxtImg = styled.img``;

const NavCont = styled.div`
  width: 330px;
  height: 100%;
  margin-left: 160px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: content-box;

  @media screen and (max-width: 820px) {
    width: 266px;
    margin-left: 0;
  }
`;

const Navh2p = styled.p`
  font-size: 13px;
  color: #868686;
  font-weight: 400;
  box-sizing: content-box;

  @media screen and (max-width: 820px) {
    font-size: 10px;
  }
`;

const Navh1 = styled.h1`
  width: 100%;
  text-align: center;
  box-sizing: content-box;
  padding: 50px 0 12px;
  border-bottom: 1px solid #e2e2e2;
  a {
    box-sizing: content-box;
  }

  @media screen and (max-width: 820px) {
    display: none;
  }
`;

const Navh1p = styled.p`
  margin: 40px 0 20px;
  font-size: 18px;
  font-weight: 200;
  color: #000;
  line-height: 32px;

  @media screen and (max-width: 820px) {
    margin-top: 100px;
    font-size: 13px;
    line-height: 22px;
  }
`;

const Navh2 = styled.h2`
  margin: 45px 0 10px;
  font-size: 20px;
`;

const NavButtonList = styled.ul`
  display: block;
  @media screen and (max-width: 820px) {
    display: flex;
  }
`;

const NavContInner = styled.div`
  width: 100%;
  padding: 0 13px;
  box-sizing: border-box;

  @media screen and (max-width: 820px) {
    padding: 0 20px;
  }
`;

const NavCardList = styled.ul`
  margin-top: 30px;
  height: calc(100vh - 494px);
  overflow-y: auto;
  margin-right: -10px;
  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 820px) {
    margin-top: 25px;
    height: calc(100vh - 312px);
  }
`;

const NavPostCardWrapper = styled.div`
  margin-top: 30px;
  max-height: calc(100vh - 494px);
  overflow-y: auto;
  margin-right: -10px;

  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 820px) {
    margin-top: 25px;
    max-height: calc(100vh - 312px);
  }
`;

const BookmarkLi = styled.li`
  padding-bottom: 15px;
  margin-right: 10px;
`;

const NavCardPlusPost = styled(NavLink)`
  width: 100%;
  height: 120px;
  background-color: #fff;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  span {
    font-weight: 700;
    font-size: 20px;
    line-height: 25px;
    display: flex;
    align-items: center;
    color: #a8a8a8;
  }

  @media screen and (max-width: 820px) {
    span {
      font-size: 15px;
      line-height: 18px;
    }
  }
`;

const PlusIcon = styled.div`
  width: 52px;
  height: 52px;
  background: url(${NavIconPlus});
  background-repeat: no-repeat !important;
  background-size: 52px;
  margin-right: 20px;
  @media screen and (max-width: 820px) {
    width: 35px;
    height: 35px;
    background-size: 35px;
  }
`;
