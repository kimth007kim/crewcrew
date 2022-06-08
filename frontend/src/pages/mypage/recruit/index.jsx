import React, { useCallback, useState } from 'react';
import MyLayout from '@/components/common/MyLayout';
import MypageMainSubTop from '@/components/mypage/MypageMainSubTop';
import MypageSubTop from '@/components/mypage/MypageSubTop';
import styled from 'styled-components';
import axios from 'axios';
import { Cookies } from 'react-cookie';

function Recruit() {
  const cookies = new Cookies();
  const [crewRecruit, setCrewRecruit] = useState(null);

  const apiRecruit = useCallback(async () => {
    try {
      const { data } = await axios.get('/application', {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      switch (data.status) {
        case 200:
          setCrewRecruit({ ...data.data });
          break;

        default:
          break;
      }
    } catch (error) {
      console.dir(error);
    }
  }, []);

  return (
    <MyLayout>
      <MypageSubTop title="내가 참여요청한 크루"></MypageSubTop>
      <MypageMainSubTop></MypageMainSubTop>
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

export default Recruit;

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
