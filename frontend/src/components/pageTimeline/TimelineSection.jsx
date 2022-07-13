import React, { useState, useEffect, useCallback } from 'react';
import TimelineTop from './TimelineTop';
import TimelineList from './TimelineList';
import { timelineFilter, DataLists } from '@/atoms/timeline';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { Cookies } from 'react-cookie';

function TimelineSection() {
  const cookies = new Cookies();
  const [timelineData, setTimelineData] = useState([]);
  const [currentFilterNum, setCurrentFilterNum] = useRecoilState(timelineFilter);
  const [dataLists, setDataLists] = useRecoilState(DataLists);

  const getTimeLine = useCallback(async () => {
    try {
      const { data } = await axios.get(`/timeline/list?filter=${currentFilterNum}`, {
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
    }
  }, [currentFilterNum]);

  useEffect(() => {
    getTimeLine();
    setDataLists([]);
  }, [currentFilterNum]);

  return (
    <>
      <TimelineTop />
      <TimelineList data={timelineData} />
    </>
  );
}

export default TimelineSection;
