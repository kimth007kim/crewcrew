import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import Textfield from '../../components/common/TextfieldEmail';
import AuthModal from './AuthModal';

function Testing() {
  const [Dialog, setDialog] = useState(false);

  const openModal = useCallback(() => {
    setDialog(true);
  }, []);

  const closeModal = useCallback(() => {
    setDialog(false);
  }, []);

  const handleClick = useCallback(() => {
    openModal();
  }, []);

  const [state, setstate] = useState('');
  const [Valid, setValid] = useState(true);

  const HandleChange = (e) => {
    setstate(e.target.value);
    setValid(false);
  };

  const HandleDelete = useCallback(() => {
    setstate('');
  }, []);

  return (
    <div>
      <button type="button" onClick={handleClick}>
        로그인
      </button>
      <AuthModal closeModal={closeModal} visible={Dialog} />
      <Cont>
        <Textfield
          type="email"
          onChange={HandleChange}
          value={state}
          label="이메일"
          validMessage="가입된 이메일 주소를 입력해주세요"
          valid={false}
          onDelete={HandleDelete}
        />
      </Cont>
    </div>
  );
}

export default Testing;

const Cont = styled.div`
  margin: 20px;
  width: 260px;
`;
