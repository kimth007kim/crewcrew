import React, { useCallback, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes, css } from 'styled-components';

function Modal({
  size = 'regular',
  visible = false,
  handleClose,
  close = false,
  header = null,
  body,
  footer = null,
  heightSize,
}) {
  const [LocalVisible, setLocalVisible] = useState(visible);
  const [Animate, setAnimate] = useState(visible);

  useEffect(() => {
    const anime = () => {
      return setTimeout(() => {
        setAnimate(false);
      }, 500);
    };
    if (LocalVisible && !visible) {
      setAnimate(true);
      anime();
    }
    setLocalVisible(visible);

    return () => {
      setLocalVisible(false);
      setAnimate(false);
      clearTimeout(anime);
    };
  }, [LocalVisible, visible]);

  const setScreenSize = useCallback(() => {
    // 모바일 vh이슈
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }, []);

  useEffect(() => {
    setScreenSize();
    window.addEventListener('resize', setScreenSize);

    return () => {
      window.removeEventListener('resize', setScreenSize);
    };
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.style.cssText = `
      position: fixed;
      top: -${window.scrollY}px;
      width: 100%;`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      if (parseInt(scrollY) < 0) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
  }, [visible]);

  if (!Animate && !LocalVisible) return null;

  return ReactDOM.createPortal(
    <Wrapper>
      <ModalBg onClick={close ? handleClose : () => {}} disappear={!visible} />
      <ModalBox disappear={!visible} size={size} heightSize={heightSize}>
        {header && header}
        {body && body}
        {footer && footer}
      </ModalBox>
    </Wrapper>,
    document.getElementById('modal-root'),
  );
}

export default Modal;

const FadeIn = keyframes`
    from{
        opacity:0;
    } to {
        opacity:1;
    }
`;

const FadeOut = keyframes`
    from{
        opacity:1;
    } to {
        opacity:0;
    }
`;

const ModalBg = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  position: absolute;
  top: 0;

  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${FadeIn};
  animation-fill-mode: forwards;

  ${(props) =>
    props.disappear &&
    css`
      animation-name: ${FadeOut};
    `}
`;

const ModalBox = styled.div`
  background-color: #fff;
  transition-property: opacity, top, bottom, padding;
  transition-duration: 0.5s;
  box-sizing: content-box;
  box-shadow: 0 0 30px rgb(0 0 0 / 16%);

  position: relative;
  overflow: hidden;
  border-radius: 20px;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${FadeIn};
  animation-fill-mode: forwards;
  ${(props) =>
    props.heightSize &&
    css`
      height: ${props.heightSize}px;
    `}

  ${(props) =>
    props.disappear &&
    css`
      animation-name: ${FadeOut};
    `}

  ${(props) =>
    props.size === 'regular' &&
    css`
      width: 534px;
    `}

  ${(props) =>
    props.size === 'medium' &&
    css`
      width: 700px;
    `}

  ${(props) =>
    props.size === 'large' &&
    css`
      width: 850px;
    `}

  @media screen and (max-width: 820px) {
    width: 100%;
    border-radius: 20px 20px 0 0;
    margin-top: 40px;
    /* height: calc(var(--vh, 1vh) * 100)-40px; */
    height: calc(100% - 40px);
    position: fixed;
    bottom: 0;
  }
`;

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2000;

  @media screen and (max-width: 820px) {
    justify-content: flex-end;
    /* height: calc(var(--vh, 1vh) * 100); */
    height: 100%;

    ${ModalBox} {
      margin-top: 40px;
    }
  }
`;
