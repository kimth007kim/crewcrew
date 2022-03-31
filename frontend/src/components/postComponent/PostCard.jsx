import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import StarOffImg from '../../assets/images/StarOff.png';
import StarOnImg from '../../assets/images/StarOn.png';
import Profile4 from '../../assets/images/Profile4.png';

function PostCard({ isDeadline }) {
  return (
    <Wrapper>
      <CardHead isDisabled={isDeadline}>
        <ProfileBox>
          <img src={`${Profile4}`} alt="" />
        </ProfileBox>
        <TextBox>
          <Dday>{isDeadline ? '마감' : 'D-2'}</Dday>
          <CardDate>2/4 (목)</CardDate>
          <CardName>세상은요지경</CardName>
        </TextBox>
      </CardHead>
      <CardBody isDisabled={isDeadline}>
        <TextBox>
          <TitleBox>
            <h5>함께 크루원 모집 플랫폼 작업하실 분 모십니다~! 크루크루</h5>
            <Star />
          </TitleBox>
          <TextList>
            <CategoryText textColor="#005ec5" isDisabled={isDeadline}>
              고시/공무원
            </CategoryText>
            <p>오프라인</p>
            <p>10/10명</p>
            <p>조회수 50</p>
          </TextList>
        </TextBox>
        <ButtonBox>
          <ButtonDetail>상세보기</ButtonDetail>
          <ButtonParticipate disabled={isDeadline}>참여하기</ButtonParticipate>
        </ButtonBox>
      </CardBody>
    </Wrapper>
  );
}

export default PostCard;

const Wrapper = styled.div`
  height: 94px;
  background-color: #fff;
  border-radius: 10px;
  padding: 16px 22px 16px 18px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  transition: 0.2s;
  border: 1px solid transparent;
  cursor: pointer;
  :hover {
    border-color: #a8a8a8;
  }
  @media screen and (max-width: 820px) {
    height: 108px;
    padding: 10px 12px 14px 12px;
    flex-direction: column;
    position: relative;
  }
`;

const ProfileBox = styled.div``;

const TextBox = styled.div``;

const Dday = styled.p``;

const CardDate = styled.p``;

const CardName = styled.p``;

const TitleBox = styled.div``;

const CategoryText = styled.span`
  font-size: 13px;
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

const Star = styled.div`
  width: 24px;
  height: 24px;
  background: url(${StarOffImg}) 50% 50% no-repeat;
  background-size: 20px !important;
  cursor: pointer;
  margin-left: 10px;
  @media screen and (max-width: 820px) {
    position: absolute;
    top: 6px;
    right: 10px;
  }
`;

const TextList = styled.div``;

const ButtonBox = styled.div``;

const ButtonDetail = styled.button`
  cursor: pointer;
  background-color: #c4c4c4;
  :hover {
    background-color: #b0b0b0;
  }
`;

const ButtonParticipate = styled.button`
  cursor: pointer;

  background-color: #00b7ff;
  :hover {
    background-color: #00a3e3;
  }

  :disabled {
    background-color: #f0f0f0;
    cursor: default;
  }
`;

const CardHead = styled.div`
  display: flex;
  min-width: 204px;
  height: 100%;
  border-right: 1px solid #a8a8a8;

  ${ProfileBox} {
    min-width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #8d2bf5;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      -o-object-fit: cover;
      object-fit: cover;
    }
  }

  ${TextBox} {
    width: 100%;
    height: 100%;
    padding: 0 14px;
    ${Dday} {
      margin-top: 8px;
      font-size: 13px;
      font-weight: 700;
      color: #00b7ff;
      text-align: right;
      ${(props) =>
        props.isDisabled &&
        css`
          color: #a8a8a8;
        `}
    }

    ${CardDate} {
      margin-top: 2px;
      font-size: 10px;
      font-weight: 300;
      color: #868686;
    }

    ${CardName} {
      margin-top: 4px;
      font-size: 13px;
      font-weight: 500;
      color: #000;
    }
  }

  @media screen and (max-width: 820px) {
    width: 100%;
    height: 16px;
    border: none;
    ${ProfileBox} {
      display: none;
    }
    ${TextBox} {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0;
      ${Dday} {
        margin: 0;
        margin-right: auto;
      }

      ${CardDate} {
        margin: 0;
        order: 1;
        margin-left: 14px;
        padding-right: 32px;
      }

      ${CardName} {
        margin: 0;
        font-size: 10px;
        font-weight: 300;
        color: #868686;
      }
    }
  }
`;

const CardBody = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-left: 15px;

  ${TextBox} {
    width: 100%;
    height: 100%;

    ${TitleBox} {
      display: flex;
      align-items: center;
      margin-top: 2px;
      h5 {
        width: 323px;
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
      margin-top: 14px;
      p {
        font-size: 13px;
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
    justify-content: space-between;
    min-width: 214px;
    height: 50px;

    button {
      width: 100px;
      height: 100%;
      border: none;
      border-radius: 10px;
      outline: none;
      color: #fff;
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
          font-size: 13px;
        }
      }

      ${TextList} {
        display: flex;
        margin-top: 17px;
        p {
          font-size: 13px;
          font-weight: 400;
        }

        p:not(:last-child) {
          margin-right: 12px;
        }

        ${CategoryText} {
          font-weight: 700;
        }
      }
    }
  }

  @media screen and (max-width: 300px) {
    ${TextBox} {
      ${TextList} {
        p {
          font-size: 10px;
          font-weight: 400;
        }
        ${CategoryText} {
          font-size: 10px;
        }
      }
    }
  }
`;
