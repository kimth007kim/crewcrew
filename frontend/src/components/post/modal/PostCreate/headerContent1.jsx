import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { InputHide, LabelBtn } from './index.style';

function HeaderContent1({ state }) {
  const [studyClick, setStudyClick] = useState(false);
  const [hobbyClick, setHobbyClick] = useState(false);

  const [studyArr, setStudyArr] = useState([]);
  const [hobbyArr, setHobbyArr] = useState([]);

  const studyRef = useRef(null);
  const hobbyRef = useRef(null);

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
              onChange={() => state.setCategoryCheck(0)}
            ></InputHide>
            <LabelBtn htmlFor="PostStudy">스터디</LabelBtn>
          </li>
          <li>
            <InputHide
              bgColor={'#00b7ff'}
              id="PostHobby"
              type={'radio'}
              checked={1 === state.categoryCheck}
              onChange={() => state.setCategoryCheck(1)}
            ></InputHide>
            <LabelBtn htmlFor="PostHobby">취미</LabelBtn>
          </li>
        </ListFlex>
      </div>
      <div>
        <h4>상세 카테고리</h4>
        <ListDrop></ListDrop>
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

const ListFlex = styled('ul')`
  display: flex;
  margin-right: 24px;
  gap: 15px;

  li {
    width: 112px;
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
`;
