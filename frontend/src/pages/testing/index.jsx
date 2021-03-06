import axios from 'axios';
import React, { useCallback, useRef, useState } from 'react';
import styled from 'styled-components';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/common/Button';
import Textfield from '../../components/common/TextfieldEmail';
import ParticipateModal from '@/components/post/modal/Participate';
import useModal from '@/hooks/useModal';

function Testing() {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [state, setstate] = useState('');
  const [Valid, setValid] = useState(true);
  const [postVisible, openPost, closePost] = useModal();

  const HandleChange = (e) => {
    setstate(e.target.value);
    setValid(false);
  };

  const HandleDelete = useCallback(() => {
    setstate('');
  }, []);

  const handleTestCookie = useCallback(async () => {
    try {
      const { data } = await axios.post(
        '/auth/cookie/test',
        {},
        {
          withCredentials: true,
        },
      );

      switch (data.status) {
        case 200:
          break;
        case 9999:
          break;

        default:
          break;
      }
    } catch (error) {
      console.dir(error);
    }
  }, []);

  return (
    <div>
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
      <Button onClick={openPost}>모달테스트</Button>
      <ParticipateModal closeModal={closePost} visible={postVisible}></ParticipateModal>
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
