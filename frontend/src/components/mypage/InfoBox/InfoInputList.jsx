import React, { useCallback, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import styled from 'styled-components';
import useSWR from 'swr';
import SettingGray from '../../../assets/images/SettingGray.png';
import { emojiSlice, isCheckPassword, spaceSlice } from '../../../utils';
import fetcher from '../../../utils/fetcher';
import Textfield from '../../common/TextfieldEmail';
import TextfieldPW from '../../common/TextfieldPW';

function InfoInputList({ state }) {
  const cookies = new Cookies();
  const {
    data: myData,
    error: myError,
    mutate,
  } = useSWR(['/user/token', cookies.get('user-token')], fetcher);

  const [nameFocus, setNameFocus] = useState(false);

  const [passwordFocus, setPasswordFocus] = useState(false);

  // 이름 변경 함수
  const HandleNameChange = useCallback((e) => {
    const value = spaceSlice(emojiSlice(e.target.value)).slice(0, 10);
    state.setName(value);
    if (value.length <= 1) {
      state.setNameValid(true);
    } else {
      state.setNameValid(false);
    }
  }, []);

  const HandleNameDelete = useCallback(() => {
    state.setName('');
    state.setNameValid(true);
  }, []);

  // 비밀번호 변경 함수
  const PasswordValidCheck = useCallback((value) => {
    if (!isCheckPassword(value)) {
      state.setPasswordValid(true);
      state.setPasswordValidMsg('잘못된 비밀번호 형식입니다');
    } else {
      state.setPasswordValid(false);
      state.setPasswordValidMsg('숫자/영문/특수문자 포함 8~20글자');
    }
    if (value === '') {
      state.setPasswordValid(false);
      state.setPasswordValidMsg('숫자/영문/특수문자 포함 8~20글자');
    }
  }, []);

  const HandlePasswordChange = (e) => {
    const value = spaceSlice(emojiSlice(e.target.value));
    state.setPassword(value);
    PasswordValidCheck(value);
  };

  const HandlePasswordDelete = useCallback(() => {
    state.setPassword('');
    state.setPasswordValid(false);
  }, []);

  const HandlePWConfirmChange = (e) => {
    const value = spaceSlice(emojiSlice(e.target.value));
    state.setPwConfirm(value);
    if (value === state.password && isCheckPassword(state.password)) {
      state.setPwConfirmValid(false);
      state.setPwConfirmValidMsg('비밀번호가 일치합니다');
    } else {
      state.setPwConfirmValid(true);
      state.setPwConfirmValidMsg('비밀번호가 일치하지 않습니다');
    }
  };

  const HandlePWConfirmDelete = useCallback(() => {
    state.setPwConfirm('');
    state.setPwConfirmValid(false);
  }, []);

  // 텍스트 필드 변경 함수
  const HandleFieldSet = useCallback((setSetting) => {
    setSetting(false);
  }, []);

  useEffect(() => {
    if (!state.nameSetting) {
      state.setName(myData.data.name);
      setNameFocus(true);
    }

    if (!state.passwordSetting) {
      setPasswordFocus(true);
    }
  }, [state.nameSetting, state.passwordSetting]);

  return (
    <Container>
      {myData && myData.data && (
        <>
          <InputWrap>
            <Textfield
              type="text"
              onChange={HandleNameChange}
              value={state.name}
              label={state.nameSetting ? `${myData.data.name}` : '이름'}
              validMessage={state.nameValidMsg}
              valid={state.nameValid}
              focus={nameFocus}
              disabled={state.nameSetting}
              onDelete={HandleNameDelete}
            />
            {state.nameSetting && (
              <TxtFieldSetting onClick={() => HandleFieldSet(state.setNameSetting)} />
            )}
          </InputWrap>
          <InputWrap>
            <Textfield
              type="email"
              label={myData.data.email}
              validMessage=""
              valid={false}
              disabled
            />
          </InputWrap>
          <InputWrap>
            <TextfieldPW
              onChange={HandlePasswordChange}
              value={state.password}
              label="새 비밀번호"
              validMessage={state.passwordValidMsg}
              valid={state.passwordValid}
              focus={passwordFocus}
              disabled={state.passwordSetting}
              onDelete={HandlePasswordDelete}
            />
            {state.passwordSetting && (
              <TxtFieldSetting onClick={() => HandleFieldSet(state.setPasswordSetting)} />
            )}
          </InputWrap>
          <InputWrap>
            <TextfieldPW
              label="비밀번호 확인"
              onChange={HandlePWConfirmChange}
              value={state.pwConfirm}
              validMessage={state.pwConfirmValidMsg}
              valid={state.pwConfirmValid}
              onDelete={HandlePWConfirmDelete}
              disabled={state.passwordSetting}
            />
          </InputWrap>
        </>
      )}
    </Container>
  );
}

export default InfoInputList;

const Container = styled('div')``;

const InputWrap = styled('div')`
  width: 100%;
  height: 50px;
  position: relative;
  box-sizing: content-box;
  margin-bottom: 25px;
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
