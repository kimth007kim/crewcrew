import React, { useCallback, useEffect, useState } from 'react';
import ProfileSection from '@/components/mypage/Profile/ProfileSection';
import MypageTop from '@/components/mypage/MypageTop';
import MyLayout from '@/components/common/MyLayout';
import ProfilePostList from '@/components/mypage/Profile/ProfilePostList';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { Cookies } from 'react-cookie';

function Profile() {
  const [userInfo, setUserInfo] = useState([]);
  const uid = useParams().uid;
  const navigate = useNavigate();
  const myCookies = new Cookies();
  const { data: myData } = useSWR(['/auth/token', myCookies.get('X-AUTH-TOKEN')], fetcher);

  const getUserProfile = useCallback(async () => {
    if (!myData?.data) {
      return;
    }

    try {
      const { data } = await axios.get(`/profile/${uid}`);
      data.status === 200 && setUserInfo(data.data);
      data.status === 1008 && navigate('/');
    } catch (error) {
      toast.error(error);
      console.dir(error);
      navigate('/');
    } finally {
      myData.data.uid === Number(uid) && navigate('/mypage');
    }
  }, [myData]);

  useEffect(() => {
    getUserProfile();
  }, [myData]);

  return (
    <MyLayout>
      <MypageTop title={userInfo.nickName} />
      <ProfileSection data={userInfo} />
      <ProfilePostList />
    </MyLayout>
  );
}

export default Profile;
