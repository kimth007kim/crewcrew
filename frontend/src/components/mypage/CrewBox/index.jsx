import React from 'react';
import styled from 'styled-components';
import BoxCard from './BoxCard';

function CrewBox() {
  return (
    <Container>
      <h3>내 크루 현황 관리</h3>
      <p>나와 관련된 크루들의 현황을 이곳에서 관리하세요!</p>
      <CrewBoxWrap>
        <BoxCard />
        <BoxCard />
        <BoxCard />
        <BoxCard />
      </CrewBoxWrap>
    </Container>
  );
}

export default CrewBox;

const Container = styled('div')`
  width: 100%;

  h3 {
    margin-top: 20px;
  }

  & > p {
    margin-top: 8px;
    font-size: 13px;
    color: #868686;
    font-weight: 400;
  }

  @media screen and (max-width: 820px) {
    padding: 0 20px;
    box-sizing: border-box;
  }

  @media screen and (max-width: 300px) {
    padding: 0 10px;
  }
`;

const CrewBoxWrap = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  margin-top: 20px;

  @media screen and (max-width: 820px) {
    gap: 16px;
  }

  @media screen and (max-width: 300px) {
    gap: 8px;
  }
`;
