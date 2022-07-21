import Button from '@/components/common/Button';
import Loader from '@/components/common/Loader';
import PostCreateModal from '@/components/post/modal/PostCreate';
import useModal from '@/hooks/useModal';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import ActivityCard from '../Card/ActivityCard';
import MyPagination from '../MyPagination';
import { CardWrapper, LoadingWrap, NoContent } from './myActivity.style';

function DeadlineList({ postsPerPage }) {
  const cookies = new Cookies();
  const [deadlineLoading, setDeadlineLoading] = useState([]);
  const [deadlineList, setDeadlineList] = useState([]);
  const [deadlinePageData, setDeadlinePageData] = useState(null);
  const [deadlineTotalPage, setDeadlineTotalPage] = useState(0);
  const [deadlineCurrentPage, setDeadlineCurrentPage] = useState(1);
  const [closeDownId, setCloseDownId] = useState('');

  const [postVisible, openPost, closePost] = useModal();

  const handleCloseDownId = useCallback((id) => {
    setCloseDownId(id);
  }, []);

  const getActivityDeadline = useCallback(async () => {
    setDeadlineLoading(true);
    try {
      const { data } = await axios.get(
        `/application/myCrew/details?page=${deadlineCurrentPage - 1}&order=recent`,
        {
          withCredentials: true,
          headers: {
            'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
          },
        },
      );
      setDeadlineLoading(false);

      switch (data.status) {
        case 200:
          if (data.data.content.length === 0 && deadlineCurrentPage > 1) {
            setDeadlineCurrentPage(deadlineCurrentPage - 1);
            return;
          }
          setDeadlineList([...data.data.content]);
          setDeadlinePageData({
            ...data.data,
          });
          setDeadlineTotalPage(data.data.totalPages);
          break;

        default:
          console.dir(data.message);
          break;
      }
    } catch (error) {
      console.error(error);
      setDeadlineLoading(false);
    }
  }, [deadlineCurrentPage, closeDownId]);

  useEffect(() => {
    getActivityDeadline();
  }, [getActivityDeadline]);

  if (deadlineLoading) {
    return (
      <LoadingWrap>
        <Loader height={80} width={80} />
      </LoadingWrap>
    );
  }
  if (deadlineLoading) {
    return (
      <LoadingWrap>
        <Loader height={80} width={80} />
      </LoadingWrap>
    );
  }
  if (deadlineList.length > 0) {
    return (
      <CardWrapper>
        <ul>
          {deadlineList.length > 0 &&
            deadlineList.map((v) => (
              <li key={v.boardId}>
                <ActivityCard postData={v} handleCloseDownId={handleCloseDownId}></ActivityCard>
              </li>
            ))}
        </ul>
        <MyPagination
          data={deadlinePageData}
          setCurrentPage={setDeadlineCurrentPage}
          currentPage={deadlineCurrentPage}
          postsPerPage={postsPerPage}
          totalPage={deadlineTotalPage}
        ></MyPagination>
      </CardWrapper>
    );
  }

  return (
    <NoContent>
      <p>
        <em>내가 모집한 글이 없습니다.</em>
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

export default DeadlineList;
