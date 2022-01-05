import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes, css } from 'styled-components';

function Modal({ size = 'regular', visible = false, handleClose, close = false, header = null, body, footer = null }) {
  const element = useRef(null);
  const ignoreClick = useRef(false);
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

  //   const handleCloseModal = useCallback((event) => {
  //     if (ignoreClick.current) {
  //       ignoreClick.current = false;
  //       return;
  //     }

  //     const { target, currenTarget } = event;

  //     if (target !== currenTarget) {
  //       return;
  //     }

  //     handleClose();
  //   }, []);

  if (!Animate && !LocalVisible) return null;

  return ReactDOM.createPortal(
    <Wrapper>
      <ModalBg onClick={handleClose} disappear={!visible} />
      <ModalBox disappear={!visible}>
        <ModalCont>
          {header && <ModalHeader>{header}</ModalHeader>}
          {body && <ModalBody>{body}</ModalBody>}
          {footer && <ModalFooter>{footer}</ModalFooter>}
        </ModalCont>
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

const Wrapper = styled.section`
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBg = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;

  animation-duration: 1s;
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
  border-radius: 62px;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.16);
  z-index: 1;
  position: relative;

  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-name: ${FadeIn};
  animation-fill-mode: forwards;
  ${(props) =>
    props.disappear &&
    css`
      animation-name: ${FadeOut};
    `}
`;

// const ModalClose = styled.div`
//   position: absolute;
//   top: 50px;
//   right: 50px;
//   width: 14px;
//   height: 14px;
//   background: url('../../assets/images/ModalClose.png');
//   background-size: 100%;
//   cursor: pointer;
// `;

const ModalCont = styled.article`
  color: #868686;
`;

const ModalHeader = styled.header`
  padding: 32px 32px 0;
`;

const ModalBody = styled.div`
  padding: 0px 32px;
`;

const ModalFooter = styled.div`
  padding: 0 32px 32px;
`;
