import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import InfoInputList from '../InfoInputList';

function MyInfoInput({ open }) {
  return (
    <>
      <InfoBody open={open}>
        <InfoInputList />
      </InfoBody>
      {open && <ButtonSave>저장</ButtonSave>}
    </>
  );
}

export default MyInfoInput;

const InfoBody = styled('div')`
  height: auto;
  @media screen and (max-width: 820px) {
    margin-top: 12px;
    overflow: hidden;
    transition: 0.5s;
    height: 0px;
    ${(props) =>
      props.open &&
      css`
        height: ${props.open && '300px'};
      `}
  }
`;

const ButtonSave = styled('button')`
  border: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  transition: 0.3s;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  line-height: 26px;
  background-color: #00b7ff;
  height: 50px;
  color: #fff;
  margin-top: auto;
  margin-left: auto;
  width: 112px;

  :hover {
    background-color: #005ec5;
  }

  @media screen and (max-width: 820px) {
    width: 100%;
    :hover {
      background-color: #00b7ff !important;
    }
  }
`;
