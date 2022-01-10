import React from 'react';
import styled from 'styled-components';

function Spinner() {
  return (
    <SpinnerStyled>
      <div />
      <div />
      <div />
      <div />
    </SpinnerStyled>
  );
}

const SpinnerStyled = styled.div`
  position: relative;
  width: 20px;
  height: 20px;

  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 16px;
    height: 16px;
    margin: 2px;
    border: 2px solid #9e9e9e;
    border-radius: 50%;
    animation: loader 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: #9e9e9e transparent transparent transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes loader {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
