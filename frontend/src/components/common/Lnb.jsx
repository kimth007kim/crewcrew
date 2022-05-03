/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import LogoCircle from '../../assets/images/LogoCircle.png';
import ProfileNull from '../../assets/images/ProfileNull.png';
import LogoTxt from '../../assets/images/LogoTxt.png';
import IconHam from '../../assets/images/IconHam.png';
import IconClose from '../../assets/images/IconClose.png';
import IconButtonArrow from '../../assets/images/ButtonArrow.png';
import IconButtonArrowGhost from '../../assets/images/ButtonArrowGhost.png';
import IconNavArrow from '../../assets/images/IconNavArrow_Rev.png';
import IconNavArrowOn from '../../assets/images/IconNavArrow.png';
import IconNavHome from '../../assets/images/NavIcon1.png';
import IconNavParti from '../../assets/images/NavIcon2.png';
import IconNavRecru from '../../assets/images/NavIcon3.png';
import IconNavChat from '../../assets/images/NavIcon4.png';
import IconNavHomeHover from '../../assets/images/NavIcon1_Hover.png';
import IconNavPartiHover from '../../assets/images/NavIcon2_Hover.png';
import IconNavRecruHover from '../../assets/images/NavIcon3_Hover.png';
import IconNavChatHover from '../../assets/images/NavIcon4_Hover.png';
import Profile1 from '../../assets/images/Profile1.png';
import Profile2 from '../../assets/images/Profile3.png';
import Profile3 from '../../assets/images/Profile5.png';
import Profile4 from '../../assets/images/Profile2.png';

function NavContainer() {
  return (
    <NavCont>
      <Navh1>
        <a href="홈">
          <LogoTxtImg src={LogoTxt} alt="CrewCrew" />
        </a>
      </Navh1>
      <NavContInner>
        <Navh1p>
          목표를 향해 항해하는
          <br />
          크루크루에 오신 것을 환영합니다!
        </Navh1p>
        <NavButtonList>
          <NavButtonListLi>
            <ButtonFull2 type="button">
              로그인/회원가입
              <ButtonFull2span />
            </ButtonFull2>
          </NavButtonListLi>
          <NavButtonListLi>
            <ButtonFull2Ghost type="button">
              서비스 소개
              <ButtonFull2Ghostspan />
            </ButtonFull2Ghost>
          </NavButtonListLi>
        </NavButtonList>
        <Navh2>CREW 4 U</Navh2>
        <Navh2p>나에게 딱 맞는 크루원을 찾고 있었다면, 잘 찾아오셨어요!</Navh2p>
        <NavCardList>
          <NavCardListli>
            <CardIntro1>
              <CardIntroh3>
                14가지 분야
                <Brm> </Brm>
                크루원 모집
              </CardIntroh3>
              <CardIntrop>
                스터디, 취미도
                <br />
                크루원과 함께!
              </CardIntrop>
            </CardIntro1>
          </NavCardListli>
          <NavCardListli>
            <CardIntro2>
              <CardIntroh3>
                속전속결
                <Brm> </Brm>
                간편 모집글 작성
              </CardIntroh3>
              <CardIntrop>
                크루원 모으기,
                <br />
                어렵지 않잖아?
              </CardIntrop>
            </CardIntro2>
          </NavCardListli>
          <NavCardListli>
            <CardIntro3>
              <CardIntroh3>
                안전한
                <Brm> </Brm>
                크루크루 채팅
              </CardIntroh3>
              <CardIntrop>
                따로 방파지 말고
                <br />
                여기서 떠들자~!
              </CardIntrop>
            </CardIntro3>
          </NavCardListli>
          <NavCardListli>
            <CardIntro4>
              <CardIntroh3>
                간단한
                <Brm> </Brm>
                간편 가입 신청
              </CardIntroh3>
              <CardIntrop>
                한번의 클릭으로
                <br />
                QUICK 가입신청!
              </CardIntrop>
            </CardIntro4>
          </NavCardListli>
        </NavCardList>
      </NavContInner>
    </NavCont>
  );
}

function NavMobile() {
  return (
    <>
      <MobileGnb>
        <MobileGnbul>
          <MobileGnbli />
          <MobileGnbLogoli>
            <h2>
              <MobileGnba href="홈">
                <MobileLogoimg src={LogoTxt} alt="CrewCrew" />
              </MobileGnba>
            </h2>
          </MobileGnbLogoli>
          <MobileGnbli>
            <MobileGnba href="마이페이지">
              <MobileProfileimg src={ProfileNull} alt="마이페이지" />
            </MobileGnba>
          </MobileGnbli>
        </MobileGnbul>
      </MobileGnb>
      <MobileNav>
        <MobileNavUl>
          <MobileNavLi>
            <HomeIcon />
            홈
          </MobileNavLi>
          <MobileNavLi>
            <PartIcon />
            크루참여
          </MobileNavLi>
          <MobileNavLi>
            <RecruIcon />
            팀원모집
          </MobileNavLi>
          <MobileNavLi>
            <ChatIcon />
            채팅
          </MobileNavLi>
        </MobileNavUl>
      </MobileNav>
    </>
  );
}

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

// .NavPCBody ul li.Active a {
//     color: #00b7ff;
//   }

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

  @media screen and (max-width: 820px) {
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
  @media screen and (max-width: 820px) {
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
  @media screen and (max-width: 820px) {
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
  @media screen and (max-width: 820px) {
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

const LogoTxtImg = styled.img``;

const NavCont = styled.div`
  width: 330px;
  height: 100%;
  margin-left: 160px;
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
@media screen and (max-width: 768px) {
  width: 266px;
    margin-left: 0;
}
`;

const Navh2p = styled.p`
font-size: 13px;
  color: #868686;
  font-weight: 400;
@media screen and (max-width: 768px) {
  font-size: 10px;
  }
`;

const Navh1 = styled.h1`
  width: 100%;
  text-align: center;
  padding: 50px 0 10px;
  border-bottom: 1px solid #e2e2e2;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Navh1p = styled.p`
margin: 40px 0 20px;
font-size: 18px;
font-weight: 200;
color: #000;
line-height: 32px;

@media screen and (max-width: 768px) {
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
@media screen and (max-width: 768px) {
  display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
`;

const NavButtonListLi = styled.li`
    width: 100%;
    margin-bottom: 15px;

@media screen and (max-width: 768px) {
margin-right: 5px;

  width: 100%;
    margin-bottom: 0;
}
`;

const ButtonFull2 = styled.button`
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  -webkit-transition: .3s;
  transition: .3s;
  padding-top: 17px;
  padding-bottom: 17px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 25px;
  line-height: 16px;
  background-color: #005ec5;
  height: 50px;
  color: #fff;
  padding-left: 26px;
  padding-right: 20px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
      -ms-flex-pack: justify;
          justify-content: space-between;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  :hover{
    background-color: #00b7ff;
  }

@media screen and (max-width: 768px) {
padding: 8px 0;
    height: 30px;
    font-size: 10px;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;}
`;

const ButtonFull2Ghost = styled.button`
width: 100%;
border: none;
outline: none;
cursor: pointer;
-webkit-box-sizing: border-box;
        box-sizing: border-box;
-webkit-transition: .3s;
transition: .3s;
padding-top: 17px;
padding-bottom: 17px;
font-size: 13px;
font-weight: 500;
border-radius: 25px;
line-height: 16px;
background-color: #fff;
height: 50px;
color: #707070;
;
padding-left: 26px;
padding-right: 20px;
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-pack: justify;
    -ms-flex-pack: justify;
        justify-content: space-between;
-webkit-box-align: center;
    -ms-flex-align: center;
        align-items: center;
border: 1px solid #e2e2e2;
:hover{
  border: 1px solid #a8a8a8;
}


@media screen and (max-width: 768px) {
padding: 8px 0;
    height: 30px;
    font-size: 10px;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;}
`;

const ButtonFull2span = styled.span`
background: url(${IconButtonArrow}) 50% 50% no-repeat;
background-size: 100% !important;

@media screen and (max-width: 768px) {
  display: none;
}
  width: 6px;
  height: 12px;
`;

const ButtonFull2Ghostspan = styled.span`
  background: url(${IconButtonArrowGhost}) 50% 50% no-repeat;
  color: #707070;
  background-size: 100% !important;
  width: 6px;
  height: 12px;
@media screen and (max-width: 768px) {
  display: none;
}
`;

const NavContInner = styled.div`
  width: 100%;
  padding: 0 13px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
  padding: 0 20px;}
`;

const NavCardList = styled.ul`
  margin-top: 30px;
  height: calc(100vh - 494px);
  overflow-y: auto;
  margin-right: -10px;
  ::-webkit-scrollbar {
  display: none;
  }
  @media screen and (max-width: 768px) {
    margin-top: 25px;
    height: calc(100vh - 312px);
  }
`;

const NavCardListli = styled.li`
padding-bottom: 15px;
margin-right: 10px;
  @media screen and (max-width: 768px) {
    padding-bottom: 10px;
  }
`;

const CardIntro1 = styled.li`
background-position: 20px 50%;

@media screen and (max-width: 768px) {
  height: 70px;
    padding: 0;
    background-size: 90px !important;
    border-radius: 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
background-position: 15px 50%;}
height: 120px;
padding: 35px 0 16px;
-webkit-box-sizing: border-box;
        box-sizing: border-box;
background-size: 120px !important;
background-repeat: no-repeat !important;
position: relative;
border-radius: 15px;
-webkit-box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15);
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15);
background-color: #001881;
background-image: url(${Profile1});
::before {
    display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  font-size: 10px;
  color: #fff;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 7px;
  left: 7px;
  content: "1";
}
h3 {
    margin-left: 167px;

@media screen and (max-width: 768px) {

  margin-left: 140px;
}
}
p{
  font-size: 18px;
  color: #fff;
  margin: 8px 0;
  line-height: 24px;
  margin-left: 167px;

@media screen and (max-width: 768px) {
  display:none;}

}
`;

const CardIntro2 = styled.li`

@media screen and (max-width: 768px) {
    background-position: calc(100% - 15px) 50%;
    height: 70px;
    padding: 0;
    background-size: 90px !important;
    border-radius: 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
          }
height: 120px;
padding: 35px 0 16px;
-webkit-box-sizing: border-box;
        box-sizing: border-box;
background-size: 120px !important;
background-repeat: no-repeat !important;
position: relative;
border-radius: 15px;
-webkit-box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15);
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15);
  background-color: #005ec5;
  background-image: url(${Profile2});
    background-position: calc(100% - 20px) 50%;
    ::before {
        display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  font-size: 10px;
  color: #fff;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 7px;
  left: 7px;
  content: "2";
}
h3 {
    margin-left: 20px;
    @media screen and (max-width: 768px) {
text-align: right;
margin-left: 30px;}
}
p{
  font-size: 18px;
  color: #fff;
  margin: 8px 0;
  line-height: 24px;
  margin-left: 20px;
}
`;
const CardIntro3 = styled.li`
background-position: 20px 50%;
@media screen and (max-width: 768px) {
background-position: 15px 50%;
height: 70px;
    padding: 0;
    background-size: 90px !important;
    border-radius: 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;}
height: 120px;
padding: 35px 0 16px;
-webkit-box-sizing: border-box;
        box-sizing: border-box;
background-size: 120px !important;
background-repeat: no-repeat !important;
position: relative;
border-radius: 15px;
-webkit-box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15);
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15);
  background-color: #00b7ff;
  background-image: url(${Profile3});
  ::before {
    display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  font-size: 10px;
  color: #fff;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 7px;
  left: 7px;
  content: "3";
}
h3 {
    margin-left: 167px;

@media screen and (max-width: 768px) {

margin-left: 140px;
}
}
p{
  font-size: 18px;
  color: #fff;
  margin: 8px 0;
  line-height: 24px;
  margin-left: 167px;
}
`;
const CardIntro4 = styled.li`

@media screen and (max-width: 768px) {
    background-position: calc(100% - 15px) 50%;
    height: 70px;
    padding: 0;
    background-size: 90px !important;
    border-radius: 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;}
height: 120px;
padding: 35px 0 16px;
-webkit-box-sizing: border-box;
        box-sizing: border-box;
background-size: 120px !important;
background-repeat: no-repeat !important;
position: relative;
border-radius: 15px;
-webkit-box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15);
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15);
  background-color: #1AB861;
  background-position: calc(100% - 20px) 50%;
  background-image: url(${Profile4});
  ::before {
    display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  font-size: 10px;
  color: #fff;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 7px;
  left: 7px;
  content: "4";
}
h3 {
    margin-left: 20px;
    @media screen and (max-width: 768px) {
text-align: right;
margin-left: 30px;}
}
p{
  font-size: 18px;
  color: #fff;
  margin: 8px 0;
  line-height: 24px;
  margin-left: 20px;
}
`;

const CardIntroh3 = styled.h3`
font-size: 10px;
color: #fff;
width: -webkit-fit-content;
width: -moz-fit-content;
width: fit-content;
`;

const CardIntrop = styled.p`
font-size: 18px;
color: #fff;
margin: 8px 0;
line-height: 24px;
@media screen and (max-width: 768px) {
display: none;}
`;

const Brm = styled.span`
    display: inline block;
    width: 3px;
@media screen and (max-width: 768px) {
  display: block;
}
`;

const MobileNav = styled.nav`
  display: none;
  @media screen and (max-width: 768px) {
    z-index: 90;
  background-color: #fff;
  display: block;
  position: fixed;
  width: 100%;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  padding: 0 20px;
  height: 70px;
  -webkit-box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.05);
          box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.05);
  bottom: 0;
  }
`;

const MobileGnb = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    z-index: 90;
    background-color: #fff;
    display: block;
    position: fixed;
    width: 100%;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    padding: 0 20px;
    height: 60px;
    -webkit-box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.05);
            box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.05);
    top: 0;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.05);
  }
  `;

const MobileGnbul = styled.ul`
height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
        -ms-flex-pack: justify;
            justify-content: space-between;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
`;

const MobileGnbli = styled.li`
width: 30px;
`;

const MobileGnbLogoli = styled.li`
`;

const MobileGnba = styled.a`
  display: block;
  height: 30px;
`;

const MobileLogoimg = styled.img`
  width: 100px;
`;

const MobileProfileimg = styled.img`
  width: 30px;
`;

const MobileNavUl = styled.ul`
height: 50px;
display: -webkit-box;
display: -ms-flexbox;
display: flex;
-webkit-box-pack: justify;
    -ms-flex-pack: justify;
        justify-content: space-between;
-webkit-box-align: center;
    -ms-flex-align: center;
        align-items: center;
margin-top: 7px;

`;

const MobileNavLi = styled.li`
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
width: 36px;
height: 50px;
font-size: 10px;
font-weight: 400;
color: #000;
  
`;
