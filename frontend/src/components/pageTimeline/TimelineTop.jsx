import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import SettingWhite from '@/assets/images/SettingWhite.png';
import ArrowDown from '@/assets/images/ArrowDown.png';
import ArrowUpOn from '@/assets/images/ArrowUpOn.png';
import { BtnOpened, timelineFilter } from '@/atoms/timeline';
import { useRecoilState } from 'recoil';
import { useScroll } from '@/hooks/useScroll';

function TimelineTop() {
  const { scrollY } = useScroll();
  const [FilterOpen, setFilterOpen] = useState(false);
  const FliterList = [
    '전체알림',
    '나에게 온 참여요청',
    '나의 참여요청 거절',
    '나의 참여요청 수락',
    '나의 참여 취소',
  ];
  const [currentFilter, setCurrentFilter] = useState(FliterList[0]);
  const [currentFilterNum, setCurrentFilterNum] = useRecoilState(timelineFilter);

  const [btnOpen, setBtnOpen] = useRecoilState(BtnOpened);

  const ChangeFilter = (i) => {
    setCurrentFilter(FliterList[i]);
    localStorage.currentFilterNum = i;
    setCurrentFilterNum(i);
  };

  const openBtn = () => setBtnOpen((state) => !state);

  return (
    <Container fixed={scrollY}>
      <Wrapper>
        <Title>
          <h3>크루 타임라인</h3>
          <p>최근 30일 이내 알림을 확인해보세요!</p>
        </Title>
        <BtnSet onClick={openBtn} />
        <FilterWrapper open={FilterOpen} onClick={() => setFilterOpen((state) => !state)}>
          <p>{currentFilter}</p>
          <ul>
            {FliterList.map((e, i) => (
              <FilterLi onClick={() => ChangeFilter(i)} key={`fliter${i}`}>
                {e}
              </FilterLi>
            ))}
          </ul>
        </FilterWrapper>
      </Wrapper>
    </Container>
  );
}

export default TimelineTop;

const Container = styled('section')`
  width: 100%;
  height: 108px;
  position: relative;
  top: 0;
  z-index: 1;
  overflow: visible;
  background-color: #fff;
  border-bottom: 1px solid #e2e2e2;

  @media screen and (max-width: 820px) {
    height: 94px;
  }

  ${(props) =>
    props.fixed >= 130 &&
    css`
      position: fixed;
      width: calc(100% - 142px);
    `}

  @media screen and (max-width: 820px) {
    ${(props) =>
      props.fixed >= 60 &&
      css`
        position: fixed;
        top: 60px;
        width: 100%;
      `}
  }
`;

const Wrapper = styled('div')`
  justify-content: flex-end;
  align-items: flex-start;
  gap: 12px;
  max-width: 850px;
  width: 100%;
  flex-direction: row;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  z-index: 1;
  display: flex;

  @media screen and (max-width: 820px) {
    width: calc(100vw - 40px);
  }
  @media screen and (max-width: 300px) {
    width: calc(100vw - 20px);
  }
`;

const Title = styled('div')`
  margin-right: auto;
  margin-top: 37px;

  h3 {
    color: #000;
    font-size: 20px;
    font-weight: 700;
    line-height: 1;
  }

  p {
    color: #868686;
    font-size: 13px;
    font-weight: 500;
    line-height: 1;
    margin-top: 10px;
  }

  @media screen and (max-width: 820px) {
    margin-top: 24px;

    p {
      position: absolute;
      z-index: -1;
    }
  }

  @media screen and (max-width: 300px) {
    h3 {
      text-align: left;
      position: absolute;
    }
    p {
      top: 50px;
    }
  }
`;

const BtnSet = styled('button')`
  border: none;
  outline: none;
  cursor: pointer;
  text-indent: -9999px;
  min-width: 30px;
  height: 30px;
  border-radius: 5px;
  background: #c4c4c4 url(${SettingWhite}) center/16px no-repeat;
  transition: 0.3s;
  margin-top: 44px;

  &:hover {
    background-color: #b0b0b0;
  }

  @media screen and (max-width: 820px) {
    margin-top: 20px;
  }
`;

const FilterWrapper = styled('div')`
  margin-top: 44px;
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

  &:hover {
    border: 1px solid #b0b0b0;
  }

  p {
    color: #a8a8a8;
    font-size: 13px;
    font-weight: 500;
    height: 30px;
    border-bottom: 1px solid #e2e2e2;
    line-height: 30px;
    opacity: 0;
    transition: 0.3s 0s;
  }

  ul {
    opacity: 0;
    transition: 0.3s 0s;
  }

  @media screen and (max-width: 820px) {
    margin-top: 20px;
  }

  ${(props) =>
    props.open &&
    css`
      width: 156px;
      height: 190px;
      border: 1px solid #00b7ff;
      background: #fff url(${ArrowUpOn}) top 12px right 9px/11px no-repeat;

      p,
      ul {
        opacity: 1;
        transition: 0.5s 0.45s;
      }

      @media screen and (max-width: 820px) {
        margin-top: 20px;
      }

      @media screen and (max-width: 300px) {
        padding: 0 8px;
        width: 100px;
        height: 182px;
      }
    `}
`;

const FilterLi = styled('li')`
  padding: 9px 0 5px;
  color: #000;
  font-size: 13px;
  font-weight: 500;
  transition: 0.3s;

  @media screen and (max-width: 300px) {
    font-size: 11px;
  }
`;
