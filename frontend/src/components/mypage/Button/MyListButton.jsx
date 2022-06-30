import React from 'react';
import styled, { css } from 'styled-components';

function MyListButton({ data, active, onClick }) {
  const dataObj = {
    bookmark: '스크랩한 글',
    recent: '최근 본 글',
    recruit: '모집중인 크루',
    participate: '참여중인 크루',
  };

  return (
    <MyBtn active={active} data={data} onClick={onClick}>
      {dataObj[data]}
    </MyBtn>
  );
}

export default MyListButton;

const MyBtn = styled.button`
  width: 186px;
  height: 56px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #fff;
  box-sizing: border-box;
  font-size: 20px;
  font-weight: 400;
  cursor: pointer;
  transition: 0.3s;
  color: #868686;

  :hover {
    border: 2px solid #00b7ff;
    color: #00b7ff;
    font-weight: 500;
  }

  @media screen and (max-width: 820px) {
    width: 100%;
  }

  ${(props) =>
    props.active == props.data &&
    css`
      border: 2px solid #00b7ff;
      color: #00b7ff;
      font-weight: 500;
    `}
`;
