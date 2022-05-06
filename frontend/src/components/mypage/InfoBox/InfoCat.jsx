import React from 'react';
import styled from 'styled-components';
import FilterIconX from '../../../assets/images/FilterIconX.png';

function InfoCat() {
  return (
    <Container>
      <CatBox>
        <h5>관심분야(스터디)</h5>
        <CatList>
          <li>
            <InputHide />
            <FilterLabel>어학</FilterLabel>
          </li>
          <li>
            <InputHide />
            <FilterLabel>취업</FilterLabel>
          </li>
          <li>
            <InputHide />
            <FilterLabel>고시/공무원</FilterLabel>
          </li>
          <li>
            <InputHide />
            <FilterLabel>프로젝트</FilterLabel>
          </li>
          <li>
            <InputHide />
            <FilterLabel>기타</FilterLabel>
          </li>
        </CatList>
      </CatBox>
      <CatBox>
        <h5>관심분야(취미)</h5>
        <CatList>
          <li>
            <InputHide />
            <FilterLabel>요리</FilterLabel>
          </li>
          <li>
            <InputHide />
            <FilterLabel>운동</FilterLabel>
          </li>
          <li>
            <InputHide />
            <FilterLabel>게임</FilterLabel>
          </li>
          <li>
            <InputHide />
            <FilterLabel>덕질</FilterLabel>
          </li>
          <li>
            <InputHide />
            <FilterLabel>트렌드</FilterLabel>
          </li>
          <li>
            <InputHide />
            <FilterLabel>예술</FilterLabel>
          </li>
          <li>
            <InputHide />
            <FilterLabel>기타</FilterLabel>
          </li>
        </CatList>
      </CatBox>
    </Container>
  );
}

export default InfoCat;

const Container = styled('div')`
  display: flex;
  margin-top: 35px;
  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

const CatList = styled('ul')`
  display: flex;
  flex-wrap: wrap;
  gap: 12px 8px;
  margin-top: 16px;
`;

const CatBox = styled('div')`
  width: 100%;

  &:nth-child(2) {
    padding-left: 20px;
  }

  &:nth-child(1) {
    ${CatList} {
      border-right: 1px solid #e2e2e2;
    }
  }

  h5 {
    color: #a8a8a8;
    font-size: 13px;
    font-weight: 500;
  }

  @media screen and (max-width: 820px) {
    &:nth-child(2) {
      padding: 34px 0px 36px;
    }

    &:nth-child(1) {
      ${CatList} {
        border: none;
      }
    }
  }
`;

const InputHide = styled('input')`
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  position: absolute;
  display: none;
`;

const FilterLabel = styled('label')`
  padding: 4px 36px 4px 6px;
  background-color: #a8a8a8;
  border-radius: 13px;
  font-size: 13px;
  font-weight: 400;
  line-height: 16px;
  color: #fff;
  position: relative;
  cursor: pointer;
  transition: 0.3s;

  &::after {
    content: '';
    display: block;
    width: 12px;
    height: 12px;
    background: url(${FilterIconX}) 50% 50%/100%;
    position: absolute;
    right: 10px;
    top: 6px;
    transform: rotate(45deg);
    transition: 0.3s;
  }
`;
