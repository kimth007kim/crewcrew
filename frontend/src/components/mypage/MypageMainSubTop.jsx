import React, { useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ArrowCircle from '@/assets/images/ArrowCircle.png';

function MypageMainSubTop({
  total = 0,
  studyCnt = 0,
  hobbyCnt = 0,
  title = '내가 참여요청한 크루',
  desc = '내가 참여요청한 크루의 현황을 이곳에서 확인하고 관리하세요!',
}) {
  const totalRef = useRef(null);
  const studyRef = useRef(null);
  const hobbyRef = useRef(null);

  const numberTotal = useCallback((ref, limitNum) => {
    let num = 0;
    let timer = setInterval(() => {
      if (ref && ref.current) {
        ref.current.innerHTML = `${num}개`;

        if (limitNum <= num) {
          ref.current.innerHTML = ` ${limitNum}개`;
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
    numberTotal(studyRef, studyCnt);
    numberTotal(hobbyRef, hobbyCnt);
  }, [total, studyCnt, hobbyCnt]);

  return (
    <section>
      <Wrapper>
        <h3>{title}</h3>
        <p>{desc}</p>
        <Content>
          <h4>
            {'전체 '}
            <span ref={totalRef} data-rate={total}></span>
          </h4>
          <BoxWrap>
            <SentBox color="#0575e6" hoverColor="#005ec5">
              <p ref={studyRef}>{studyCnt}개</p>
              <p>스터디 크루</p>
              <div className="arrow"></div>
            </SentBox>
            <SentBox color="#ffd458" hoverColor="#fcb90d">
              <p ref={hobbyRef}>{hobbyCnt}개</p>
              <p>취미 크루</p>
              <div className="arrow"></div>
            </SentBox>
          </BoxWrap>
        </Content>
      </Wrapper>
    </section>
  );
}

export default MypageMainSubTop;

const Wrapper = styled('div')`
  max-width: 850px;
  margin: auto;
  position: relative;
  padding-top: 36px;

  h3 {
    font-size: 20px;
    font-weight: 700;
  }

  p {
    margin-top: 8px;
    font-size: 13px;
    color: #868686;
    font-weight: 400;
    line-height: 20px;
  }

  @media screen and (max-width: 820px) {
    padding: 0 20px;
    padding-top: 36px;
  }

  @media screen and (max-width: 300px) {
    padding: 0 10px;
    padding-top: 36px;
  }
`;

const Content = styled('div')`
  padding: 45px 0 100px;

  h4 {
    font-size: 42px;
    font-weight: 700;
    text-align: center;
    padding-bottom: 50px;

    span {
      color: #00b7ff;
    }
  }

  @media screen and (max-width: 820px) {
    padding: 45px 0;

    h4 {
      font-size: 32px;
    }
  }
`;

const BoxWrap = styled('div')`
  display: flex;
  gap: 48px;
  justify-content: space-between;

  @media screen and (max-width: 820px) {
    gap: 20px;
  }
`;

const SentBox = styled('div')`
  width: 100%;
  height: 180px;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgb(0 0 0 / 10%);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  cursor: pointer;
  transition: 1s;
  padding: 0 32px;
  position: relative;
  background-color: ${(props) => props.color};

  p {
    color: #fff;
    line-height: 1;
    width: 100%;
    text-align: center;
    transition: 0.5s;

    &:nth-child(1) {
      font-size: 48px;
      font-weight: 700;
    }
    &:nth-child(2) {
      font-size: 18px;
      font-weight: 500;
      margin-top: 22px;
    }
  }

  .arrow {
    width: 55px;
    height: 55px;
    background: url(${ArrowCircle}) center/55px 55px;
    position: absolute;
    bottom: calc(50% - 28px);
    right: 65px;
    transition: 0.5s;
    transition-delay: 0s;
    opacity: 0;
  }

  :hover {
    background-color: ${(props) => props.hoverColor};

    p {
      width: 170px;
    }

    .arrow {
      opacity: 1;
      transition-delay: 0.1s;
    }
  }

  @media screen and (max-width: 820px) {
    height: 86px;
    padding: 0;

    p {
      &:nth-child(1) {
        font-size: 32px;
      }

      &:nth-child(2) {
        font-size: 13px;
        margin-top: 6px;
      }
    }

    :hover {
      background-color: ${(props) => props.color};

      p {
        width: 100%;
      }

      .arrow {
        opacity: 0;
      }
    }
  }
`;
