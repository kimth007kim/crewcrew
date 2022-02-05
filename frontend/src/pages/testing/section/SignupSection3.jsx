/* eslint-disable indent */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import CloseWhite from '../../../assets/images/CloseWhite.png';
import Button from '../../../components/common/Button';
import Textfield from '../../../components/common/TextfieldEmail';
import MTextfield from './MTextfield';

const studyArray = [
  {
    id: 's1',
    name: '어학',
    sub: '(토플/토익)',
  },
  {
    id: 's2',
    name: '취업',
    sub: '(면접/자소서)',
  },
  {
    id: 's3',
    name: '고시/공무원',
    sub: '',
  },
  {
    id: 's4',
    name: '사이드프로젝트',
    sub: '(디자인/개발)',
  },
  {
    id: 's5',
    name: '기타',
    sub: '(이중에 없어요!)',
  },
];

const hobbyArray = [
  {
    id: 'h1',
    name: '예술',
    sub: '(공예/회화)',
  },
  {
    id: 'h2',
    name: '요리',
    sub: '(요리/맛집탐방/카페탐방)',
  },
  {
    id: 'h3',
    name: '운동',
    sub: '(헬스/구기종목)',
  },
  {
    id: 'h4',
    name: '게임',
    sub: '(보드게임/온라인게임)',
  },
  {
    id: 'h5',
    name: '덕질',
    sub: '(코스프레/콘서트/프라모델)',
  },
  {
    id: 'h6',
    name: '트렌드',
    sub: '(뷰티/패션)',
  },
  {
    id: 'h7',
    name: '기타',
    sub: '(이중에 없어요!)',
  },
];

function SignupSection3({ IsClick, HandleClick }) {
  const [studyClick, setStudyClick] = useState(false);
  const [hobbyClick, setHobbyClick] = useState(false);
  const [studyList, setStudyList] = useState([]);
  const [hobbyList, setHobbyList] = useState([]);

  const [StepActive, setStepActive] = useState(false);

  const [message, setMessage] = useState('');
  const [messageValid, setMessageValid] = useState(true);

  const scrollRef = useRef(null);
  const itemRef = useRef(null);

  const HandleMessageChange = useCallback((e) => {
    setMessage(e.target.value);
    if (e.target.value.length >= 2) {
      setMessageValid(false);
    } else {
      setMessageValid(true);
    }
  }, []);

  const HandleMessageDelete = useCallback(() => {
    setMessage('');
    setMessageValid(false);
  }, []);

  const HandleScrollTop = (e) => {
    if (e.target.closest('.ChooseList')) {
      const Offset = e.target.closest('.ChooseList').offsetTop - 25;
      scrollRef.current.scrollTop = Offset;
    }
  };

  const HandleScrollMessage = (e) => {
    if (e.target.closest('.ChooseList')) {
      setHobbyClick(false);
      setStudyClick(false);
      const { height } = window.getComputedStyle(scrollRef.current);
      e.target.closest('.ChooseList').style.marginBottom = `${parseInt(height, 10) - 55}px`;
      setTimeout(() => {
        scrollRef.current.scrollTop = parseInt(height, 10);
      }, 300);
    }
  };

  const HandleStudyInputClick = useCallback(
    (e) => {
      e.preventDefault();
      setStudyClick(!studyClick);
      setHobbyClick(false);
      setTimeout(() => {
        HandleScrollTop(e);
      }, 300);
    },
    [studyClick],
  );

  const toggleStudyList = useCallback(
    (e, data) => {
      e.preventDefault();
      e.stopPropagation();
      if (studyList.includes(data)) {
        return setStudyList(studyList.filter((el) => el !== data));
      }
      setStudyList(studyList.concat(data));
    },
    [studyList],
  );

  const studyFilterItems = useCallback(
    (query) => studyList.filter((el) => el.indexOf(query) > -1),
    [studyList],
  );

  const HandleHobbyInputClick = useCallback(
    (e) => {
      e.preventDefault();
      setHobbyClick(!hobbyClick);
      setStudyClick(false);
      setTimeout(() => {
        HandleScrollTop(e);
      }, 300);
    },
    [hobbyClick],
  );

  const toggleHobbyList = useCallback(
    (e, data) => {
      e.preventDefault();
      e.stopPropagation();
      if (hobbyList.includes(data)) {
        return setHobbyList(hobbyList.filter((el) => el !== data));
      }
      setHobbyList(hobbyList.concat(data));
    },
    [hobbyList],
  );

  const HobbyFilterItems = useCallback(
    (query) => hobbyList.filter((el) => el.indexOf(query) > -1),
    [hobbyList],
  );

  const HandleRegister = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <SignupContents active={IsClick === 3}>
      <form>
        <InputList ref={scrollRef}>
          <ChooseList className="ChooseList">
            <ChooseListDetail
              active={studyClick}
              onClick={HandleStudyInputClick}
              hLength={8 + 50 + studyArray.length * 27}
            >
              <div>
                <ChooseTitle readOnly id="SignStudy" type="text" />
                <LabelAttached htmlFor="SignStudy">어떤 스터디 크루원이 필요하세요?</LabelAttached>
                {!studyClick && studyList.length > 0 && <InputAdd>추가</InputAdd>}
              </div>
              {studyArray.map((m) => (
                <div key={m.name + m.id}>
                  <InputChoose />
                  <LabelChoose
                    onClick={(e) => toggleStudyList(e, m.name)}
                    active={studyFilterItems(m.name).length > 0}
                  >
                    <Choose active={studyFilterItems(m.name).length > 0}>
                      <em>{m.name}</em>
                      {m.sub}
                      <ChooseCancel active={studyFilterItems(m.name).length > 0} />
                    </Choose>
                  </LabelChoose>
                </div>
              ))}
              {studyClick && <ChooseComplete active={studyList.length > 0}>완료</ChooseComplete>}
            </ChooseListDetail>
            <ChooseListUnder active={!studyClick}>
              {studyList.map((m, i) => (
                <div key={m}>
                  <LabelChoose onClick={(e) => toggleStudyList(e, m)}>
                    <ChooseUnder>
                      <em>{m}</em>
                      <ChooseCancel active={studyFilterItems(m).length > 0} />
                    </ChooseUnder>
                  </LabelChoose>
                </div>
              ))}
            </ChooseListUnder>
          </ChooseList>

          <ChooseList className="ChooseList">
            <ChooseListDetail
              active={hobbyClick}
              onClick={HandleHobbyInputClick}
              hLength={8 + 50 + hobbyArray.length * 27}
            >
              <div>
                <ChooseTitle readOnly id="SignHobby" type="text" />
                <LabelAttached htmlFor="SignHobby">어떤 취미를 가지고 계신가요?</LabelAttached>
                {!hobbyClick && hobbyList.length > 0 && <InputAdd>추가</InputAdd>}
              </div>
              {hobbyArray.map((m) => (
                <div key={m.name + m.id} ref={itemRef}>
                  <InputChoose />
                  <LabelChoose
                    onClick={(e) => toggleHobbyList(e, m.name)}
                    active={studyFilterItems(m.name).length > 0}
                  >
                    <Choose active={HobbyFilterItems(m.name).length > 0}>
                      <em>{m.name}</em>
                      {m.sub}
                      <ChooseCancel active={HobbyFilterItems(m.name).length > 0} />
                    </Choose>
                  </LabelChoose>
                </div>
              ))}
              {hobbyClick && <ChooseComplete active={hobbyList.length > 0}>완료</ChooseComplete>}
            </ChooseListDetail>
            <ChooseListUnder active={!hobbyClick}>
              {hobbyList.map((m, i) => (
                <div key={m}>
                  <LabelChoose onClick={(e) => toggleHobbyList(e, m)}>
                    <ChooseUnder>
                      <em>{m}</em>
                      <ChooseCancel active={HobbyFilterItems(m).length > 0} />
                    </ChooseUnder>
                  </LabelChoose>
                </div>
              ))}
            </ChooseListUnder>
          </ChooseList>
          <ChooseList className="ChooseList">
            <MTextfield
              type="text"
              onChange={HandleMessageChange}
              value={message}
              label="한줄 메세지"
              validMessage="나를 소개하는 한 줄 메세지를 입력해주세요.(30자 이내)"
              valid={!messageValid}
              onDelete={HandleMessageDelete}
              HandleScrollTop={HandleScrollMessage}
            />
          </ChooseList>
        </InputList>
        <ButtonWrap>
          <Button
            size="fullregular"
            color="darkblue"
            disabled={!StepActive}
            onClick={HandleRegister}
          >
            회원가입 완료
          </Button>
        </ButtonWrap>
      </form>
    </SignupContents>
  );
}

export default SignupSection3;

const FadeIn = keyframes`
    from{
        opacity:0;
    } to {
        opacity:1;
    }
`;
const SignupContents = styled.div`
  transition: 0.5s;
  display: none;

  animation-duration: 0.5s;
  animation-timing-function: ease-out;

  animation-fill-mode: forwards;

  ${(props) =>
    props.active &&
    css`
      display: block;
      animation-name: ${FadeIn};
    `}
`;

const InputList = styled.ul`
  padding: 25px 0 20px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 310px;
  box-sizing: content-box;
  position: relative;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const ChooseList = styled.li`
  position: relative;
  height: auto;
  margin-bottom: 25px;
  transition: 0.3s;
  box-sizing: content-box;
`;

const ChooseListUnder = styled.div`
  margin-top: 4px;
  display: flex;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
  flex-wrap: wrap;
  display: none;

  ${(props) =>
    props.active &&
    css`
      display: flex;
    `}

  div {
    margin-left: 8px;
    margin-top: 6px;
  }
`;

const ChooseUnder = styled.p`
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
  background-color: #00b7ff !important;
  color: #fff;
  padding-right: 26px;
  cursor: pointer;
`;

const ChooseListDetail = styled.div`
  width: 100%;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  height: 50px;
  transition: height 0.3s;
  overflow: hidden;
  background-color: #fff;
  box-sizing: border-box;

  &:hover {
    border: 1px solid #707070;
  }

  ${(props) =>
    props.active &&
    css`
      border: 1px solid #00b7ff;
      height: ${props.hLength}px;
      &:hover {
        border-color: #00b7ff;
      }
    `}

  div {
    width: 100%;
    position: relative;
  }

  div:first-child {
    height: 50px;
    ::after {
      content: '';
      display: block;
      height: 1px;
      width: calc(100% - 24px);
      background-color: #e2e2e2;
      margin: 0 auto;
    }
  }
`;

const ChooseTitle = styled.input`
  width: 100%;
  border: none;
  outline: none;
  box-sizing: border-box;
  font-size: 16px;
  line-height: 1;
  color: #a8a8a8;
  height: 50px;
  font-weight: 300;
  padding: 8px 4px 8px 12px;
  transition: 0.5s;
  cursor: pointer;
`;

const LabelAttached = styled.label`
  position: absolute;
  left: 8px;
  top: 13px;
  font-size: 13px;
  font-weight: 300;
  padding: 0 4px 0 7px;
  transition: 0.5s;
  line-height: 24px;
  color: #a8a8a8;
  cursor: pointer;
  user-select: none;
`;

const InputAdd = styled.label`
  font-size: 10px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 20px;
  background-color: #707070;
  border-radius: 10px;
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
`;

const InputChoose = styled.input`
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  position: absolute;
  display: none;
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
      padding-right: 26px;
    `};
`;

const ChooseCancel = styled.span`
  width: 10px;
  height: 10px;
  cursor: pointer;
  position: absolute;
  display: none;
  top: 6px;
  right: 10px;
  background: url(${CloseWhite}) 50% 50%;
  background-size: 100%;
  cursor: default;
  ${(props) =>
    props.active &&
    css`
      display: block;
    `};
`;

const ChooseComplete = styled.label`
  font-size: 13px;
  color: #fff;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 20px;
  background-color: #707070;
  border-radius: 10px;
  position: absolute;
  bottom: 6px;
  right: 9px;
  cursor: pointer;
  background-color: #e2e2e2;
  transition: 0.3s;
  display: flex;
  user-select: none;

  ${(props) =>
    props.active &&
    css`
      background-color: #00b7ff;
    `}
`;

const ButtonWrap = styled.div`
  margin: 30px 0 10px;
`;
