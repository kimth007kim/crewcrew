import React from 'react';
import styled from 'styled-components';
import TimelineCard from './TimelineCard';

function Timeline() {
  return (
    <Container>
      <TimelineCard />
      <TimelineCard />
      <TimelineCard />
      <TimelineCard />
    </Container>
  );
}

export default Timeline;

const Container = styled('div')`
  padding: 0 20px;
  height: 278px;
  position: relative;
  display: flex;

  ::before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    height: 1px;
    width: 100%;
    background-color: #707070;
  }

  @media screen and (max-width: 820px) {
    flex-direction: column;
    height: auto;
    padding: 0;

    ::before {
      display: none;
    }
  }
`;
