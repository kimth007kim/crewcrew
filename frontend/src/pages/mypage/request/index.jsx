import React, { useCallback, useEffect, useState } from 'react';
import MyLayout from '@/components/common/MyLayout';
import MypageMainSubTop from '@/components/mypage/MypageMainSubTop';
import MypageSubTop from '@/components/mypage/MypageSubTop';
import styled from 'styled-components';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import RequestCard from '@/components/mypage/Card/RequestCard';
import Button from '@/components/common/Button';
import { toast } from 'react-toastify';
import MyPagination from '@/components/mypage/MyPagination';

function Request() {
  const cookies = new Cookies();
  const [crewRequest, setCrewRequest] = useState(null);
  const [postsPerPage, setPostsPerPage] = useState(10);

  // 스터디 리스트
  const [studyAppList, setStudyAppList] = useState([]);
  const [studyPageData, setStudyPageData] = useState(null);
  const [studyTotalPage, setStudyTotalPage] = useState(0);
  const [studyCurrentPage, setStudyCurrentPage] = useState(1);

  // 취미 리스트
  const [hobbyAppList, setHobbyAppList] = useState([]);
  const [hobbyPageData, setHobbyPageData] = useState(null);
  const [hobbyTotalPage, setHobbyTotalPage] = useState(0);
  const [hobbyCurrentPage, setHobbyCurrentPage] = useState(1);

  const apiApplication = useCallback(async () => {
    try {
      const { data } = await axios.get('/application', {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      switch (data.status) {
        case 200:
          setCrewRequest({ ...data.data });
          break;

        default:
          break;
      }
    } catch (error) {
      console.dir(error);
    }
  }, []);

  const apiApplicationStudy = useCallback(async () => {
    try {
      const { data } = await axios.get(`/application/details/1`, {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      switch (data.status) {
        case 200:
          setStudyAppList([...data.data.contents]);
          setStudyPageData({
            ...data.data,
          });
          setStudyTotalPage(data.data.totalPages);
          break;
        case 2001:
        case 2405:
          toast.error(data.message);
          break;

        default:
          toast.error(data.message);
          break;
      }
    } catch (error) {
      console.dir(error);
    }
  }, []);

  const apiApplicationHobby = useCallback(async () => {
    try {
      const { data } = await axios.get('/application/details/2', {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      switch (data.status) {
        case 200:
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
      toast.error(error);
      console.dir(error);
    }
  }, []);

  const renderStudyList = () => {
    if (studyAppList.length > 0) {
      return (
        <CardWrapper>
          <ul>
            {studyAppList.map((post) => (
              <li key={post.apId + post.boardId}>
                <RequestCard data={post}></RequestCard>
              </li>
            ))}
          </ul>
          <MyPagination
            data={studyPageData}
            currentPage={studyCurrentPage}
            postsPerPage={postsPerPage}
            totalPage={studyTotalPage}
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

  const renderHobbyList = () => {
    if (hobbyAppList.length > 0) {
      return (
        <CardWrapper>
          <ul>
            {hobbyAppList.map((post) => (
              <li key={post.apId + post.boardId}>
                <RequestCard data={post}></RequestCard>
              </li>
            ))}
          </ul>
          <MyPagination
            data={hobbyPageData}
            currentPage={hobbyCurrentPage}
            postsPerPage={postsPerPage}
            totalPage={hobbyTotalPage}
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
    apiApplication();
    apiApplicationStudy();
    apiApplicationHobby();
  }, [studyCurrentPage, hobbyCurrentPage]);

  return (
    <MyLayout>
      <MypageSubTop title="내가 참여요청한 크루"></MypageSubTop>
      <MypageMainSubTop
        total={crewRequest ? crewRequest.totalApplyCount : 0}
        studyCnt={crewRequest ? crewRequest.applyToStudyCount : 0}
        hobbyCnt={crewRequest ? crewRequest.applyToHobbyCount : 0}
      ></MypageMainSubTop>
      <Wrap className="study">
        <SectionWrap>
          <h3>스터디 크루</h3>
          {renderStudyList()}
        </SectionWrap>
      </Wrap>
      <Wrap className="hobby">
        <SectionWrap>
          <h3>취미 크루</h3>
          {renderHobbyList()}
        </SectionWrap>
      </Wrap>
    </MyLayout>
  );
}

export default Request;

const SectionWrap = styled('div')`
  max-width: 850px;
  margin: auto;
  position: relative;

  h3 {
    font-size: 20px;
    font-weight: 700;
    padding: 38px 0 24px;
  }

  br.fold {
    display: none;
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

  &.study {
    padding-top: 52px;
    h3 {
      color: #0f3fa6;
    }
    ${SectionWrap} {
      border-bottom: 2px solid #d7dae4;
    }
  }
  &.hobby h3 {
    color: #f7971e;
  }

  @media screen and (max-width: 820px) {
    padding-top: 24px;
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
