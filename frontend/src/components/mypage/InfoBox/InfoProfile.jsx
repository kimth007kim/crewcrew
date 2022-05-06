import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import SettingGray from '../../../assets/images/SettingGray.png';
import Textfield from '../../common/TextfieldEmail';

function InfoProfile() {
  const [nickname, setNickname] = useState('');
  const [nicknameValid, setNicknameValid] = useState(false);
  const [nicknameValidMsg, setNicknameValidMsg] = useState('');
  const [nicknameFocus, setNicknameFocus] = useState(false);

  const [message, setMessage] = useState('');
  const [messageValid, setMessageValid] = useState(false);
  const [messageValidMsg, setMessageValidMsg] = useState('');
  const [messageFocus, setMessageFocus] = useState(false);

  const HandleNicknameChange = useCallback(() => {}, []);

  const HandleNicknameDelete = useCallback(() => {
    setNickname('');
    setNicknameValid(false);
  }, []);

  const HandleMessageChange = useCallback(() => {}, []);

  const HandleMessageDelete = useCallback(() => {
    setMessage('');
    setMessageValid(false);
  }, []);

  return (
    <InfoInputList>
      <InputTop>
        <MyProfile>
          <img src="" alt="" />
        </MyProfile>
        <InputHide type="file" id="ProfileSetting" />
        <Setting htmlFor="ProfileSetting">프로필 세팅하기</Setting>
        <InputWrap>
          <Textfield
            type="text"
            onChange={HandleNicknameChange}
            value={nickname}
            label="닉네임"
            validMessage={nicknameValidMsg}
            valid={nicknameValid}
            onDelete={HandleNicknameDelete}
            setFocus={setNicknameFocus}
          />
          <TxtFieldSetting />
        </InputWrap>
      </InputTop>
      <InputWrap>
        <Textfield
          type="text"
          onChange={HandleMessageChange}
          value={message}
          label="자기소개"
          validMessage={messageValidMsg}
          valid={messageValid}
          onDelete={HandleMessageDelete}
          setFocus={setMessageFocus}
        />
        <TxtFieldSetting />
      </InputWrap>
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
