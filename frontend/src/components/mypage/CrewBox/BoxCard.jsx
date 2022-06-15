import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import PageArrowNext from '@/assets/images/PageArrowNext.png';
import { css } from 'styled-components';

function BoxCard({
  title,
  total = 0,
  small_title1 = '스터디',
  small_title2 = '취미',
  count_one = 0,
  count_two = 0,
  deactive = false,
  onClick,
}) {
  const totalRef = useRef(null);
  const studyRef = useRef(null);
  const hobbyRef = useRef(null);

  const numberTotal = useCallback((ref, limitNum) => {
    let num = 0;
    let timer = setInterval(() => {
      if (ref && ref.current) {
        ref.current.innerHTML = `${num}`;

        if (limitNum <= num) {
          ref.current.innerHTML = `${limitNum}`;
          clearInterval(timer);
        }
      }
      num += 1;
      if (limitNum > 10) {
        num += 10;
      }
    }, 20);
  }, []);

  useEffect(() => {
    numberTotal(totalRef, total);
    numberTotal(studyRef, count_one);
    numberTotal(hobbyRef, count_two);
  }, [total, count_one, count_two]);

  return (
    <Container onClick={onClick}>
      <NumDesc>
        <span ref={totalRef}>0</span>개
      </NumDesc>
      <BoxTitle>{title}</BoxTitle>
      <CrewCat deactive={deactive}>
        <li>
          <h4>{small_title1}</h4>
          <p ref={studyRef}>0</p>
        </li>
        <li>
          <h4>{small_title2}</h4>
          <p ref={hobbyRef}>0</p>
        </li>
      </CrewCat>
    </Container>
  );
}

export default BoxCard;

const NumDesc = styled('p')`
  margin: 18px 0 6px;
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: #00b7ff;

  @media screen and (max-width: 820px) {
    margin: 10px 0 10px;
  }

  @media screen and (max-width: 300px) {
    margin: 0 0 4px;
  }
`;

const BoxTitle = styled('p')`
  margin-bottom: 35px;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;

  ::after {
    content: '';
    display: block;
    margin-left: 8px;
    width: 6px;
    height: 14px;
    background: url(${PageArrowNext}) 50% 50%/6px no-repeat;
  }

  @media screen and (max-width: 820px) {
    margin-bottom: 0;
  }

  @media screen and (max-width: 300px) {
    letter-spacing: -0.03em;

    ::after {
      margin-left: 3px;
    }
  }
`;

const CrewCat = styled('ul')`
  display: flex;
  gap: 12px;

  li {
    width: 100%;
    height: 50px;
    border-radius: 10px;
    color: #fff;

    h4 {
      font-size: 13px;
      font-weight: 400;
      text-align: center;
      margin-top: 4px;
    }

    p {
      font-size: 18px;
      font-weight: 700;
      text-align: center;
      line-height: 1;
      margin-top: 4px;
    }

    :first-child {
      background-color: #0f3fa6;
    }

    :last-child {
      background-color: #f7971e;
    }
  }

  ${(props) =>
    props.deactive &&
    css`
      li {
        :first-child {
          background-color: #a8a8a8;
        }

        :last-child {
          background-color: #a8a8a8;
        }

        h4 {
          font-size: 12px;
        }
      }
    `}

  @media screen and (max-width: 820px) {
    gap: 10px;
    margin-top: auto;

    li {
      height: 42px;

      p {
        margin-top: 0;
      }
    }
  }

  @media screen and (max-width: 300px) {
    gap: 4px;
  }
`;

const Container = styled('div')`
  height: 182px;
  cursor: pointer;
  padding: 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgb(0 0 0 / 10%);

  @media screen and (max-width: 820px) {
    height: calc((100vw - 56px) / 2);
    justify-content: flex-start;
    padding: 8px;
  }

  @media screen and (max-width: 300px) {
    padding: 4px;
    height: calc((100vw - 28px) / 2);
  }
`;
