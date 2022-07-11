import Button from '@/components/common/Button';
import MyLayout from '@/components/common/MyLayout';
import ActivityCard from '@/components/mypage/Card/ActivityCard';
import ParticipateCard from '@/components/mypage/Card/ParticipateCard';
import MypageMainSubTop from '@/components/mypage/MypageMainSubTop';
import MypageSubTop from '@/components/mypage/MypageSubTop';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import styled from 'styled-components';

function MyActivity() {
  const cookies = new Cookies();
  const [crewActivity, setCrewActivity] = useState(null);
  const [deadlineList, setDeadlineList] = useState([]);
  const [acceptList, setAcceptList] = useState([]);

  const apiActivity = useCallback(async () => {
    try {
      const { data } = await axios.get('/application/myCrew', {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      switch (data.status) {
        case 200:
          setCrewActivity({ ...data.data });
          break;

        default:
          console.dir(data.message);
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getActivityDeadline = useCallback(async () => {
    try {
      const { data } = await axios.get('/application/myCrew/details', {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      switch (data.status) {
        case 200:
          setDeadlineList([...data.data.content]);
          break;

        default:
          console.dir(data.message);
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getActivityAccept = useCallback(async () => {
    try {
      const { data } = await axios.get('/application/myCrew/participated/details', {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      switch (data.status) {
        case 200:
          setAcceptList([...data.data.contents]);
          break;

        default:
          console.dir(data.message);
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    apiActivity();
    getActivityDeadline();
    getActivityAccept();
  }, []);

  return (
    <MyLayout>
      <MypageSubTop title="나의 활동 크루"></MypageSubTop>
      <MypageMainSubTop
        total={
          crewActivity ? crewActivity.myAcceptedApplyBoardCnt + crewActivity.myExpiredBoardCnt : 0
        }
        studyCnt={crewActivity ? crewActivity.myExpiredBoardCnt : 0}
        hobbyCnt={crewActivity ? crewActivity.myAcceptedApplyBoardCnt : 0}
        title="나의 활동 크루"
        desc="내가 활동중인 크루를 이곳에서 간편하게 관리하세요!"
        disable={true}
        small_title1="내가 쓴 마감글"
        small_title2="참여 수락된 글"
      ></MypageMainSubTop>
      <Wrap className="wrotePost">
        <SectionWrap>
          <h3>내가 쓴 마감글</h3>
          <CardWrapper>
            <ul>
              {deadlineList.length > 0 &&
                deadlineList.map((v) => (
                  <li key={v.boardId}>
                    <ActivityCard postData={v}></ActivityCard>
                  </li>
                ))}
            </ul>
          </CardWrapper>
        </SectionWrap>
      </Wrap>
      <Wrap className="accepted">
        <SectionWrap>
          <h3>참여수락된 글</h3>
          <CardWrapper>
            <ul>
              {acceptList.length > 0 &&
                acceptList.map((v) => (
                  <li key={v.boardId}>
                    <ParticipateCard postData={v}></ParticipateCard>
                  </li>
                ))}
            </ul>
          </CardWrapper>
        </SectionWrap>
      </Wrap>
    </MyLayout>
  );
}

export default MyActivity;

const SectionWrap = styled('div')`
  max-width: 850px;
  margin: auto;
  position: relative;

  h3 {
    font-size: 20px;
    font-weight: 700;
    padding: 38px 0 24px;
  }

  @media screen and (max-width: 820px) {
    padding: 0 20px;

    h3 {
      padding: 36px 0 20px;
    }
  }

  @media screen and (max-width: 300px) {
    padding: 0 10px;

    br.fold {
      display: block;
    }
  }
`;

const Wrap = styled('section')`
  background-color: #f6f7fb;

  &.wrotePost {
    padding-top: 52px;

    ${SectionWrap} {
      border-bottom: 2px solid #d7dae4;
    }
  }
`;

const CardWrapper = styled('div')`
  li {
    padding-bottom: 14px;
  }
`;

const NoContent = styled('div')`
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 15px;
    line-height: 22px;
    text-align: center;
    font-weight: 400;
    margin-bottom: 20px;

    em {
      font-weight: 700;
    }
  }
`;
