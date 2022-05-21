import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import StarOff from '@/assets/images/ButtonStar.png';
import StarOn from '@/assets/images/ButtonStarOn.png';
import Markdown from '@/lib/Markdown';
import { viewDay } from '@/utils';
import { differenceInDays, format, getDay } from 'date-fns';
import { cateogoryAll } from '@/frontDB/filterDB';

function MainPost({ data }) {
  const [IsDisable, setIsDisable] = useState(false);

  const renderDate = useCallback(() => {
    const date = new Date(data.createdDate);
    return `${format(date, 'M/d')} (${viewDay(getDay(date))})`;
  }, []);

  const renderDay = useCallback(() => {
    const date = new Date(data.expiredDate);
    const nowDate = new Date();
    return differenceInDays(date, nowDate) + 1;
  }, []);

  useEffect(() => {
    const bool = !data.viewable || renderDay() < 0;
    setIsDisable(bool);
  }, []);

  return (
    <Container>
      <Wrapper>
        <ul>
          <li>{IsDisable ? '마감' : `D-${renderDay()}`}</li>
          <li>{data.nickname}</li>
          <li>{renderDate()}</li>
        </ul>
        <TitleMobile>{data.title}</TitleMobile>
        <ul>
          <li>
            <h4>{data.title}</h4>
          </li>
          <li>
            <ButtonStar type="button" active />
          </li>
          <li>
            <Button type="button" disabled={IsDisable}>
              참여하기
            </Button>
          </li>
        </ul>
        <TopUList textColor={data.categoryParentId === 1 ? '#005ec5' : '#F7971E'}>
          <li>
            {cateogoryAll.filter((category) => `${data.categoryId}` === category.value)[0].name}
          </li>
          <li>{data.approachCode ? '온라인' : '오프라인'}</li>
          <li>{`${data.recruitedCrew}/${data.totalCrew}`}</li>
          <li>{`조회수 ${data.hit}`}</li>
        </TopUList>
        <MarkDownbody>
          <Markdown>{data.boardContent}</Markdown>
        </MarkDownbody>
      </Wrapper>
    </Container>
  );
}

export default MainPost;

const Container = styled('section')`
  padding: 60px 0 94px;
  background-color: #f6f7fb;
`;

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  max-width: 850px;
  margin: auto;
  position: relative;

  ul {
    display: flex;
    align-items: center;

    li {
      color: #a8a8a8;
      font-weight: 400;
    }

    &:nth-of-type(1) {
      gap: 24px;

      li {
        font-size: 15px;
      }

      li:first-child {
        margin-right: 10px;
        font-size: 20px;
        font-weight: 700;
        color: #00b7ff;
      }

      li:nth-child(2) {
        color: #000;
      }
    }

    &:nth-of-type(2) {
      margin: 10px 0 18px;
      gap: 8px;

      li:first-child {
        margin-right: auto;
        h4 {
          font-size: 20px;
          color: #000;
        }
      }

      li:not(:first-child) {
        width: 78px;
      }
    }
  }
`;

const TopUList = styled('ul')`
  gap: 15px;

  li {
    font-size: 15px;
  }

  li:first-child {
    ${(props) =>
      props.textColor &&
      css`
        color: ${props.textColor};
      `}
  }
`;

const TitleMobile = styled('h4')`
  display: none;
`;

const ButtonStar = styled('button')`
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  transition: 0.3s;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 10px;
  line-height: 26px;
  background-color: #fff;
  height: 50px;
  border: 1px solid #e2e2e2;
  color: #868686;

  background-image: url(${StarOff});
  background-repeat: no-repeat;
  background-size: 30px;
  background-position: 50%;
  transition: 0.3s;

  :hover {
    border: 1px solid #a8a8a8;
  }

  ${(props) =>
    props.active &&
    css`
      background-image: url(${StarOn});
    `}
`;

const Button = styled('button')`
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  transition: 0.3s;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  line-height: 26px;
  background-color: #00b7ff;
  height: 50px;
  color: #fff;

  :hover {
    background-color: #005ec5;
  }

  :disabled {
    background-color: #e2e2e2;
    cursor: default;
  }
`;

const MarkDownbody = styled('div')`
  margin-top: 60px;
  width: 100%;
  min-height: 500px;
  border-radius: 10px;
  padding: 20px 12px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #e2e2e2;
`;