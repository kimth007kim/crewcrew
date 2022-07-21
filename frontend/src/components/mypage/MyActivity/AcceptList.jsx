import Button from '@/components/common/Button';
import Loader from '@/components/common/Loader';
import useModal from '@/hooks/useModal';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import ParticipateCard from '../Card/ParticipateCard';
import MyPagination from '../MyPagination';
import { CardWrapper, LoadingWrap, NoContent } from './myActivity.style';

function AcceptList({ postsPerPage }) {
  const cookies = new Cookies();
  const [acceptLoading, setAcceptLoading] = useState([]);
  const [acceptList, setAcceptList] = useState([]);
  const [acceptPageData, setAcceptPageData] = useState(null);
  const [acceptTotalPage, setAcceptTotalPage] = useState(0);
  const [acceptCurrentPage, setAcceptCurrentPage] = useState(1);
  const [closeDownId, setCloseDownId] = useState('');

  const navigate = useNavigate();

  const handleCloseDownId = useCallback((id) => {
    setCloseDownId(id);
  }, []);

  const handleNavigate = useCallback(() => {
    navigate('/post');
  }, []);

  const getActivityAccept = useCallback(async () => {
    setAcceptLoading(true);
    try {
      const { data } = await axios.get(
        `/application/myCrew/participated/details?page=${acceptCurrentPage - 1}&order=recent`,
        {
          withCredentials: true,
          headers: {
            'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
          },
        },
      );
      setAcceptLoading(false);

      switch (data.status) {
        case 200:
          if (data.data.contents.length === 0 && acceptCurrentPage > 1) {
            setAcceptCurrentPage(acceptCurrentPage - 1);
            return;
          }
          setAcceptList([...data.data.contents]);
          setAcceptPageData({
            ...data.data,
          });
          setAcceptTotalPage(data.data.totalPages);
          break;

        default:
          console.dir(data.message);
          break;
      }
    } catch (error) {
      console.error(error);
      setAcceptLoading(false);
    }
  }, [acceptCurrentPage, closeDownId]);

  useEffect(() => {
    getActivityAccept();
  }, [getActivityAccept]);

  if (acceptLoading) {
    return (
      <LoadingWrap>
        <Loader height={80} width={80} />
      </LoadingWrap>
    );
  }
  if (acceptList.length > 0) {
    return (
      <CardWrapper>
        <ul>
          {acceptList.length > 0 &&
            acceptList.map((v) => (
              <li key={v.boardId}>
                <ParticipateCard
                  postData={v}
                  handleCloseDownId={handleCloseDownId}
                ></ParticipateCard>
              </li>
            ))}
        </ul>
        <MyPagination
          data={acceptPageData}
          setCurrentPage={setAcceptCurrentPage}
          currentPage={acceptCurrentPage}
          postsPerPage={postsPerPage}
          totalPage={acceptTotalPage}
        ></MyPagination>
      </CardWrapper>
    );
  }

  return (
    <NoContent>
      <p>
        <em>크루에 참여수락된 내역이 없습니다.</em>
        <br></br>
        크루에 참여하셔서<br className="fold"></br> 활동 이력을 남겨보세요!
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
        onClick={handleNavigate}
      >
        크루참여
      </Button>
    </NoContent>
  );
}

export default AcceptList;
