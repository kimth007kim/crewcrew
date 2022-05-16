import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Cookies } from 'react-cookie';
import styled, { css } from 'styled-components';
import useSWR from 'swr';
import axios from 'axios';
import { toast } from 'react-toastify';
import fetcher from '../../../utils/fetcher';
import Textfield from '../../common/TextfieldEmail';
import SettingGray from '../../../assets/images/SettingGray.png';
import CheckImg from '../../../assets/images/Checked_on.png';
import { emojiSlice, spaceSlice } from '../../../utils';

function InfoProfile({ state }) {
  const cookies = new Cookies();
  const {
    data: myData,
    error: myError,
    mutate,
  } = useSWR(['/user/token', cookies.get('user-token')], fetcher);

  const [nicknameFocus, setNicknameFocus] = useState(false);

  const [messageFocus, setMessageFocus] = useState(false);

  const inputFileRef = useRef(null);
  const myImgRef = useRef(null);

  // 이미지 변경 함수

  const deleteFile = useCallback(() => {
    inputFileRef.current.value = '';
  }, [state.file]);
  const HandleImageChange = useCallback(
    (e) => {
      const fileImg = e.target.files[0];
      if (!fileImg) {
        return null;
      }
      const filesize = Number((fileImg.size / 1024 / 1024).toFixed(4));
      if (filesize >= 10) {
        deleteFile();

        toast.error('이미지 사이즈가 너무 큽니다.');
        return null;
      }

      if (!(fileImg && fileImg.type.startsWith('image/'))) {
        deleteFile();

        toast.error('잘못된 형식의 파일입니다.');
        return null;
      }
      state.setFile(fileImg);
      const profileUrl = URL.createObjectURL(fileImg);
      myImgRef.current.firstElementChild.setAttribute('src', profileUrl);
    },
    [state.file],
  );
  // 닉네임 변경 함수

  const HandleNicknameChange = useCallback((e) => {
    const value = emojiSlice(spaceSlice(e.target.value)).slice(0, 10);
    state.setNickname(value);
    state.setNicknameValid(false);
    state.setDuplicateCheck(false);
    state.setNicknameValidMsg('앞으로 사용할 닉네임을 입력해주세요. (10자 이내)');
  }, []);

  const HandleNicknameDelete = useCallback(() => {
    state.setNickname('');
    state.setNicknameValid(false);
    state.setDuplicateCheck(false);
    state.setNicknameValidMsg('앞으로 사용할 닉네임을 입력해주세요. (10자 이내)');
  }, []);

  const HandleCheckNickname = useCallback(
    (e) => {
      e.preventDefault();
      async function axiosPost() {
        try {
          if (myData.data.nickName === state.nickname) {
            state.setNicknameValidMsg('기존과 동일한 닉네임입니다.');
            state.setNicknameValid(true);
            return;
          }
          const { data } = await axios.get(`/auth/user/nickname/${state.nickname}`);
          switch (data.status) {
            case 200:
              state.setDuplicateCheck(true);
              state.setNicknameValid(false);
              state.setNicknameValidMsg('사용 가능한 닉네임입니다.');
              break;
            case 1007:
              state.setNicknameValidMsg(data.message);
              state.setNicknameValid(true);
              break;
            default:
              break;
          }
        } catch (error) {
          toast.error('알 수 없는 오류가 발생했습니다. 새로고침 후 다시 시도해주시길 바랍니다');
          console.dir(error);
        }
      }
      axiosPost();
    },
    [state.nickname],
  );

  // 메세지 변경 함수

  const HandleMessageChange = useCallback((e) => {
    state.setMessage(emojiSlice(e.target.value).slice(0, 30));
    if (e.target.value.length < 6 && e.target.value) {
      state.setMessageValid(true);
    } else {
      state.setMessageValid(false);
    }
  }, []);

  const HandleMessageDelete = useCallback(() => {
    state.setMessage('');
    state.setMessageValid(false);
  }, []);

  // 텍스트 필드 변경 함수

  const HandleFieldSet = useCallback((setSetting) => {
    setSetting(false);
  }, []);

  useEffect(() => {
    if (!state.nicknameSetting) {
      state.setNickname(myData.data.nickName);
      setNicknameFocus(true);
    }

    if (!state.messageSetting) {
      state.setMessage(myData.data.message);
      setMessageFocus(true);
    }

    if (!state.file) {
      myImgRef.current.firstElementChild.setAttribute('src', myData.data.file);
    }
  }, [state.messageSetting, state.nicknameSetting, state.file]);

  return (
    <InfoInputList>
      {myData && myData.data && (
        <>
          <InputTop>
            <MyProfile ref={myImgRef}>
              <img src={myData.data.file} alt="" />
            </MyProfile>
            <InputHide
              type="file"
              id="ProfileSetting"
              ref={inputFileRef}
              onChange={HandleImageChange}
            />
            <Setting htmlFor="ProfileSetting">프로필 세팅하기</Setting>
            <InputWrap>
              <Textfield
                type="text"
                onChange={HandleNicknameChange}
                value={state.nickname}
                label={state.nicknameSetting ? `${myData.data.nickName}` : '닉네임'}
                validMessage={state.nicknameValidMsg}
                valid={state.nicknameValid}
                onDelete={HandleNicknameDelete}
                focus={nicknameFocus}
                disabled={state.nicknameSetting}
              />
              {state.nicknameSetting ? (
                <TxtFieldSetting onClick={() => HandleFieldSet(state.setNicknameSetting)} />
              ) : (
                <>
                  <InputDouble
                    active={state.nickname.length >= 2 && !state.duplicateCheck}
                    onMouseDown={HandleCheckNickname}
                  >
                    중복확인
                  </InputDouble>
                  <InputChecked active={state.duplicateCheck} />
                </>
              )}
            </InputWrap>
          </InputTop>
          <InputWrap>
            <Textfield
              type="text"
              onChange={HandleMessageChange}
              value={state.message}
              label={state.messageSetting ? `${myData.data.message}` : '자기소개'}
              validMessage={state.messageValidMsg}
              valid={state.messageValid}
              onDelete={HandleMessageDelete}
              focus={messageFocus}
              disabled={state.messageSetting}
            />
            {state.messageSetting && (
              <TxtFieldSetting onClick={() => HandleFieldSet(state.setMessageSetting)} />
            )}
          </InputWrap>
        </>
      )}
    </InfoInputList>
  );
}

export default InfoProfile;

const InfoInputList = styled('div')``;
const InputTop = styled('div')`
  display: flex;
  align-items: flex-end;
  margin-bottom: 25px;
`;

const MyProfile = styled('div')`
  min-width: 50px;
  height: 50px;
  background-color: #e2e2e2;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 2px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Setting = styled('label')`
  min-width: 16px;
  width: 16px;
  height: 16px;
  cursor: pointer;
  text-indent: -9999em;
  background: url(${SettingGray}) 50% 50%/100%;
  margin-right: 18px;
`;

const InputHide = styled('input')`
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  position: absolute;
  display: none;
`;
const InputWrap = styled('div')`
  width: 100%;
  height: 50px;
  position: relative;
  box-sizing: content-box;
`;

const TxtFieldSetting = styled('div')`
  min-width: 16px;
  width: 16px;
  height: 16px;
  cursor: pointer;
  text-indent: -9999em;
  background: url(${SettingGray}) 50% 50%/100%;
  position: absolute;
  right: 16px;
  top: calc(50% - 8px);
`;

const InputDouble = styled.div`
  font-size: 10px;
  color: #fff;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 20px;
  background-color: #707070;
  border-radius: 10px;
  position: absolute;
  display: none;
  top: 15px;
  right: 48px;
  cursor: pointer;
  ${(props) =>
    props.active &&
    css`
      display: flex;
    `}
`;

const InputChecked = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  display: none;
  top: 15px;
  right: 48px;
  background: url(${CheckImg});
  background-size: 100%;
  cursor: default;
  ${(props) =>
    props.active &&
    css`
      display: flex;
    `}
`;
