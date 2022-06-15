import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import BoxCard from './BoxCard';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function CrewBox() {
  const cookies = new Cookies();

  const [crewRequest, setCrewRequest] = useState(null);
  const [crewRecruit, setCrewRecruit] = useState(null);
  const [crewArrive, setCrewArrive] = useState(null);
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

  const apiArrived = useCallback(async () => {
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
    const apiCollect = async () => {
      try {
        await apiApplication();
        await apiRecruit();
        await apiArrived();
        await apiActivity();
      } catch (error) {
        console.error(error);
      }
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
          title="내게 도착한 참여요청"
          total={crewArrive ? crewArrive.totalApplyCount : 0}
          count_one={crewArrive ? crewArrive.applyToStudyCount : 0}
          count_two={crewArrive ? crewArrive.applyToHobbyCount : 0}
          onClick={() => handleLocate('/mypage/arrive')}
        />
        <BoxCard
          title="나의 활동 크루"
          small_title1="내 마감글"
          small_title2="참여중 글"
          total={crewActivity ? crewActivity.myCrewCount + crewActivity.participatedCount : 0}
          count_one={crewActivity ? crewActivity.myCrewCount : 0}
          count_two={crewActivity ? crewActivity.participatedCount : 0}
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
