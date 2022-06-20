import React from 'react';
import MypageMainTop from '@/components/mypage/MypageMainTop';
import MypageTimeline from '@/components/mypage/MypageTimeline';
import MypageTop from '@/components/mypage/MypageTop';
import MyLayout from '@/components/common/MyLayout';
import MypagePostList from '@/components/mypage/Timeline/MypagePostList';

function MyPage() {
  return (
    <MyLayout>
      <MypageTop />
      <MypageMainTop />
      <MypageTimeline />
      <MypagePostList />
    </MyLayout>
  );
}

export default MyPage;
