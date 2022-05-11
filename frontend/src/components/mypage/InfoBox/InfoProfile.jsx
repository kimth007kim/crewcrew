import React, { useCallback, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import styled, { css } from 'styled-components';
import useSWR from 'swr';
import axios from 'axios';
import { toast } from 'react-toastify';
import fetcher from '../../../utils/fetcher';
import Textfield from '../../common/TextfieldEmail';
import SettingGray from '../../../assets/images/SettingGray.png';
import ProfileNull from '../../../assets/images/ProfileNull.png';
import CheckImg from '../../../assets/images/Checked_on.png';
import { emojiSlice, spaceSlice } from '../../../utils';

function InfoProfile() {
  const cookies = new Cookies();
  const {
    data: myData,
    error: myError,
    mutate,
  } = useSWR(['/user/token', cookies.get('user-token')], fetcher);

  // 닉네임
  const [nickname, setNickname] = useState('');
  const [nicknameValid, setNicknameValid] = useState(false);
  const [nicknameValidMsg, setNicknameValidMsg] = useState(
    '앞으로 사용할 닉네임을 입력해주세요. (10자 이내)',
  );
  const [nicknameFocus, setNicknameFocus] = useState(false);
  const [nicknameSetting, setNicknameSetting] = useState(true);

  const [preNickname, setPreNickname] = useState('');

  const [doubleCheck, setDoubleCheck] = useState(false);

  // 자기소개
  const [message, setMessage] = useState('');
  const [messageValid, setMessageValid] = useState(false);
  const [messageValidMsg, setMessageValidMsg] = useState(
    '나를 소개하는 한 줄 메세지를 입력해주세요.(30자 이내)',
  );
  const [messageFocus, setMessageFocus] = useState(false);
  const [messageSetting, setMessageSetting] = useState(true);

  // 닉네임 변경 함수

  const HandleNicknameChange = useCallback((e) => {
    const value = emojiSlice(spaceSlice(e.target.value)).slice(0, 10);
    setNickname(value);
    setNicknameValid(false);
    setDoubleCheck(false);
    setNicknameValidMsg('앞으로 사용할 닉네임을 입력해주세요. (10자 이내)');
  }, []);

  const HandleNicknameDelete = useCallback(() => {
    setNickname('');
    setNicknameValid(false);
    setDoubleCheck(false);
  }, []);

  const HandleCheckNickname = useCallback(
    (e) => {
      e.preventDefault();
      async function axiosPost() {
        try {
          if (preNickname === nickname) {
            setNicknameValidMsg('기존 동일한 닉네임입니다.');
            setNicknameValid(true);
            return;
          }
          const { data } = await axios.get(`/auth/user/nickname/${nickname}`);
          switch (data.status) {
            case 200:
              setDoubleCheck(true);
              setNicknameValidMsg('사용 가능한 닉네임입니다.');
              break;
            case 1007:
              setNicknameValidMsg(data.message);
              setNicknameValid(true);
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
    [nickname],
  );

  // 메세지 변경 함수

  const HandleMessageChange = useCallback((e) => {
    setMessage(e.target.value);
    if (e.target.value.length < 6 && e.target.value) {
      setMessageValid(true);
    } else {
      setMessageValid(false);
    }
  }, []);

  const HandleMessageDelete = useCallback(() => {
    setMessage('');
    setMessageValid(false);
  }, []);

  const HandleFieldSet = useCallback((setSetting) => {
    setSetting(false);
  }, []);

  const HandleSaveProfile = useCallback(() => {
    setNicknameSetting(true);
    setNicknameFocus(false);

    setMessageSetting(true);
    setMessageFocus(false);
  }, []);

  useEffect(() => {
    if (!nicknameSetting) {
      setNickname(myData.data.nickName);
      setPreNickname(myData.data.nickName);
      setNicknameFocus(true);
    }

    if (!messageSetting) {
      setMessage(myData.data.message);
      setMessageFocus(true);
    }
  }, [messageSetting, nicknameSetting]);

  return (
    <InfoInputList>
      {myData && myData.data && (
        <>
          <InputTop>
            <MyProfile>
              <img src={myData.data.file} alt="" />
            </MyProfile>
            <InputHide type="file" id="ProfileSetting" />
            <Setting htmlFor="ProfileSetting">프로필 세팅하기</Setting>
            <InputWrap>
              <Textfield
                type="text"
                onChange={HandleNicknameChange}
                value={nickname}
                label={nicknameSetting ? `${myData.data.nickName}` : '닉네임'}
                validMessage={nicknameValidMsg}
                valid={nicknameValid}
                onDelete={HandleNicknameDelete}
                focus={nicknameFocus}
                disabled={nicknameSetting}
              />
              {nicknameSetting ? (
                <TxtFieldSetting onClick={() => HandleFieldSet(setNicknameSetting)} />
              ) : (
                <>
                  <InputDouble
                    active={nickname.length >= 2 && !doubleCheck}
                    onMouseDown={HandleCheckNickname}
                  >
                    중복확인
                  </InputDouble>
                  <InputChecked active={doubleCheck} />
                </>
              )}
            </InputWrap>
          </InputTop>
          <InputWrap>
            <Textfield
              type="text"
              onChange={HandleMessageChange}
              value={message}
              label={messageSetting ? `${myData.data.message}` : '자기소개'}
              validMessage={messageValidMsg}
              valid={messageValid}
              onDelete={HandleMessageDelete}
              focus={messageFocus}
              disabled={messageSetting}
            />
            {messageSetting && (
              <TxtFieldSetting onClick={() => HandleFieldSet(setMessageSetting)} />
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
  background-color: #8d2bf5;
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
