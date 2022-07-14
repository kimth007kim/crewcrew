import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import TimelineCard from './TimelineCard';
import axios from 'axios';
import { Cookies } from 'react-cookie';

function Timeline() {
  const cookies = new Cookies();
  const [timelineData, setTimelineData] = useState([]);

  const getTimeLine = useCallback(async () => {
    try {
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
    }
  }, []);

  useEffect(() => {
    getTimeLine();
  }, []);

  return (
    <Container>
      {timelineData.map((e, i) => {
        if (i <= 3) {
          return <TimelineCard data={e} key={`timeline${e.announcementId}`} />;
        }
      })}
    </Container>
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
