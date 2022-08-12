import MyLayout from '@/components/common/MyLayout';
import MypageMainSubTop from '@/components/mypage/MypageMainSubTop';
import MypageSubTop from '@/components/mypage/MypageSubTop';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Cookies } from 'react-cookie';
import styled from 'styled-components';
import DeadlineList from '@/components/mypage/MyActivity/DeadlineList';
import AcceptList from '@/components/mypage/MyActivity/AcceptList';
import { throttle } from '@/utils';
import { Helmet } from 'react-helmet-async';

function MyActivity() {
  const cookies = new Cookies();
  const [crewActivity, setCrewActivity] = useState(null);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const title1Ref = useRef(null);
  const title2Ref = useRef(null);

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

  const excuteScroll = useCallback((ref) => {
    throttle(handleScrollTitle(ref), 500);
  }, []);

  const handleScrollTitle = (ref) => {
    if (ref?.current) {
      window.scrollTo(0, ref.current.offsetTop);
    }
  };

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
    apiActivity();
  }, []);

  return (
    <MyLayout>
      <Helmet>
        <title>나의 활동 크루 - 크루크루</title>
      </Helmet>
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
        handleTitle1={() => excuteScroll(title1Ref)}
        handleTitle2={() => excuteScroll(title2Ref)}
      ></MypageMainSubTop>
      <Wrap className="wrotePost" ref={title1Ref}>
        <SectionWrap>
          <h3>내가 쓴 마감글</h3>
          <DeadlineList postsPerPage={postsPerPage} />
        </SectionWrap>
      </Wrap>
      <Wrap className="accepted" ref={title2Ref}>
        <SectionWrap>
          <h3>참여수락된 글</h3>
          <AcceptList postsPerPage={postsPerPage} />
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

  &.wrotePost {
    padding-top: 52px;

    ${SectionWrap} {
      border-bottom: 2px solid #d7dae4;
    }
  }

  &.accepted {
    padding-bottom: 40px;
  }
`;
