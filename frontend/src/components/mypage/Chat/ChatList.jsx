import dayjs from 'dayjs';
import React, { useCallback, useEffect } from 'react';
import { forwardRef } from 'react';
import styled from 'styled-components';
import ChatCard from './ChatCard';
import { Scrollbars } from 'react-custom-scrollbars-2';
import NocontProfile2 from '@/assets/images/NocontProfile2.png';
import Loader from '@/components/common/Loader';

function ChatList({ chatSections, setSize, isReachingEnd, loading, other }, scrollRef) {
  const onScroll = useCallback((values) => {
    if (values.scrollTop === 0 && !isReachingEnd) {
      setSize((prevSize) => prevSize + 1).then(() => {
        // 스크롤 위치 유지
        const current = scrollRef?.current;
        current?.scrollTop(current?.getScrollHeight() - values.scrollHeight);
      });
    }
  }, []);

  const renderSection = useCallback(() => {
    if (loading) {
      return (
        <LoadingWrapper>
          <Loader />
        </LoadingWrapper>
      );
    }

    if (Object.keys(chatSections).length > 0) {
      return (
        <CustomScrollBars
          autoHide
          ref={scrollRef}
          renderTrackVertical={({ style, ...props }) => (
            <div {...props} className="track-vertical" style={{ width: '10px' }} />
          )}
          renderThumbVertical={(props) => <div {...props} className="thumb-vertical" />}
          renderView={(props) => <div {...props} className="view" />}
          onScrollFrame={onScroll}
        >
          {Object.entries(chatSections).map(([date, chats]) => {
            if (!date) {
              return null;
            }
            return (
              <ChatDtWrapper key={date}>
                <DtDate>{dayjs(date).format('MM.DD')}</DtDate>
                {chats.map((chat, index) => (
                  <ChatCard key={index + chat.content + chat.messageId} data={chat}></ChatCard>
                ))}
              </ChatDtWrapper>
            );
          })}
        </CustomScrollBars>
      );
    } else {
      return (
        <NoContent>
          <div className="illust">
            <img src={NocontProfile2} alt="noContentImg" />
          </div>
          <p>
            <em>
              <span>{other && other.nickName}</span>
              {` 님에게 채팅을 보내세요`}
            </em>
            <br />
            보낸 채팅은 채팅목록에서 확인할 수 있습니다.
          </p>
        </NoContent>
      );
    }
  }, [loading, chatSections]);

  // 로딩 시 스크롤바 제일 아래로
  useEffect(() => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current?.scrollToBottom();
      }, 50);
    }
  }, [scrollRef.current, loading]);

  return <ChatBoxBody>{renderSection()}</ChatBoxBody>;
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

  @media screen and (max-width: 820px) {
    height: calc(100vh - 380px);
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

const LoadingWrapper = styled('div')`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const NoContent = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;

  .illust {
    width: 240px;
    aspect-ratio: 1;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
    }
  }

  p {
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    text-align: center;

    em {
      font-weight: 700;

      span {
        color: #00b7ff;
      }
    }
  }

  @media screen and (max-width: 820px) {
    .illust {
      width: 200px;
    }
  }
`;
