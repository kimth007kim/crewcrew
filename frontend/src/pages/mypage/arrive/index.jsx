import React, { useCallback, useEffect, useState } from 'react';
import MyLayout from '@/components/common/MyLayout';
import MypageSubTop from '@/components/mypage/MypageSubTop';
import MypageMainSubTop from '@/components/mypage/MypageMainSubTop';
import styled from 'styled-components';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import Button from '@/components/common/Button';
import ArriveCard from '@/components/mypage/Card/ArriveCard';

function Arrive() {
  const cookies = new Cookies();
  const [crewArrive, setCrewArrive] = useState(null);

  const apiArrive = useCallback(async () => {
    try {
      const { data } = await axios.get('/application/arrived', {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      switch (data.status) {
        case 200:
          setCrewArrive({ ...data.data });
          break;

        default:
          break;
      }
    } catch (error) {
      console.dir(error);
    }
  }, []);

  useEffect(() => {
    apiArrive();
  }, []);
  return (
    <MyLayout>
      <MypageSubTop title="내게 도착한 참여요청"></MypageSubTop>
      <MypageMainSubTop
        total={crewArrive ? crewArrive.totalApplyCount : 0}
        studyCnt={crewArrive ? crewArrive.applyToStudyCount : 0}
        hobbyCnt={crewArrive ? crewArrive.applyToHobbyCount : 0}
        title="내게 도착한 참여요청"
        desc="내게 도착한 참여요청을 이곳에서 간편하게 관리하세요!"
      ></MypageMainSubTop>
      <Wrap className="study">
        <SectionWrap>
          <h3>스터디 크루</h3>
          <CardWrapper>
            <ul>
              <li>
                <ArriveCard />
              </li>
              <li>
                <ArriveCard />
              </li>
              <li>
                <ArriveCard />
              </li>
            </ul>
            <PaginationWrapper></PaginationWrapper>
          </CardWrapper>
        </SectionWrap>
      </Wrap>
      <Wrap className="hobby">
        <SectionWrap>
          <h3>취미 크루</h3>
          <NoContent>
            <p>
              <em>내게 도착한 크루참여요청이 없습니다.</em>
              <br></br>
              크루 모집글을 작성해 크루원을 모집하세요!
            </p>
            <Button
              widthSize={100}
              heightSize={50}
              paddings={0}
              fontSize={15}
              lineHeight={26}
              borderRadius={10}
              size={'regular'}
              color={'lightBlue'}
            >
              크루참여
            </Button>
          </NoContent>
        </SectionWrap>
      </Wrap>
    </MyLayout>
  );
}

export default Arrive;

const SectionWrap = styled('div')`
  max-width: 850px;
  margin: auto;
  position: relative;

  h3 {
    font-size: 20px;
    font-weight: 700;
    padding: 38px 0 24px;
  }
`;

const Wrap = styled('section')`
  background-color: #f6f7fb;

  &.study {
    padding-top: 52px;
    h3 {
      color: #0f3fa6;
    }
    ${SectionWrap} {
      border-bottom: 2px solid #d7dae4;
    }
  }
  &.hobby h3 {
    color: #f7971e;
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

const PaginationWrapper = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 598px;
  padding: 48px 0 64px;
  margin: 0 auto;
`;
