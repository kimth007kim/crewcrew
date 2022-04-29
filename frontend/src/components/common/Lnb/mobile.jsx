/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import React from 'react';
import styled, { css } from 'styled-components';
import ProfileNull from '../../../assets/images/ProfileNull.png';
import LogoTxt from '../../../assets/images/LogoTxt.png';
import IconNavHome from '../../../assets/images/NavIcon1.png';
import IconNavParti from '../../../assets/images/NavIcon2.png';
import IconNavRecru from '../../../assets/images/NavIcon3.png';
import IconNavHomeHover from '../../../assets/images/NavIcon1_Hover.png';
import IconNavPartiHover from '../../../assets/images/NavIcon2_Hover.png';
import IconNavRecruHover from '../../../assets/images/NavIcon3_Hover.png';

function MobileNavButton({ icon, title }) {
    return (
      <MobileNavLi>
        {icon}
        {title}
      </MobileNavLi>
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
            <MobileNavButton icon={<HomeIcon />} title="홈" />
            <MobileNavButton icon={<PartIcon />} title="크루참여" />
            <MobileNavButton icon={<RecruIcon />} title="팀원모집" />
            <MobileNavButton icon={<HomeIcon />} title="채팅" />
          </MobileNavUl>
        </MobileNav>
      </>
    );
  }

export default NavMobile;

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

const MobileNav = styled.nav`
  display: none;
  @media screen and (max-width: 768px) {
  display: block;
  position: fixed;
  width: 100%;
  -webkit-box-sizing: border-box;
          box-sizing: border-box;
  padding: 0 20px;
  height: 70px;
  z-index: 90;
  background-color: #fff;
    bottom: 0;
  -webkit-box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.05);
          box-shadow: 0px -5px 5px rgba(0, 0, 0, 0.05);
  bottom: 0;
  ul {
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
  }
  }
`;

const MobileGnb = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
    position: fixed;
    width: 100%;
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    padding: 0 20px;
    height: 60px;
    -webkit-box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.05);
            box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.05);
            z-index: 90;
    background-color: #fff;
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
span {
  display: block;
    width: 36px;
    height: 36px;
    background-size: 100% !important;
}
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