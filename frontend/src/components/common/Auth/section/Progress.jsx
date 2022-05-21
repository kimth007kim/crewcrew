/* eslint-disable indent */
import React from 'react';
import styled, { css } from 'styled-components';
import { useRecoilValue } from 'recoil';
import { sectionProgress1, sectionProgress2, sectionProgress3 } from '@/atoms/register';

function Progress() {
  const Progress1 = useRecoilValue(sectionProgress1);
  const Progress2 = useRecoilValue(sectionProgress2);
  const Progress3 = useRecoilValue(sectionProgress3);
  return (
    <SignStep1>
      <li>
        <StepSlide progress1={Progress1.filter((p) => p.check === 1).length}>
          <StepBar1 />
        </StepSlide>
      </li>

      <li>
        <StepSlide progress2={Progress2.filter((p) => p.check === 1).length}>
          <StepBar2 />
        </StepSlide>
      </li>

      <li>
        <StepSlide progress3={Progress3.filter((p) => p.check === 1).length}>
          <StepBar3 />
        </StepSlide>
      </li>
    </SignStep1>
  );
}

export default Progress;

const SignStep1 = styled.ul`
  display: flex;
  margin-bottom: 80px;
  & > li {
    width: 100%;
    margin-right: 10px;
  }

  & > li:last-child {
    margin-right: 0;
  }
`;

const StepBar1 = styled.div``;

const StepBar2 = styled.div``;

const StepBar3 = styled.div``;

const StepSlide = styled.div`
  width: 100%;
  height: 5px;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  position: relative;

  ${StepBar1} {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 4px;
    border: none;
    transition: 0.5s;
    width: 0%;
    background-color: #00b7ff;
    ${(props) =>
      props.progress1 &&
      css`
        width: ${props.progress1 * 25}%;
      `};
  }

  ${StepBar2} {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 4px;
    border: none;
    transition: 0.5s;
    width: 0%;
    background-color: #00b7ff;
    ${(props) =>
      props.progress2 &&
      css`
        width: ${props.progress2 * 50}%;
      `};
  }

  ${StepBar3} {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 4px;
    border: none;
    transition: 0.5s;
    width: 0%;
    background-color: #00b7ff;
    ${(props) =>
      props.progress3 &&
      css`
        width: ${props.progress3 * 33.33333}%;
      `};
  }
`;
