import React, { useCallback, useEffect, useState } from 'react';
import ProfileSection from '@/components/mypage/Profile/ProfileSection';
import MypageTop from '@/components/mypage/MypageTop';
import MyLayout from '@/components/common/MyLayout';
import ProfilePostList from '@/components/mypage/Profile/ProfilePostList';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [userInfo, setUserInfo] = useState([]);
  const uid = useParams().uid;
  const navigate = useNavigate();
  const getUserProfile = useCallback(async () => {
    try {
      const { data } = await axios.get(`/profile/${uid}`);
      data.status === 200 && setUserInfo(data.data);
      data.status === 1008 && navigate('/');
    } catch (error) {
      toast.error(error);
      console.dir(error);
      navigate('/');
    }
  }, []);
  useEffect(() => {
    getUserProfile();
  }, []);
  return (
    <MyLayout>
      <MypageTop title={userInfo.nickName} />
      <ProfileSection data={userInfo} />
      <ProfilePostList />
    </MyLayout>
  );
}

export default Profile;
