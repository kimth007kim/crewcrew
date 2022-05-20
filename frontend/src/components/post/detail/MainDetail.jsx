import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import StarOff from '@/assets/images/ButtonStar.png';
import StarOn from '@/assets/images/ButtonStarOn.png';
import Markdown from '@/lib/Markdown';

function MainDetail() {
  return (
    <Container>
      <Wrapper>
        <ul>
          <li>D-2</li>
          <li>재영재영유재영</li>
          <li>2/4 (목)</li>
        </ul>
        <TitleMobile>함께 크루원 모집 플랫폼 작업하실 분 모집합니다~!</TitleMobile>
        <ul>
          <li>
            <h4>함께 크루원 모집 플랫폼 작업하실 분 모집합니다~!</h4>
          </li>
          <li>
            <ButtonStar type="button" active />
          </li>
          <li>
            <Button type="button">참여하기</Button>
          </li>
        </ul>
        <TopUList>
          <li>고시/공무원</li>
          <li>오프라인</li>
          <li>10/10명</li>
          <li>조회수 50</li>
        </TopUList>
        <MarkDownbody>
          <Markdown># 오 된다</Markdown>
        </MarkDownbody>
      </Wrapper>
    </Container>
  );
}

export default MainDetail;

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
    color: #005ec5;
    font-weight: 700;
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
