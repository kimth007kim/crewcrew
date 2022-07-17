import React, { useState, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import TimelineCard from './TimelineCard';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import Loader from '@/components/common/Loader';
import Button from '@/components/common/Button';
import useModal from '@/hooks/useModal';
import PostCreateModal from '@/components/post/modal/PostCreate';
import { useNavigate } from 'react-router-dom';

function Timeline() {
  const cookies = new Cookies();
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createVisible, openCreate, closeCreate] = useModal();
  const navigate = useNavigate();

  const navigatePost = useCallback(() => {
    navigate('/post');
  }, []);

  const getTimeLine = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/timeline/list?filter=0`, {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      if (data.status === 200) {
        setTimelineData([...data.data.contents]);
      }
    } catch (error) {
      console.dir(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTimeLine();
  }, []);

  return (
    <>
      <Container active={loading || timelineData.length === 0}>
        {loading ? (
          <LoadingWrap>
            <Loader></Loader>
          </LoadingWrap>
        ) : timelineData.length > 0 ? (
          timelineData.map((e, i) => {
            if (i <= 3) {
              return <TimelineCard data={e} key={`timeline${e.announcementId}`} />;
            }
          })
        ) : (
          <NoContent>
            <p>
              <em>최근 30일간의 활동이 없습니다.</em>
              <br />
              크루에 참여하셔서 활동 이력을 남겨보세요!
            </p>
            <NoContentBtnWrap>
              <li>
                <Button widthSize={100} heightSize={50} color="lightBlue" onClick={navigatePost}>
                  크루참여
                </Button>
              </li>
              <li>
                <Button widthSize={100} heightSize={50} color="lightBlue" onClick={openCreate}>
                  팀원모집
                </Button>
              </li>
            </NoContentBtnWrap>
          </NoContent>
        )}
      </Container>
      <PostCreateModal visible={createVisible} closeModal={closeCreate} />
    </>
  );
}

export default Timeline;

const Container = styled('div')`
  padding: 0 20px;
  height: 278px;
  position: relative;
  display: flex;

  ::before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 0;
    height: 1px;
    width: 100%;
    background-color: #707070;

    ${(props) =>
      props.active &&
      css`
        display: none;
      `}
  }

  @media screen and (max-width: 820px) {
    flex-direction: column;
    height: auto;
    padding: 0;

    ::before {
      display: none;
    }
  }
`;

const LoadingWrap = styled('div')`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NoContent = styled('div')`
  width: 100%;
  padding: 0 20px;
  height: 278px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

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

  @media screen and (max-width: 820px) {
    height: auto;
    padding: 0;
    padding-bottom: 30px;
  }
`;

const NoContentBtnWrap = styled('ul')`
  display: flex;
  gap: 10px;
`;
