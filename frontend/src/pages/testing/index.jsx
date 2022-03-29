import axios from 'axios';
import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Textfield from '../../components/common/TextfieldEmail';
import AuthModal from './AuthModal';

function Testing() {
  const [Dialog, setDialog] = useState(false);
  const cookies = new Cookies();
  const navigate = useNavigate();

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

  const handleTestCookie = useCallback(async () => {
    try {
      const { data } = await axios.get('/users', {
        headers: {
          'X-AUTH-TOKEN': `${cookies.get('user-token')}`,
        },
      });

      switch (data.status) {
        case 200:
          break;
        case 9999:
          cookies.remove('user-token');
          navigate('../');
          break;

        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <button type="button" onClick={handleClick}>
        로그인
      </button>
      <AuthModal closeModal={closeModal} visible={Dialog} size="large" />
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
      <TextSpan>이게 왜 색깔이 안되지 글꼴 깨짐현상 발생 ㅏㅇ아아</TextSpan>
      <span
        style={{
          color: '#00b7ff',
          fontSize: '14px',
          fontWeight: '300',
          fontFamily: "'Spoqa Han Sans Neo', 'sans-serif",
        }}
      >
        이게 왜 색깔이 안되지 글꼴 깨짐현상 발생 ㅏㅇ아아
      </span>
      <Button onClick={handleTestCookie}>쿠키테스트</Button>
    </div>
  );
}

export default Testing;

const Cont = styled.div`
  margin: 20px;
  width: 260px;
  color: #868686;
`;

const TextSpan = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #00b7ff;
`;
