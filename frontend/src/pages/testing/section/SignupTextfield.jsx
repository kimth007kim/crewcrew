import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import delImage from '../../../assets/images/InputDel.png';

function TextfieldSU({
  type = 'text',
  onChange,
  value,
  valid,
  label,
  onDelete,
  setFocus,
  disabled,
}) {
  const [Focused, setFocused] = useState(false);
  const [Hover, setHover] = useState(false);
  const InputRef = useRef(null);

  const HandleOnFocus = useCallback(() => {
    setFocused(true);
    setFocus(true);
  }, []);

  const HandleOnBlur = useCallback(() => {
    setFocused(false);
    setFocus(false);
  }, []);

  const HandleOnHover = useCallback(() => {
    setHover(true);
  }, []);

  const HandleOutHover = useCallback(() => {
    setHover(false);
  }, []);

  useEffect(() => {
    if (disabled) {
      HandleOnBlur();
    }
  }, [disabled]);

  return (
    <Wrapper onMouseEnter={HandleOnHover} onMouseLeave={HandleOutHover}>
      <Input
        type={type}
        ref={InputRef}
        onChange={onChange}
        onFocus={HandleOnFocus}
        onBlur={HandleOnBlur}
        value={value}
        Focused={Focused}
        Valid={valid}
        Hover={Hover}
        TextIn={!!value}
        autoComplete="off"
        disabled={disabled}
      />
      <Label Focused={Focused} TextIn={!!value} Valid={valid}>
        {label}
      </Label>
      <InputDel
        onMouseDown={(e) => {
          e.preventDefault();

          onDelete();
          InputRef.current.focus();
        }}
        TextIn={!!value && !disabled}
      />
    </Wrapper>
  );
}

export default TextfieldSU;

const Wrapper = styled.div`
  position: relative;
  height: 64px;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #e2e2e2;
  outline: none;
  padding: 16px 12px;
  box-sizing: border-box;
  font-size: 13px;

  ${(props) =>
    props.Hover &&
    css`
      border-color: #000;
    `};

  ${(props) =>
    (props.Focused || props.TextIn) &&
    css`
      border-color: #00b7ff;
      caret-color: #00b7ff;
    `};

  ${(props) =>
    props.Valid &&
    css`
      border-color: #ff0045;
      caret-color: #ff0045;
    `};
`;

const Label = styled.label`
  position: absolute;
  left: 8px;
  top: 13px;
  font-size: 13px;
  font-weight: 300;
  padding: 0 4px 0 7px;
  background-color: #fff;
  transition: 0.5s;
  line-height: 24px;
  user-select: none;
  pointer-events: none;
  color: #a8a8a8;

  ${(props) =>
    (props.Focused || props.TextIn) &&
    css`
      top: -12px;
      color: #00b7ff;
      font-size: 13px;
      font-weight: 500;
    `};

  ${(props) =>
    props.Focused &&
    css`
      color: #00b7ff;
    `}
  ${(props) =>
    props.Valid &&
    css`
      color: #ff0045;
    `}
`;

const InputDel = styled.div`
  width: 18px;
  height: 18px;
  background-image: url(${delImage});
  background-size: 100%;
  cursor: pointer;
  position: absolute;
  top: 16px;
  right: 15px;
  display: none;
  user-select: none;

  ${(props) =>
    props.TextIn &&
    css`
      display: block;
    `};

  @media screen and (max-width: 290px) {
    display: none;
  }
`;
