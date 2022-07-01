import React from 'react';
import styled from 'styled-components';
import CrewBox from './CrewBox';

function CrewBoxWrap() {
  return (
    <Container>
      <CrewBox cat={'recruit'} />
      <CrewBox cat={'participate'} />
    </Container>
  );
}

export default CrewBoxWrap;

const Container = styled('div')`
  width: 392px;
  margin: 40px auto 0;
  display: flex;
  gap: 28px;

  @media screen and (max-width: 820px) {
    width: calc(100vw - 40px);
    gap: 16px;
  }

  @media screen and (max-width: 300px) {
    width: calc(100vw - 20px);
    gap: 8px;
  }
`;
