import React from 'react';
import styled from 'styled-components';
import CrewBox from './CrewBox';
import InfoBox from './InfoBox';

function MypageMainTop() {
  return (
    <Container>
      <Wrapper>
        <InfoBox />
        <CrewBox />
      </Wrapper>
    </Container>
  );
}

export default MypageMainTop;

const Container = styled('section')`
  background-color: #f6f7fb;
  padding: 20px 0 58px;

  @media screen and (max-width: 820px) {
    padding: 20px 0 70px;
  }
`;

const Wrapper = styled('div')`
  max-width: 850px;
  margin: auto;
  position: relative;
  display: flex;
  gap: 30px;

  @media screen and (max-width: 820px) {
    padding: 0;
    flex-direction: column;
  }
`;
