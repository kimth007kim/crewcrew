import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PageArrowNext from '@/assets/images/PageArrowNext.png';
import Timeline from './Timeline';

function MypageTimeline() {
  return (
    <Container>
      <Wrapper>
        <TimeBox>
          <h4>
            <Link to="/">
              크루타임라인
              <span />
            </Link>
          </h4>
          <Timeline />
        </TimeBox>
      </Wrapper>
    </Container>
  );
}

export default MypageTimeline;

const Container = styled('section')`
  background-color: #f6f7fb;
  padding-bottom: 90px;
  @media screen and (max-width: 820px) {
    padding-bottom: 70px;
  }
`;

const Wrapper = styled('div')`
  max-width: 850px;
  margin: auto;
  position: relative;
  @media screen and (max-width: 820px) {
    padding: 0;
  }
`;

const TimeBox = styled('div')`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgb(0 0 0 / 10%);
  height: 394px;
  padding: 22px 25px 38px;
  box-sizing: border-box;

  h4 {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 30px;

    a {
      color: #000;
    }

    span {
      display: inline-block;
      margin-left: 16px;
      width: 6px;
      height: 14px;
      background: url(${PageArrowNext}) 50% 50%/6px no-repeat;
    }
  }

  @media screen and (max-width: 820px) {
    height: auto;
    padding: 20px 20px 0;
    h4 {
      margin-bottom: 34px;
      span {
        margin-left: 12px;
      }
    }
  }

  @media screen and (max-width: 300px) {
    padding: 20px 10px 0;
    h4 {
      margin-bottom: 20px;
    }
  }
`;
