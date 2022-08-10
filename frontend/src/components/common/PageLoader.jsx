import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

function PageLoader({ type = 'spin', color = '#c4c4c4', height = 100, width = 100 }) {
  return (
    <Background>
      <ReactLoading type={type} color={color} height={height} width={width} />
    </Background>
  );
}
export default PageLoader;

const Background = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
