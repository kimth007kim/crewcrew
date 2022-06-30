import React from 'react';
import styled, { css } from 'styled-components';

function ProfileTag() {
  return (
    <Container>
      <Tags>
        <h3>관심분야(스터디)</h3>
        <TagWrap cat={'study'}>
          <span>어학</span>
        </TagWrap>
      </Tags>
      <Tags>
        <h3>관심분야(취미)</h3>
        <TagWrap cat={'hobby'}>
          <span>게임</span>
        </TagWrap>
      </Tags>
    </Container>
  );
}

export default ProfileTag;

const Container = styled('div')`
  width: 400px;
  height: 146px;
  margin: auto;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

const Tags = styled('div')`
  width: 100%;
  height: 86px;
  box-sizing: border-box;
  padding: 0 20px;

  :nth-child(1) {
    border-right: 1px solid #e2e2e2;
    width: calc(100% + 6px);
  }

  h3 {
    color: #a8a8a8;
    font-size: 13px;
    font-weight: 500;
    text-align: center;
    line-height: 1;
  }
`;

const TagWrap = styled('div')`
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;

  span {
    color: #fff;
    font-size: 13px;
    font-weight: 300;
    padding: 3px 6px;
    border-radius: 13px;

    ${(props) =>
      props.cat === 'study'
        ? css`
            background-color: #0f3fa6;
          `
        : css`
            background-color: #f7971e;
          `}

 
`;
