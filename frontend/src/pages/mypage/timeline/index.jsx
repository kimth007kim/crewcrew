import React from 'react';
import MyLayout from '@/components/common/MyLayout';
import MypageTop from '@/components/mypage/MypageTop';
import TimelineSection from '@/components/pageTimeline/TimelineSection';
import { Helmet } from 'react-helmet-async';

function PageTimeline() {
  return (
    <MyLayout>
      <Helmet>
        <title>타임라인 - 크루크루</title>
      </Helmet>
      <MypageTop />
      <TimelineSection />
    </MyLayout>
  );
}

export default PageTimeline;
