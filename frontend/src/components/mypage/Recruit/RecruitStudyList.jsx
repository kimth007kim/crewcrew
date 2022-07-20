import Button from '@/components/common/Button';
import Loader from '@/components/common/Loader';
import PostCreateModal from '@/components/post/modal/PostCreate';
import useModal from '@/hooks/useModal';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import RecruitCard from '../Card/RecruitCard';
import MyPagination from '../MyPagination';
import { CardWrapper, LoadingWrap, NoContent } from './recruit.style';

function RecruitStudyList({ postsPerPage }) {
  const cookies = new Cookies();

  const [studyLoading, setStudyLoading] = useState(false);
  const [studyAppList, setStudyAppList] = useState([]);
  const [studyPageData, setStudyPageData] = useState(null);
  const [studyTotalPage, setStudyTotalPage] = useState(0);
  const [studyCurrentPage, setStudyCurrentPage] = useState(1);
  const [closeDownId, setCloseDownId] = useState('');

  const [postVisible, openPost, closePost] = useModal();

  const handleCloseDownId = useCallback((id) => {
    setCloseDownId(id);
  }, []);

  const getRecruitStudyList = useCallback(async () => {
    setStudyLoading(true);
    try {
      const { data } = await axios.get(`/application/recruiting/1?page=${studyCurrentPage - 1}`, {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      switch (data.status) {
        case 200:
          if (data.data.contents.length === 0 && studyCurrentPage > 1) {
            // 마지막 페이지이고 컨텐츠가 하나 남았을 때 그 컨텐츠를 마감하면 나오는 에러 방지
            setStudyCurrentPage(studyCurrentPage - 1);
            return;
          }
          setStudyAppList([...data.data.contents]);
          setStudyPageData({
            ...data.data,
          });
          setStudyTotalPage(data.data.totalPages);
          break;

        default:
          break;
      }
    } catch (error) {
      console.dir(error);
    } finally {
      setStudyLoading(false);
    }
  }, [studyCurrentPage]);

  useEffect(() => {
    getRecruitStudyList();
  }, [studyCurrentPage, closeDownId]);

  if (studyLoading) {
    return (
      <LoadingWrap>
        <Loader height={80} width={80} />
      </LoadingWrap>
    );
  }

  if (studyAppList.length > 0) {
    return (
      <CardWrapper>
        <ul>
          {studyAppList.map((post) => (
            <li key={post.title + post.boardId}>
              <RecruitCard postData={post} handleCloseDownId={handleCloseDownId}></RecruitCard>
            </li>
          ))}
        </ul>
        <MyPagination
          data={studyPageData}
          currentPage={studyCurrentPage}
          postsPerPage={postsPerPage}
          totalPage={studyTotalPage}
          setCurrentPage={setStudyCurrentPage}
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

export default RecruitStudyList;
