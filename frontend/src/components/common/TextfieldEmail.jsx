import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import delImage from '@/assets/images/InputDel.png';

function Textfield({
  type = 'text',
  onChange,
  value,
  valid,
  validMessage,
  label,
  onDelete,
  disabled = false,
  isKeep = false,
  focus,
  otherHover,
}) {
  const [Focused, setFocused] = useState(false);
  const [Hover, setHover] = useState(false);
  const InputRef = useRef(null);

  const HandleOnFocus = useCallback((e) => {
    setFocused(true);
  }, []);

  const HandleOnBlur = useCallback(() => {
    setFocused(false);
  }, []);

  const HandleOnHover = useCallback((e) => {
    setHover(true);
  }, []);

  const HandleOutHover = useCallback(() => {
    setHover(false);
  }, []);

  useEffect(() => {
    if (disabled) {
      HandleOnBlur();
      InputRef.current.blur();
    }

    if (focus) {
      InputRef.current.focus();
    }
  }, [disabled, focus]);

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
        otherHover={otherHover}
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
        TextIn={!!value}
      />
      <InputText Focused={Focused || isKeep} Valid={valid}>
        {validMessage}
      </InputText>
    </Wrapper>
  );
}

export default Textfield;

const Wrapper = styled.div`
  position: relative;
  height: 64px;
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
  padding-right: 48px;

  ${(props) =>
    props.Hover &&
    css`
      border-color: #707070;
      ${props.otherHover && `border-color: #00b7ff;`}
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

  &:disabled {
    color: #a8a8a8;
    border-color: #e2e2e2;
    background-color: #fff;
  }
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

const InputText = styled.div`
  font-size: 10px;
  text-align: center;
  font-weight: 300;
  position: absolute;
  width: 100%;
  top: 50px;
  opacity: 0;
  transition: 0.5s;
  user-select: none;
  color: #00b7ff;

  ${(props) =>
    props.Focused &&
    css`
      opacity: 1;
      top: 54px;
    `}

  ${(props) =>
    props.Valid &&
    css`
      opacity: 1;
      top: 54px;
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
`;
