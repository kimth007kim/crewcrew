import React from 'react';
import styled, { css } from 'styled-components';

export const LabelBtn = styled('label')`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
  color: #a8a8a8;
  font-size: 15px;
  font-weight: 500;
  border: 1px solid #e2e2e2;
  outline: none;
  transition: 0.3s;
`;

export const InputHide = styled('input')`
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  position: absolute;
  display: none;

  &:checked + ${LabelBtn} {
    ${(props) =>
      props.bgColor &&
      css`
        background-color: ${props.bgColor};
        border-color: transparent;
        color: #fff;
        @media screen and (max-width: 820px) {
          color: ${props.bgColor};
        }
      `}
  }
`;
