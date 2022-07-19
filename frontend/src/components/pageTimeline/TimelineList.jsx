import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TLComponent from './TLComponent';
import dayjs from 'dayjs';
import SettingBar from './SettingBar';
import TimelinePagination from './TimelinePagination';
import { Link } from 'react-router-dom';

function TimelineList({ data, pageData, totalPage, currentPage, postsPerPage }) {
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
    } else {
      setTimelineArr([]);
    }
  };

  const renderNocontent = () => {
    return (
      <NoContWrapper>
        <p>
          <em>새로운 소식이 없습니다.</em>
          <br />
          크루활동을 통해 타임라인을 채워보세요!
        </p>
        <Link to="/">
          <LinkBox>홈으로</LinkBox>
        </Link>
      </NoContWrapper>
    );
  };

  useEffect(() => {
    makeArr();
  }, [data]);

  return (
    <Container>
      {timelineArr.length ? (
        <>
          <form>
            {timelineArr.map((e) => (
              <TLComponent data={e} key={`Component${e[0].announcementId}`} />
            ))}
            <SettingBar data={data} />
          </form>
          <TimelinePagination
            data={pageData}
            currentPage={currentPage}
            postsPerPage={postsPerPage}
            totalPage={totalPage}
          />
        </>
      ) : (
        renderNocontent()
      )}
    </Container>
  );
}

export default TimelineList;

const Container = styled('section')`
  min-height: calc(100vh - 240px);
  background-color: #f6f7fb;
  position: relative;

  @media screen and (max-width: 820px) {
    padding: 0 20px;
  }

  @media screen and (max-width: 300px) {
    padding: 0 10px;
  }
`;

const NoContWrapper = styled('div')`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;

  p {
    font-size: 13px;
    font-weight: 400;
    color: #000;
    text-align: center;
    line-height: 20px;
    margin-bottom: 20px;

    em {
      font-weight: 700;
    }
  }
`;

const LinkBox = styled.div`
  width: 74px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00b7ff;
  border-radius: 5px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  color: #fff;
  transition: 0.3s;
  box-sizing: border-box;
  margin: auto;

  &:hover {
    background-color: #00a3e3;
  }
`;
