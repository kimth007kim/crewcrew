import Button from '@/components/common/Button';
import Loader from '@/components/common/Loader';
import MyLayout from '@/components/common/MyLayout';
import ActivityCard from '@/components/mypage/Card/ActivityCard';
import ParticipateCard from '@/components/mypage/Card/ParticipateCard';
import MypageMainSubTop from '@/components/mypage/MypageMainSubTop';
import MypageSubTop from '@/components/mypage/MypageSubTop';
import MyPagination from '@/components/mypage/MyPagination';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import styled from 'styled-components';

function MyActivity() {
  const cookies = new Cookies();
  const [crewActivity, setCrewActivity] = useState(null);
  const [postsPerPage, setPostsPerPage] = useState(10);

  // 마감글
  const [deadlineLoading, setDeadlineLoading] = useState([]);
  const [deadlineList, setDeadlineList] = useState([]);
  const [deadlinePageData, setDeadlinePageData] = useState(null);
  const [deadlineTotalPage, setDeadlineTotalPage] = useState(0);
  const [deadlineCurrentPage, setDeadlineCurrentPage] = useState(1);

  // 수락글
  const [acceptLoading, setAcceptLoading] = useState([]);
  const [acceptList, setAcceptList] = useState([]);
  const [acceptPageData, setAcceptPageData] = useState(null);
  const [acceptTotalPage, setAcceptTotalPage] = useState(0);
  const [acceptCurrentPage, setAcceptCurrentPage] = useState(1);

  const apiActivity = useCallback(async () => {
    try {
      const { data } = await axios.get('/application/myCrew', {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      switch (data.status) {
        case 200:
          setCrewActivity({ ...data.data });
          break;

        default:
          console.dir(data.message);
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const getActivityDeadline = useCallback(async () => {
    setDeadlineLoading(true);
    try {
      const { data } = await axios.get(
        `/application/myCrew/details?page=${deadlineCurrentPage - 1}`,
        {
          withCredentials: true,
          headers: {
            'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
          },
        },
      );
      switch (data.status) {
        case 200:
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
    } finally {
      setDeadlineLoading(false);
    }
  }, [deadlineCurrentPage]);

  const getActivityAccept = useCallback(async () => {
    setAcceptLoading(true);
    try {
      const { data } = await axios.get(
        `/application/myCrew/participated/details?page=${deadlineCurrentPage - 1}`,
        {
          withCredentials: true,
          headers: {
            'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
          },
        },
      );
      switch (data.status) {
        case 200:
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
    } finally {
      setAcceptLoading(false);
    }
  }, [deadlineCurrentPage]);

  const renderDeadlineList = () => {
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
                  <ActivityCard postData={v}></ActivityCard>
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
          <em>크루에 참여요청한 내역이 없습니다.</em>
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
        >
          크루참여
        </Button>
      </NoContent>
    );
  };

  const renderAcceptList = () => {
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
                  <ParticipateCard postData={v}></ParticipateCard>
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
          <em>크루에 참여요청한 내역이 없습니다.</em>
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
        >
          크루참여
        </Button>
      </NoContent>
    );
  };

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setPostsPerPage(10);
    } else if (window.innerWidth > 320) {
      setPostsPerPage(5);
    } else {
      setPostsPerPage(3);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    apiActivity();
  }, []);

  useEffect(() => {
    getActivityDeadline();
  }, [deadlineCurrentPage]);

  useEffect(() => {
    getActivityAccept();
  }, []);

  return (
    <MyLayout>
      <MypageSubTop title="나의 활동 크루"></MypageSubTop>
      <MypageMainSubTop
        total={
          crewActivity ? crewActivity.myAcceptedApplyBoardCnt + crewActivity.myExpiredBoardCnt : 0
        }
        studyCnt={crewActivity ? crewActivity.myExpiredBoardCnt : 0}
        hobbyCnt={crewActivity ? crewActivity.myAcceptedApplyBoardCnt : 0}
        title="나의 활동 크루"
        desc="내가 활동중인 크루를 이곳에서 간편하게 관리하세요!"
        disable={true}
        small_title1="내가 쓴 마감글"
        small_title2="참여 수락된 글"
      ></MypageMainSubTop>
      <Wrap className="wrotePost">
        <SectionWrap>
          <h3>내가 쓴 마감글</h3>
          {renderDeadlineList()}
        </SectionWrap>
      </Wrap>
      <Wrap className="accepted">
        <SectionWrap>
          <h3>참여수락된 글</h3>
          {renderAcceptList()}
        </SectionWrap>
      </Wrap>
    </MyLayout>
  );
}

export default MyActivity;

const SectionWrap = styled('div')`
  max-width: 850px;
  margin: auto;
  position: relative;

  h3 {
    font-size: 20px;
    font-weight: 700;
    padding: 38px 0 24px;
  }

  @media screen and (max-width: 820px) {
    padding: 0 20px;

    h3 {
      padding: 36px 0 20px;
    }
  }

  @media screen and (max-width: 300px) {
    padding: 0 10px;

    br.fold {
      display: block;
    }
  }
`;

const Wrap = styled('section')`
  background-color: #f6f7fb;

  &.wrotePost {
    padding-top: 52px;

    ${SectionWrap} {
      border-bottom: 2px solid #d7dae4;
    }
  }

  &.accepted {
    padding-bottom: 40px;
  }
`;

const CardWrapper = styled('div')`
  li {
    padding-bottom: 14px;
  }
`;

const NoContent = styled('div')`
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 15px;
    line-height: 22px;
    text-align: center;
    font-weight: 400;
    margin-bottom: 20px;

    em {
      font-weight: 700;
    }
  }
`;

const LoadingWrap = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
`;
