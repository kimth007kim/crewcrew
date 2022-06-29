import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Lnb from '@/components/common/Lnb/Lnb';
import DetailPostList from '@/components/post/detail/DetailPostList';
import MainPost from '@/components/post/detail/MainPost';
import MainTop from '@/components/post/detail/MainTop';
import ScrollButton from '@/components/common/ScrollButton';
import useQuery from '@/hooks/useQuery';
import { Cookies } from 'react-cookie';

function PostDetail() {
  const cookies = new Cookies();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const query = useQuery();

  const { postId } = useParams();

  const axiosGet = useCallback(
    async (page) => {
      try {
        setLoading(true);
        const postFilter = JSON.parse(localStorage.getItem('postFilter'));

        const order = postFilter.article.value;
        const access = postFilter.approach.map((data) => data.value);
        const categoryIds = postFilter.categorylist.map((data) => data.value);

        const params = new URLSearchParams();

        params.append('order', order);
        params.append('approach', access);
        if (categoryIds[0] !== '0') {
          params.append('categoryIds', categoryIds);
        }

        if (page) {
          params.append('page', page - 1);
        }

        const context = {
          params,
          headers: {
            'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
          },
        };

        const { data } = await axios.get(`/board/${postId}`, context);
        switch (data.status) {
          case 200:
            setData({
              ...data.data,
            });
            break;
          case 2001:
          case 2301:
            toast.error(data.message);
            break;

          default:
            break;
        }
      } catch (error) {
        toast.error(error);
        console.dir(error);
      } finally {
        setLoading(false);
      }
    },
    [postId],
  );

  useEffect(() => {
    axiosGet(query.get('page'));
  }, [query.get('page'), axiosGet]);

  return (
    <>
      <Lnb path="postDetail" />
      <MainContainer>
        <ScrollButton />
        <MainTop />
        {!loading && data && (
          <>
            <MainPost data={data[0]} />
            <DetailPostList data={data[1]} />
          </>
        )}
      </MainContainer>
    </>
  );
}

export default PostDetail;

const MainContainer = styled('main')`
  margin-left: 142px;
  box-sizing: border-box;
  overflow-x: hidden;
  @media screen and (max-width: 820px) {
    width: 100%;
    padding: 60px 0 70px;
    margin: 0;
  }
`;
