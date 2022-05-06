/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import NavMobile from './mobile';
import NavContainer from './container';
import LogoCircle from '../../../assets/images/LogoCircle.png';
import ProfileNull from '../../../assets/images/ProfileNull.png';
import IconHam from '../../../assets/images/IconHam.png';
import IconClose from '../../../assets/images/IconClose.png';
import IconNavArrow from '../../../assets/images/IconNavArrow_Rev.png';
import IconNavArrowOn from '../../../assets/images/IconNavArrow.png';
import IconNavHome from '../../../assets/images/NavIcon1.png';
import IconNavParti from '../../../assets/images/NavIcon2.png';
import IconNavRecru from '../../../assets/images/NavIcon3.png';
import IconNavChat from '../../../assets/images/NavIcon4.png';
import IconNavHomeHover from '../../../assets/images/NavIcon1_Hover.png';
import IconNavPartiHover from '../../../assets/images/NavIcon2_Hover.png';
import IconNavRecruHover from '../../../assets/images/NavIcon3_Hover.png';
import IconNavChatHover from '../../../assets/images/NavIcon4_Hover.png';

function Lnb({ path }) {
    const [on, changeOn] = useState(false);
    console.log(path);
    return (
      <header>
        <LnbWrapper>
          <NavPC>
            <NavPCHeader>
              <a href="소개페이지">
                <LogoCircleImg src={LogoCircle} alt="크루크루소개" />
              </a>
            </NavPCHeader>
            <NavPCBody>
              <NavPCBodyUl>
                <NavPCBodyLi>
                  <HomeIcon />
                  홈
                </NavPCBodyLi>
                <NavPCBodyLi>
                  <PartIcon />
                  크루참여
                </NavPCBodyLi>
                <NavPCBodyLi>
                  <RecruIcon />
                  팀원모집
                </NavPCBodyLi>
                <NavPCBodyLi>
                  <ChatIcon />
                  채팅
                </NavPCBodyLi>
              </NavPCBodyUl>
            </NavPCBody>
            <NavPCFooter>
              <NavPCFooterA href="마이페이지">
                <ProfileNullImg src={ProfileNull} alt="마이페이지" />
              </NavPCFooterA>
            </NavPCFooter>
          </NavPC>
          <NavArrow
            active={on}
            onClick={() => changeOn(!on)}
          />
          <NavContWrapper active={on}>
            <NavContainer />
          </NavContWrapper>
        </LnbWrapper>
        <NavHam
          active={on}
          onClick={() => changeOn(!on)}
        />
        <NavMobile />
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
  -webkit-box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.15);
  box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.15);
  -webkit-transition: 0.5s;
  transition: 0.5s;
`;

const NavContWrapper = styled.section`
  position: relative;
  width: 142px;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  background-color: #fff;
  ${(props) =>
    props.active &&
    css`
      width: 516px;
    `}
  
    @media screen and (max-width: 768px) {
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
  -webkit-transition: 0.5s;
  transition: 0.5s;
    @media screen and (max-width: 768px) {
      display: block;
      ${(props) =>
    props.active &&
    css`
  background: url(${IconClose});
    `}
      
    }
`;

const NavPC = styled.section`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  width: 70px;
  height: calc(100vh - 80px);
  max-height: 730px;
  -webkit-box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.15);
  border-radius: 40px;
  z-index: 9;
  position: absolute;
  top: 40px;
  left: 35px;
    @media screen and (max-width: 768px) {
      display: none;
    }
`;
const NavPCHeader = styled.section`
  min-height: 86px;
  border-bottom: 1px solid #e2e2e2;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
`;

const NavPCBody = styled.section`
  height: 100%;
  border-bottom: 1px solid #e2e2e2;
`;

const NavPCBodyUl = styled.ul`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  height: 100%;
`;
const NavPCBodyLi = styled.li`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  width: 46px;
  height: 64px;
  font-size: 13px;
  font-weight: 500;
  color: #707070;
  -webkit-transition: 0.2s;
  transition: 0.2s;
`;

const HomeIcon = styled.span`
  display: block;
  width: 46px;
  height: 46px;
  background-size: 100% !important;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  background: url(${IconNavHome});
  :hover {
    background: url(${IconNavHomeHover});
  }
  @media screen and (max-width: 820px){
    display: block;
    width: 36px;
    height: 36px;
    background-size: 100% !important;
  }
`;

const PartIcon = styled.span`
  display: block;
  width: 46px;
  height: 46px;
  background-size: 100% !important;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  background: url(${IconNavParti});
  :hover {
    background: url(${IconNavPartiHover});
  }
  @media screen and (max-width: 820px){
    display: block;
    width: 36px;
    height: 36px;
    background-size: 100% !important;
  }
`;

const RecruIcon = styled.span`
  display: block;
  width: 46px;
  height: 46px;
  background-size: 100% !important;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  background: url(${IconNavRecru});
  :hover {
    background: url(${IconNavRecruHover});
  }
  @media screen and (max-width: 820px){
    display: block;
    width: 36px;
    height: 36px;
    background-size: 100% !important;
  }
`;

const ChatIcon = styled.span`
  display: block;
  width: 46px;
  height: 46px;
  background-size: 100% !important;
  -webkit-transition: 0.2s;
  transition: 0.2s;
  background: url(${IconNavChat});
  :hover {
    background: url(${IconNavChatHover});
  }
  @media screen and (max-width: 820px){
    display: block;
    width: 36px;
    height: 36px;
    background-size: 100% !important;
  }
`;

const NavPCFooter = styled.section`
  min-height: 92px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
`;
const LogoCircleImg = styled.img`
  width: 49px;
`;
const NavPCFooterA = styled.a`
  display: block;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  overflow: hidden;
  margin-top: 32px;
`;

const ProfileNullImg = styled.img`
  width: 100%;
`;

const NavArrow = styled.div`
  width: 26px;
  height: 46px;
  position: fixed;
  top: 56px;
  left: 142px;
  -webkit-box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.15);
  box-shadow: 5px 0px 10px rgba(0, 0, 0, 0.15);
  background: url(${IconNavArrow}) 40% 50% no-repeat;
  background-size: 7px !important;
  background-color: #fff !important;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      left: 516px;
      background: url(${IconNavArrowOn}) 40% 50% no-repeat;
    `}
    
    @media screen and (max-width: 768px) {
  display: none;

    }
`;
