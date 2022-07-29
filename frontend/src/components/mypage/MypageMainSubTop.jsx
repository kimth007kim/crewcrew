import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import ArrowCircle from '@/assets/images/ArrowCircle.png';
import ArrowDown from '@/assets/images/ArrowDown.png';
import ArrowUpOn from '@/assets/images/ArrowUpOn.png';
import { useNavigate } from 'react-router-dom';

function MypageMainSubTop({
  total = 0,
  studyCnt = 0,
  hobbyCnt = 0,
  title = '내가 참여요청한 크루',
  desc = '내가 참여요청한 크루의 현황을 이곳에서 확인하고 관리하세요!',
  disable,
  small_title1 = '스터디 크루',
  small_title2 = '취미 크루',
  handleTitle1,
  handleTitle2,
}) {
  const totalRef = useRef(null);
  const studyRef = useRef(null);
  const hobbyRef = useRef(null);
  const [toggleFilter, setToggleFilter] = useState(false);
  const navigate = useNavigate();

  const numberTotal = useCallback((ref, limitNum) => {
    let num = 0;
    let timer = setInterval(() => {
      if (ref && ref.current) {
        ref.current.innerHTML = `${num}개`;

        if (limitNum <= num) {
          ref.current.innerHTML = ` ${limitNum}개`;
          clearInterval(timer);
        }
      }
      num += 1;
      if (limitNum > 10) {
        num += 10;
      }
    }, 20);
  }, []);

  const navigatePage = useCallback((e, link) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    navigate(`${link}`);
  }, []);

  const stopEvent = useCallback((e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }, []);

  const onToggleFilter = useCallback(
    (e) => {
      setToggleFilter(!toggleFilter);
    },
    [toggleFilter],
  );

  useEffect(() => {
    numberTotal(totalRef, total);
    numberTotal(studyRef, studyCnt);
    numberTotal(hobbyRef, hobbyCnt);
  }, [total, studyCnt, hobbyCnt]);

  return (
    <section>
      <Wrapper onClick={stopEvent}>
        <h3>{title}</h3>
        <p>{desc}</p>
        <FilterWrapper onClick={onToggleFilter} active={toggleFilter}>
          <p>{title}</p>
          <ul>
            <li onClick={(e) => navigatePage(e, '/mypage/request')}>내가 참여요청한 크루</li>
            <li onClick={(e) => navigatePage(e, '/mypage/recruit')}>내가 모집중인 크루</li>
            <li onClick={(e) => navigatePage(e, '/mypage/activity')}>나의 활동 크루</li>
          </ul>
        </FilterWrapper>
        <Content>
          <h4>
            {'전체 '}
            <span ref={totalRef} data-rate={total}></span>
          </h4>
          <BoxWrap>
            <SentBox color="#0575e6" hoverColor="#005ec5" disable={disable} onClick={handleTitle1}>
              <p ref={studyRef}>{studyCnt}개</p>
              <p>{small_title1}</p>
              <div className="arrow"></div>
            </SentBox>
            <SentBox color="#ffd458" hoverColor="#fcb90d" disable={disable} onClick={handleTitle2}>
              <p ref={hobbyRef}>{hobbyCnt}개</p>
              <p>{small_title2}</p>
              <div className="arrow"></div>
            </SentBox>
          </BoxWrap>
        </Content>
      </Wrapper>
    </section>
  );
}

export default MypageMainSubTop;

const Wrapper = styled('div')`
  max-width: 850px;
  margin: auto;
  position: relative;
  padding-top: 36px;

  h3 {
    font-size: 20px;
    font-weight: 700;
  }

  & > p {
    margin-top: 8px;
    font-size: 14px;
    color: #868686;
    font-weight: 400;
    line-height: 20px;
  }

  @media screen and (max-width: 820px) {
    background-color: #fff;
    padding: 0 20px;
    padding-top: 36px;
  }

  @media screen and (max-width: 300px) {
    padding: 0 10px;
    padding-top: 36px;
  }
`;

const FilterWrapper = styled('div')`
  width: 30px;
  height: 30px;
  border-radius: 5px;
  border: 1px solid #e2e2e2;
  background: #fff url(${ArrowDown}) top 12px right 9px/11px no-repeat;
  cursor: pointer;
  transition: border 0.3s, 0.5s;
  overflow: hidden;
  padding: 0 10px;
  box-sizing: border-box;
  position: absolute;
  top: 36px;
  right: 0;

  :hover {
    border: 1px solid #b0b0b0;
  }

  p {
    color: #a8a8a8;
    font-size: 13px;
    font-weight: 500;
    height: 31px;
    border-bottom: 1px solid #e2e2e2;
    line-height: 30px;
  }

  li {
    padding: 9px 0 5px;
    color: #000;
    font-size: 13px;
    font-weight: 500;
    transition: 0.3s;

    :hover {
      color: #00b7ff;
    }
  }

  p,
  ul {
    opacity: 0;
    transition: 0.3s 0s;
  }

  ${(props) =>
    props.active &&
    css`
      width: 156px;
      height: 125px;
      border: 1px solid #00b7ff;
      background: #fff url(${ArrowUpOn}) top 12px right 9px/11px no-repeat;
      p,
      ul {
        opacity: 1;
        transition: 0.5s 0.45s;
      }
      :hover {
        border-color: #00b7ff;
      }
    `}

  @media screen and (max-width: 820px) {
    right: 20px;
  }

  @media screen and (max-width: 300px) {
    right: 10px;
    padding: 0 8px;

    p {
      font-size: 11px;
      border: none;
      padding-right: 12px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      position: relative;
      ::after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background-color: #e2e2e2;
        position: absolute;
        bottom: 0;
      }
    }

    li {
      font-size: 11px;
    }

    ${(props) =>
      props.active &&
      css`
        width: 110px;
        height: 120px;
      `}
  }
`;

const Content = styled('div')`
  padding: 45px 0 100px;

  h4 {
    font-size: 42px;
    font-weight: 700;
    text-align: center;
    padding-bottom: 50px;

    span {
      color: #00b7ff;
    }
  }

  @media screen and (max-width: 820px) {
    padding: 45px 0;

    h4 {
      font-size: 32px;
    }
  }
`;

const BoxWrap = styled('div')`
  display: flex;
  gap: 48px;
  justify-content: space-between;

  @media screen and (max-width: 820px) {
    gap: 20px;
  }
`;

const SentBox = styled('div')`
  width: 100%;
  height: 180px;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgb(0 0 0 / 10%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  cursor: pointer;
  transition: 1s;
  padding: 0 32px;
  position: relative;
  background-color: ${(props) => props.color};

  p {
    color: #fff;
    line-height: 1;
    width: 100%;
    text-align: center;
    transition: 0.5s;

    &:nth-child(1) {
      font-size: 48px;
      font-weight: 700;
    }
    &:nth-child(2) {
      font-size: 18px;
      font-weight: 500;
      margin-top: 22px;
    }
  }

  .arrow {
    width: 55px;
    height: 55px;
    background: url(${ArrowCircle}) center/55px 55px;
    position: absolute;
    bottom: calc(50% - 28px);
    right: 65px;
    transition: 0.5s;
    transition-delay: 0s;
    opacity: 0;
  }

  :hover {
    background-color: ${(props) => props.hoverColor};

    p {
      width: 170px;
    }

    .arrow {
      opacity: 1;
      transition-delay: 0.1s;
    }
  }

  ${(props) =>
    props.disable &&
    css`
      background-color: #c4c4c4;
      :hover {
        background-color: #707070;
      }
    `}

  @media screen and (max-width: 820px) {
    height: 86px;
    padding: 0;

    p {
      &:nth-child(1) {
        font-size: 32px;
      }

      &:nth-child(2) {
        font-size: 13px;
        margin-top: 6px;
      }
    }

    :hover {
      background-color: ${(props) => props.color};

      p {
        width: 100%;
      }

      .arrow {
        opacity: 0;
      }
    }

    ${(props) =>
      props.disable &&
      css`
        background-color: #c4c4c4;
        :hover {
          background-color: #707070;
        }
      `}
  }
`;
