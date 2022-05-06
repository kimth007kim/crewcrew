/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import LogoTxt from '../../../assets/images/LogoTxt.png';
import IconButtonArrow from '../../../assets/images/ButtonArrow.png';
import IconButtonArrowGhost from '../../../assets/images/ButtonArrowGhost.png';
import Profile1 from '../../../assets/images/Profile1.png';
import Profile2 from '../../../assets/images/Profile3.png';
import Profile3 from '../../../assets/images/Profile5.png';
import Profile4 from '../../../assets/images/Profile2.png';
import AuthModal from '../Auth/AuthModal';

const Cards = [
  {
    title: '14가지 분야 <br/>크루원 모집',
    desc: '스터디, 취미도<br/> 크루원과 함께!',
    reverse: true,
    number: 1,
    img: Profile1,
    color: '#001881',
  },
  {
    title: '속전속결<br/> 간편 모집글 작성',
    desc: '크루원 모으기,<br/> 어렵지 않잖아?',
    reverse: false,
    number: 2,
    img: Profile2,
    color: '#005ec5',
  },
  {
    title: '안전한<br/> 크루크루 채팅',
    desc: '따로 방파지 말고<br/> 여기서 떠들자~!',
    reverse: true,
    number: 3,
    img: Profile3,
    color: '#00b7ff',
  },
  {
    title: '간단한<br/> 간편 가입 신청',
    desc: '한번의 클릭으로<br/> QUICK 가입신청!',
    reverse: false,
    number: 4,
    img: Profile4,
    color: '#1AB861',
  },
];

function NavButton({ ghost, title, clickFunc }) {
  return (
    <NavButtonListLi>
      {ghost ? (
        <ButtonFull2Ghost type="button">
          {title}
          <ButtonFull2Ghostspan />
        </ButtonFull2Ghost>
      ) : (
        <ButtonFull2 type="button" onClick={clickFunc}>
          {title}
          <ButtonFull2span />
        </ButtonFull2>
      )}
    </NavButtonListLi>
  );
}

function NavCard({ title, p, img, color, number, reverse }) {
  return (
    <NavCardListli>
      {reverse ? (
        <CardIntro img={img} color={color} number={number}>
          <h3
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: p,
            }}
          />
        </CardIntro>
      ) : (
        <CardIntroReverse img={img} color={color} number={number}>
          <h3
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: p,
            }}
          />
        </CardIntroReverse>
      )}
    </NavCardListli>
  );
}

function NavContainer() {
  const [Dialog, setDialog] = useState(false);

  const openModal = useCallback(() => {
    setDialog(true);
  }, []);

  const closeModal = useCallback(() => {
    setDialog(false);
  }, []);

  const handleClick = useCallback(() => {
    openModal();
  }, []);

  return (
    <>
      <NavCont>
        <Navh1>
          <a href="/">
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
            <NavButton title="로그인/회원가입" clickFunc={handleClick} />
            <NavButton ghost title="서비스 소개" />
          </NavButtonList>
          <Navh2>CREW 4 U</Navh2>
          <Navh2p>나에게 딱 맞는 크루원을 찾고 있었다면, 잘 찾아오셨어요!</Navh2p>
          <NavCardList>
            {Cards.map((ele, i) => (
              <NavCard
                title={ele.title}
                p={ele.desc}
                reverse={ele.reverse}
                number={i + 1}
                img={ele.img}
                color={ele.color}
              />
            ))}
          </NavCardList>
        </NavContInner>
      </NavCont>
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

const NavButtonListLi = styled.li`
  width: 100%;
  margin-bottom: 15px;
  box-sizing: content-box;

  @media screen and (max-width: 820px) {
    margin-right: 5px;
    :last-child {
      margin-right: 0px;
    }

    width: 100%;
    margin-bottom: 0;
  }
`;

const ButtonFull2 = styled.button`
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  transition: 0.3s;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  :hover {
    background-color: #00b7ff;
  }

  @media screen and (max-width: 820px) {
    padding: 8px 0;
    height: 30px;
    font-size: 11px;

    justify-content: center;
  }
`;

const ButtonFull2Ghost = styled.button`
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  transition: 0.3s;
  padding-top: 17px;
  padding-bottom: 17px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 25px;
  line-height: 16px;
  background-color: #fff;
  height: 50px;
  color: #707070;
  padding-left: 26px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e2e2e2;
  :hover {
    border: 1px solid #a8a8a8;
  }

  @media screen and (max-width: 820px) {
    padding: 8px 0;
    height: 30px;
    font-size: 11px;
    justify-content: center;
  }
`;

const ButtonFull2span = styled.span`
  background: url(${IconButtonArrow}) 50% 50% no-repeat;
  background-size: 100% !important;

  @media screen and (max-width: 820px) {
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
  @media screen and (max-width: 820px) {
    display: none;
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

const NavCardListli = styled.li`
  padding-bottom: 15px;
  margin-right: 10px;
  @media screen and (max-width: 820px) {
    padding-bottom: 10px;
  }
`;

const CardIntro = styled.div`
  background-position: 20px 50%;

  @media screen and (max-width: 820px) {
    height: 70px;
    padding: 0;
    background-size: 90px !important;
    border-radius: 10px;
    display: flex;
    align-items: center;
    background-position: 15px 50%;
  }

  height: 120px;
  padding: 35px 0 16px;
  box-sizing: border-box;
  background-size: 120px !important;
  background-repeat: no-repeat !important;
  position: relative;
  border-radius: 15px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15);
  background-color: ${(props) => props.color};
  background-image: url(${(props) => props.img});

  &::before {
    content: ${(props) => `'${props.number}'`};
    display: flex;
    justify-content: center;
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
  }

  h3 {
    font-size: 10px;
    color: #fff;
    font-weight: 500;
    br {
      display: none;
    }
    margin-left: 167px;

    @media screen and (max-width: 820px) {
      margin-left: 140px;
      br {
        display: block;
      }
    }
  }
  p {
    font-size: 18px;
    color: #fff;
    margin: 8px 0;
    line-height: 24px;
    margin-left: 167px;

    @media screen and (max-width: 820px) {
      display: none;
    }
  }
`;

const CardIntroReverse = styled.li`
  @media screen and (max-width: 820px) {
    background-position: calc(100% - 15px) 50%;
    height: 70px;
    padding: 0;
    background-size: 90px !important;
    border-radius: 10px;
    display: flex;
    align-items: center;
  }
  height: 120px;
  padding: 35px 0 16px;
  box-sizing: border-box;
  background-size: 120px !important;
  background-repeat: no-repeat !important;
  position: relative;
  border-radius: 15px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15);
  background-color: ${(props) => props.color};
  background-image: url(${(props) => props.img});
  background-position: calc(100% - 20px) 50%;
  ::before {
    content: ${(props) => `'${props.number}'`};
    display: flex;
    justify-content: center;
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
  }
  h3 {
    font-size: 10px;
    color: #fff;
    font-weight: 500;
    br {
      display: none;
    }
    margin-left: 20px;
    @media screen and (max-width: 820px) {
      br {
        display: block;
      }
      text-align: right;
      margin-left: 30px;
    }
  }
  p {
    font-size: 18px;
    color: #fff;
    margin: 8px 0;
    line-height: 24px;
    margin-left: 20px;
    @media screen and (max-width: 820px) {
      display: none;
    }
  }
`;

const CardIntroh3 = styled.h3`
  font-size: 10px;
  color: #fff;
  width: fit-content;
`;

const CardIntrop = styled.p`
  font-size: 18px;
  color: #fff;
  margin: 8px 0;
  line-height: 24px;
  @media screen and (max-width: 820px) {
    display: none;
  }
`;

const Brm = styled.span`
  display: inline block;
  width: 3px;
  @media screen and (max-width: 820px) {
    display: block;
  }
`;
