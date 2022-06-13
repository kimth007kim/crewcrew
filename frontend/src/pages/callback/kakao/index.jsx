import Loader from '@/components/common/Loader';
import fetcher from '@/utils/fetcher';
import axios from 'axios';
import qs from 'qs';
import React, { useEffect } from 'react';
import { Cookies } from 'react-cookie';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import useSWR from 'swr';

function Kakao() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const myCookies = new Cookies();
  const {
    data: myData,
    error,
    mutate,
  } = useSWR(['/auth/token', myCookies.get('X-AUTH-TOKEN')], fetcher);

  useEffect(() => {
    const getToken = async () => {
      try {
        const { code } = qs.parse(search, {
          ignoreQueryPrefix: true,
        });

        const params = new URLSearchParams();
        params.append('code', code);

        const context = {
          params,
        };

        const { data } = await axios.get('/oauth/kakao/redirect', context, {
          withCredentials: true,
        });

        switch (data.status) {
          case 200:
            console.log(data);
            mutate('/auth/token');
            navigate('/', { replace: true });
            break;

          default:
            break;
        }
      } catch (error) {
        console.dir(error);
      }
    };

    getToken();
  }, []);

  if (myData && myData.data) {
    toast.error('잘못된 접근입니다.');

    return <Navigate to="/" replace={true} />;
  }

  return (
    <LoadingList>
      <Loader></Loader>
    </LoadingList>
  );
}

export default Kakao;

const LoadingList = styled('div')`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
