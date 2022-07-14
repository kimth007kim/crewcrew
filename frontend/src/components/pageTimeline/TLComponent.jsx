import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TLCard from './TLCard';
import dayjs from 'dayjs';

function TLComponent({ data }) {
  const [day, setDay] = useState('');
  const date = dayjs(data[0].createdDate);
  const formDate = date.format('YYYY.MM.DD');
  const kor = ['월', '화', '수', '목', '금', '토', '일'];
  useEffect(() => {
    kor.forEach((e, i) => {
      date.day() - 1 === i && setDay(e);
    });
  }, [data]);

  return (
    <div>
      <TopDate>
        <p>
          {formDate} ({day})
        </p>
      </TopDate>
      <TLCardList>
        {data.map((e, i) => {
          let isLast = false;
          if (i === data.length - 1) isLast = true;
          return (
            <li key={`Card${e.announcementId}`}>
              <TLCard data={e} isLast={isLast} />
            </li>
          );
        })}
      </TLCardList>
    </div>
  );
}

export default TLComponent;

const TopDate = styled('div')`
  height: 60px;
  background-color: #f3f3f3;
  padding: 0 calc((100% - 850px) / 2);

  p {
    font-size: 20px;
    font-weight: 500;
    line-height: 60px;
  }

  @media screen and (max-width: 820px) {
    height: 40px;
    padding: 0 20px;
    width: calc(100% + 40px);
    margin-left: -20px;

    p {
      line-height: 40px;
    }
  }
`;

const TLCardList = styled('ul')`
  max-width: 850px;
  margin: 0 auto;

  li {
    display: flex;
  }
`;
