import Textfield from '@/components/common/TextfieldEmail';
import { emojiSlice } from '@/utils';
import React, { forwardRef, useCallback, useState } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { Editor } from '@toast-ui/react-editor';
import Prism from 'prismjs';
// 여기 css를 수정해서 코드 하이라이팅 커스텀 가능
import 'prismjs/themes/prism.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';

import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import '@toast-ui/editor/dist/toastui-editor.css';

function MainContent({ state, text }, ref) {
  const [tooltipBool, setTooltipBool] = useState(false);

  const handleFocusTooltip = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setTooltipBool(true);
    },
    [tooltipBool],
  );

  const handleBlurTooltip = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      setTooltipBool(false);
    },
    [tooltipBool],
  );

  const onChangeInviteLink = useCallback((e) => {
    const value = emojiSlice(e.target.value);
    state.setInviteLink(value);
  }, []);

  const deleteInviteLink = useCallback((e) => {
    state.setInviteLink('');
  }, []);

  const onChangeTitleText = useCallback((e) => {
    let value = e.target.value;
    value = emojiSlice(value).slice(0, 30);
    state.setTitleText(value);
  }, []);

  const deleteTitleText = useCallback((e) => {
    state.setTitleText('');
  }, []);

  const stopEvent = useCallback((e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }, []);

  return (
    <>
      <ToolTipWrapper>
        <Title onClick={stopEvent}>
          초대링크 (필수){' '}
          <ToolTip onMouseOver={handleFocusTooltip} onMouseOut={handleBlurTooltip}>
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
            value={state.inviteLink}
            label=""
            validMessage={''}
            valid={false}
            onChange={onChangeInviteLink}
            onDelete={deleteInviteLink}
            disabled={false}
            otherHover
          />
        </InputBox>
      </ToolTipWrapper>
      <Title onClick={stopEvent}>제목</Title>
      <InputBox>
        <Textfield
          type="text"
          value={state.titleText}
          label=""
          validMessage={''}
          valid={false}
          onChange={onChangeTitleText}
          onDelete={deleteTitleText}
          disabled={false}
          otherHover
        />
      </InputBox>
      <Title>내용</Title>
      <Editor
        ref={ref}
        placeholder="내용을 입력해주세요."
        height="350px"
        initialEditType="markdown"
        useCommandShortcut={false}
        autofocus={false}
        initialValue={text ? text : ''}
        plugins={[[codeSyntaxHighlight, { highlighter: Prism }]]}
        toolbarItems={[
          // 툴바 옵션 설정
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['table', 'link'],
          ['code', 'codeblock'],
        ]}
        // * 주의! 이미지 추가시, 파일 업로드 형태가 아니라 이미지 자체를 base64로 인코딩한 형태의 img 태그로 말아주니 주의해서 사용하자!
      ></Editor>
    </>
  );
}

export default forwardRef(MainContent);

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

  @media screen and (max-width: 820px) {
    top: 30px;
    left: 0;
  }
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

const CustomEditor = styled(Editor)`
  .toastui-editor-defaultUI {
    border: 1px solid #00b7ff;
  }
`;
