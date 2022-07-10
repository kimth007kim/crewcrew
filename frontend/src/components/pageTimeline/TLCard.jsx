import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import LogInCheckOff from '@/assets/images/LogInCheck_off.png';
import LogInCheckOn from '@/assets/images/LogInCheck_on.png';
import ChatShow from '@/assets/images/ChatShow.png';
function TLCard() {
  const [checked, setChecked] = useState(false);

  const checkProp = () => {
    setChecked((state) => !state);
  };
  return (
    <>
      <TLCardSet>
        <InputHide type={'checkbox'} id="timeline1" onChange={checkProp} />
        <LabelCheck checked={checked} htmlFor="timeline1">
          <span />
        </LabelCheck>
      </TLCardSet>
      <TLCardboxWrapper>
        <TLCardbox Cat={'hobby'} State={'posi'} Disabled={'disabled'}>
          <Title Cat={'hobby'} Disabled={'disabled'}>
            <em>요리</em>22/05/25 15:38
          </Title>
          <Detail State={'posi'} Disabled={'disabled'}>
            <em>재영</em>님이 회원님의 글에 <b>참여요청</b>하였습니다.
          </Detail>
        </TLCardbox>
      </TLCardboxWrapper>
    </>
  );
}

export default TLCard;

const TLCardSet = styled('div')`
  width: 0;
  padding-top: 34px;
  transition: 0.5s;
  overflow: hidden;

  ${(props) =>
    props.on &&
    css`
      width: 48px;
    `}
`;

const LabelCheck = styled('label')`
  display: block;
  line-height: 21px;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;

  span {
    display: block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background: url(${LogInCheckOff}) center/100% no-repeat;
    transition: background 0.2s;
  }

  ${(props) =>
    props.checked &&
    css`
      span {
        background: url(${LogInCheckOn});
        background-size: 100%;
      }
    `}
`;

const InputHide = styled('input')`
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  position: absolute;
  display: none;
`;

const TLCardboxWrapper = styled('div')`
  padding: 34px 0 6px;
  width: 100%;
  border-left: 1px solid #e2e2e2;

  @media screen and (max-width: 820px) {
    padding: 18px 0 0;
  }
`;

const TLCardbox = styled('div')`
  margin-left: 22px;
  height: 100px;
  border-radius: 10px;
  background-color: #fff;
  border: 2px solid #e2e2e2;
  position: relative;
  padding: 12px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.3s;

  &::before {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    left: -34px;
    top: 0;
    box-sizing: border-box;
  }

  @media screen and (max-width: 820px) {
    padding: 10px;
    height: auto;
    margin-left: 15px;

    &::before {
      width: 14px;
      height: 14px;
      left: -25px;
    }
  }

  ${(props) =>
    props.State === 'posi'
      ? css`
          &::before {
            border: 3px solid #00b7ff;
          }
        `
      : css`
          &::before {
            border: 3px solid #ff0045;
          }
        `}
  ${(props) =>
    props.Disabled === 'disabled' &&
    css`
      &::after {
        content: '읽음';
        display: block;
        width: 20px;
        text-align: center;
        position: absolute;
        padding-top: 20px;
        font-size: 11px;
        color: #a8a8a8;
        top: 10px;
        right: 14px;
        background: url(${ChatShow}) top center/20px no-repeat;

        @media screen and (max-width: 820px) {
          padding-top: 2px;
          text-indent: -9999px;
          top: 9px;
        }
      }
    `}
`;

const Title = styled('p')`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  color: #a8a8a8;

  em {
    font-size: 20px;
    margin-right: 18px;
  }

  @media screen and (max-width: 820px) {
    em {
      font-size: 15px;
      margin-right: 8px;
    }
  }

  ${(props) =>
    props.Cat === 'study'
      ? css`
          em {
            color: #0f3fa6;
          }
        `
      : css`
          em {
            color: #f7971e;
          }
        `}
  ${(props) =>
    props.Disabled === 'disabled' &&
    css`
      em {
        color: #c4c4c4;
      }
    `}
`;

const Detail = styled('p')`
  font-size: 17px;
  font-weight: 500;
  color: #868686;
  margin-top: 18px;

  em {
    color: #000;
    font-weight: 700;
  }

  b {
    font-weight: 500;
  }

  @media screen and (max-width: 820px) {
    margin-top: 10px;
    line-height: 22px;
    font-size: 15px;
  }

  ${(props) =>
    props.State === 'posi'
      ? css`
          b {
            color: #00b7ff;
          }
        `
      : css`
          b {
            color: #ff0045;
          }
        `}
  ${(props) =>
    props.Disabled === 'disabled' &&
    css`
      b {
        color: #c4c4c4;
      }
    `}
`;
