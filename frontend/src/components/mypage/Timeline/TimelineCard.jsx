import React from 'react';
import styled from 'styled-components';

function TimelineCard() {
  return (
    <Container>
      <ContentTop>
        <h5>요리</h5>
        <p>22/03/25</p>
      </ContentTop>
      <ContentBottom>
        <p>
          <Name>오주영</Name>
          {'님이 회원님의 글에 '}
          <Positive>참여를 수락</Positive>
          {' 하였습니다'}
        </p>
        <ul>
          <li>
            <button type="button">상세</button>
          </li>
          <li>
            <button type="button">수락</button>
          </li>
        </ul>
      </ContentBottom>
    </Container>
  );
}

export default TimelineCard;

const Container = styled('div')`
  width: 100%;
  height: 50%;
  box-sizing: border-box;
  border-left: 1px solid #707070;
  position: relative;
  padding-left: 10px;

  ::before {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    background-color: #fff;
    left: -10px;
  }

  &:nth-child(odd)::before {
    border: 3px solid #00b7ff;
    bottom: -10px;
  }

  &:nth-child(even) {
    padding-top: 20px;
    margin-top: 139px;

    &::before {
      border: 3px solid #ff0045;
      top: -10px;
    }
  }

  @media screen and (max-width: 820px) {
    height: auto;
    margin-top: 0 !important;
    padding: 0 !important;
    border: none;

    ::before {
      display: none;
    }
  }
`;

const ContentTop = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 4px;

  h5 {
    font-size: 15px;
    font-weight: 700;
  }

  p {
    font-size: 12px;
    font-weight: 500;
    color: #a8a8a8;
  }
`;

const ContentBottom = styled('div')`
  p {
    font-size: 13px;
    line-height: 20px;
    font-weight: 400;
    color: #868686;
    max-width: 210px;
  }

  ul {
    display: flex;
    gap: 8px;
    margin-top: 10px;

    li {
      width: 50px;
      height: 30px;

      button {
        width: 100%;
        height: 100%;
        border: none;
        outline: none;
        background-color: #c4c4c4;
        border-radius: 5px;
        color: #fff;
        font-size: 13px;
        font-weight: 500;
        cursor: pointer;
        transition: 0.3s;
      }

      &:nth-child(2) {
        button {
          background-color: #00b7ff;
        }
      }
    }
  }

  @media screen and (max-width: 820px) {
    display: flex;
    align-items: center;

    p {
      max-width: 100%;
    }

    ul {
      margin-top: 0;
      margin-left: 18px;
    }
  }

  @media screen and (max-width: 300px) {
    margin-bottom: 16px;

    p {
      font-size: 12px;
    }

    ul {
      margin-left: 6px;
      gap: 6px;
    }
  }
`;

const Name = styled('span')`
  color: #000;
  font-weight: 700;
`;

const Positive = styled('span')`
  color: #00b7ff;
`;
