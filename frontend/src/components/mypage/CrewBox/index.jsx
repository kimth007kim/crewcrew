import React from 'react';
import styled from 'styled-components';

function CrewBox() {
  return (
    <Container>
      <h3>내 크루 현황 관리</h3>
      <p>나와 관련된 크루들의 현황을 이곳에서 관리하세요!</p>
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
`;
