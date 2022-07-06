import React, { useCallback } from 'react';
import styled from 'styled-components';

function ProfileTooltip({ children, show, onCloseModal, style }) {
  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  if (!show) {
    return null;
  }
  return (
    <CreateTooltip onClick={onCloseModal}>
      <div onClick={stopPropagation} style={style}>
        {children}
      </div>
    </CreateTooltip>
  );
}

export default ProfileTooltip;

const CreateTooltip = styled('div')`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 1000;
  & > div {
    position: absolute;
    display: inline-block;
    user-select: none;
    z-index: 512;
  }
`;
