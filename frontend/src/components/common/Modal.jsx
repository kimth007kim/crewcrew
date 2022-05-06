/* eslint-disable indent */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useState } from 'react';
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
    if (LocalVisible && !visible) {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 1000);
    }
    setLocalVisible(visible);
  }, [LocalVisible, visible]);

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

const DownTop = keyframes`
    from{
      height: 0;
    } to {
      height: calc(100vh - 40px);
    }
`;

const TopDown = keyframes`
    from{
      height: calc(100vh - 40px);
    } to {
      height: 0;
    }
`;

const ModalBg = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
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

  z-index: 1;
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
      width: 980px;
    `}

  @media screen and (max-width: 820px) {
    width: 100%;
    border-radius: 20px 20px 0 0;
    margin-top: 40px;
    height: calc(100vh - 40px);
    position: fixed;
    bottom: 0;
    animation-name: ${DownTop};
    ${(props) =>
      props.disappear &&
      css`
        animation-name: ${TopDown};
      `}
  }
`;

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 820px) {
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    ${ModalBox} {
      margin-top: 40px;
    }
  }
`;
