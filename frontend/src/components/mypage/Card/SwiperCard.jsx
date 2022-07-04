import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import ChatWhite from '@/assets/images/ChatWhite.png';
import { hobbyFilterArr, studyFilterArr } from '@/frontDB/filterDB';

function SwiperCard({ data, boardId }) {
  const [studyList, setStudyList] = useState([]);
  const [hobbyList, setHobbyList] = useState([]);

  useEffect(() => {
    const studyArr = [];
    const hobbyArr = [];

    data.likedCategoryList.forEach((id) => {
      const categoryID = String(id);
      const tmpHobbyArr = hobbyFilterArr.filter((el) => el.value === categoryID);
      const tmpStudyArr = studyFilterArr.filter((el) => el.value === categoryID);
      if (tmpHobbyArr.length > 0) {
        hobbyArr.push(...tmpHobbyArr);
      } else {
        studyArr.push(...tmpStudyArr);
      }
    });

    setStudyList([...studyArr]);
    setHobbyList([...hobbyArr]);
  }, []);

  return (
    <>
      <Container>
        <CardHead>
          <CardProfile>
            <img src={data.profileImage} alt="" />
          </CardProfile>
          <CardTxt>
            <h4>{data.nickName}</h4>
            <p>{data.commentary}</p>
          </CardTxt>
        </CardHead>
        <CardBody>
          <h5>관심 스터디 크루</h5>
          <LabelList className="study">
            {studyList.map((item) => (
              <li key={`${item.htmlId}`}>{item.name}</li>
            ))}
          </LabelList>
          <h5>관심 취미 크루</h5>
          <LabelList className="hobby">
            {hobbyList.map((item) => (
              <li key={`${item.htmlId}`}>{item.name}</li>
            ))}
          </LabelList>
        </CardBody>
      </Container>
      <CardBtn>
        <p>{format(new Date(data.appliedDate), 'MM/dd')} 요청</p>
        <BtnWrapper>
          <button className="chat">채팅</button>
          <button className="nega">거절</button>
          <button className="posi">수락</button>
        </BtnWrapper>
      </CardBtn>
    </>
  );
}

export default SwiperCard;

const Container = styled('div')`
  width: 100%;
  height: 342px;
  border: 1px solid #e2e2e2;
  border-radius: 20px;
`;

const CardProfile = styled('div')``;

const CardTxt = styled('div')``;

const CardHead = styled('div')`
  padding: 27px 18px 18px 21px;
  box-sizing: border-box;
  height: 114px;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  gap: 13px;

  ${CardProfile} {
    min-width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    background-color: transparent;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  ${CardTxt} {
    h4 {
      font-size: 15px;
      font-weight: 700;
      margin-bottom: 10px;
    }

    p {
      font-size: 13px;
      font-weight: 400;
      color: #00b7ff;
      line-height: 20px;
    }
  }

  @media screen and (max-width: 820px) {
    height: 100px;
    padding: 12px;
    position: relative;

    ${CardProfile} {
      position: absolute;
      min-width: 24px;
      height: 24px;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    ${CardTxt} {
      h4 {
        margin: 0 0 10px 36px;
        line-height: 25px;
      }
    }
  }
`;

const LabelList = styled('ul')``;

const CardBody = styled('div')`
  padding: 0 20px 18px;

  h5 {
    margin: 20px 0 12px;
    font-size: 13px;
    font-weight: 500;
    color: #a8a8a8;
  }

  ${LabelList} {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;

    li {
      width: fit-content;
      padding: 4px 16px;
      font-size: 13px;
      font-weight: 300;
      color: #fff;
      border-radius: 13px;
    }

    &.study {
      li {
        background-color: #0f3fa6;
      }
    }

    &.hobby {
      li {
        background-color: #f7971e;
      }
    }
  }

  @media screen and (max-width: 820px) {
    padding: 0 12px 12px;

    ${LabelList} {
      li {
        padding: 3px 8px;
      }

      &.study {
        li {
          background-color: #0f3fa6;
        }
      }

      &.hobby {
        li {
          background-color: #f7971e;
        }
      }
    }
  }
`;

const BtnWrapper = styled('div')``;

const CardBtn = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  margin-top: 14px;

  p {
    font-size: 13px;
    color: #868686;
    margin-left: 16px;
  }

  ${BtnWrapper} {
    height: 100%;
    display: flex;
    gap: 8px;

    button {
      border: none;
      outline: none;
      cursor: pointer;
      border-radius: 5px;
      color: #fff;
      font-size: 13px;
      transition: 0.3s;
      width: 50px;

      &.chat {
        background: #c4c4c4 url(${ChatWhite}) center/20px no-repeat;
        text-indent: -9999px;
        width: 30px;

        :hover {
          background-color: #b0b0b0;
        }
      }

      &.nega {
        background-color: #f95884;

        :hover {
          background-color: #e9416e;
        }
      }

      &.posi {
        background-color: #00b7ff;

        :hover {
          background-color: #00a3e3;
        }
      }
    }
  }

  @media screen and (max-width: 820px) {
    p {
      margin-left: 8px;
    }

    ${BtnWrapper} {
      gap: 4px;
    }
  }
`;
