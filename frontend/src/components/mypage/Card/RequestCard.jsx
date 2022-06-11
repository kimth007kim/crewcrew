import React from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';

function RequestCard({ data }) {
  return (
    <Container>
      <CardHead>
        <ProfileBox>
          <img src="" alt="" />
        </ProfileBox>
        <TextBox>
          <Dday>D-2</Dday>
          <CardDate>2/4 (목)</CardDate>
          <CardName>재영재영유재영아아아</CardName>
        </TextBox>
      </CardHead>
      <CardBody>
        <TextBox>
          <TitleBox>
            <h5>함께 크루원 모집 플랫폼 작업하실 분 모십니다~! 크루</h5>
          </TitleBox>
          <TextList>
            <CategoryText textColor={`data.categoryParentId` === 1 ? '#005ec5' : '#F7971E'}>
              고시/공무원
            </CategoryText>
            <p>오프라인</p>
            <p>10/10명</p>
            <p>요청자 50</p>
          </TextList>
        </TextBox>
        <DetailBox>
          <p>
            (03/22) <span>요청완료</span>
          </p>
          <button>상세확인</button>
        </DetailBox>
        <ButtonBox>
          <button>요청취소</button>
        </ButtonBox>
      </CardBody>
    </Container>
  );
}

export default RequestCard;

const Container = styled('div')`
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
`;

const ProfileBox = styled.div``;

const TextBox = styled.div``;

const Dday = styled.p``;

const CardDate = styled.p``;

const CardName = styled.p``;

const TitleBox = styled.div``;

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

const TextList = styled.div``;

const ButtonBox = styled.div``;

const CardHead = styled.div`
  display: flex;
  min-width: 204px;
  height: 100%;
  border-right: 1px solid #a8a8a8;

  ${ProfileBox} {
    min-width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: transparent;
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
      margin-top: 4px;
      font-size: 16px;
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
      margin-top: 0px;
      font-size: 12px;
      font-weight: 300;
      color: #868686;
    }

    ${CardName} {
      margin-top: 2px;
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
        margin-left: 12px;
        padding-right: 28px;
      }

      ${CardName} {
        margin: 0;
        font-size: 12px;
        font-weight: 300;
        color: #868686;
      }
    }
  }

  @media screen and (max-width: 820px) {
    ${TextBox} {
      ${CardDate} {
        order: 1;
        margin-left: 10px;
        padding-right: 26px;
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
      h5 {
        width: 290px;
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
      margin-top: 15px;
      p {
        font-size: 12px;
        font-weight: 400;
        color: #868686;

        &:last-child {
          color: #000;
          font-weight: 700;
        }
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
    height: 60px;
    gap: 14px;
    padding: 5px 0;
    padding-left: 22px;
    box-sizing: border-box;
    border-left: 1px solid #a8a8a8;
    min-width: 130px;
    justify-content: flex-end;
    border: none;

    button {
      width: 100px;
      height: 100%;
      border: none;
      border-radius: 10px;
      outline: none;
      color: #fff;
      font-size: 15px;
      background-color: #c4c4c4;
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

        ${CategoryText} {
          font-weight: 700;
        }
      }
    }
  }
`;

const DetailBox = styled('div')`
  min-width: 158px;
  height: 60px;
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

    background-color: #c4c4c4;

    ${(props) =>
      props.color === 'nega' &&
      css`
        background-color: #f95884;
      `}

    ${(props) =>
      props.color === 'posi' &&
      css`
        background-color: #00b7ff;
      `}
  }
`;
