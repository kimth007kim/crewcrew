import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import delImage from '@/assets/images/InputDel.png';
import PWshow from '@/assets/images/PasswordShow.png';
import PWon from '@/assets/images/PasswordShow_On.png';
import PWError from '@/assets/images/PasswordShow_Error.png';

function TextfieldPW({
  onChange,
  value,
  valid,
  validMessage,
  label,
  onDelete,
  disabled = false,
  focus,
}) {
  const [Focused, setFocused] = useState(false);
  const [Hover, setHover] = useState(false);
  const InputRef = useRef(null);
  const [InputType, setInputType] = useState('password');

  const HandleOnFocus = useCallback(() => {
    setFocused(true);
  }, []);

  const HandleOnBlur = useCallback(() => {
    setFocused(false);
  }, []);

  const HandleOnHover = useCallback(() => {
    setHover(true);
  }, []);

  const HandleOutHover = useCallback(() => {
    setHover(false);
  }, []);

  const HandleOnShowPw = useCallback(() => {
    if (InputType === 'password') {
      return setInputType('text');
    }
    return setInputType('password');
  }, [InputType]);

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
        type={InputType}
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
        TextIn={!!value}
      />
      <InputPWShow
        onClick={HandleOnShowPw}
        TextIn={!!value}
        active={InputType !== 'password'}
        Valid={valid}
      />
      <InputText Focused={Focused} Valid={valid}>
        {validMessage}
      </InputText>
    </Wrapper>
  );
}

export default TextfieldPW;

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

  ${(props) =>
    props.Focused &&
    css`
      opacity: 1;
      top: 54px;
      color: #00b7ff;
    `};

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

const InputPWShow = styled.div`
  width: 25px;
  height: 15px;
  background: url(${PWshow});
  background-size: 100%;
  cursor: pointer;
  position: absolute;
  top: 17px;
  right: 48px;
  transition: 0.3s;
  display: none;

  ${(props) =>
    props.TextIn &&
    css`
      display: block;
    `};

  ${(props) =>
    props.active &&
    css`
      background: url(${PWon});
      background-size: 100%;
    `};

  ${(props) =>
    props.Valid &&
    css`
      background: url(${PWError});
      background-size: 100%;
    `}
`;
