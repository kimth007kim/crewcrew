import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function TimelineMent({ data }) {
  const navigate = useNavigate();

  const navigateDetail = () => {
    if (data.announceType === 1) {
      return navigate(`/mypage/activity`);
    }
    if (data.announceType === 2) {
      return navigate(`/mypage/request`);
    }
    if (data.announceType === 3) {
      return navigate(`/mypage/request`);
    }
    if (data.announceType === 4) {
      return navigate(`/mypage/request`);
    }
  };

  if (data.announceType === 1) {
    return (
      <>
        <p>
          <Name>{data.nickname}</Name>
          님이 회원님의 글에&nbsp;
          <Positive>참여요청</Positive>
          &nbsp;하였습니다.
        </p>
        <ul>
          <li>
            <button type="button" onClick={navigateDetail}>
              상세
            </button>
          </li>
        </ul>
      </>
    );
  } else if (data.announceType === 2) {
    return (
      <>
        <p>
          <Name>{data.boardTitle}</Name>
          에서 회원님의&nbsp;
          <Negative>참여요청을 거절</Negative>
          &nbsp;하였습니다.
        </p>
        <ul>
          <li>
            <button type="button" onClick={navigateDetail}>
              상세
            </button>
          </li>
        </ul>
      </>
    );
  } else if (data.announceType === 3) {
    return (
      <>
        <p>
          <Name>{data.boardTitle}</Name>
          에서 회원님의&nbsp;
          <Positive>참여요청을 수락</Positive>
          &nbsp;하였습니다.
        </p>
        <ul>
          <li>
            <button type="button" onClick={navigateDetail}>
              상세
            </button>
          </li>
        </ul>
      </>
    );
  } else if (data.announceType === 4) {
    return (
      <>
        <p>
          <Name>{data.boardTitle}</Name>
          에서 회원님의 &nbsp;
          <Negative>참여를 취소</Negative>
          &nbsp;하였습니다.
        </p>
        <ul>
          <li>
            <button type="button" onClick={navigateDetail}>
              상세
            </button>
          </li>
        </ul>
      </>
    );
  } else {
    return null;
  }
}

export default TimelineMent;

const Positive = styled('span')`
  color: #00b7ff;
`;

const Negative = styled('span')`
  color: #ff0045;
`;

const Name = styled('span')`
  color: #000;
  font-weight: 700;
`;
