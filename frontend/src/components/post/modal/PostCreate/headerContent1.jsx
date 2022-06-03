import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { InputHide, LabelBtn, ListFlex } from './index.style';
import ArrowDown from '@/assets/images/ArrowDown.png';
import ArrowDownOn from '@/assets/images/ArrowDownOn.png';
import { css } from 'styled-components';

function HeaderContent1({ state }) {
  const [studyClick, setStudyClick] = useState(false);
  const [hobbyClick, setHobbyClick] = useState(false);
  const [categoryValue, setCategoryValue] = useState('');

  const [studyArr, setStudyArr] = useState([]);
  const [hobbyArr, setHobbyArr] = useState([]);

  const studyRef = useRef(null);
  const hobbyRef = useRef(null);

  const HandleCategoryChoose = useCallback((value, setClick) => {
    setClick(value);
    setCategoryValue('');
    state.setDetailCategoryCheck(0);
  }, []);

  const HandleChoose = useCallback((e, data, setClick) => {
    e.preventDefault();
    e.stopPropagation();

    state.setDetailCategoryCheck(data.categoryId);
    setCategoryValue(data.categoryName);

    setTimeout(() => {
      setClick(false);
    }, 150);
  }, []);

  const HandleStudyInputClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (studyRef.current.contains(e.target)) {
        if (studyClick) {
          setStudyClick(false);
        } else {
          setStudyClick(true);
        }
      } else {
        setStudyClick(false);
      }
    },
    [studyClick],
  );

  const HandleHobbyInputClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (hobbyRef.current.contains(e.target)) {
        if (hobbyClick) {
          setHobbyClick(false);
        } else {
          setHobbyClick(true);
        }
      } else {
        setHobbyClick(false);
      }
    },
    [hobbyClick],
  );

  const renderDetailCategory = useCallback(() => {
    if (state.categoryCheck === 0) {
      return (
        <ListDrop
          ref={studyRef}
          active={studyClick}
          onClick={HandleStudyInputClick}
          hLength={studyArr.length > 0 && studyArr.length}
        >
          <li>
            <InputPostCatDet
              autoComplete="off"
              readOnly
              placeholder="어떤 스터디 크루원이 필요하세요?"
              value={categoryValue}
            />
            <span></span>
          </li>
          {studyArr.length > 0 &&
            studyArr.map((m, i) => (
              <li key={m.categoryName + m.categoryId + m.description}>
                <InputHide />
                <LabelChoose
                  onClick={(e) => HandleChoose(e, m, setStudyClick)}
                  active={state.detailCategoryCheck === m.categoryId}
                >
                  <Choose active={state.detailCategoryCheck === m.categoryId}>
                    <em>{m.categoryName}</em>
                    {m.description}
                  </Choose>
                </LabelChoose>
              </li>
            ))}
        </ListDrop>
      );
    }
    return (
      <ListDrop
        ref={hobbyRef}
        active={hobbyClick}
        onClick={HandleHobbyInputClick}
        hLength={hobbyArr.length > 0 && hobbyArr.length}
      >
        <li>
          <InputPostCatDet
            autoComplete="off"
            readOnly
            placeholder="어떤 취미 크루원이 필요하세요?"
            value={categoryValue}
          />
          <span></span>
        </li>
        {hobbyArr.length > 0 &&
          hobbyArr.map((m, i) => (
            <li key={m.categoryName + m.categoryId + m.description}>
              <InputHide />
              <LabelChoose
                onClick={(e) => HandleChoose(e, m, setHobbyClick)}
                active={state.detailCategoryCheck === m.categoryId}
              >
                <Choose active={state.detailCategoryCheck === m.categoryId}>
                  <em>{m.categoryName}</em>
                  {m.description}
                </Choose>
              </LabelChoose>
            </li>
          ))}
      </ListDrop>
    );
  }, [state.categoryCheck, hobbyClick, studyClick]);

  useEffect(() => {
    async function axiosGet() {
      try {
        const { data } = await axios.get('/category/list');

        switch (data.status) {
          case 200:
            setStudyArr(data.data[0].children);
            setHobbyArr(data.data[1].children);
            break;
          case 1004:
          case 1005:
            toast.error(data.message);
            break;
          default:
            break;
        }
      } catch (error) {
        console.dir(error);
      }
    }
    axiosGet();
  }, []);

  return (
    <Content>
      <div>
        <h4>카테고리</h4>
        <ListFlex>
          <li>
            <InputHide
              bgColor={'#00b7ff'}
              id="PostStudy"
              type={'radio'}
              checked={0 === state.categoryCheck}
              onChange={() => HandleCategoryChoose(0, state.setCategoryCheck)}
            ></InputHide>
            <LabelBtn htmlFor="PostStudy">스터디</LabelBtn>
          </li>
          <li>
            <InputHide
              bgColor={'#00b7ff'}
              id="PostHobby"
              type={'radio'}
              checked={1 === state.categoryCheck}
              onChange={() => HandleCategoryChoose(1, state.setCategoryCheck)}
            ></InputHide>
            <LabelBtn htmlFor="PostHobby">취미</LabelBtn>
          </li>
        </ListFlex>
      </div>
      <div>
        <h4>상세 카테고리</h4>
        {renderDetailCategory()}
      </div>
    </Content>
  );
}

export default HeaderContent1;

const Content = styled('div')`
  display: flex;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;

  & > div:last-of-type {
    height: 74px;
    width: 100%;
    position: relative;
  }
`;

const ListDrop = styled('ul')`
  width: 100%;
  height: 50px;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  transition-property: height, border-color;
  transition-duration: 0.5s, 0.3s;
  overflow: hidden;
  background-color: #fff;
  box-sizing: border-box;
  position: absolute;
  top: 24px;

  ${(props) =>
    props.active &&
    css`
      border: 1px solid #00b7ff;
      height: ${8 + 50 + props.hLength * 27}px;
    `}

  li {
    width: 100%;
    position: relative;
    padding-left: 6px;
    cursor: pointer;
    box-sizing: border-box;

    &:first-child {
      height: 50px;
      padding: 0;

      &::after {
        content: '';
        display: block;
        height: 1px;
        width: calc(100% - 24px);
        background-color: #e2e2e2;
        margin: 0 auto;
      }

      span {
        display: block;
        width: 11px;
        height: 6px;
        background: url(${ArrowDown}) no-repeat;
        background-size: 11px !important;
        position: absolute;
        top: calc(50% - 3px);
        right: 12px;
        transition: 0.3s;
      }
    }

    &:nth-child(2) {
      padding-top: 5px;
    }
  }

  &:hover {
    border-color: #00b7ff;

    li {
      span {
        background: url(${ArrowDownOn}) no-repeat;
      }
    }
  }
`;

const InputPostCatDet = styled('input')`
  width: 100%;
  height: 50px;
  border: none;
  outline: none;
  box-sizing: border-box;
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
  color: #707070;
  padding: 0 12px 0 18px;

  &::placeholder {
    color: #a8a8a8;
  }
`;

const LabelChoose = styled.label`
  display: block;
  width: 100%;
  cursor: pointer;
  height: 21px;
  padding: 4px 6px 2px;
  padding-right: 0;
  box-sizing: content-box;
  :hover {
    p {
      background-color: #e2e2e2;
      ${(props) =>
        props.active &&
        css`
          background-color: #00b7ff;
        `};
    }
  }
`;

const Choose = styled.p`
  width: fit-content;
  padding: 4px 6px 4px 6px;
  border-radius: 12px;
  font-size: 13px;
  line-height: 14px;
  color: #000;
  transition: 0.2s;
  position: relative;
  white-space: nowrap;
  user-select: none;

  ${(props) =>
    props.active &&
    css`
      background-color: #00b7ff;
      color: #fff;
    `};
`;
