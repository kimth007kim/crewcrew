import React from 'react';
import styled from 'styled-components';
import SettingGray from '../../../assets/images/SettingGray.png';
import Textfield from '../../common/TextfieldEmail';
import TextfieldPW from '../../common/TextfieldPW';

function InfoInputList() {
  return (
    <Container>
      <InputWrap>
        <Textfield type="text" label="닉네임" validMessage="" valid={false} />
        <TxtFieldSetting />
      </InputWrap>
      <InputWrap>
        <Textfield type="text" label="이메일" validMessage="" valid={false} />
        <TxtFieldSetting />
      </InputWrap>
      <InputWrap>
        <TextfieldPW type="text" label="새 비밀번호" validMessage="" valid={false} />
      </InputWrap>
      <InputWrap>
        <TextfieldPW type="text" label="비밀번호 확인" validMessage="" valid={false} />
      </InputWrap>
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
