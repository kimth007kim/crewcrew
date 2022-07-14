import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';
import TimelineMent from './TimelineMent';

function TimelineCard({ data }) {
  const hobbyCat = ['예술', '요리', '운동', '게임', '덕질', '트렌드', '취미기타'];
  const Date = dayjs(data.createdDate).format('YY/MM/DD');
  const [category, setCategory] = useState('study');

  useEffect(() => {
    hobbyCat.forEach((e) => {
      e === data.categoryName && setCategory('hobby');
    });
  }, [data]);
  return (
    <Container>
      <ContentTop Cat={category}>
        <h5>{data.categoryName}</h5>
        <p>{Date}</p>
      </ContentTop>
      <ContentBottom>
        <TimelineMent data={data} />
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
  }

  p {
    font-size: 12px;
    font-weight: 500;
    color: #a8a8a8;
  }
  ${(props) =>
    props.Cat === 'study'
      ? css`
          h5 {
            color: #0f3fa6;
          }
        `
      : css`
          h5 {
            color: #f7971e;
          }
        `}
  
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
