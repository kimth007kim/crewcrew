import React, { useCallback, useEffect, useState } from 'react';
import MyLayout from '@/components/common/MyLayout';
import MypageMainSubTop from '@/components/mypage/MypageMainSubTop';
import MypageSubTop from '@/components/mypage/MypageSubTop';
import styled from 'styled-components';
import axios from 'axios';
import { Cookies } from 'react-cookie';

import RequestStudyList from '@/components/mypage/Request/RequestStudyList';
import RequestHobbyList from '@/components/mypage/Request/RequestHobbyList';

import { Helmet } from 'react-helmet-async';
import useMoveScroll from '@/hooks/useMoveScroll';

function Request() {
  const cookies = new Cookies();
  const [crewRequest, setCrewRequest] = useState(null);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const [element1, handleMove1] = useMoveScroll();
  const [element2, handleMove2] = useMoveScroll();

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

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setPostsPerPage(10);
    } else if (window.innerWidth > 320) {
      setPostsPerPage(5);
    } else {
      setPostsPerPage(3);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    apiApplication();
  }, []);

  return (
    <MyLayout>
      <Helmet>
        <title>내가 참여요청한 크루 - 크루크루</title>
      </Helmet>
      <MypageSubTop title="내가 참여요청한 크루"></MypageSubTop>
      <MypageMainSubTop
        total={crewRequest ? crewRequest.totalApplyCount : 0}
        studyCnt={crewRequest ? crewRequest.applyToStudyCount : 0}
        hobbyCnt={crewRequest ? crewRequest.applyToHobbyCount : 0}
        handleTitle1={handleMove1}
        handleTitle2={handleMove2}
      ></MypageMainSubTop>
      <Wrap className="study" ref={element1}>
        <SectionWrap>
          <h3>스터디 크루</h3>
          <RequestStudyList postsPerPage={postsPerPage} />
        </SectionWrap>
      </Wrap>
      <Wrap className="hobby" ref={element2}>
        <SectionWrap>
          <h3>취미 크루</h3>
          <RequestHobbyList postsPerPage={postsPerPage} />
        </SectionWrap>
      </Wrap>
    </MyLayout>
  );
}

export default Request;

const SectionWrap = styled('div')`
  max-width: 850px;
  margin: auto;
  position: relative;

  h3 {
    font-size: 20px;
    font-weight: 700;
    padding: 38px 0 24px;
  }

  br.fold {
    display: none;
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

  &.study {
    padding-top: 52px;
    h3 {
      color: #0f3fa6;
    }
    ${SectionWrap} {
      border-bottom: 2px solid #d7dae4;
    }
  }
  &.hobby {
    padding-bottom: 40px;

    h3 {
      color: #f7971e;
    }
  }

  @media screen and (max-width: 820px) {
    padding-top: 24px;
  }
`;
