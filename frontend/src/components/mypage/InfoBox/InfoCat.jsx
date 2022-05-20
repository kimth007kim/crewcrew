/* eslint-disable react/jsx-curly-newline */
import React, { useCallback } from 'react';
import { Cookies } from 'react-cookie';
import styled, { css } from 'styled-components';
import useSWR from 'swr';
import FilterIconX from '@/assets/images/FilterIconX.png';
import { hobbyFilterArr, studyFilterArr } from '@/frontDB/filterDB';
import fetcher from '@/utils/fetcher';

function InfoCat({ state }) {
  const cookies = new Cookies();
  const {
    data: myData,
    error: myError,
    mutate,
  } = useSWR(['/user/token', cookies.get('user-token')], fetcher);

  // 각 필터 체크 여부 확인 함수
  const checkValue = useCallback((arr, value) => arr.some((item) => item.value === value), []);

  // 개별 체크 클릭 시 발생하는 함수
  const onCheckedElement = useCallback((checked, item, setCheckedList, checkedList) => {
    if (checked) {
      setCheckedList([...checkedList, item]);
    } else {
      if (checkedList.length <= 1) {
        return null;
      }
      setCheckedList(checkedList.filter((el) => el.value !== item.value));
    }
    state.setCheckFlag(true);
  }, []);
  return (
    <Container>
      <CatBox>
        <h5>관심분야(스터디)</h5>
        <CatList>
          {studyFilterArr.map((item) => (
            <li key={`${item.htmlId}`}>
              <InputHide
                type="checkbox"
                id={item.htmlId}
                bgColor={item.color}
                value={item.value}
                checked={checkValue(state.studyCheckedList, item.value)}
                onChange={(e) =>
                  onCheckedElement(
                    e.target.checked,
                    item,
                    state.setStudyCheckedList,
                    state.studyCheckedList,
                  )
                }
              />
              <FilterLabel htmlFor={item.htmlId} hColor={item.color}>
                {item.name}
              </FilterLabel>
            </li>
          ))}
        </CatList>
      </CatBox>
      <CatBox>
        <h5>관심분야(취미)</h5>
        <CatList>
          {hobbyFilterArr.map((item) => (
            <li key={`${item.htmlId}`}>
              <InputHide
                type="checkbox"
                id={item.htmlId}
                bgColor={item.color}
                value={item.value}
                checked={checkValue(state.hobbyCheckedList, item.value)}
                onChange={(e) =>
                  onCheckedElement(
                    e.target.checked,
                    item,
                    state.setHobbyCheckedList,
                    state.hobbyCheckedList,
                  )
                }
              />
              <FilterLabel htmlFor={item.htmlId} hColor={item.color}>
                {item.name}
              </FilterLabel>
            </li>
          ))}
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
  user-select: none;

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

  :hover {
    ${(props) =>
      props.hColor &&
      css`
        border-color: ${props.hColor};
      `}
  }
`;

const InputHide = styled('input')`
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  position: absolute;
  display: none;

  &:checked + ${FilterLabel} {
    ${(props) =>
      props.bgColor &&
      css`
        background-color: ${props.bgColor};
        border-color: transparent;
        color: #fff;
      `}
    &::after {
      transform: rotate(0deg);
    }
  }
`;
