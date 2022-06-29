import MyLayout from '@/components/common/MyLayout';
import MypageTop from '@/components/mypage/MypageTop';
import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import serchSmall from '@/assets/images/serchSmall.png';
import SettingWhite from '@/assets/images/SettingWhite.png';
import LogInCheck_off from '@/assets/images/LogInCheck_off.png';
import LogInCheck_on from '@/assets/images/LogInCheck_on.png';
import ChatBoxCard from '@/components/mypage/Chat/ChatBoxCard';

function Chat() {
  const [isSearch, setIsSearch] = useState(false);
  const [isSetting, setIsSetting] = useState(false);

  const toggleSearch = useCallback(() => {
    setIsSearch(!isSearch);
  }, [isSearch]);

  const toggleSetting = useCallback(() => {
    setIsSetting(!isSetting);
  }, [isSetting]);

  return (
    <MyLayout>
      <MypageTop title="채팅"></MypageTop>
      <Container>
        <SectionWrap>
          <BoxWrapper>
            <BoxHead>
              <h3>채팅 목록</h3>
              <button className="search" onClick={toggleSearch}></button>
              <ButtonSet active={isSetting} onClick={toggleSetting}></ButtonSet>
            </BoxHead>
            <ChatBoxSearch Search={isSearch}>
              <form action="">
                <SearchInputWrap>
                  <button></button>
                  <input type="text" placeholder="채팅 상대 또는 관련 모집글 이름/카테고리" />
                </SearchInputWrap>
              </form>
            </ChatBoxSearch>
            <ChatBoxBody Search={isSearch}>
              <form action="">
                <ChatBoxList>
                  <ChatBoxCard isSetting={isSetting}></ChatBoxCard>
                  <ChatBoxCard isSetting={isSetting}></ChatBoxCard>
                  <ChatBoxCard isSetting={isSetting}></ChatBoxCard>
                  <ChatBoxCard isSetting={isSetting}></ChatBoxCard>
                </ChatBoxList>
                <DeleteBox active={isSetting}>
                  <CheckAllBox>
                    <InputHide></InputHide>
                    <LabelCheck>
                      <span></span>
                    </LabelCheck>
                  </CheckAllBox>
                  <button type="reset">선택취소</button>
                  <button>삭제</button>
                </DeleteBox>
              </form>
            </ChatBoxBody>
          </BoxWrapper>
        </SectionWrap>
      </Container>
    </MyLayout>
  );
}

export default Chat;

const Container = styled('section')`
  min-height: calc(100vh - 131px);
  background-color: #f6f7fb;
  padding: 20px 0;
  box-sizing: border-box;

  form {
    display: content;
  }
`;

const SectionWrap = styled('div')`
  max-width: 850px;
  margin: auto;
  position: relative;
`;

const BoxWrapper = styled('div')`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgb(0 0 0 / 10%);
  overflow: hidden;
  position: relative;
`;

const BoxHead = styled('div')`
  height: 64px;
  border-bottom: 1px solid #a8a8a8;
  padding: 0 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 20px;

  h3 {
    margin-right: auto;
    font-size: 20px;
    font-weight: 700;
  }

  button {
    border: none;
    outline: none;
    cursor: pointer;
    &.search {
      text-indent: -9999px;
      width: 26px;
      height: 26px;
      background: transparent url(${serchSmall}) center/100% no-repeat;
    }
  }
`;

const ButtonSet = styled('button')`
  border: none;
  outline: none;
  cursor: pointer;
  text-indent: -9999px;
  width: 30px;
  height: 30px;
  border-radius: 5px;
  background: #c4c4c4 url(${SettingWhite}) center/16px no-repeat;
  transition: 0.3s;

  &:hover {
    ${(props) =>
      !props.active &&
      css`
        background-color: #b0b0b0;
      `};
  }

  ${(props) =>
    props.active &&
    css`
      background-color: #00a3e3;
    `};
`;

const ChatBoxSearch = styled('div')`
  height: 0;
  border-bottom: 1px solid #e2e2e2;
  overflow: hidden;
  transition: 0.5s;

  ${(props) =>
    props.Search &&
    css`
      height: 78px;
    `};
`;

const SearchInputWrap = styled('div')`
  margin: 14px 20px;
  width: calc(100% - 40px);
  height: 50px;
  border-radius: 35px;
  border: 1px solid #e2e2e2;
  padding: 0 20px 0 18px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 14px;

  button {
    width: 26px;
    height: 26px;
    margin-bottom: 2px;
    text-indent: -9999px;
    border: none;
    outline: none;
    cursor: pointer;
    background: transparent url(${serchSmall}) center/100%;
  }

  input {
    width: 100%;
    height: 100%;
    outline: none;
    border: none;
    font-size: 13px;
    color: #000;
    font-weight: 700;

    &::placeholder {
      color: #a8a8a8;
      font-weight: 500;
    }
  }
`;

const ChatBoxBody = styled('div')`
  height: calc(100vh - 236px);
  overflow-y: overlay;
  transition: 0.5s;

  ${(props) =>
    props.Search &&
    css`
      height: calc(100vh - 314px);
    `};
`;

const ChatBoxList = styled('ul')``;

const DeleteBox = styled('div')`
  width: 100%;
  height: 0;
  overflow-y: hidden;
  transition: 0.5s;
  background-color: #fff;
  border-top: 1px solid #e2e2e2;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
  padding-right: 5px;
  box-sizing: border-box;

  ${(props) =>
    props.active &&
    css`
      height: 60px;
    `};

  button {
    border: none;
    outline: none;
    cursor: pointer;
    width: 112px;
    height: 50px;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 700;
    color: #fff;
    transition: 0.3s;
    background-color: #f95884;

    &[type='reset'] {
      background-color: #c4c4c4;
    }
  }
`;

const CheckAllBox = styled('div')`
  width: 58px;
  height: 100%;
  border-right: 1px solid #e2e2e2;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: auto;
`;

const LabelCheck = styled('label')`
  display: flex;
  line-height: 21px;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;

  span {
    display: block;
    width: 20px;
    height: 20px;
    background: url(${LogInCheck_off}) center/100% no-repeat;
    transition: background 0.2s;
  }
`;

const InputHide = styled('input')`
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  position: absolute;
  display: none;
`;
