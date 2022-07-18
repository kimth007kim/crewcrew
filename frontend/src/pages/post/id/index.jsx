import React, { useCallback, useEffect, useState } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
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
import { cloneDeep } from 'lodash';

function PostDetail() {
  const cookies = new Cookies();
  const [postData, setPostData] = useState(null);
  const [postListInfoData, setPostListInfoData] = useState(null);
  const [postListData, setPostListData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

        if (page > 0) {
          params.append('page', page - 1);
        }

        const context = {
          params,
          headers: {
            'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
          },
        };

        const { data } = await axios.get(`/board/${postId}`, context);

        setLoading(false);

        switch (data.status) {
          case 200:
            setPostData({ ...data.data[0] });
            setPostListInfoData({ ...data.data[1] });
            setPostListData([...data.data[1].contents]);
            break;
          case 2001:
          case 2301:
            navigate('/post', { replace: true });
            toast.error(data.message);
            break;

          default:
            navigate('/post', { replace: true });
            toast.error(data.message);
            break;
        }
      } catch (error) {
        setLoading(false);

        toast.error(error);
        console.dir(error);
      }
    },
    [postId, query.get('page')],
  );

  useEffect(() => {
    axiosGet(query.get('page'));
  }, [axiosGet]);

  return (
    <>
      <Lnb path="postDetail" />
      <MainContainer>
        <ScrollButton />
        <MainTop />
        {postData && postListInfoData && (
          <>
            <MainPost data={postData} />
            <DetailPostList data={postListInfoData} loading={loading} listData={postListData} />
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
