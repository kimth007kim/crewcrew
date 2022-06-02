import Textfield from '@/components/common/TextfieldEmail';
import { emojiSlice } from '@/utils';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

function MainContent() {
  const [tooltipBool, setTooltipBool] = useState(false);
  const [inviteLink, setInviteLink] = useState('');
  const [titleText, setTitleText] = useState('');

  const handleFocusTooltip = useCallback(() => {
    setTooltipBool(true);
  }, [tooltipBool]);

  const handleBlurTooltip = useCallback(() => {
    setTooltipBool(false);
  }, [tooltipBool]);

  const onChangeInviteLink = useCallback((e) => {
    const value = emojiSlice(e.target.value);
    setInviteLink(value);
  }, []);

  const deleteInviteLink = useCallback((e) => {
    setInviteLink('');
  }, []);

  const onChangeTitleText = useCallback((e) => {
    const value = e.target.value;
    setTitleText(value);
  }, []);

  const deleteTitleText = useCallback((e) => {
    setTitleText('');
  }, []);

  return (
    <>
      <ToolTipWrapper>
        <Title>
          초대링크 (필수){' '}
          <ToolTip onMouseOver={handleFocusTooltip} onMouseLeave={handleBlurTooltip}>
            ?
          </ToolTip>
        </Title>
        <ToolTipDesc active={tooltipBool}>
          모집글에 지원하는 작성자가 합격 후 참여할 수 있는 채팅방의 링크를 생성 후 이곳에
          기입해주세요! 가입한 링크는 합격자에게만 보여집니다.
          <br />
          예시) 카카오톡 오픈채팅방 링크
        </ToolTipDesc>
        <InputBox>
          <Textfield
            type="text"
            value={inviteLink}
            label=""
            validMessage={''}
            valid={false}
            onDelete={onChangeTitleText}
            onChange={onChangeInviteLink}
            disabled={false}
          />
        </InputBox>
      </ToolTipWrapper>
      <Title>제목</Title>
      <InputBox>
        <Textfield
          type="text"
          value={titleText}
          label=""
          validMessage={''}
          valid={false}
          onChange={deleteTitleText}
          onDelete={deleteTitleText}
          disabled={false}
        />
      </InputBox>
    </>
  );
}

export default MainContent;

const ToolTipWrapper = styled('div')`
  position: relative;
`;

const Title = styled('h4')`
  font-size: 13px;
  font-weight: 500;
  color: #a8a8a8;
  margin-bottom: 8px;
`;

const ToolTipDesc = styled('div')`
  display: none;
  position: absolute;
  max-width: 356px;
  width: 100%;
  z-index: 10;
  background-color: #fff;
  padding: 14px 12px;
  box-sizing: border-box;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  box-shadow: 4px 4px 4px rgb(0 0 0 / 16%);
  font-size: 13px;
  line-height: 18px;
  color: #707070;
  top: 35px;
  left: 100px;
  opacity: 0;
  transition: 0.3s;
  ${(props) =>
    props.active &&
    css`
      display: block;
      opacity: 1;
    `};
`;

const ToolTip = styled('span')`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  border-radius: 10px;
  border: 1px solid #e2e2e2;
  font-size: 13px;
  font-weight: 700;
  color: #a8a8a8;
  user-select: none;
`;

const InputBox = styled('div')`
  position: relative;
  margin-bottom: 16px;
`;
