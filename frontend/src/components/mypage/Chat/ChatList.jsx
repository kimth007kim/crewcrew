import dayjs from 'dayjs';
import React, { useCallback, useEffect } from 'react';
import { forwardRef } from 'react';
import styled from 'styled-components';
import ChatCard from './ChatCard';
import { Scrollbars } from 'react-custom-scrollbars-2';

function ChatList({ chatSections }, scrollRef) {
  //   const onScroll = useCallback((values) => {
  //     if (values.scrollTop === 0) {
  //       console.log('가장 위');
  //       setSize((prevSize) => prevSize + 1).then(() => {
  //         // 스크롤 위치 유지
  //         const current = scrollRef?.current;
  //         current?.scrollTop(current?.getScrollHeight() - values.scrollHeight);
  //       });
  //     }
  //   }, []);

  // 로딩 시 스크롤바 제일 아래로
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollToBottom();
    }
  }, [scrollRef]);

  return (
    <ChatBoxBody>
      <CustomScrollBars
        autoHide
        ref={scrollRef}
        renderTrackVertical={({ style, ...props }) => (
          <div {...props} className="track-vertical" style={{ width: '10px' }} />
        )}
        renderThumbVertical={(props) => <div {...props} className="thumb-vertical" />}
        renderView={(props) => <div {...props} className="view" />}
      >
        {Object.entries(chatSections).map(([date, chats]) => {
          return (
            <ChatDtWrapper key={date}>
              <DtDate>{dayjs(date).format('MM.DD')}</DtDate>
              {chats.map((chat) => (
                <ChatCard key={chat.messageId} data={chat}></ChatCard>
              ))}
            </ChatDtWrapper>
          );
        })}
      </CustomScrollBars>
    </ChatBoxBody>
  );
}

export default forwardRef(ChatList);

const ChatBoxBody = styled('div')`
  height: calc(100vh - 379px);
  overflow: overlay;
  scroll-behavior: initial;
  transition: 0.5s;

  * {
    scroll-behavior: initial;
  }
`;

const CustomScrollBars = styled(Scrollbars)`
  .track-vertical {
    position: absolute;
    right: 2px;
    bottom: 2px;
    top: 2px;
    border-radius: 3px;
    z-index: 9;
    transition: opacity 200ms ease 0s;

    & div {
      background-color: rgba(0, 0, 0, 0.5);
      border-radius: 10px;
    }
  }
`;

const ChatDtWrapper = styled('div')`
  padding-bottom: 35px;
  position: relative;
`;

const DtDate = styled('p')`
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 12px;
  color: #a8a8a8;
  background-color: #f3f3f3;
  position: sticky;
  top: 0;
  z-index: 1;
`;
