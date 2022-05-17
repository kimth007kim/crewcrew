import React from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import useSWR from 'swr';
import Lnb from '../../components/common/Lnb/Lnb';
import MypageMainTop from '../../components/mypage/MypageMainTop';
import MypageTimeline from '../../components/mypage/MypageTimeline';
import MypageTop from '../../components/mypage/MypageTop';
import fetcher from '../../utils/fetcher';

function MyPage() {
  const cookies = new Cookies();
  const {
    data: myData,
    error,
    mutate,
  } = useSWR(['/user/token', cookies.get('user-token')], fetcher);

  if (myData === undefined) {
    return null;
  }

  console.log(myData, error);
  if (error) {
    toast.error('로그인 후 이용 가능합니다. 잘못된 접근입니다.');

    return <Navigate to="/" />;
  }
  return (
    <>
      <Lnb path="mypage" />
      <MainContainer>
        <MypageTop />
        <MypageMainTop />
        <MypageTimeline />
      </MainContainer>
    </>
  );
}

export default MyPage;

const MainContainer = styled('main')`
  margin-left: 142px;
  box-sizing: border-box;
  overflow-x: hidden;
  @media screen and (max-width: 820px) {
    width: 100%;
    padding: 60px 0 70px;
    margin: 0;
  }
`;
