import React, { useCallback, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import BgProfile1 from '@/assets/images/Profile1.png';
import BgProfile3 from '@/assets/images/Profile3.png';
import ButtonIntro from '../common/ButtonIntro';
import IconSearch from '@/assets/images/IconSearch.png';
import delImage from '@/assets/images/InputDel.png';
import { emojiSlice } from '@/utils';

const this_device = navigator.platform;
const pc_device = 'win16|win32|win64|mac|macintel';

function PostTop() {
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();
  const [throttle, setThrottle] = useState(false);
  const InputRef = useRef(null);

  const webRef = useRef(null);
  const mobileRef = useRef(null);

  const excuteScroll = () => {
    if (throttle) return;
    if (!throttle) {
      setThrottle(true);
      handlePlatform();
      setTimeout(() => {
        setThrottle(false);
      }, 500);
    }
  };

  const onChangeSearchText = useCallback((e) => {
    let value = emojiSlice(e.target.value).slice(0, 30);
    setSearchText(value);
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

  const handlePlatform = () => {
    if (this_device) {
      if (pc_device.indexOf(navigator.platform.toLowerCase()) < 0) {
        if (mobileRef?.current) {
          window.scrollTo(0, mobileRef.current.offsetTop);
        }
      } else {
        if (webRef?.current) {
          window.scrollTo(0, webRef.current.offsetTop);
        }
      }
    } else {
      if (webRef?.current) {
        window.scrollTo(0, webRef.current.offsetTop);
      }
    }
  };

  return (
    <MainTop>
      <TopBgCharacter />
      <TopCont>
        <h2 ref={webRef}>크루 참여하고 목표 이루기</h2>
        <h3 ref={mobileRef}>나에게 딱 맞는 크루, 여기서 찾아요!</h3>
        <form onSubmit={handleSearchTextSubmit}>
          <InputWrapper>
            <img src={`${IconSearch}`} alt="searchicon" />
            <input
              type="text"
              placeholder="참여하고 싶은 모임을 검색해보세요!"
              onChange={onChangeSearchText}
              ref={InputRef}
              value={searchText}
              onMouseDown={excuteScroll}
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
      <ButtonIntro />
    </MainTop>
  );
}

export default PostTop;

const MainTop = styled.section`
  height: 400px;
  background: linear-gradient(180deg, #008be2 0%, #0f3fa6 100%);
  background-color: #005ec5;
  position: relative;
  overflow: hidden;
  @media screen and (max-width: 820px) {
    height: 240px;
  }
`;

const TopBgCharacter = styled.div`
  position: absolute;
  max-width: 1075px;
  width: 100%;
  height: 100%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  mix-blend-mode: soft-light;
  background-image: url(${BgProfile1}), url(${BgProfile3});
  background-size: 400px 400px;
  background-repeat: no-repeat;
  background-position: left, right;
  @media screen and (max-width: 820px) {
    background-image: url(${BgProfile3});
    background-size: 240px;
    background-position: right;
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
    margin-top: 102px;
  }

  h3 {
    font-size: 20px;
    color: #fff;
    font-weight: 300;
    line-height: 36px;
    margin-top: 12px;
  }

  @media screen and (max-width: 820px) {
    width: calc(100vw - 40px);
    left: 50%;
    transform: translateX(-50%);
    h2 {
      font-size: 28px;
      line-height: 36px;
      margin-top: 70px;
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
  margin-top: 32px;
  overflow: hidden;
  background-color: #fff;
  display: flex;
  align-items: center;

  img {
    width: 26px;
    height: 26px;
    margin-left: 18px;
    margin-bottom: 4px;
    user-select: none;
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
      width: calc(100% - 65px);
      font-size: 12px;
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
  @media screen and (max-width: 820px) {
    top: 8px;
  }
`;
