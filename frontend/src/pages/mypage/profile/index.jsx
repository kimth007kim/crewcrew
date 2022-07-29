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
  const [userBoard, setUserBoard] = useState([]);
  const uid = useParams().uid;
  const navigate = useNavigate();
  const myCookies = new Cookies();
  const { data: myData } = useSWR(
    myCookies.get('X-AUTH-TOKEN') ? ['/auth/token', myCookies.get('X-AUTH-TOKEN')] : null,
    fetcher,
  );

  const getUserProfile = useCallback(async () => {
    if (!(myData && myData.data)) return;

    try {
      const { data } = await axios.get(`/profile/${uid}`);
      data.status === 200 && setUserInfo(data.data);
      data.status === 1008 && navigate('/', { replace: true });
    } catch (error) {
      toast.error(error);
      console.dir(error);
      navigate('/');
    }
  }, [myData]);

  const getUserBoard = useCallback(async () => {
    if (!(myData && myData.data)) return false;

    try {
      const { data } = await axios.get(`/profile/board/${uid}`);
      data.status === 200 && setUserBoard(data.data);
    } catch (error) {
      toast.error(error);
      console.dir(error);
    }
  }, [myData]);

  useEffect(() => {
    if (myData?.data?.uid === Number(uid)) {
      return navigate('/mypage', { replace: true });
    }
    getUserProfile();
    getUserBoard();

    return () => {
      setUserInfo([]);
      setUserBoard([]);
    };
  }, [myData]);

  return (
    <MyLayout>
      <MypageTop title={userInfo.nickName} />
      <ProfileSection userInfo={userInfo} userBoard={userBoard} />
      <ProfilePostList />
    </MyLayout>
  );
}

export default Profile;
