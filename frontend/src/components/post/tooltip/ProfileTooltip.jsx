import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import IconChat from '@/assets/images/IconChat.png';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useCallback } from 'react';
import useSWR from 'swr';
import { Cookies } from 'react-cookie';
import fetcher from '@/utils/fetcher';

function ProfileTooltip({ data, position, open, setOpen }) {
  const cookies = new Cookies();
  const { data: myData } = useSWR(['/auth/token', cookies.get('X-AUTH-TOKEN')], fetcher);

  const navigate = useNavigate();
  const profileRef = useRef(null);

  const stopPropagation = useCallback((e) => {
    e.stopPropagation();
  }, []);

  const navigateProfile = (e) => {
    e.stopPropagation();
    navigate(`/profile/${data.uid}`);
  };
  const navigateChat = (e) => {
    e.stopPropagation();
    if (myData?.data.uid === data.uid) {
      window.alert('자기자신에게 채팅을 보낼 수 없습니다');
      return false;
    }
    navigate(`/mypage/chat/${data.boardId}`);
  };

  useEffect(() => {
    const handleWindowClick = (event) => {
      const { current: container } = profileRef;
      if (!container) return;
      const eventTarget = event.path && event.path.length > 0 ? event.path[0] : event.target;
      if (container.contains(eventTarget)) return;
      if (!open) return;
      setOpen(false);
    };

    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, [open]);

  return (
    <Container position={position} ref={profileRef} onClick={stopPropagation}>
      <ToolTipName>{data.nickname}</ToolTipName>
      <ToolTipBtn>
        {myData?.data?.uid !== data.uid && <Chat onClick={(e) => navigateChat(e)} />}
        <Profile onClick={(e) => navigateProfile(e)}>프로필 확인</Profile>
      </ToolTipBtn>
    </Container>
  );
}

export default ProfileTooltip;

const Container = styled('div')`
  width: 164px;
  height: 70px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  padding: 8px;
  box-sizing: border-box;
  cursor: default;
  z-index: 10;

  ${(props) =>
    props.position === 1
      ? css`
          top: 0px;
          left: 72px;

          @media screen and (max-width: 820px) {
            left: 40px;
          }
        `
      : css`
          top: 64px;
          left: 72px;

          @media screen and (max-width: 820px) {
            top: 25px;
            left: initial;
            right: 0;
          }
        `}
`;

const ToolTipName = styled('p')`
  font-size: 12px;
  font-weight: 400;
  color: #fff;
`;

const ToolTipBtn = styled('div')`
  height: 30px;
  display: flex;
  gap: 8px;
  margin-top: 10px;

  button {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    border: none;
    outline: none;
    cursor: pointer;
    transition: 0.3s;
  }
`;

const Chat = styled('button')`
  max-width: 30px;
  background: url(${IconChat}) center/20px 18px no-repeat #c4c4c4;
`;

const Profile = styled('button')`
  background-color: #868686;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
`;
