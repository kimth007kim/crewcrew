import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import SwiperArrow from '@/assets/images/SwiperArrow.png';
import SwiperArrowReverse from '@/assets/images/SwiperArrowReverse.png';
import SettingWhite from '@/assets/images/SettingWhite.png';
import SwiperBtSection from './SwiperBtSection';

function ArriveCard({ data }) {
  const [isSwiperClick, setIsSwiperClick] = useState(false);

  const handleClick = useCallback(() => {
    setIsSwiperClick(!isSwiperClick);
  }, [isSwiperClick]);

  return (
    <Container>
      <Wrapper>
        <CardTop active={isSwiperClick}>
          <CardHead>
            <TextBox>
              <Dday>D-2</Dday>
            </TextBox>
            <DetailBox>
              <p>
                <span>(8/10명)</span> 모집완료
              </p>
              <button>크루원채팅</button>
            </DetailBox>
          </CardHead>
          <CardBody>
            <TextBox>
              <TitleBox>
                <h5>함께 크루원 모집 플랫폼 작업하실 분 모십니다~!</h5>
              </TitleBox>
              <TextList>
                <CategoryText textColor={1 === 1 ? '#005ec5' : '#F7971E'}>고시/공무원</CategoryText>
                <p>오프라인</p>
              </TextList>
              <ButtonBox>
                <button>삭제</button>
                <button className="set">세팅</button>
              </ButtonBox>
              <Waiting>
                대기자<em>3</em>
              </Waiting>
            </TextBox>
          </CardBody>
        </CardTop>
        <CardBottom active={isSwiperClick}>
          <BtTop>
            <p>
              대기자
              <em> 3</em>
            </p>
            <button>참여자 확인 (8)</button>
          </BtTop>
          <SwiperBtSection isSwiperClick={isSwiperClick}></SwiperBtSection>
        </CardBottom>
      </Wrapper>
      <SwiperBtn onClick={handleClick} active={isSwiperClick}>
        대기자
      </SwiperBtn>
    </Container>
  );
}

export default ArriveCard;

const Container = styled('div')`
  position: relative;
`;

const Wrapper = styled('div')`
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  cursor: pointer;
  padding: 0;
  height: auto;
  flex-direction: column;
  transition: height 0.5s, border 0.2s;
  cursor: default;

  :hover {
    border-color: #a8a8a8;
  }
`;

const SwiperBtn = styled('div')`
  width: 74px;
  height: 26px;
  border-radius: 0 0 5px 5px;
  font-size: 12px;
  color: #a8a8a8;
  line-height: 26px;
  padding-left: 12px;
  box-sizing: border-box;
  background: #fff url(${SwiperArrow}) center right 10px/10px no-repeat;
  cursor: pointer;
  margin-left: calc(100% - 116px);
  ${(props) =>
    props.active &&
    css`
      background-image: url(${SwiperArrowReverse});
    `}
`;

const CardTop = styled('div')`
  width: 100%;
  min-height: 94px;
  display: flex;
  align-items: center;
  position: relative;
  padding: 14px 0;
  box-sizing: border-box;

  ${(props) =>
    props.active &&
    css`
      border-bottom: 1px solid #e2e2e2;
    `}
`;

const TextBox = styled('div')``;

const Dday = styled('p')``;

const TitleBox = styled('div')``;

const TextList = styled('div')``;

const ButtonBox = styled('div')``;

const Waiting = styled('p')``;

const CategoryText = styled.span`
  font-size: 12px;
  font-weight: 400;
  margin-right: 20px;
  ${(props) =>
    props.textColor &&
    css`
      color: ${props.textColor};
    `}
  ${(props) =>
    props.isDisabled &&
    css`
      color: #a8a8a8;
    `}
  @media screen and (max-width: 820px) {
    margin-right: 12px;
  }
`;

const CardHead = styled('div')`
  display: flex;
  height: 100%;
  position: relative;
  min-width: 262px;
  border: none;
  align-items: center;

  ${TextBox} {
    width: 100%;
    height: 100%;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    ${Dday} {
      font-weight: 700;
      color: #00b7ff;
      text-align: right;
      font-size: 20px;
      margin: 0;
    }
  }
`;

const DetailBox = styled('div')`
  min-width: 158px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 24px;
  box-sizing: border-box;
  border-left: 1px solid #a8a8a8;
  border-right: 1px solid #a8a8a8;

  p {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 7px;
    white-space: nowrap;

    span {
      font-weight: 500;
    }
  }

  button {
    width: 100%;
    height: 30px;
    border: none;
    outline: none;
    border-radius: 5px;
    color: #fff;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.3s;

    background-color: #00b7ff;

    &:hover {
      background-color: #00a3e3;
    }
  }
`;

const CardBody = styled('div')`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-left: 24px;
  position: relative;

  ${TextBox} {
    width: 100%;
    height: 100%;

    ${TitleBox} {
      display: flex;
      align-items: center;
      h5 {
        width: calc(100% - 220px);
        margin-top: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 15px;
        font-weight: 700;
        color: #000;
        ${(props) =>
          props.isDisabled &&
          css`
            color: #a8a8a8;
          `}
      }
    }

    ${TextList} {
      display: flex;
      margin-top: 22px;
      p {
        font-size: 12px;
        font-weight: 400;
        color: #868686;
      }

      p:not(:last-child) {
        margin-right: 20px;
      }

      ${CategoryText} {
        font-weight: 700;
      }
    }
  }

  ${ButtonBox} {
    display: flex;
    box-sizing: border-box;
    flex-direction: column;
    justify-content: space-between;
    min-width: auto;
    height: 100%;
    position: absolute;
    top: 0;
    right: 175px;
    border: none;
    gap: 4px;
    padding: 0;

    button {
      min-width: 30px;
      min-height: 30px;
      border: none;
      border-radius: 5px;
      outline: none;
      color: #fff;
      cursor: pointer;
      transition: 0.3s;
      font-size: 15px;
      background-color: #c4c4c4;

      &.set {
        text-indent: -9999px;
        background: #c4c4c4 url(${SettingWhite}) center/16px no-repeat;
        background-position: center;
      }
    }
  }

  ${Waiting} {
    min-width: 160px;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-left: 1px solid #a8a8a8;
    flex-direction: column;
    justify-content: space-between;
    padding: 2px 0;
    font-size: 15px;
    color: #a8a8a8;
    font-weight: 700;

    em {
      font-size: 32px;
      color: #00b7ff;
    }
  }

  @media screen and (max-width: 820px) {
    padding: 0;
    ${ButtonBox} {
      display: none;
    }

    ${TextBox} {
      ${TitleBox} {
        margin-top: 18px;
        h5 {
          font-size: 14px;
        }
      }

      ${TextList} {
        display: flex;
        margin-top: 17px;
        p {
          font-size: 12px;
          font-weight: 400;
        }

        p:not(:last-child) {
          margin-right: 12px;
        }
      }
    }
  }
`;

const BtTop = styled('div')``;

const CardBottom = styled('div')`
  width: 100%;
  height: 0;
  overflow-y: hidden;
  background-color: #fff;
  transition: 0.5s;
  border-radius: 0 0 10px 10px;

  ${(props) =>
    props.active &&
    css`
      height: 470px;
    `}

  ${BtTop} {
    height: 54px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 26px 12px 16px;
    box-sizing: border-box;

    p {
      font-size: 18px;
      font-weight: 700;
      color: #a8a8a8;

      em {
        color: #00b7ff;
      }
    }

    button {
      border: none;
      outline: none;
      cursor: pointer;
      background-color: #868686;
      width: 110px;
      height: 30px;
      border-radius: 5px;
      color: #fff;
      font-size: 13px;
      transition: 0.3s;

      &:hover {
        background-color: #747474;
      }
    }
  }
`;
