import Button from '@/components/common/Button';
import Loader from '@/components/common/Loader';
import PostCreateModal from '@/components/post/modal/PostCreate';
import useModal from '@/hooks/useModal';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import RequestCard from '../Card/RequestCard';
import MyPagination from '../MyPagination';
import { CardWrapper, LoadingWrap, NoContent } from './request.style';

function RequestHobbyList({ postsPerPage }) {
  const cookies = new Cookies();

  // 취미 리스트
  const [hobbyLoading, setHobbyLoading] = useState(false);
  const [hobbyAppList, setHobbyAppList] = useState([]);
  const [hobbyPageData, setHobbyPageData] = useState(null);
  const [hobbyTotalPage, setHobbyTotalPage] = useState(0);
  const [hobbyCurrentPage, setHobbyCurrentPage] = useState(1);
  const [reloadApId, setReloadApId] = useState('');

  const [postVisible, openPost, closePost] = useModal();

  const handleReloadApId = useCallback((id) => {
    setReloadApId(id);
  }, []);

  const getRequestHobbyList = useCallback(async () => {
    setHobbyLoading(true);
    try {
      const { data } = await axios.get(`/application/details/2?page=${hobbyCurrentPage - 1}`, {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      switch (data.status) {
        case 200:
          if (data.data.contents.length === 0 && hobbyCurrentPage > 1) {
            setHobbyCurrentPage(hobbyCurrentPage - 1);
            return;
          }
          console.log(data);
          setHobbyAppList([...data.data.contents]);
          setHobbyPageData({
            ...data.data,
          });
          setHobbyTotalPage(data.data.totalPages);
          break;

        default:
          break;
      }
    } catch (error) {
      console.dir(error);
    } finally {
      setHobbyLoading(false);
    }
  }, [hobbyCurrentPage]);

  useEffect(() => {
    getRequestHobbyList();
  }, [hobbyCurrentPage, reloadApId]);

  if (hobbyLoading) {
    return (
      <LoadingWrap>
        <Loader height={80} width={80} />
      </LoadingWrap>
    );
  }

  if (hobbyAppList.length > 0) {
    return (
      <CardWrapper>
        <ul>
          {hobbyAppList.map((post) => (
            <li key={post.title + post.boardId}>
              <RequestCard data={post} handleReloadApId={handleReloadApId}></RequestCard>
            </li>
          ))}
        </ul>
        <MyPagination
          data={hobbyPageData}
          currentPage={hobbyCurrentPage}
          postsPerPage={postsPerPage}
          totalPage={hobbyTotalPage}
          setCurrentPage={setHobbyCurrentPage}
        ></MyPagination>
      </CardWrapper>
    );
  }

  return (
    <NoContent>
      <p>
        <em>내가 모집중인 크루가 없습니다.</em>
        <br></br>
        크루 모집글을 작성해<br className="fold"></br> 크루원을 모집하세요!
      </p>
      <Button
        widthSize={100}
        heightSize={50}
        paddings={0}
        fontSize={15}
        lineHeight={26}
        borderRadius={10}
        size={'regular'}
        color={'lightBlue'}
        onClick={openPost}
      >
        크루모집
      </Button>
      <PostCreateModal closeModal={closePost} visible={postVisible} />
    </NoContent>
  );
}

export default RequestHobbyList;
