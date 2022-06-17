import Loader from '@/components/common/Loader';
import axios from 'axios';
import qs from 'qs';
import React, { useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Cookies } from 'react-cookie';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { toast } from 'react-toastify';

function Naver() {
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

        const context = {
          code,
        };

        const { data } = await axios.post('/oauth/naver/redirect', context, {
          withCredentials: true,
        });

        switch (data.status) {
          case 200:
            mutate('/auth/token');
            break;

          default:
            break;
        }
      } catch (error) {
        console.dir(error);
      } finally {
        navigate('/', { replace: true });
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

export default Naver;

const LoadingList = styled('div')`
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
