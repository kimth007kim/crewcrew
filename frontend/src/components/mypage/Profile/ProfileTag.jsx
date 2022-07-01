import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { studyFilterArr, hobbyFilterArr } from '@/frontDB/filterDB';

function ProfileTag({ data }) {
  const [studyTagArr, setStudyTagArr] = useState([]);
  const [hobbyTagArr, setHobbyTagArr] = useState([]);
  let studyArr = [],
    hobbyArr = [];
  data?.forEach((data) => {
    if (data < 8) {
      studyFilterArr.forEach((db) => {
        data.toString() === db.value && studyArr.push(db);
      });
    } else {
      hobbyFilterArr.forEach((db) => {
        data.toString() === db.value && hobbyArr.push(db);
      });
    }
  });

  const renderStudyTag = () => {
    if (studyTagArr.length > 0) {
      return (
        <>
          {studyTagArr.map((data) => (
            <span key={data.htmlId}>{data.name}</span>
          ))}
        </>
      );
    }
  };

  const renderHobbyTag = () => {
    if (hobbyTagArr.length > 0) {
      return (
        <>
          {hobbyTagArr.map((data) => (
            <span key={data.htmlId}>{data.name}</span>
          ))}
        </>
      );
    }
  };

  useEffect(() => {
    setStudyTagArr(studyArr);
    setHobbyTagArr(hobbyArr);
  }, [data]);
  console.log(studyTagArr, hobbyTagArr);
  return (
    <Container>
      <Tags>
        <h3>관심분야(스터디)</h3>
        <TagWrap cat={'study'}>{renderStudyTag()}</TagWrap>
      </Tags>
      <Tags>
        <h3>관심분야(취미)</h3>
        <TagWrap cat={'hobby'}>{renderHobbyTag()}</TagWrap>
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

  @media screen and (max-width: 820px) {
    width: calc(100vw - 40px);
    height: 270px;
    flex-direction: column;
    padding: 0 20px;
  }

  @media screen and (max-width: 300px) {
    width: calc(100vw - 20px);
    padding: 0 10px;
  }
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

  @media screen and (max-width: 820px) {
    height: 100%;
    padding: 24px 0;

    :nth-child(1) {
      border-right: none;
      border-bottom: 1px solid #e2e2e2;
    }
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
