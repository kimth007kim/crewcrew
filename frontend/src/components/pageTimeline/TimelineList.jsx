import React from 'react';
import styled, { css } from 'styled-components';
import TLComponent from './TLComponent';

function TimelineList() {
  return (
    <Container>
      <TLComponent></TLComponent>
    </Container>
  );
}

export default TimelineList;

const Container = styled('section')`
  min-height: calc(100vh - 240px);
  background-color: #f6f7fb;

  @media screen and (max-width: 820px) {
    padding: 0 20px;
  }

  @media screen and (max-width: 300px) {
    padding: 0 10px;
  }
`;
