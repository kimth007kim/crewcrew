import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { toast } from 'react-toastify';
import styled, { css } from 'styled-components';
import useSWR from 'swr';
import fetcher from '../../../../utils/fetcher';
import InfoInputList from '../InfoInputList';

function MyInfoInput({ open }) {
  const cookies = new Cookies();
  const {
    data: myData,
    error: myError,
    mutate,
  } = useSWR(['/user/token', cookies.get('user-token')], fetcher);

  // 이름
  const [name, setName] = useState('');
  const [nameValid, setNameValid] = useState(false);
  const [nameValidMsg, setNameValidMsg] = useState('이름을 입력해주세요');
  const [nameSetting, setNameSetting] = useState(true);

  // 비밀번호
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordValidMsg, setPasswordValidMsg] = useState('숫자/영문/특수문자 포함 8~20글자');

  const [pwConfirm, setPwConfirm] = useState('');
  const [pwConfirmValid, setPwConfirmValid] = useState(false);
  const [pwConfirmValidMsg, setPwConfirmValidMsg] = useState('');

  const [passwordSetting, setPasswordSetting] = useState(true);
  // 버튼 액티브
  const [btnActive, setBtnActive] = useState(false);

  const InitialState = useCallback(() => {
    setName('');
    setNameValid(false);
    setNameValidMsg('이름을 입력해주세요');

    setNameSetting(true);

    setPassword('');
    setPasswordValid(false);
    setPasswordValidMsg('숫자/영문/특수문자 포함 8~20글자');

    setPwConfirm('');
    setPwConfirmValid(false);
    setPwConfirmValidMsg('');
    setPasswordSetting(true);

    setBtnActive(false);
  }, []);

  const HandleCancelUpload = useCallback(() => {
    InitialState();
  }, []);

  const HandleProfileUpload = useCallback(async () => {
    try {
      const context = {};

      if (name.length > 0 && !nameValid && name !== myData.data.name) {
        context.name = name;
      }

      if (password.length > 0 && !passwordValid && !pwConfirmValid && pwConfirm === password) {
        context.password = password;
      }

      const formData = new FormData();
      formData.append(
        'ProfileChangeRequestDto',
        new Blob([JSON.stringify(context)], {
          type: 'application/json',
        }),
      );

      const { data } = await axios.put('/profile/mypage', formData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-AUTH-TOKEN': cookies.get('user-token'),
        },
      });

      switch (data.status) {
        case 200:
          toast.success('성공적으로 변경되었습니다.');
          InitialState();
          mutate('/user/token');
          break;
        case 1009:
        case 1010:
        case 1011:
          setPasswordValid(true);
          setPasswordValidMsg(data.message);
          break;
        case 1012:
          setNameValid(true);
          setNameValidMsg(data.message);
          break;
        case 1900:
          toast.error(data.message);
          break;

        default:
          break;
      }
    } catch (error) {
      toast.error('알 수 없는 오류가 발생했습니다. 새로고침 후 다시 시도해주시길 바랍니다');
      console.dir(error);
      InitialState();
    }
  }, [name]);

  useEffect(() => {
    if (!nameSetting || !passwordSetting) {
      setBtnActive(true);
    }
  }, [nameSetting, passwordSetting]);

  return (
    <>
      <InfoBody open={open}>
        <InfoInputList
          state={{
            name,
            setName,
            nameValid,
            setNameValid,
            nameValidMsg,
            setNameValidMsg,
            nameSetting,
            setNameSetting,
            password,
            setPassword,
            passwordValid,
            setPasswordValid,
            passwordValidMsg,
            setPasswordValidMsg,
            pwConfirm,
            setPwConfirm,
            pwConfirmValid,
            setPwConfirmValid,
            pwConfirmValidMsg,
            setPwConfirmValidMsg,
            passwordSetting,
            setPasswordSetting,
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

export default MyInfoInput;

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
        height: ${props.open && '300px'};
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
      background-color: #00b7ff !important;
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
      background-color: #00b7ff !important;
    }
  }
`;
