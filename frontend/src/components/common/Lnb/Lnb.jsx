import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import { Cookies } from 'react-cookie';
import NavMobile from './mobile';
import NavContainer from './container';
import LogoCircle from '@/assets/images/LogoCircle.png';
import ProfileNull from '@/assets/images/ProfileNull.png';
import IconHam from '@/assets/images/IconHam.png';
import IconClose from '@/assets/images/IconClose.png';
import IconNavArrow from '@/assets/images/IconNavArrow_Rev.png';
import IconNavArrowOn from '@/assets/images/IconNavArrow.png';
import IconNavHome from '@/assets/images/NavIcon1.png';
import IconNavHomeHover from '@/assets/images/NavIcon1_Hover.png';
import IconNavHomeActive from '@/assets/images/NavIcon1_Active.png';
import IconNavParti from '@/assets/images/NavIcon2.png';
import IconNavPartiHover from '@/assets/images/NavIcon2_Hover.png';
import IconNavPartiActive from '@/assets/images/NavIcon2_Active.png';
import IconNavRecru from '@/assets/images/NavIcon3.png';
import IconNavRecruHover from '@/assets/images/NavIcon3_Hover.png';
import IconNavRecruActive from '@/assets/images/NavIcon3_Active.png';
import IconNavChat from '@/assets/images/NavIcon4.png';
import IconNavChatHover from '@/assets/images/NavIcon4_Hover.png';
import IconNavChatActive from '@/assets/images/NavIcon4_Active.png';
import fetcher from '@/utils/fetcher';
import AuthModal from '../Auth/AuthModal';
import useModal from '@/hooks/useModal';
import PostCreateModal from '../../post/modal/PostCreate';

function Lnb({ path }) {
  const cookies = new Cookies();
  const { data: myData } = useSWR(['/auth/token', cookies.get('X-AUTH-TOKEN')], fetcher);

  const [on, changeOn] = useState(false);
  const { pathname } = useLocation();
  const [authVisible, openAuth, closeAuth] = useModal();

  const [postVisible, openPost, closePost] = useModal();
  const navigate = useNavigate();

  const handleAuthModal = useCallback(() => {
    openAuth();
  }, []);

  const handlePostModal = () => {
    if (myData && myData.data) {
      openPost();
    } else {
      const login = window.confirm('로그인 후 이용가능합니다. 로그인하시겠습니까?');
      if (login) {
        return openAuth();
      }
      return;
    }
  };

  const navigateChat = () => {
    if (myData && myData.data) {
      navigate('/mypage/chat');
    } else {
      const login = window.confirm('로그인 후 이용가능합니다. 로그인하시겠습니까?');
      if (login) {
        return openAuth();
      }
      return;
    }
  };

  return (
    <header>
      <LnbWrapper>
        <NavPC>
          <NavPCHeader>
            <NavLink to="/">
              <LogoCircleImg src={LogoCircle} alt="크루크루소개" />
            </NavLink>
          </NavPCHeader>
          <NavPCBody>
            <NavPCBodyUl>
              <li>
                <NavLink to="/">
                  <HomeIcon selected={path === 'home'}>
                    <span />
                    <p>홈</p>
                  </HomeIcon>
                </NavLink>
              </li>
              <li>
                <NavLink to="/post">
                  <PartIcon selected={pathname.startsWith('/post')}>
                    <span />
                    <p>크루참여</p>
                  </PartIcon>
                </NavLink>
              </li>
              <li>
                <RecruIcon selected={pathname.startsWith('/crew')} onClick={handlePostModal}>
                  <span />
                  <p>팀원모집</p>
                </RecruIcon>
              </li>
              <li>
                <ChatIcon selected={pathname.startsWith('/chat')} onClick={navigateChat}>
                  <span />
                  <p>채팅</p>
                </ChatIcon>
              </li>
            </NavPCBodyUl>
          </NavPCBody>
          <NavPCFooter>
            <NavProfileWrapper>
              {myData && myData.data ? (
                <>
                  <NavPCFooterA to="/mypage">
                    <ProfileNullImg src={`${myData.data.file}`} alt="myprofile" />
                  </NavPCFooterA>
                  {myData.data.flag && <Alarm />}
                </>
              ) : (
                <NavPCFooterB onClick={handleAuthModal}>
                  <ProfileNullImg src={ProfileNull} alt="blank" />
                </NavPCFooterB>
              )}
            </NavProfileWrapper>
          </NavPCFooter>
        </NavPC>
        <NavArrow active={on} onClick={() => changeOn(!on)} />
        <NavContWrapper active={on}>
          <NavContainer />
        </NavContWrapper>
      </LnbWrapper>
      <NavHam active={on} onClick={() => changeOn(!on)} />
      <NavMobile path={path} openModal={openAuth} />
      <AuthModal closeModal={closeAuth} visible={authVisible} />
      <PostCreateModal closeModal={closePost} visible={postVisible} />
    </header>
  );
}

export default Lnb;

const LnbWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: hidden;
  z-index: 99;
  box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.15);
  transition: 0.5s;
`;

const NavContWrapper = styled.section`
  position: relative;
  width: 142px;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  transition: 0.5s;
  background-color: #fff;
  box-sizing: content-box;

  ${(props) =>
    props.active &&
    css`
      width: 516px;
    `}

  @media screen and (max-width: 820px) {
    width: 0px;
    ${(props) =>
      props.active &&
      css`
        width: 266px;
      `}
  }
`;

const NavHam = styled.div`
  display: none;
  /* display: block; */
  position: fixed;
  top: 15px;
  left: 20px;
  width: 30px;
  height: 30px;
  background: url(${IconHam});
  background-size: 100% !important;
  z-index: 100;
  transition: 0.5s;
  @media screen and (max-width: 820px) {
    display: block;
    ${(props) =>
      props.active &&
      css`
        background: url(${IconClose});
      `}
  }

  @media screen and (max-width: 300px) {
    left: 10px;
  }
`;

const NavPC = styled.section`
  display: flex;
  flex-direction: column;
  width: 70px;
  height: calc(100vh - 80px);
  max-height: 730px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
  border-radius: 40px;
  z-index: 9;
  position: absolute;
  top: 40px;
  left: 35px;
  box-sizing: content-box;
  @media screen and (max-width: 820px) {
    display: none;
  }
`;
const NavPCHeader = styled.section`
  min-height: 86px;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: content-box;
`;

const NavPCBody = styled.section`
  height: 100%;
  border-bottom: 1px solid #e2e2e2;
`;

const NavPCBodyUl = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 100%;
`;

const NavPCBodyDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 46px;
  height: 64px;
  font-size: 13px;
  font-weight: 500;
  color: #707070;
  transition: 0.2s;
  cursor: pointer;
`;

const HomeIcon = styled(NavPCBodyDiv)`
  p {
    ${(props) =>
      props.selected &&
      css`
        color: #00b7ff;
      `}
  }
  span {
    display: block;
    width: 46px;
    height: 46px;
    background-size: 100% !important;
    transition: 0.2s;
    background: url(${IconNavHome});

    ${(props) =>
      props.selected &&
      css`
        background: url(${IconNavHomeActive});
      `}

    @media screen and (max-width: 820px) {
      display: block;
      width: 36px;
      height: 36px;
      background-size: 100% !important;
    }
  }

  :hover {
    span {
      background: url(${IconNavHomeHover});
      ${(props) =>
        props.selected &&
        css`
          background: url(${IconNavHomeActive});
        `}
    }
  }
`;

const PartIcon = styled(NavPCBodyDiv)`
  p {
    ${(props) =>
      props.selected &&
      css`
        color: #00b7ff;
      `}
  }
  span {
    display: block;
    width: 46px;
    height: 46px;
    background-size: 100% !important;
    transition: 0.2s;
    background: url(${IconNavParti});

    ${(props) =>
      props.selected &&
      css`
        color: #00b7ff;
        background: url(${IconNavPartiActive});
      `}

    @media screen and (max-width: 820px) {
      display: block;
      width: 36px;
      height: 36px;
      background-size: 100% !important;
    }
  }

  :hover {
    span {
      background: url(${IconNavPartiHover});
      ${(props) =>
        props.selected &&
        css`
          background: url(${IconNavPartiActive});
        `}
    }
  }
`;

const RecruIcon = styled(NavPCBodyDiv)`
  p {
    ${(props) =>
      props.selected &&
      css`
        color: #00b7ff;
      `}
  }
  span {
    display: block;
    width: 46px;
    height: 46px;
    background-size: 100% !important;
    transition: 0.2s;
    background: url(${IconNavRecru});

    ${(props) =>
      props.selected &&
      css`
        color: #00b7ff;
        background: url(${IconNavRecruActive});
      `}

    @media screen and (max-width: 820px) {
      display: block;
      width: 36px;
      height: 36px;
      background-size: 100% !important;
    }
  }

  :hover {
    span {
      background: url(${IconNavRecruHover});
      ${(props) =>
        props.selected &&
        css`
          background: url(${IconNavRecruActive});
        `}
    }
  }
`;

const ChatIcon = styled(NavPCBodyDiv)`
  p {
    ${(props) =>
      props.selected &&
      css`
        color: #00b7ff;
      `}
  }
  span {
    display: block;
    width: 46px;
    height: 46px;
    background-size: 100% !important;
    transition: 0.2s;
    background: url(${IconNavChat});

    ${(props) =>
      props.selected &&
      css`
        color: #00b7ff;
        background: url(${IconNavChatActive});
      `}

    @media screen and (max-width: 820px) {
      display: block;
      width: 36px;
      height: 36px;
      background-size: 100% !important;
    }
  }
  :hover {
    span {
      background: url(${IconNavChatHover});
      ${(props) =>
        props.selected &&
        css`
          background: url(${IconNavChatActive});
        `}
    }
  }
`;

const NavPCFooter = styled.section`
  min-height: 92px;
  display: flex;
  justify-content: center;
`;

const NavProfileWrapper = styled.div`
  position: relative;
`;

const Alarm = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ff0045;
  position: absolute;
  right: -4px;
  top: 32px;

  @media screen and (max-width: 820px) {
    width: 6px;
    height: 6px;
    top: 0;
  }
`;

const LogoCircleImg = styled.img`
  width: 49px;
`;
const NavPCFooterA = styled(NavLink)`
  display: block;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  overflow: hidden;
  margin-top: 32px;
`;

const NavPCFooterB = styled.div`
  display: block;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  overflow: hidden;
  margin-top: 32px;
  cursor: pointer;
`;

const ProfileNullImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const NavArrow = styled.div`
  width: 26px;
  height: 46px;
  position: fixed;
  top: 56px;
  left: 142px;
  box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.15);
  background: url(${IconNavArrow}) 40% 50% no-repeat;
  background-size: 7px !important;
  background-color: #fff !important;
  transition: 0.5s;
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      left: 516px;
      background: url(${IconNavArrowOn}) 40% 50% no-repeat;
    `}

  @media screen and (max-width: 820px) {
    display: none;
  }
`;
