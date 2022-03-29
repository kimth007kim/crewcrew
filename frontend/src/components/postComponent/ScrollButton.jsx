import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import ButtonScrollTop from '../../assets/images/ButtonScrollTop.png';
import ButtonScrollBottom from '../../assets/images/ButtonScrollBottom.png';

function ScrollButton() {
  const [buttonTopDis, setButtonTopDis] = useState(true);
  const [buttonBottomDis, setButtonBottomDis] = useState(false);

  const handleClickScrollTop = useCallback(() => {
    if (!buttonTopDis) {
      window.scrollTo(0, 0);
    }
  }, [buttonTopDis]);

  const handleClickScrollBot = useCallback(() => {
    const body = document.querySelector('body');

    if (!buttonBottomDis) {
      window.scrollTo(0, body.offsetHeight);
    }
  }, [buttonBottomDis]);

  const isDisable = () => {
    const scrollTop = window.scrollY;
    const body = document.querySelector('body');

    if (scrollTop <= 100) {
      setButtonTopDis(true);
    } else {
      setButtonTopDis(false);
    }
    // eslint-disable-next-line no-restricted-globals
    if (scrollTop >= body.offsetHeight - screen.availHeight) {
      setButtonBottomDis(true);
    } else {
      setButtonBottomDis(false);
    }
  };

  // Sticky Menu Area
  useEffect(() => {
    window.addEventListener('scroll', isDisable);
    return () => {
      window.removeEventListener('scroll', isDisable);
    };
  });

  return (
    <Container>
      <ScrollTopCircle isDisable={buttonTopDis} onClick={handleClickScrollTop} />
      <ScrollButtonCircle isDisable={buttonBottomDis} onClick={handleClickScrollBot} />
    </Container>
  );
}

export default ScrollButton;

const Container = styled('div')`
  position: fixed;
  width: 45px;
  height: 110px;
  right: 45px;
  bottom: 45px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 9;
  @media screen and (max-width: 820px) {
    display: none;
  }
`;

const ScrollTopCircle = styled('div')`
  width: 45px;
  height: 45px;
  background-size: 100% !important;
  cursor: pointer;
  opacity: 1;
  transition: 0.3s;
  background: url(${ButtonScrollTop});
  ${(props) =>
    props.isDisable &&
    css`
      opacity: 0.3;
      cursor: default;
    `}
`;

const ScrollButtonCircle = styled('div')`
  width: 45px;
  height: 45px;
  background-size: 100% !important;
  cursor: pointer;
  opacity: 1;
  transition: 0.3s;
  background: url(${ButtonScrollBottom});
  ${(props) =>
    props.isDisable &&
    css`
      opacity: 0.3;
      cursor: default;
    `}
`;
