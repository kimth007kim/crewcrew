import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { css } from 'styled-components';
import { ko } from 'date-fns/esm/locale';
import DatePickers from 'react-datepicker';

import { InputHide, LabelBtn, ListFlex } from './index.style';
import ArrowDown from '@/assets/images/ArrowDown.png';
import ArrowDownOn from '@/assets/images/ArrowDownOn.png';
import ArrowUp from '@/assets/images/ArrowUp.png';
import ArrowUpOn from '@/assets/images/ArrowUpOn.png';
import { numberSlice } from '@/utils';
import 'react-datepicker/dist/react-datepicker.css';

function HeaderContent2({ state }) {
  const [peopleClick, setPeopleClick] = useState(false);
  const [dateClick, setDateClick] = useState(false);
  const numList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const peopleRef = useRef(null);
  const peopleInputRef = useRef(null);
  const dateRef = useRef(null);

  const onChangePeopleNum = useCallback((e) => {
    let value = numberSlice(e.target.value);

    state.setPeopleNum(value);
  }, []);

  const HandleChangePeopleNum = useCallback((value) => {
    state.setPeopleNum(value);
  }, []);

  const HandleKeyEnter = useCallback((e) => {
    if (e.key === 'Enter') {
      setPeopleClick(false);
      peopleInputRef.current.blur();
    }
  }, []);

  const HandleUpDownNum = useCallback((e, num) => {
    e.preventDefault();
    e.stopPropagation();
    if (num > 10) {
      return;
    }
    if (num < 1) {
      return;
    }
    state.setPeopleNum(num);
  }, []);

  const HandleMeetingChoose = useCallback((value, setClick) => {
    setClick(value);
  }, []);

  const HandlePeopleInputClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();

      if (peopleRef.current.contains(e.target)) {
        if (peopleClick) {
          setPeopleClick(false);
        } else {
          setPeopleClick(true);
        }
      } else {
        setPeopleClick(false);
      }
    },
    [peopleClick],
  );

  const handleChangeDate = (date) => {
    state.setDatePick(date);
  };

  useEffect(() => {
    if (state.peopleNum < 1) {
      state.setPeopleNum(1);
    }
    if (state.peopleNum > 10) {
      state.setPeopleNum(10);
    }
  }, [peopleClick]);

  return (
    <Content>
      <div>
        <h4>모임방식</h4>
        <ListFlex>
          <li>
            <InputHide
              bgColor={'#00b7ff'}
              id="PostOnline"
              type={'radio'}
              checked={0 === state.meetingCheck}
              onChange={() => HandleMeetingChoose(0, state.setMeetingCheck)}
            ></InputHide>
            <LabelBtn htmlFor="PostOnline">온라인</LabelBtn>
          </li>
          <li>
            <InputHide
              bgColor={'#00b7ff'}
              id="PostOffline"
              type={'radio'}
              checked={1 === state.meetingCheck}
              onChange={() => HandleMeetingChoose(1, state.setMeetingCheck)}
            ></InputHide>
            <LabelBtn htmlFor="PostOffline">오프라인</LabelBtn>
          </li>
        </ListFlex>
      </div>
      <div>
        <div>
          <h4>모집 인원수</h4>
          <ListDrop ref={peopleRef} active={peopleClick} onClick={HandlePeopleInputClick}>
            <li>
              <InputPostPeople
                type="number"
                value={state.peopleNum}
                max={10}
                onChange={onChangePeopleNum}
                onKeyPress={HandleKeyEnter}
                ref={peopleInputRef}
              />
              <span onClick={(e) => HandleUpDownNum(e, state.peopleNum + 1)}></span>
              <span onClick={(e) => HandleUpDownNum(e, state.peopleNum - 1)}></span>
            </li>
            <li>
              {numList.map((num) => (
                <span onClick={() => HandleChangePeopleNum(num)} key={num}>
                  {num}
                </span>
              ))}
            </li>
          </ListDrop>
        </div>
        <div>
          <h4>마감일자</h4>
          <CustomDatePicker
            locale={ko}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            onChange={(date) => state.setLastDate(date)}
            selected={state.lastDate}
          ></CustomDatePicker>
        </div>
      </div>
    </Content>
  );
}

export default HeaderContent2;

const Content = styled('div')`
  display: flex;
  margin-bottom: 30px;
  position: relative;
  z-index: 1;

  & > div:last-of-type {
    height: 74px;
    width: 100%;
    position: relative;
    display: flex;

    & > div {
      width: 100%;

      &:first-of-type {
        position: relative;
        margin-right: 24px;
      }
    }
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
      height: 124px;
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
        width: 24px;
        height: 16px;
        background-size: 11px;
        background-repeat: no-repeat;
        background-position: center;
        position: absolute;
        right: 8px;
        transition: 0.3s;
        cursor: pointer;
        &:first-of-type {
          background-image: url(${ArrowUp});
          top: 9px;

          :hover {
            background-image: url(${ArrowUpOn});
          }
        }
        &:nth-of-type(2) {
          background-image: url(${ArrowDown});
          bottom: 9px;
          :hover {
            background-image: url(${ArrowDownOn});
          }
        }
      }
    }

    &:nth-child(2) {
      padding: 10px 12px;
      display: flex;
      flex-wrap: wrap;

      span {
        display: block;
        width: 15px;
        height: 20px;
        margin-right: 8px;
        margin-bottom: 10px;
        text-align: center;
        line-height: 20px;
        font-size: 15px;
        font-weight: 500;
        color: #707070;
        transition: 0.3s;

        &:hover {
          color: #00b7ff;
        }
      }
    }
  }

  &:hover {
    border-color: #00b7ff;
  }
`;

const InputPostPeople = styled('input')`
  width: 100%;
  height: 50px;
  border: none;
  outline: none;
  box-sizing: border-box;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  color: #707070;
  text-align: center;

  &::-webkit-inner-spin-button {
    display: none;
  }
`;

const CustomDatePicker = styled(DatePickers)`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: 1px solid #e2e2e2;
  outline: none;
  padding: 16px 12px;
  box-sizing: border-box;
  font-size: 13px;
  transition: 0.3s;
  font-weight: 500;
  cursor: pointer;
  color: #707070;
  padding: 0 12px;
`;
