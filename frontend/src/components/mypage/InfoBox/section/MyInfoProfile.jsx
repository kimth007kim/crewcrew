import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { toast } from 'react-toastify';
import styled, { css } from 'styled-components';
import useSWR from 'swr';
import { hobbyFilterArr, studyFilterArr } from '@/frontDB/filterDB';
import fetcher from '@/utils/fetcher';
import InfoCat from '../InfoCat';
import InfoProfile from '../InfoProfile';

function MyInfoProfile({ open, closeFunc }) {
  const cookies = new Cookies();
  const {
    data: myData,
    error: myError,
    mutate,
  } = useSWR(['/auth/token', cookies.get('X-AUTH-TOKEN')], fetcher);

  // 닉네임
  const [nickname, setNickname] = useState('');
  const [nicknameValid, setNicknameValid] = useState(false);
  const [nicknameValidMsg, setNicknameValidMsg] = useState(
    '앞으로 사용할 닉네임을 입력해주세요. (10자 이내)',
  );
  const [nicknameSetting, setNicknameSetting] = useState(true);
  const [duplicateCheck, setDuplicateCheck] = useState(false);

  // 자기소개
  const [message, setMessage] = useState('');
  const [messageValid, setMessageValid] = useState(false);
  const [messageValidMsg, setMessageValidMsg] = useState(
    '나를 소개하는 한 줄 메세지를 입력해주세요.(30자 이내)',
  );
  const [messageSetting, setMessageSetting] = useState(true);

  // 버튼 액티브
  const [btnActive, setBtnActive] = useState(false);

  // 이미지
  const [file, setFile] = useState(null);

  // 카테고리
  const [studyCheckedList, setStudyCheckedList] = useState([]);
  const [hobbyCheckedList, setHobbyCheckedList] = useState([]);
  const [checkFlag, setCheckFlag] = useState(false);

  const InitialState = useCallback(() => {
    setNickname('');
    setNicknameValid(false);
    setNicknameValidMsg('앞으로 사용할 닉네임을 입력해주세요. (10자 이내)');

    setNicknameSetting(true);
    setDuplicateCheck(false);

    setMessage('');
    setMessageValid(false);
    setMessageValidMsg('나를 소개하는 한 줄 메세지를 입력해주세요.(30자 이내)');

    setMessageSetting(true);
    setBtnActive(false);

    setFile(null);
    setCheckFlag(false);
    closeFunc();

    const studyArr = [];
    const hobbyArr = [];
    if (myData && !myError && myData.data) {
      myData.data.categoryId.forEach((id) => {
        const categoryID = String(id);
        const tmpHobbyArr = hobbyFilterArr.filter((el) => el.value === categoryID);
        const tmpStudyArr = studyFilterArr.filter((el) => el.value === categoryID);
        if (tmpHobbyArr.length > 0) {
          hobbyArr.push(...tmpHobbyArr);
        } else {
          studyArr.push(...tmpStudyArr);
        }
      });
    }

    setStudyCheckedList([...studyArr]);
    setHobbyCheckedList([...hobbyArr]);
  }, [myData.data]);

  const HandleCancelUpload = useCallback(() => {
    InitialState();
  }, []);

  const HandleProfileUpload = useCallback(async () => {
    try {
      const context = {};
      if (nickname.length > 0 && nickname !== myData.data.nickName && !duplicateCheck) {
        setNicknameValid(true);
        setNicknameValidMsg('닉네임 중복 확인해주세요.');
        return null;
      }
      if (
        nickname.length > 0 &&
        !nicknameValid &&
        duplicateCheck &&
        nickname !== myData.data.nickName
      ) {
        context.nickName = nickname;
      }
      if (message.length > 0 && !messageValid && message !== myData.data.message) {
        context.message = message;
      }

      if (checkFlag) {
        const categoryId = [];
        const studyCategory = studyCheckedList.map((data) => data.value);
        const hobbyCategory = hobbyCheckedList.map((data) => data.value);
        categoryId.push(...studyCategory);
        categoryId.push(...hobbyCategory);

        context.categoryId = categoryId;
      }
      const formData = new FormData();
      formData.append(
        'ProfileChangeRequestDto',
        new Blob([JSON.stringify(context)], {
          type: 'application/json',
        }),
      );
      if (file) {
        formData.append('file', file);
      }
      const { data } = await axios.put('/profile/mypage', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });

      switch (data.status) {
        case 200:
          toast.success('성공적으로 변경되었습니다.');
          mutate('/auth/token');
          InitialState();
          break;
        case 1007:
        case 1013:
          setNicknameValid(true);
          setNicknameValidMsg(data.message);
          break;
        case 1014:
          setMessageValid(true);
          setMessageValidMsg(data.message);
          break;

        case 1501:
        case 1502:
          toast.error(data.message);
          break;
        default:
          toast.error(data.message);
          break;
      }
    } catch (error) {
      toast.error('알 수 없는 오류가 발생했습니다. 새로고침 후 다시 시도해주시길 바랍니다');
      console.dir(error);
      InitialState();
    }
  }, [file, nickname, message, checkFlag, studyCheckedList, hobbyCheckedList, duplicateCheck]);

  useEffect(() => {
    if (!nicknameSetting || !messageSetting || file || checkFlag) {
      setBtnActive(true);
    }
  }, [nicknameSetting, messageSetting, file, checkFlag]);

  useEffect(() => {
    const studyArr = [];
    const hobbyArr = [];
    if (myData && !myError && myData.data) {
      myData.data.categoryId.forEach((id) => {
        const categoryID = String(id);
        const tmpHobbyArr = hobbyFilterArr.filter((el) => el.value === categoryID);
        const tmpStudyArr = studyFilterArr.filter((el) => el.value === categoryID);
        if (tmpHobbyArr.length > 0) {
          hobbyArr.push(...tmpHobbyArr);
        } else {
          studyArr.push(...tmpStudyArr);
        }
      });
    }

    setStudyCheckedList([...studyArr]);
    setHobbyCheckedList([...hobbyArr]);
  }, [myData.data]);

  return (
    <>
      <InfoBody open={open}>
        <InfoProfile
          state={{
            nickname,
            setNickname,
            nicknameValid,
            setNicknameValid,
            nicknameValidMsg,
            setNicknameValidMsg,
            nicknameSetting,
            setNicknameSetting,
            duplicateCheck,
            setDuplicateCheck,
            message,
            setMessage,
            messageValid,
            setMessageValid,
            messageValidMsg,
            setMessageValidMsg,
            messageSetting,
            setMessageSetting,
            file,
            setFile,
          }}
        />
        <InfoCat
          state={{
            studyCheckedList,
            setStudyCheckedList,
            hobbyCheckedList,
            setHobbyCheckedList,
            setCheckFlag,
          }}
        />
      </InfoBody>
      {open && (
        <ButtonWrap>
          <ButtonCancel type="button" onClick={HandleCancelUpload}>
            취소
          </ButtonCancel>
          <ButtonSave disabled={!btnActive} type="button" onClick={HandleProfileUpload}>
            저장
          </ButtonSave>
        </ButtonWrap>
      )}
    </>
  );
}

export default MyInfoProfile;

const InfoBody = styled('div')`
  height: auto;
  @media screen and (max-width: 820px) {
    margin-top: 12px;
    overflow: hidden;
    transition: 0.5s;
    height: 0px;
    ${(props) =>
      props.open &&
      css`
        height: ${props.open && '470px'};
      `}
  }
`;

const ButtonWrap = styled('div')`
  display: flex;
  gap: 8px;
  justify-content: end;
  margin-top: auto;

  @media screen and (max-width: 820px) {
    gap: 15px;
  }
`;

const ButtonSave = styled('button')`
  border: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  transition: 0.3s;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  line-height: 26px;
  background-color: #00b7ff;
  height: 50px;
  color: #fff;
  width: 112px;

  :hover {
    background-color: #005ec5;
  }

  :disabled {
    background-color: #b0b0b0;
  }

  @media screen and (max-width: 820px) {
    width: 100%;
    :hover {
      background-color: #00b7ff;
    }

    :disabled {
      background-color: #b0b0b0;
    }
  }
`;

const ButtonCancel = styled('button')`
  border: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  transition: 0.3s;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  line-height: 26px;
  background-color: #c4c4c4;
  height: 50px;
  color: #fff;
  width: 112px;

  :hover {
    background-color: #b0b0b0;
  }

  @media screen and (max-width: 820px) {
    width: 100%;
    :hover {
      background-color: #c4c4c4 !important;
    }
  }
`;
