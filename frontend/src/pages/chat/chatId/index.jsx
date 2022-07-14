import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import MyLayout from '@/components/common/MyLayout';
import MypageTop from '@/components/mypage/MypageTop';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ChatDetailBox from './ChatDetailBox';
import { toast } from 'react-toastify';

function ChatDetail() {
  const cookies = new Cookies();
  const [roomId, setRoomId] = useState('');
  const params = useParams();

  const navigate = useNavigate();

  const apiCreateRoom = useCallback(async () => {
    try {
      const context = {
        board_seq: params.boardId,
      };

      const { data: roomData } = await axios.post('/talk/room', context, {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });

      switch (roomData.status) {
        case 200:
          setRoomId(roomData.data);
          break;

        default:
          toast.error(roomData.message);
          navigate('/mypage/chat');
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }, [params.boardId]);

  useEffect(() => {
    if (!params.roomId) {
      apiCreateRoom();
    } else {
      setRoomId(params.roomId);
    }
  }, [params.roomId]);

  return (
    <MyLayout>
      <MypageTop title="채팅"></MypageTop>
      <Container>
        <SectionWrap>{roomId && <ChatDetailBox roomId={roomId}></ChatDetailBox>}</SectionWrap>
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

  @media screen and (max-width: 820px) {
    min-height: 0;
  }
`;

const SectionWrap = styled('div')`
  max-width: 850px;
  margin: auto;
  position: relative;

  @media screen and (max-width: 820px) {
    padding: 0;
  }
`;
