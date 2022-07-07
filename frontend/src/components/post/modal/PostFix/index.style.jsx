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
  transition-property: color border-color background-color;

  :hover {
    border-color: #00b7ff;
    color: #00b7ff;
  }
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

        :hover {
          background-color: #005ec5;
        }
      `}
  }

  @media screen and (max-width: 820px) {
    &:checked + ${LabelBtn} {
      ${(props) =>
        props.bgColor &&
        css`
          background-color: ${props.bgColor};
          border-color: transparent;
          color: #fff;

          :hover {
            background-color: ${props.bgColor};
          }
        `}
    }
  }
`;

export const ListFlex = styled('ul')`
  display: flex;
  margin-right: 24px;
  gap: 15px;

  li {
    width: 112px;
  }

  @media screen and (max-width: 820px) {
    gap: 8px;
    margin-right: 0;

    li {
      width: 100%;
    }
  }
`;
