import React, { useCallback, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import WaveSvg from '../../assets/images/Wave.svg';
import IconLinkIntro from '../../assets/images/IconLinkIntro.png';
import IconSearch from '../../assets/images/IconSearch.png';
import delImage from '../../assets/images/InputDel.png';
import LogoCircle from '../../assets/images/LogoCircle3.png';

function HomeTop() {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const InputRef = useRef(null);

  const onChangeSearchText = useCallback((e) => {
    setSearchText(e.target.value);
  }, []);

  const handleSearchTextDelete = useCallback(() => {
    setSearchText('');
  }, []);

  const handleSearchTextSubmit = useCallback(
    (e) => {
      e.preventDefault();
      navigate(`/post?page=1&search=${searchText}`);
      setSearchText('');
    },
    [searchText],
  );

  return (
    <MainTop>
      <TopCont>
        <LogoCircleImg />
        <h2>크루원과 크루원이 만나다!</h2>
        <h3>목표를 향해 항해하는 팀원모집 플랫폼, 크루크루</h3>
        <form onSubmit={handleSearchTextSubmit}>
          <InputWrapper>
            <img src={`${IconSearch}`} alt="" />
            <input
              type="text"
              placeholder="참여하고 싶은 모임을 검색해보세요!"
              onChange={onChangeSearchText}
              ref={InputRef}
              value={searchText}
            />
            <InputDel
              onMouseDown={(e) => {
                e.preventDefault();
                handleSearchTextDelete();
                InputRef.current.focus();
              }}
              TextIn={!!searchText}
            />
          </InputWrapper>
        </form>
      </TopCont>
      <TopWave>
        <Wave1 />
        <Wave2 />
      </TopWave>
      <ButtonIntro />
    </MainTop>
  );
}

export default HomeTop;

const LogoCircleImg = styled.span`
  width: 70px;
  height: 60px;
  margin: 66px auto 20px;
  background: url(${LogoCircle});
  background-size: 100% !important;
  @media screen and (max-width: 820px) {
    width: 42px;
    height: 36px;
    margin: 38px auto 12px;
  }
  @media screen and (max-width: 300px) {
    margin-top: 50px;
  }
`;

const MainTop = styled.section`
  height: 400px;
  background-color: #005ec5;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 820px) {
    height: 240px;
    background-color: #005ec5;
    position: relative;
    overflow: hidden;
  }
`;

const TopCont = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  z-index: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    font-size: 48px;
    color: #fff;
    font-weight: 700;
    line-height: 60px;
  }

  h3 {
    font-size: 20px;
    color: #fff;
    font-weight: 300;
    line-height: 36px;
  }

  @media screen and (max-width: 820px) {
    width: calc(100vw - 40px);
    left: 50%;
    transform: translateX(-50%);
    h2 {
      font-size: 28px;
      line-height: 36px;
    }

    h3 {
      font-size: 13px;
      line-height: 26px;
    }
  }

  @media screen and (max-width: 300px) {
    width: calc(100vw - 40px);
    left: 50%;
    transform: translateX(-50%);
    h2 {
      font-size: 22px;
      line-height: 30px;
    }

    h3 {
      font-size: 12px;
      line-height: 24px;
    }

    h2 h3 {
      text-align: center;
      word-break: keep-all;
    }
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 506px;
  height: 50px;
  border: 1px solid #e2e2e2;
  border-radius: 25px;
  box-sizing: border-box;
  margin-top: 25px;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  align-items: center;

  img {
    width: 26px;
    height: 26px;
    margin-left: 18px;
    margin-bottom: 4px;
  }

  input {
    width: calc(100% - 76px);
    height: 100%;
    border: none;
    outline: none;
    margin-left: 14px;
    font-size: 13px;
    font-weight: 400;

    &::placeholder {
      color: #a8a8a8;
    }
  }
  @media screen and (max-width: 820px) {
    width: calc(100vw - 40px);
    height: 36px;
    border-radius: 18px;
    margin-top: 32px;

    img {
      width: 24px;
      height: 24px;
      margin-left: 12px;
    }

    input {
      font-size: 12px;
      width: calc(100% - 65px);
      margin-left: 12px;
    }
  }
`;

const InputDel = styled.div`
  width: 18px;
  height: 18px;
  background-image: url(${delImage});
  background-size: 100%;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 18px;
  display: none;
  user-select: none;

  ${(props) =>
    props.TextIn &&
    css`
      display: block;
    `};
`;

const ButtonIntro = styled.div`
  width: 45px;
  height: 45px;
  background: url(${IconLinkIntro}) 50% 50%;
  background-size: 100% !important;
  cursor: pointer;
  position: absolute;
  top: 63px;
  right: 45px;
  opacity: 0.5;
  transition: 0.3s;
  :hover {
    opacity: 1;
  }
  @media screen and (max-width: 820px) {
    width: 30px;
    height: 30px;
    top: 17px;
    right: 20px;
    opacity: 1;
  }
  @media screen and (max-width: 820px) {
    right: 10px;
  }
`;

const TopWave = styled.div`
  height: 160px;
  width: 3200px;
  max-width: 820px;
  bottom: 0;
  left: 0;
`;

const Wave1 = styled.div`
  opacity: 0.9;
  animation-direction: alternate-reverse;
  position: absolute;
  height: 160px;
  width: 3200px;
  bottom: 0;
  left: 0%;
  animation: wave 4s linear infinite alternate-reverse;
  background: url(${WaveSvg}) no-repeat;
  background-size: 100% 100%;
  background-position: left bottom;
  @media screen and (max-width: 820px) {
    height: 80px;
    width: 1600px;
  }
  @-webkit-keyframes wave {
    to {
      left: -50%;
    }
  }

  @keyframes wave {
    to {
      left: -50%;
    }
  }
`;

const Wave2 = styled.div`
  opacity: 0.5;
  position: absolute;
  height: 160px;
  width: 3200px;
  bottom: 0;
  left: 0;
  animation: wave 4s linear infinite alternate;
  background: url(${WaveSvg}) no-repeat;
  background-size: 100% 100%;
  background-position: left bottom;
  @media screen and (max-width: 820px) {
    height: 80px;
    width: 1600px;
  }
  @-webkit-keyframes wave {
    to {
      left: -50%;
    }
  }

  @keyframes wave {
    to {
      left: -50%;
    }
  }
`;
