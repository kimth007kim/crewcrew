import React from 'react';
import MyLayout from '@/components/common/MyLayout';
import MypageTop from '@/components/mypage/MypageTop';
import TimelineSection from '@/components/pageTimeline/TimelineSection';

function PageTimeline() {
  return (
    <MyLayout>
      <MypageTop />
      <TimelineSection />
    </MyLayout>
  );
}

export default PageTimeline;
