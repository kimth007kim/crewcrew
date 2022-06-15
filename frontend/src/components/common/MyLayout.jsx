import fetcher from '@/utils/fetcher';
import React from 'react';
import { Cookies } from 'react-cookie';
import { Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import useSWR from 'swr';
import ScrollButton from '../post/ScrollButton';
import Lnb from './Lnb/Lnb';

function MyLayout({ children, path = 'mypage' }) {
  const cookies = new Cookies();
  const {
    data: myData,
    error,
    mutate,
  } = useSWR(['/auth/token', cookies.get('X-AUTH-TOKEN')], fetcher);

  if (myData === undefined) {
    return null;
  }

  if (error || (myData && myData.data === null)) {
    toast.error('로그인 후 이용 가능합니다. 잘못된 접근입니다.');

    return <Navigate to="/" />;
  }

  return (
    <>
      <Lnb path={path} />
      <ScrollButton />
      <MainContainer>{children}</MainContainer>
    </>
  );
}

export default MyLayout;

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
