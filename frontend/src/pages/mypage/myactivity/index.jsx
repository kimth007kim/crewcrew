import Button from '@/components/common/Button';
import MyLayout from '@/components/common/MyLayout';
import MypageMainSubTop from '@/components/mypage/MypageMainSubTop';
import MypageSubTop from '@/components/mypage/MypageSubTop';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import styled from 'styled-components';

function MyActivity() {
  const cookies = new Cookies();
  const [crewActivity, setCrewActivity] = useState(null);

  const apiActivity = useCallback(async () => {
    try {
      let context = {};
      const { data: crewData } = await axios.get('/application/myCrew', {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      switch (crewData.status) {
        case 200:
          context = { ...crewData.data };
          break;

        default:
          console.dir(crewData.message);
          break;
      }
      const { data: participateData } = await axios.get('/application/participated', {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      switch (participateData.status) {
        case 200:
          setCrewActivity({ ...context, ...participateData.data });
          break;

        default:
          console.dir(participateData.message);

          break;
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    apiActivity();
  }, []);

  return (
    <MyLayout>
      <MypageSubTop title="나의 활동 크루"></MypageSubTop>
      <MypageMainSubTop
        total={crewActivity ? crewActivity.myCrewCount + crewActivity.participatedCount : 0}
        studyCnt={crewActivity ? crewActivity.myCrewCount : 0}
        hobbyCnt={crewActivity ? crewActivity.participatedCount : 0}
        title="나의 활동 크루"
        desc="내가 활동중인 크루를 이곳에서 간편하게 관리하세요!"
        disable={true}
        small_title1="내가 쓴 마감글"
        small_title2="참여 수락된 글"
      ></MypageMainSubTop>
      <Wrap className="wrotePost">
        <SectionWrap>
          <h3>내가 쓴 마감글</h3>
          <CardWrapper></CardWrapper>
        </SectionWrap>
      </Wrap>
      <Wrap className="accepted">
        <SectionWrap>
          <h3>참여수락된 글</h3>
          <NoContent>
            <p>
              <em>나의 활동 내역이 없습니다.</em>
              <br></br>
              활동을 하러 가보실까요?
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
