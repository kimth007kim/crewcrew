import React from 'react';
import styled from 'styled-components';
import Spinner from './Spinner';

function Button({
  types = 'fill',
  size = 'regular',
  color = 'darkblue',
  loadings = false,
  disabled = false,
  onClick = () => {},
  widthSize,
  heightSize,
  children,
}) {
  return (
    <ButtonStyled
      types={types}
      size={size}
      color={color}
      loadings={loadings}
      disabled={disabled}
      onClick={onClick}
      widthSize={widthSize}
      heightSize={heightSize}
    >
      {loadings && (
        <ButtonSpinner>
          <Spinner />
        </ButtonSpinner>
      )}
      {children}
    </ButtonStyled>
  );
}

const handleSize = ({ size }) => {
  switch (size) {
    case 'supersmall':
      return `
            min-width: 68px;
            min-height: 36px;
            padding: 6px;
            font-size: var(--fs-b2);
            line-height: var(--lh-b2);
              `;
    case 'small':
      return `
            min-width: 36px;
            min-height: 36px;
            padding: 6px 15px;
            font-size: var(--fs-b2);
            line-height: var(--lh-b2);
              `;
    case 'fullsmall':
      return `
        min-width: 100%;
        height: 40px;
        padding: 8px 16px;
        font-size: 13px;
        font-weight: 400;
        line-height: 20px;
        border-radius: 6px;
      `;

    case 'fullregular':
      return `
              min-width: 100%;
              min-height: 50px;
              padding: 10px 14px;
              font-size: 20px;
              line-height: 26px;
              border-radius: 10px;
          `;

    case 'large':
      return `
              min-width: 120px;
              min-height: 56px;
              padding: 14px;
              font-size: var(--fs-b1);
              line-height: var(--lh-b1);
          `;

    case 'fulllarge':
      return `
              min-width: 100%;
              min-height: 56px;
              padding: 14px;
              font-size: var(--fs-b1);
              line-height: var(--lh-b1);
          `;
    case 'regular':
    default:
      return `
            min-width: 120px;
            min-height: 40px;
            padding: 8px 14px;
            font-size: var(--fs-b2);
            line-height: var(--lh-b2);
        `;
  }
};

const Colors = {
  darkblue: {
    fill: `
            --text: #fff;
            --bg: #001881;
            --line: #001881;
            --text-hover: #fff;
            --bg-hover: #005ec5;
            --line-hover: #005ec5;
            --text-disabled: #fff;
            --bg-disabled: #e2e2e2;
            --line-disabled: #e2e2e2;
        `,
    line: `
            --text: var(--button_text_white);
            --bg: var(--button_base_blue);
            --line: var(--button_base_blue);
            --text-hover: var(--button_text_white);
            --bg-hover: var(--button_hover_base_deepBlue);
            --line-hover: var(--button_hover_base_deepBlue);
            --text-disabled: var(--button_disabled_text_gray);
            --bg-disabled: var(--button_disabled_base_gray);
            --line-disabled: var(--button_disabled_base_gray);
        `,
    text: `
            --text: var(--button_text_blue);
            --bg: var(--button_base_white);
            --line: var(--button_base_white);
            --text-hover: var(--button_text_blue);
            --bg-hover: var(--button_hover_base_lightBlue);
            --line-hover: var(--button_hover_base_lightBlue);
            --text-disabled: var(--button_disabled_text_gray);
            --bg-disabled: var(--button_base_white);
            --line-disabled: var(--button_base_white);
        `,
  },
  violet: {
    fill: `
            --text: var(--button_text_white);
            --bg: var(--button_base_violet);
            --line: var(--button_base_violet);
            --text-hover: var(--button_text_white);
            --bg-hover: var(--button_hover_base_deepViolet);
            --line-hover: var(--button_hover_base_deepViolet);
            --text-disabled: var(--button_disabled_text_gray);
            --bg-disabled: var(--button_disabled_base_gray);
            --line-disabled: var(--button_disabled_base_gray);
        `,
    line: `
        --text: var(--button_text_violet);
        --bg: var(--button_base_white);
        --line: var(--button_line_gray);
        --text-hover: var(--button_text_violet);
        --bg-hover: var(--button_hover_base_lightViolet);
        --line-hover: var(--button_hover_line_violet);
        --text-disabled: var(--button_disabled_text_gray);
        --bg-disabled: var(--button_base_white);
        --line-disabled: var(--button_line_gray);
    `,
    text: `
        --text: var(--button_text_violet);
        --bg: var(--button_base_white);
        --line: var(--button_base_white);
        --text-hover: var(--button_text_violet);
        --bg-hover: var(--button_hover_base_lightViolet);
        --line-hover: var(--button_hover_base_lightViolet);
        --text-disabled: var(--button_disabled_text_gray);
        --bg-disabled: var(--button_base_white);
        --line-disabled: var(--button_base_white);
    `,
  },
  red: {
    fill: `
            --text: var(--button_text_white);
            --bg: var(--button_base_red);
            --line: var(--button_base_red);
            --text-hover: var(--button_text_white);
            --bg-hover: var(--button_hover_base_red);
            --line-hover: var(--button_hover_base_red);
            --text-disabled: var(--button_disabled_text_gray);
            --bg-disabled: var(--button_disabled_base_gray);
            --line-disabled: var(--button_disabled_base_gray);
        `,
    line: `
        --text: var(--button_text_white);
        --bg: var(--button_base_violet);
        --line: var(--button_base_violet);
        --text-hover: var(--button_text_white);
        --bg-hover: var(--button_hover_base_deepViolet);
        --line-hover: var(--button_hover_base_deepViolet);
        --text-disabled: var(--button_disabled_text_gray);
        --bg-disabled: var(--button_disabled_base_gray);
        --line-disabled: var(--button_disabled_base_gray);
    `,
    text: `
        --text: var(--button_text_red);
        --bg: var(--button_base_white);
        --line: var(--button_base_white);
        --text-hover: var(--button_text_red);
        --bg-hover: var(--button_hover_base_lightCoral);
        --line-hover: var(--button_hover_base_lightCoral);
        --text-disabled: var(--button_disabled_text_gray);
        --bg-disabled: var(--button_base_white);
        --line-disabled: var(--button_base_white);
    `,
  },
  lightViolet: {
    fill: `
            --text: var(--button_text_violet);
            --bg: var(--button_base_lightViolet);
            --line: var(--button_base_lightViolet);
            --text-hover: var(--button_text_violet);
            --bg-hover: var(--button_hover_base_violet);
            --line-hover: var(--button_hover_base_violet);
            --text-disabled: var(--button_disabled_text_gray);
            --bg-disabled: var(--button_disabled_base_gray);
            --line-disabled: var(--button_disabled_base_gray);`,
    line: `
            --text: var(--button_text_violet);
            --bg: var(--button_base_white);
            --line: var(--button_line_gray);
            --text-hover: var(--button_text_violet);
            --bg-hover: var(--button_hover_base_lightViolet);
            --line-hover: var(--button_hover_line_violet);
            --text-disabled: var(--button_disabled_text_gray);
            --bg-disabled: var(--button_base_white);
            --line-disabled: var(--button_line_gray);
           `,
    text: `
            --text: var(--button_text_violet);
            --bg: var(--button_base_white);
            --line: var(--button_base_white);
            --text-hover: var(--button_text_violet);
            --bg-hover: var(--button_hover_base_lightViolet);
            --line-hover: var(--button_hover_base_lightViolet);
            --text-disabled: var(--button_disabled_text_gray);
            --bg-disabled: var(--button_base_white);
            --line-disabled: var(--button_base_white);
          `,
  },

  gray: {
    fill: `
            --text: var(--button_disabled_text_gray);
            --bg: var(--button_disabled_base_gray);
            --line: var(--button_disabled_base_gray);
            --text-hover: var(--button_disabled_text_gray);
            --bg-hover: var(--button_disabled_base_gray);
            --line-hover: var(--button_disabled_base_gray);
            --text-disabled: var(--button_disabled_text_gray);
            --bg-disabled: var(--button_disabled_base_gray);
            --line-disabled: var(--button_disabled_base_gray);
        `,
    line: `
        --text: var(--button_text_gray);
        --bg: var(--button_base_white);
        --line: var(--button_line_gray);
        --text-hover: var(--button_text_gray);
        --bg-hover: var(--button_hover_base_lightViolet);
        --line-hover: var(--button_hover_line_violet);
        --text-disabled: var(--button_disabled_text_gray);
        --bg-disabled: var(--button_base_white);
        --line-disabled: var(--button_line_gray);
    `,
    text: `
        --text: var(--button_text_gray);
        --bg: var(--button_base_white);
        --line: var(--button_base_white);
        --text-hover: var(--button_text_gray);
        --bg-hover: var(--button_hover_base_gray);
        --line-hover: var(--button_hover_base_gray);
        --text-disabled: var(--button_disabled_text_gray);
        --bg-disabled: var(--button_base_white);
        --line-disabled: var(--button_base_white);
    `,
  },
  black: {
    fill: `
            --text: var(--button_disabled_text_gray);
            --bg: var(--button_disabled_base_gray);
            --line: var(--button_disabled_base_gray);
            --text-hover: var(--button_disabled_text_gray);
            --bg-hover: var(--button_disabled_base_gray);
            --line-hover: var(--button_disabled_base_gray);
            --text-disabled: var(--button_disabled_text_gray);
            --bg-disabled: var(--button_disabled_base_gray);
            --line-disabled: var(--button_disabled_base_gray);
        `,
    line: `
        --text: var(--button_text_gray);
        --bg: var(--button_base_white);
        --line: var(--button_line_gray);
        --text-hover: var(--button_text_gray);
        --bg-hover: var(--button_hover_base_lightViolet);
        --line-hover: var(--button_hover_line_violet);
        --text-disabled: var(--button_disabled_text_gray);
        --bg-disabled: var(--button_base_white);
        --line-disabled: var(--button_line_gray);
    `,
    text: `
        --text: var(--button_text_black);
        --bg: var(--button_base_white);
        --line: var(--button_base_white);
        --text-hover: var(--button_text_black);
        --bg-hover: var(--button_hover_base_lightViolet);
        --line-hover: var(--button_hover_base_lightViolet);
        --text-disabled: var(--button_disabled_text_gray);
        --bg-disabled: var(--button_base_white);
        --line-disabled: var(--button_base_white);
    `,
  },
};

const handleColors = ({ color, types, loadings }) => {
  if (loadings) {
    return `
              --text: #fff;
              --bg: #eeeeee;
              --line: #eeeeee;
              --text-hover: #fff;
              --bg-hover: #eeeeee;
              --line-hover: #eeeeee;
              --text-disabled: #9e9e9e;
              --bg-disabled: #eeeeee;
              --line-disabled: #eeeeee;
              cursor: default;
          `;
  }
  return Colors[color][types];
};

const ButtonStyled = styled.button`
  position: relative;
  border: 1px solid transparent;
  font-weight: 500;
  cursor: pointer;
  transition: 0.3s;

  ${handleSize}
  ${handleColors}

  background-color: var(--bg);
  color: var(--text);
  border-color: var(--line);

  &:hover {
    background-color: var(--bg-hover);
    color: var(--text-hover);
    border-color: var(--line-hover);
  }
  &:disabled {
    background-color: var(--bg-disabled);
    color: var(--text-disabled);
    border-color: var(--line-disabled);
    cursor: default;
  }
  ${(props) => props.widthSize && `min-width: ${props.widthSize}px;`}
  ${(props) => props.heightSize && `min-height: ${props.heightSize}px;`}
`;

const ButtonSpinner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #eeeeee;
  border-radius: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Button;
