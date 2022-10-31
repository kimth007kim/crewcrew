import React from 'react';
import styled from 'styled-components';
import IconLinkIntro from '@/assets/images/IconLinkIntro.png';

function ButtonIntro() {
  return (
    <ButtonIntroComponent
      href="https://github.com/kimth007kim/crewcrew"
      target="_blank"
      rel="noreferrer"
    />
  );
}

export default ButtonIntro;

const ButtonIntroComponent = styled('a')`
  width: 45px;
  height: 45px;
  background: url(${IconLinkIntro}) 50% 50%;
  background-size: 100% !important;
  cursor: pointer;
  position: absolute;
  top: 42px;
  right: 45px;
  opacity: 0.5;
  transition: 0.3s;

  @media screen and (max-width: 820px) {
    width: 24px;
    height: 24px;
    right: 20px;
    opacity: 1;
    top: 10px;
  }

  @media screen and (max-width: 300px) {
    right: 10px;
  }
`;
