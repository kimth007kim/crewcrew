import fetcher from '@/utils/fetcher';
import dayjs from 'dayjs';
import React from 'react';
import { Cookies } from 'react-cookie';
import styled from 'styled-components';
import useSWR from 'swr';
import ChatShowImg from '@/assets/images/ChatShow.png';
import { useMemo, memo } from 'react';
import regexifyString from 'regexify-string';

function ChatCard({ data }) {
  const myCookies = new Cookies();
  const { data: myData } = useSWR(['/auth/token', myCookies.get('X-AUTH-TOKEN')], fetcher);

  const meCheck = data.publisher.uid === 1;
  let otherUser = null;

  if (!meCheck) {
    otherUser = data.publisher;
  } else {
    otherUser = data.subscriber;
  }

  // \d 숫자  +는 1개 이상 ? 0개나 1개, * 0개 이상 g는 모두 찾기
  const result = useMemo(
    () =>
      regexifyString({
        input: data.content,
        pattern: /\n+/g,
        decorator(match, index) {
          return <br key={index} />;
        },
      }),
    [data.content],
  );

  return (
    <>
      {meCheck ? (
        <ChatDt className="me">
          <ChatTxt>{result}</ChatTxt>
          <ChatTime>{dayjs(data.date).format('HH:mm')}</ChatTime>
          {!data.readCnt && <ChatShow></ChatShow>}
        </ChatDt>
      ) : (
        <ChatDt className="other">
          <ChatProfile>
            <ProfileImg>
              <img src={otherUser.image} alt="" />
            </ProfileImg>
            <h4>{otherUser.nickName}</h4>
          </ChatProfile>
          {/* 채팅 메시지 */}
          <ChatTxt>{result}</ChatTxt>
          {/* {채팅 만들어진 시각} */}
          <ChatTime>{dayjs(data.date).format('HH:mm')}</ChatTime>
        </ChatDt>
      )}
    </>
  );
}

export default memo(ChatCard);

const ChatTxt = styled('div')`
  width: fit-content;

  padding: 12px;
  box-sizing: border-box;
  border: 1px solid #e2e2e2;
  border-radius: 6px;
  font-size: 13px;
  line-height: 20px;
  color: #707070;
  overflow: hidden;
  word-break: break-all;
`;

const ChatTime = styled('p')`
  width: 30px;
  font-size: 12px;
  color: #a8a8a8;
  position: absolute;
`;

const ChatShow = styled('div')`
  width: 16px;
  height: 16px;
  background: url(${ChatShowImg}) center/100% no-repeat;
  position: absolute;
  left: -26px;
  bottom: 18px;
`;

const ChatProfile = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;

  h4 {
    font-size: 13px;
    font-weight: 700;
    color: #000;
  }
`;

const ProfileImg = styled('div')`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
  }
`;

const ChatDt = styled('div')`
  position: relative;
  width: fit-content;

  &.me {
    margin: 24px 40px 0 auto;

    ${ChatTxt} {
      max-width: 320px;
      background-color: #e6faff;
    }

    ${ChatTime} {
      bottom: 0;
      left: -40px;
    }
  }

  &.other {
    margin: 20px auto 0 40px;

    ${ChatTxt} {
      max-width: 514px;
      margin-left: 40px;
    }

    ${ChatTime} {
      bottom: 0;
      right: -40px;
    }
  }

  @media screen and (max-width: 820px) {
    &.me {
      margin: 24px 20px 0 auto;

      ${ChatTxt} {
        max-width: calc(100vw - 118px);
      }

      ${ChatTime} {
        bottom: 0;
        left: -40px;
      }
    }

    &.other {
      margin: 20px auto 0 20px;

      ${ChatTxt} {
        max-width: calc(100vw - 158px);
      }

      ${ChatTime} {
        bottom: 0;
        right: -40px;
      }
    }
  }

  @media screen and (max-width: 300px) {
    &.me {
      margin: 24px 10px 0 auto;

      ${ChatTxt} {
        max-width: calc(100vw - 60px);
      }

      ${ChatTime} {
        bottom: 0;
        left: -40px;
      }
    }

    &.other {
      margin: 20px auto 0 10px;

      ${ChatTxt} {
        max-width: calc(100vw - 100px);
      }

      ${ChatTime} {
        bottom: 0;
        right: -40px;
      }
    }
  }
`;
