import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { format } from 'date-fns';
import ChatWhite from '@/assets/images/ChatWhite.png';
import { hobbyFilterArr, studyFilterArr } from '@/frontDB/filterDB';
import { useNavigate } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';

function SwiperCard({ data, boardId, status }) {
  const cookies = new Cookies();
  const { data: myData } = useSWR(['/auth/token', cookies.get('X-AUTH-TOKEN')], fetcher);

  const [studyList, setStudyList] = useState([]);
  const [hobbyList, setHobbyList] = useState([]);

  const navigate = useNavigate();

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

  const navigateChat = (e) => {
    e.stopPropagation();
    if (myData?.data.uid === data.uid) {
      window.alert('자기자신에게 채팅을 보낼 수 없습니다');
      return false;
    }
    navigate(`/mypage/chat/${boardId}/${data.uid}`);
  };

  const renderStatusBtn = useCallback(() => {
    if (status === 0) {
      return (
        <>
          <button className="nega">거절</button>
          <button className="posi">수락</button>
        </>
      );
    }

    if (status === 1) {
      return <button className="cancel">참여취소</button>;
    }
  }, [status]);

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
        <p>{format(new Date(data.appliedDate.replace(/-/g, '/')), 'MM/dd')} 요청</p>
        <BtnWrapper>
          <button className="chat" onClick={navigateChat}>
            채팅
          </button>
          {renderStatusBtn()}
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
      width: 51px;

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

      &.cancel {
        width: 74px;

        background-color: #f95884;

        :hover {
          background-color: #e9416e;
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
