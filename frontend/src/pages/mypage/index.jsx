import React from 'react';
import MypageMainTop from '@/components/mypage/MypageMainTop';
import MypageTimeline from '@/components/mypage/MypageTimeline';
import MypageTop from '@/components/mypage/MypageTop';
import MyLayout from '@/components/common/MyLayout';
import MypagePostList from '@/components/mypage/Timeline/MypagePostList';
import { Helmet } from 'react-helmet-async';

function MyPage() {
  return (
    <MyLayout>
      <Helmet>
        <title>마이페이지 - 크루크루</title>
      </Helmet>
      <MypageTop />
      <MypageMainTop />
      <MypageTimeline />
      <MypagePostList />
    </MyLayout>
  );
}

export default MyPage;
