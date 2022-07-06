import React from 'react';
import styled, { css } from 'styled-components';
import IconChat from '@/assets/images/IconChat.png';
import { useNavigate } from 'react-router-dom';

function ProfileTooltip({ data, position }) {
  const navigate = useNavigate();
  const navigateProfile = (e) => {
    e.stopPropagation();
    navigate(`/profile/${data.uid}`);
  };
  const navigateChat = (e) => {
    e.stopPropagation();
    navigate(`/mypage/chat`);
  };
  return (
    <Container position={position}>
      <ToolTipName>{data.nickname}</ToolTipName>
      <ToolTipBtn>
        <Chat onClick={(e) => navigateChat(e)} />
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
