import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import FilterArrowImg from '@/assets/images/IconNavArrow_Big.png';
import IconLinkIntro from '@/assets/images/IconLinkIntro.png';
import IconSearch from '@/assets/images/IconSearch.png';
import delImage from '@/assets/images/InputDel.png';
import { css } from 'styled-components';

function MainTop() {
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
    <Container>
      <TopCont>
        <h2>
          <Link to="/post" />
          크루 상세정보
        </h2>
        <form onSubmit={handleSearchTextSubmit}>
          <InputWrapper>
            <img src={`${IconSearch}`} alt="searchicon" />
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
      <ButtonIntro />
    </Container>
  );
}

export default MainTop;

const Container = styled('section')`
  height: 130px;
  background-color: #fff;
  border-bottom: 1px solid #e2e2e2;
  position: relative;
  overflow: hidden;
  box-sizing: content-box;
`;

const TopCont = styled('div')`
  max-width: 850px;
  width: 100%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  box-sizing: content-box;

  h2 {
    font-size: 24px;
    font-weight: 700;
    line-height: 60px;
    display: flex;
    color: #000;
    align-items: center;

    a {
      display: block;
      background-image: url(${FilterArrowImg});
      background-size: 8px;
      background-repeat: no-repeat;
      background-position: 0 1px;
      width: 8px;
      height: 18px;
      padding-right: 20px;
      text-decoration: none;
      color: #868686;
      box-sizing: content-box;
    }
  }

  @media screen and (max-width: 820px) {
    width: calc(100vw - 40px);
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    h2 {
      font-size: 15px;
      order: 1;
      line-height: 36px;

      a {
        background-size: 8px;
        padding-right: 12px;
      }
    }
  }

  @media screen and (max-width: 300px) {
    width: calc(100vw - 20px);

    h2 {
      line-height: 30px;
    }
  }
`;
const ButtonIntro = styled('div')`
  width: 45px;
  height: 45px;
  background: url(${IconLinkIntro}) 50% 50%;
  background-size: 100% !important;
  cursor: pointer;
  position: absolute;
  top: 42px;
  right: 45px;
  opacity: 0.5;
  transition: 0.3s;

  @media screen and (max-width: 820px) {
    width: 24px;
    height: 24px;
    right: 20px;
    opacity: 1;
    top: 22px;
  }

  @media screen and (max-width: 300px) {
    right: 10px;
  }
`;

const InputWrapper = styled.div`
  position: relative;
  width: 506px;
  height: 50px;
  border: 1px solid #e2e2e2;
  border-radius: 25px;
  box-sizing: border-box;
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
    width: calc(100% - 50px);
    height: 36px;
    border-radius: 18px;
    margin: 14px 0 34px;

    img {
      width: 24px;
      height: 24px;
      margin-left: 16px;
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
  @media screen and (max-width: 820px) {
    top: 8px;
  }
`;
