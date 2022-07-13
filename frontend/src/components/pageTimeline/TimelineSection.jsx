import React, { useState, useEffect, useCallback } from 'react';
import TimelineTop from './TimelineTop';
import TimelineList from './TimelineList';
import { timelineFilter, DataLists } from '@/atoms/timeline';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import useQuery from '@/hooks/useQuery';
import { useNavigate } from 'react-router-dom';

function TimelineSection() {
  const navigate = useNavigate();
  const query = useQuery();
  const cookies = new Cookies();
  const [timelineData, setTimelineData] = useState([]);
  const [currentFilterNum, setCurrentFilterNum] = useRecoilState(timelineFilter);
  const [dataLists, setDataLists] = useRecoilState(DataLists);
  const [pageData, setPageData] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(query.get('page') || 1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [timelineLoaded, setTimelineLoaded] = useState(false);

  const getTimeLine = useCallback(
    async (page) => {
      try {
        setTimelineLoaded(false);
        const { data } = await axios.get(`/timeline/list?filter=${currentFilterNum}&page=${page}`, {
          withCredentials: true,
          headers: {
            'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
          },
        });
        if (data.status === 200) {
          console.log(data.data);
          setTimelineData([...data.data.contents]);
          setPageData({ ...data.data });
          setTotalPage(data.data.totalPages);
        }
      } catch (error) {
        console.dir(error);
      } finally {
        setTimelineLoaded(true);
      }
    },
    [currentFilterNum],
  );

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setPostsPerPage(10);
    } else if (window.innerWidth > 320) {
      setPostsPerPage(5);
    } else {
      setPostsPerPage(3);
    }
  };

  const NavigateVailidPage = () => {
    const pageNum = query.get('page');
    if (pageNum && pageNum >= 2 && !timelineData.length) {
      navigate('/mypage/timeline');
    }
  };

  useEffect(() => {
    setDataLists([]);
    const pageNum = query.get('page');
    getTimeLine(pageNum - 1);
    setCurrentPage(pageNum || 1);
  }, [query.get('page'), currentFilterNum]);

  useEffect(() => {
    timelineLoaded && NavigateVailidPage();
  }, [timelineLoaded]);

  return (
    <>
      <TimelineTop />
      <TimelineList
        data={timelineData}
        pageData={pageData}
        totalPage={totalPage}
        currentPage={currentPage}
        postsPerPage={postsPerPage}
      />
    </>
  );
}

export default TimelineSection;
