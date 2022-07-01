import React from 'react';
import styled from 'styled-components';

function CrewBox({ cat }) {
  return (
    <Container>
      <Num>3개</Num>
      <Tit>{cat === 'recruit' ? '모집중인 크루' : '참여중인 크루'}</Tit>
      <CrewCat>
        <li>
          <h4>스터디</h4>
          <p>2</p>
        </li>
        <li>
          <h4>취미</h4>
          <p>2</p>
        </li>
      </CrewCat>
    </Container>
  );
}

export default CrewBox;

const Container = styled('div')`
  width: 100%;
  height: 182px;
  cursor: pointer;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgb(0 0 0 / 10%);

  @media screen and (max-width: 820px) {
    height: calc((100vw - 56px) / 2);
    justify-content: flex-start;
    padding: 8px;
  }

  @media screen and (max-width: 300px) {
    padding: 4px;
    height: calc((100vw - 28px) / 2);
  }
`;

const Num = styled('p')`
  margin: 18px 0 6px;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: #00b7ff;

  @media screen and (max-width: 820px) {
    margin: 10px 0 10px;
  }

  @media screen and (max-width: 300px) {
    margin: 0 0 4px;
  }
`;

const Tit = styled('p')`
  margin-bottom: 35px;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;

  @media screen and (max-width: 820px) {
    margin-bottom: 0;
  }

  @media screen and (max-width: 300px) {
    letter-spacing: -0.03em;
  }
`;

const CrewCat = styled('ul')`
  display: flex;
  gap: 12px;

  li {
    width: 100%;
    height: 50px;
    border-radius: 10px;
    color: #fff;

    &:first-child {
      background-color: #0f3fa6;
    }

    &:last-child {
      background-color: #f7971e;
    }

    h4 {
      font-size: 13px;
      font-weight: 400;
      text-align: center;
      margin-top: 4px;
    }

    p {
      font-size: 18px;
      font-weight: 700;
      text-align: center;
      line-height: 1;
      margin-top: 4px;
    }
  }

  @media screen and (max-width: 820px) {
    margin-top: auto;
    gap: 10px;
  }

  @media screen and (max-width: 300px) {
    gap: 4px;
  }
`;
