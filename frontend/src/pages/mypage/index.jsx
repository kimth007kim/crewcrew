import React from 'react';
import MypageMainTop from '@/components/mypage/MypageMainTop';
import MypageTimeline from '@/components/mypage/MypageTimeline';
import MypageTop from '@/components/mypage/MypageTop';
import MyLayout from '@/components/common/MyLayout';

function MyPage() {
  return (
    <MyLayout>
      <MypageTop />
      <MypageMainTop />
      <MypageTimeline />
    </MyLayout>
  );
}

export default MyPage;
