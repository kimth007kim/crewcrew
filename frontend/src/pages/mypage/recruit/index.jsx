import React, { useCallback, useEffect, useState } from 'react';
import MyLayout from '@/components/common/MyLayout';
import MypageMainSubTop from '@/components/mypage/MypageMainSubTop';
import MypageSubTop from '@/components/mypage/MypageSubTop';
import styled from 'styled-components';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import Button from '@/components/common/Button';
import RecruitCard from '@/components/mypage/Card/RecruitCard';
import MyPagination from '@/components/mypage/MyPagination';
import Loader from '@/components/common/Loader';

function Recruit() {
  const cookies = new Cookies();
  const [crewRecruit, setCrewRecruit] = useState(null);
  const [postsPerPage, setPostsPerPage] = useState(10);

  // 스터디 리스트
  const [studyLoading, setStudyLoading] = useState(false);
  const [studyAppList, setStudyAppList] = useState([]);
  const [studyPageData, setStudyPageData] = useState(null);
  const [studyTotalPage, setStudyTotalPage] = useState(0);
  const [studyCurrentPage, setStudyCurrentPage] = useState(1);

  // 취미 리스트
  const [hobbyLoading, setHobbyLoading] = useState(false);
  const [hobbyAppList, setHobbyAppList] = useState([]);
  const [hobbyPageData, setHobbyPageData] = useState(null);
  const [hobbyTotalPage, setHobbyTotalPage] = useState(0);
  const [hobbyCurrentPage, setHobbyCurrentPage] = useState(1);

  const getRecruit = useCallback(async () => {
    try {
      const { data } = await axios.get('/application/recruiting', {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      switch (data.status) {
        case 200:
          setCrewRecruit({ ...data.data });
          break;

        default:
          break;
      }
    } catch (error) {
      console.dir(error);
    }
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

  const getRecruitHobbyList = useCallback(async () => {
    setHobbyLoading(true);
    try {
      const { data } = await axios.get(`/application/recruiting/2?page=${hobbyCurrentPage - 1}`, {
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
      console.dir(error);
    } finally {
      setHobbyLoading(false);
    }
  }, [hobbyCurrentPage]);

  const renderStudyList = () => {
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
                <RecruitCard postData={post}></RecruitCard>
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
        >
          크루참여
        </Button>
      </NoContent>
    );
  };

  const renderHobbyList = () => {
    if (studyLoading) {
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
                <RecruitCard postData={post}></RecruitCard>
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
        >
          크루참여
        </Button>
      </NoContent>
    );
  };

  useEffect(() => {
    getRecruit();
  }, []);

  useEffect(() => {
    getRecruitStudyList();
  }, [studyCurrentPage]);

  useEffect(() => {
    getRecruitHobbyList();
  }, [hobbyCurrentPage]);

  return (
    <MyLayout>
      <MypageSubTop title="내가 모집중인 크루"></MypageSubTop>
      <MypageMainSubTop
        total={crewRecruit ? crewRecruit.totalApplyCount : 0}
        studyCnt={crewRecruit ? crewRecruit.applyToStudyCount : 0}
        hobbyCnt={crewRecruit ? crewRecruit.applyToHobbyCount : 0}
        title="내가 모집중인 크루"
        desc="내가 모집중인 크루를 이곳에서 간편하게 관리하세요!"
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

export default Recruit;

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
  &.hobby {
    padding-bottom: 40px;

    h3 {
      color: #f7971e;
    }
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
  height: 150px;
`;
