import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import SockJS from 'sockjs-client';
import useSWRInfinite from 'swr/infinite';
import { Client } from '@stomp/stompjs';
import MyLayout from '@/components/common/MyLayout';
import MypageTop from '@/components/mypage/MypageTop';
import IconFlag from '@/assets/images/IconFlag.png';
import IconPostArrow from '@/assets/images/IconPostArrow.png';
import { Cookies } from 'react-cookie';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import makeSection from '@/utils/makeSection';
import ChatList from '@/components/mypage/Chat/ChatList';
import axios from 'axios';

let client = null;

function ChatDetail() {
  const cookies = new Cookies();
  const currentRoomId = 'f32e57b2-519a-42e8-ab93-3db4335f12f7';
  const { data: myData } = useSWR(['/auth/token', cookies.get('X-AUTH-TOKEN')], fetcher);
  const {
    data: chatData,
    mutate: mutateChat,
    setSize,
  } = useSWRInfinite((index) => `/talk/room/${currentRoomId}/${index}`, fetcher);

  const [content, setContent] = useState('');

  let isReachingEnd = false;

  const chatBtnRef = useRef(null);
  const scrollbarRef = useRef(null);
  const inputRef = useRef(null);

  const onChangeContent = useCallback(
    (e) => {
      setContent(e.target.value);
    },
    [content],
  );

  const onSubmitContent = useCallback(
    (e) => {
      e.preventDefault();

      if (content?.trim() && client) {
        client.publish({
          destination: '/pub/chat/message',
          body: JSON.stringify({
            type: 'TALK',
            roomId: currentRoomId,
            uid: 1,
            content,
          }),
        });

        mutateChat().then(() => {
          setTimeout(() => {
            scrollbarRef.current?.scrollToBottom();
          }, 50);
          inputRef.current.focus();
        });
        setContent('');
      }
    },
    [content, client, myData],
  );

  const onKeyDownChat = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        if (!e.shiftKey) {
          e.preventDefault();
          onSubmitContent(e);
        }
      }
    },
    [onSubmitContent],
  );

  const readChat = () => {
    axios
      .patch(`/talk/room/${currentRoomId}/2`, {}, { withCredentials: true })
      .then((data) => {})
      .catch((err) => console.dir(err));
  };

  const subscribe = () => {
    if (client !== null) {
      client.subscribe(`/sub/chat/room/${currentRoomId}`, () => {
        mutateChat().then(() => {
          if (scrollbarRef.current) {
            if (
              scrollbarRef.current.getScrollHeight() <
              scrollbarRef.current.getClientHeight() + scrollbarRef.current.getScrollTop() + 50
            ) {
              scrollbarRef.current.scrollToBottom();
            }
          }
        });
      });
    }
  };

  const connect = () => {
    client = new Client({
      brokerURL: 'wss://api.crewcrew.org/ws-stomp',
      // connectHeaders: {
      //   login: myData.data.id,
      //   passcode: 'password',
      // },
      webSocketFactory: function () {
        return new SockJS('https://api.crewcrew.org/ws-stomp');
      },
      debug: function (log) {},

      onConnect: () => {
        subscribe();
      },
    });

    client.activate();
  };

  const disConnect = () => {
    if (client !== null) {
      if (client.connect) client.deactivate();
    }
  };

  // 로딩 시 스크롤바 제일 아래로
  useEffect(() => {
    if (chatData) {
      if (scrollbarRef.current & (chatData.length < 1)) {
        scrollbarRef.current.scrollToBottom();
      }
    }
    readChat();
  }, [chatData, scrollbarRef]);

  useEffect(() => {
    connect();

    return () => disConnect();
  }, []);

  let chatSections = [];

  if (chatData) {
    const arrayData = chatData.map((data) => {
      return data.data;
    });

    isReachingEnd = arrayData[arrayData.length - 1]?.length < 20;

    chatSections = makeSection(arrayData ? arrayData.flat().reverse() : []);
  }

  return (
    <MyLayout>
      <MypageTop title="채팅"></MypageTop>
      <Container>
        <SectionWrap>
          <BoxWrapper>
            <BoxHead>
              <HeadTop>
                <h3>
                  인생인생인생
                  <img src={IconFlag} alt="flag" />
                </h3>
                <button className="del">삭제</button>
              </HeadTop>
              <p>
                <CategoryTxt>고시/공무원</CategoryTxt>
                함께 크루원 모집 플랫폼 작업하실분 모십니다~!크루크루
              </p>
            </BoxHead>
            <ChatList
              chatSections={chatSections}
              ref={scrollbarRef}
              setSize={setSize}
              isReachingEnd={isReachingEnd}
            ></ChatList>
            <ChatBoxBottom>
              <form onSubmit={onSubmitContent}>
                <ChatInput
                  cols="30"
                  rows="10"
                  name="chat-input"
                  placeholder="보낼 채팅 내용을 입력해주세요."
                  value={content}
                  onChange={onChangeContent}
                  onKeyDown={onKeyDownChat}
                  ref={inputRef}
                ></ChatInput>
                <ChatButton type="submit" disabled={!content?.trim()} ref={chatBtnRef}>
                  채팅보내기
                </ChatButton>
              </form>
            </ChatBoxBottom>
          </BoxWrapper>
        </SectionWrap>
      </Container>
    </MyLayout>
  );
}

export default ChatDetail;

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

const CategoryTxt = styled('span')`
  font-weight: 700;
  margin-right: 8px;
  color: #0f3fa6;
`;

const BoxHead = styled('div')`
  height: 108px;
  padding: 20px;
  border-bottom: 1px solid #a8a8a8;
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 18px;

  h3 {
    margin-right: auto;
    font-size: 20px;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 16px;

    img {
      width: 24px;
    }
  }

  p {
    font-size: 12px;
    font-weight: 500;
    color: #a8a8a8;
  }

  button {
    border: none;
    outline: none;
    cursor: pointer;

    &.del {
      width: 30px;
      height: 30px;
      border-radius: 5px;
      transition: 0.3s;
      background-color: #c4c4c4;
      color: #fff;
      font-size: 12px;
      font-weight: 500;

      :hover {
        background-color: #b0b0b0;
      }
    }
  }
`;

const HeadTop = styled('div')`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

const ChatBoxBottom = styled('div')`
  height: 100px;
  border-top: 1px solid #e2e2e2;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
`;

const ChatInput = styled('textarea')`
  border: none;
  outline: none;
  margin: 10px 40px 10px 30px;
  width: calc(100% - 150px);
  height: 57px;
  font-size: 13px;
  line-height: 20px;
  color: #707070;
  resize: none;

  ::placeholder {
    color: #a8a8a8;
  }
`;

const ChatButton = styled('button')`
  border: none;
  outline: none;
  width: 80px;
  height: 100%;

  border-radius: 5px;
  text-indent: -9999px;
  transition: 0.3s;
  background: #c4c4c4 url(${IconPostArrow}) center/50% no-repeat;
  background-color: #00b7ff;
  cursor: pointer;

  &:disabled {
    cursor: default;
    background-color: #c4c4c4;

    :hover {
      background-color: #c4c4c4;
    }
  }

  :hover {
    background-color: #00a3e3;
  }
`;
