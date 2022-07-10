import React from 'react';
import styled, { css } from 'styled-components';
import TLCard from './TLCard';

function TLComponent() {
  return (
    <div>
      <TopDate>
        <p>22.05.25 (수)</p>
      </TopDate>
      <TLCardList>
        <li>
          <TLCard />
        </li>
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

    &:last-child {
      padding-bottom: 34px;
    }
  }
`;
