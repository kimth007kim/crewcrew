import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import BoxCard from './BoxCard';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CrewBox() {
  const cookies = new Cookies();

  const [crewRequest, setCrewRequest] = useState(null);
  const [crewRecruit, setCrewRecruit] = useState(null);
  const [crewActivity, setCrewActivity] = useState(null);

  const navigate = useNavigate();

  const handleLocate = useCallback((link) => {
    return navigate(link);
  }, []);

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

  const apiRecruit = useCallback(async () => {
    try {
      const { data } = await axios.get('/application/recruiting', {
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

  useEffect(() => {
    const apiCollect = () => {
      apiApplication();
      apiRecruit();
      apiActivity();
    };
    apiCollect();
  }, []);

  return (
    <Container>
      <h3>내 크루 현황 관리</h3>
      <p>나와 관련된 크루들의 현황을 이곳에서 관리하세요!</p>
      <CrewBoxWrap>
        <BoxCard
          title="내가 참여요청한 크루"
          total={crewRequest ? crewRequest.totalApplyCount : 0}
          count_one={crewRequest ? crewRequest.applyToStudyCount : 0}
          count_two={crewRequest ? crewRequest.applyToHobbyCount : 0}
          onClick={() => handleLocate('/mypage/request')}
        />
        <BoxCard
          title="내가 모집중인 크루"
          total={crewRecruit ? crewRecruit.totalApplyCount : 0}
          count_one={crewRecruit ? crewRecruit.applyToStudyCount : 0}
          count_two={crewRecruit ? crewRecruit.applyToHobbyCount : 0}
          onClick={() => handleLocate('/mypage/recruit')}
        />
        <BoxCard
          title="나의 활동 크루"
          small_title1="내 마감글"
          small_title2="참여중 글"
          total={
            crewActivity ? crewActivity.myAcceptedApplyBoardCnt + crewActivity.myExpiredBoardCnt : 0
          }
          count_one={crewActivity ? crewActivity.myExpiredBoardCnt : 0}
          count_two={crewActivity ? crewActivity.myAcceptedApplyBoardCnt : 0}
          onClick={() => handleLocate('/mypage/activity')}
          deactive={true}
        />
      </CrewBoxWrap>
    </Container>
  );
}

export default CrewBox;

const Container = styled('div')`
  width: 100%;

  h3 {
    margin-top: 20px;
  }

  & > p {
    margin-top: 8px;
    font-size: 13px;
    color: #868686;
    font-weight: 400;
  }

  @media screen and (max-width: 820px) {
    padding: 0 20px;
    box-sizing: border-box;
  }

  @media screen and (max-width: 300px) {
    padding: 0 10px;
  }
`;

const CrewBoxWrap = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  margin-top: 20px;

  @media screen and (max-width: 820px) {
    gap: 16px;
  }

  @media screen and (max-width: 300px) {
    gap: 8px;
  }
`;
