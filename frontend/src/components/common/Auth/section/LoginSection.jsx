/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useCallback, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { debounce } from 'lodash';
import axios from 'axios';
import { Cookies, useCookies } from 'react-cookie';
import { toast } from 'react-toastify';
import useSWR from 'swr';
import CheckOff from '@/assets/images/LogInCheck_off.png';
import CheckOn from '@/assets/images/LogInCheck_on.png';
import Naver from '@/assets/images/Naver.png';
import Kakao from '@/assets/images/Kakao.png';

import Button from '../../Button';
import Textfield from '../../TextfieldEmail';
import TextfieldPW from '../../TextfieldPW';
import { emojiSlice, isCheckPassword, isEmail, spaceSlice } from '@/utils';
import fetcher from '@/utils/fetcher';

function LoginSection({ IsClick, HandleClick, closeModal }) {
  const [IsChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [emailMsg, setEmailMsg] = useState('가입된 이메일 주소를 입력해주세요');

  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState('숫자/영문/특수문자 포함 8~20글자');
  const [BtnLoading, setBtnLoading] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(['user-cookie']);
  const myCookies = new Cookies();

  const {
    data: myData,
    error: myError,
    mutate,
  } = useSWR(['/user/token', myCookies.get('user-token')], fetcher);

  const EmailValidCheck = useCallback((value) => {
    if (!isEmail(value)) {
      setEmailValid(true);
      setEmailMsg('잘못된 이메일 형식입니다');
    } else {
      setEmailValid(false);
      setEmailMsg('가입된 이메일 주소를 입력해주세요');
    }
    if (value === '') {
      setEmailValid(false);
      setEmailMsg('가입된 이메일 주소를 입력해주세요');
    }
  }, []);

  const debounceEmail = debounce((value) => {
    EmailValidCheck(value);
  }, 400);

  const PasswordValidCheck = useCallback((value) => {
    if (!isCheckPassword(value)) {
      setPasswordValid(true);
      setPasswordMsg('잘못된 비밀번호 형식입니다');
    } else {
      setPasswordValid(false);
      setPasswordMsg('숫자/영문/특수문자 포함 8~20글자');
    }
    if (value === '') {
      setPasswordValid(false);
      setPasswordMsg('숫자/영문/특수문자 포함 8~20글자');
    }
  }, []);

  const debouncePwd = debounce((value) => {
    PasswordValidCheck(value);
  }, 400);

  const MovePasswordFind = useCallback(() => {
    HandleClick(5);
  }, []);

  const HandleCheck = useCallback((e) => {
    setIsChecked(e.target.checked);
  }, []);

  const HandleEmailChange = (e) => {
    let value = emojiSlice(e.target.value);
    value = spaceSlice(value);
    setEmail(value);
    debounceEmail(value);
  };

  const HandleEmailDelete = useCallback(() => {
    setEmail('');
    setEmailValid(false);
    setEmailMsg('가입된 이메일 주소를 입력해주세요');
  }, []);

  const HandlePasswordChange = (e) => {
    let value = emojiSlice(e.target.value);
    value = spaceSlice(value);
    setPassword(value);
    debouncePwd(value);
  };

  const HandlePasswordDelete = useCallback(() => {
    setPassword('');
    setPasswordValid(false);
    setPasswordMsg('숫자/영문/특수문자 포함 8~20글자');
  }, []);

  const HandleSubmitLogin = useCallback(
    (e) => {
      e.preventDefault();
      async function axiosPost() {
        try {
          setBtnLoading(true);
          const context = {
            email,
            password,
            maintain: IsChecked,
          };

          const { data } = await axios.post('/auth/login', context, {
            withCredentials: true,
          });
          const now = new Date();
          const afterh = new Date();

          switch (data.status) {
            case 200:
              if (IsChecked) {
                afterh.setHours(now.getHours() + 3);
                setCookie('user-token', data.data.accessToken, {
                  path: '/',
                  expires: afterh,
                });
              } else {
                afterh.setHours(now.getHours() + 72);
                setCookie('user-token', data.data.accessToken, {
                  path: '/',
                  expires: afterh,
                });
              }
              mutate('/user/token');
              closeModal();
              break;
            case 400:
            case 1101:
              setEmailMsg(data.message);
              setEmailValid(true);
              break;
            case 1102:
              setPasswordMsg(data.message);
              setPasswordValid(true);
              break;
            default:
              break;
          }
        } catch (error) {
          toast.error('알 수 없는 오류가 발생했습니다. 새로고침 후 다시 시도해주시길 바랍니다');

          console.dir(error);
        } finally {
          setBtnLoading(false);
        }
      }
      axiosPost();
    },
    [email, password, IsChecked],
  );

  return (
    <LoginContents active={IsClick === 0}>
      <form onSubmit={HandleSubmitLogin}>
        <LogInputList>
          <LogInputLi>
            <Textfield
              type="text"
              onChange={HandleEmailChange}
              value={email}
              label="이메일"
              validMessage={emailMsg}
              valid={emailValid}
              onDelete={HandleEmailDelete}
            />
          </LogInputLi>
          <LogInputLi>
            <TextfieldPW
              onChange={HandlePasswordChange}
              value={password}
              label="비밀번호"
              validMessage={passwordMsg}
              valid={passwordValid}
              onDelete={HandlePasswordDelete}
            />
          </LogInputLi>
        </LogInputList>
        <Button size="fullregular" color="darkblue" loadings={BtnLoading} type="submit">
          로그인
        </Button>

        <SubList>
          <li>
            <InputHide type="checkbox" id="LogInCheck" checked={IsChecked} onChange={HandleCheck} />

            <LabelCheck htmlFor="LogInCheck" className="LabelCheck">
              <CheckBox active={IsChecked} />
              로그인상태유지
            </LabelCheck>
          </li>
          <li>
            <p onClick={MovePasswordFind}>비밀번호 찾기</p>
          </li>
        </SubList>
      </form>
      <DividingLine>또는 간편하게</DividingLine>
      <SnsList>
        <li>
          <ButtonNaver>
            <NaverImg src={Naver} />
            네이버 로그인
          </ButtonNaver>
        </li>
        <li>
          <ButtonKakao>
            <KakaoImg src={Kakao} />
            카카오 로그인
          </ButtonKakao>
        </li>
      </SnsList>
    </LoginContents>
  );
}

export default LoginSection;

const FadeIn = keyframes`
    from{
        opacity:0;
    } to {
        opacity:1;
    }
`;

const FadeOut = keyframes`
    from{
        opacity:1;
    } to {
        opacity:0;
    }
`;

const LoginContents = styled.div`
  transition: 0.5s;
  display: none;

  animation-duration: 0.5s;
  animation-timing-function: ease-out;

  animation-fill-mode: forwards;

  ${(props) =>
    props.active &&
    css`
      opacity: 1;
      display: block;
      animation-name: ${FadeIn};
    `}
`;

const LogInputList = styled.ul`
  padding: 25px 0 20px;
  @media screen and (max-width: 820px) {
    overflow-y: auto;
    overflow-x: hidden;
  }
`;

const SubList = styled.ul`
  margin: 30px 0 58px;

  display: flex;
  & > li {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 300;
    color: #868686;
    user-select: none;
    white-space: nowrap;
  }

  & > li > p {
    cursor: pointer;
  }
`;

const InputHide = styled.input`
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  position: absolute;
`;

const LabelCheck = styled.label`
  display: flex;
  line-height: 21px;
  cursor: pointer;
  user-select: none;
`;

const CheckBox = styled.span`
  display: block;
  width: 20px;
  height: 20px;
  margin-right: 10px;
  background: url(${CheckOff});
  background-size: 100%;
  transition: background 0.2s;

  ${(props) =>
    props.active &&
    css`
      background: url(${CheckOn});
      background-size: 100%;
    `}
`;

const LogInputLi = styled.li`
  position: relative;
  height: 75px;
`;

const DividingLine = styled.div`
  margin: 58px auto 30px;
  font-size: 13px;
  color: #000;
  font-weight: 300;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  white-space: nowrap;
  user-select: none;

  ::after,
  ::before {
    content: '';
    display: block;
    height: 1px;
    width: 100%;
    background-color: #e2e2e2;
  }
  ::before {
    margin-right: 11px;
  }
  ::after {
    margin-left: 11px;
  }
`;

const SnsList = styled.ul`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding-bottom: 80px;
  gap: 16px;
  user-select: none;

  & > li {
    width: 100%;
  }
  @media screen and (max-width: 820px) {
    gap: 10px;
  }
`;

const ButtonNaver = styled.button`
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  transition: 0.3s;
  padding-top: 11px;
  padding-bottom: 11px;
  font-size: 13px;
  font-weight: 300;
  border-radius: 6px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: -0.05em;
  height: 40px;
  :hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }
  background-color: #03c75a;
  color: #fff;
`;
const ButtonKakao = styled.button`
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  transition: 0.3s;
  padding-top: 11px;
  padding-bottom: 11px;
  font-size: 13px;
  font-weight: 300;
  border-radius: 6px;
  line-height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: -0.05em;
  height: 40px;
  :hover {
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }
  background-color: #fee500;
  font-weight: 400;
`;

const NaverImg = styled.img`
  width: 10px;
  margin-right: 6px;
`;
const KakaoImg = styled.img`
  width: 13px;
  margin-right: 4px;
  margin-top: 2px;
`;
