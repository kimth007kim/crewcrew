import React from 'react';
import ProfileSection from '@/components/mypage/Profile/ProfileSection';
import MypageTop from '@/components/mypage/MypageTop';
import MyLayout from '@/components/common/MyLayout';
import ProfilePostList from '@/components/mypage/Profile/ProfilePostList';

function Profile() {
  return (
    <MyLayout>
      <MypageTop title={'재영재영유재영유재영'} />
      <ProfileSection />
      <ProfilePostList />
    </MyLayout>
  );
}

export default Profile;
