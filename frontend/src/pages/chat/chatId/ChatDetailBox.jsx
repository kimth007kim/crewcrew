import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SockJS from 'sockjs-client';
import useSWRInfinite from 'swr/infinite';
import { Client } from '@stomp/stompjs';
import { Cookies } from 'react-cookie';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import makeSection from '@/utils/makeSection';
import axios from 'axios';
import IconFlag from '@/assets/images/IconFlag.png';
import IconPostArrow from '@/assets/images/IconPostArrow.png';
import ChatList from '@/components/mypage/Chat/ChatList';
import ChatDeleteModal from '@/components/common/DeleteModal/ChatDeleteModal';
import useModal from '@/hooks/useModal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

let client = null;

function ChatDetailBox({ roomId }) {
  const cookies = new Cookies();
  const { data: myData } = useSWR(['/auth/token', cookies.get('X-AUTH-TOKEN')], fetcher);

  const getKey = (pageIndex, previousPageData) => {
    if (previousPageData && previousPageData.data.length < 10) {
      return null;
    }
    return [`/talk/room/${roomId}/${pageIndex}`, cookies.get('X-AUTH-TOKEN')];
  };

  const { data: chatData, mutate: mutateChat, setSize } = useSWRInfinite(getKey, fetcher);

  const [content, setContent] = useState('');
  const [roomInfo, setRoomInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteVisible, openDelete, closeDelete] = useModal();
  const navigate = useNavigate();

  const chatBtnRef = useRef(null);
  const scrollbarRef = useRef(null);
  const inputRef = useRef(null);

  const onChangeContent = useCallback(
    (e) => {
      setContent(e.target.value);
    },
    [roomInfo],
  );

  const onSubmitContent = useCallback(
    (e) => {
      e.preventDefault();

      if (roomInfo && !roomInfo.delete && content?.trim() && client) {
        client.publish({
          destination: '/pub/chat/message',
          body: JSON.stringify({
            type: 'TALK',
            roomId,
            token: cookies.get('X-AUTH-TOKEN'),
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
    [content, client, myData, roomId, scrollbarRef, roomInfo],
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
      .patch(
        `/talk/room/${roomId}`,
        {},
        {
          withCredentials: true,
          headers: {
            'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
          },
        },
      )
      .then((data) => {})
      .catch((err) => console.dir(err));
  };

  const subscribe = () => {
    if (client !== null) {
      client.subscribe(`/sub/chat/room/${roomId}`, (data) => {
        mutateChat().then(() => {
          if (scrollbarRef.current) {
            if (
              scrollbarRef.current.getScrollHeight() <
              scrollbarRef.current.getClientHeight() + scrollbarRef.current.getScrollTop() + 200
            ) {
              setTimeout(() => {
                scrollbarRef.current.scrollToBottom();
              }, 100);
            }
          }
        });
      });
    }
  };

  const connect = () => {
    client = new Client({
      brokerURL: 'wss://api.crewcrew.org/ws-stomp',

      webSocketFactory: function () {
        return new SockJS(`${process.env.API_URL}/ws-stomp`);
      },
      debug: function () {},

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

  const getRoomInfo = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/talk/room/${roomId}/detail`, {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      setLoading(false);
      switch (data.status) {
        case 200:
          setRoomInfo({ ...data.data });
          break;
        case 5001:
          // 현재 채팅방에 등록된 유저가 아닌 유저가 접근하는 경우
          navigate('/chat', { replace: true });
          toast.error(data.message);
          break;
        case 5005:
          // 현재 채팅방에 등록됐었지만 자신이 그 채팅방을 삭제한 경우
          navigate('/chat', { replace: true });
          toast.error(data.message);
          break;

        default:
          toast.error(data.message);
          break;
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getRoomInfo();
  }, [roomId]);

  // // 로딩 시 read
  useEffect(() => {
    readChat();
  }, [chatData]);

  useEffect(() => {
    connect();

    return () => disConnect();
  }, []);

  let isReachingEnd = false;
  let chatSections = [];

  if (chatData) {
    const arrayData = chatData.map((data) => {
      return data.data;
    });

    isReachingEnd = arrayData[arrayData.length - 1]?.length < 10;

    chatSections = makeSection(arrayData ? arrayData.flat().reverse() : []);
  }

  return (
    <>
      <BoxWrapper>
        <BoxHead>
          <HeadTop>
            <h3>
              {roomInfo && roomInfo.other.nickName}
              {roomInfo && !roomInfo.captain && <img src={IconFlag} alt="flag" />}
            </h3>
            <button className="del" onClick={openDelete}>
              삭제
            </button>
          </HeadTop>
          <p>
            <CategoryTxt>{roomInfo && roomInfo.categoryName}</CategoryTxt>
            {roomInfo && roomInfo.boardTitle}
          </p>
        </BoxHead>
        <ChatList
          chatSections={chatSections}
          ref={scrollbarRef}
          setSize={setSize}
          isReachingEnd={isReachingEnd}
          loading={loading}
          other={roomInfo && roomInfo.other}
        ></ChatList>
        <ChatBoxBottom>
          <form onSubmit={onSubmitContent}>
            <ChatInput
              cols="30"
              rows="10"
              name="chat-input"
              placeholder={
                roomInfo && roomInfo.delete
                  ? '채팅을 보낼 수 없습니다'
                  : '보낼 채팅 내용을 입력해주세요.'
              }
              value={content}
              onChange={onChangeContent}
              onKeyDown={onKeyDownChat}
              ref={inputRef}
              disabled={roomInfo && roomInfo.delete}
            ></ChatInput>
            <ChatButton type="submit" disabled={!content?.trim()} ref={chatBtnRef}>
              채팅보내기
            </ChatButton>
          </form>
        </ChatBoxBottom>
      </BoxWrapper>
      <ChatDeleteModal
        visible={deleteVisible}
        closeModal={closeDelete}
        chatData={roomInfo && roomInfo}
        checkList={[roomId]}
      ></ChatDeleteModal>
    </>
  );
}

export default ChatDetailBox;

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

  @media screen and (max-width: 820px) {
    p {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      max-width: calc(100% - 38px);
    }
  }

  @media screen and (max-width: 300px) {
    padding: 20px 10px;
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

  @media screen and (max-width: 820px) {
    height: auto;
    padding: 5px;
  }
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

  :disabled {
    background-color: #fff;
  }

  @media screen and (max-width: 820px) {
    margin: 11px auto 11px 7px;
    width: calc(100% - 68px);
    height: 20px;
    line-height: 17px;
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

  @media screen and (max-width: 820px) {
    width: 40px;
    height: 40px;
  }
`;
