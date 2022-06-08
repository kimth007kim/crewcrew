import React, { useCallback, useEffect, useState } from 'react';
import MyLayout from '@/components/common/MyLayout';
import MypageMainSubTop from '@/components/mypage/MypageMainSubTop';
import MypageSubTop from '@/components/mypage/MypageSubTop';
import styled from 'styled-components';
import axios from 'axios';
import { Cookies } from 'react-cookie';

function Request() {
  const cookies = new Cookies();
  const [crewRequest, setCrewRequest] = useState(null);

  const apiApplication = useCallback(async () => {
    try {
      const { data } = await axios.get('/application', {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      switch (data.status) {
        case 200:
          setCrewRequest({ ...data.data });
          break;

        default:
          break;
      }
    } catch (error) {
      console.dir(error);
    }
  }, []);

  useEffect(() => {
    const apiCollect = async () => {
      try {
        await apiApplication();
      } catch (error) {
        console.error(error);
      }
    };
    apiCollect();
  }, []);

  return (
    <MyLayout>
      <MypageSubTop title="내가 참여요청한 크루"></MypageSubTop>
      <MypageMainSubTop
        total={crewRequest ? crewRequest.totalApplyCount : 0}
        studyCnt={crewRequest ? crewRequest.applyToStudyCount : 0}
        hobbyCnt={crewRequest ? crewRequest.applyToHobbyCount : 0}
      ></MypageMainSubTop>
      <Wrap>
        <SectionWrap>
          <h3>스터디 크루</h3>
          <CardWrapper>
            <ul>
              <li></li>
            </ul>
          </CardWrapper>
        </SectionWrap>
      </Wrap>
    </MyLayout>
  );
}

export default Request;

const Wrap = styled('section')`
  background-color: #f6f7fb;
`;

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

const CardWrapper = styled('div')`
  li {
    padding-bottom: 14px;
  }
`;
