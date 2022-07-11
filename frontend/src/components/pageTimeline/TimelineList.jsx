import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TLComponent from './TLComponent';
import dayjs from 'dayjs';

function TimelineList({ data }) {
  const [timelineArr, setTimelineArr] = useState([]);
  const makeArr = () => {
    const dataObj = {};
    const dataArr = [];
    if (data.length) {
      data.forEach((e) => {
        const Date = dayjs(e.createdDate).format('YYYY.MM.DD');
        if (Array.isArray(dataObj[Date])) {
          dataObj[Date].push(e);
        } else {
          dataObj[Date] = [e];
        }
      });

      for (const prop in dataObj) {
        dataArr.push(dataObj[prop]);
      }
      setTimelineArr(dataArr);
    }
  };

  useEffect(() => {
    makeArr();
  }, [data]);

  console.log(timelineArr);

  return (
    <Container>
      <TLComponent data={data} />
    </Container>
  );
}

export default TimelineList;

const Container = styled('section')`
  min-height: calc(100vh - 240px);
  background-color: #f6f7fb;

  @media screen and (max-width: 820px) {
    padding: 0 20px;
  }

  @media screen and (max-width: 300px) {
    padding: 0 10px;
  }
`;
