import React, { useCallback, useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import axios from 'axios';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';
import Naver from '@/assets/images/Naver.png';
import Kakao from '@/assets/images/Kakao.png';
import CheckImg from '@/assets/images/Checked_on.png';
import { emojiSlice, isCheckPassword, isEmail, spaceSlice } from '@/utils';
import Button from '../../Button';
import Textfield from '../../TextfieldEmail';
import TextfieldPW from '../../TextfieldPW';

function PasswordSection({ HandleClick, IsClick }) {
  const [email, setEmail] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [emailValidMsg, setEmailValidMsg] = useState('가입된 이메일 주소를 입력해주세요');

  const [code, setCode] = useState('');
  const [codeValid, setCodeValid] = useState(false);
  const [codeValidMsg, setCodeValidMsg] = useState('코드 전송 후, 입력창에 코드를 입력해주세요');

  const [SendCode, setSendCode] = useState(false);
  const [CodeActive, setCodeActive] = useState(false);
  const [CodeComplete, setCodeComplete] = useState(false);

  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordValidMsg, setPasswordValidMsg] = useState('숫자/영문/특수문자 포함 8~20글자');

  const [pwConfirm, setPwConfirm] = useState('');
  const [pwConfirmValid, setPwConfirmValid] = useState(false);
  const [pwConfirmValidMsg, setPwConfirmValidMsg] = useState('');

  const [PWSetup, setPWSetup] = useState(false);

  const [btnLoading, setBtnLoading] = useState(false);

  const [Valid, setValid] = useState(false);
  const [ValidMsg, setValidMsg] = useState(
    '코드를 가입된 이메일로 전송하였습니다. 이메일을 확인하시기 바랍니다',
  );

  // 이메일

  const EmailValidCheck = useCallback((value) => {
    if (!isEmail(value)) {
      setEmailValid(true);
      setCodeActive(false);
      setEmailValidMsg('잘못된 이메일 형식입니다');
    } else {
      setEmailValid(false);
      setCodeActive(true);
      setEmailValidMsg('가입된 이메일 주소를 입력해주세요');
    }
    if (value === '') {
      setEmailValid(false);
      setEmailValidMsg('가입된 이메일 주소를 입력해주세요');
    }
  }, []);

  const debounceEmail = debounce((value) => {
    EmailValidCheck(value);
  }, 700);

  const HandleEmailChange = useCallback((e) => {
    let value = emojiSlice(e.target.value);
    value = spaceSlice(value);
    setEmail(value);
    debounceEmail(value);
  }, []);

  const HandleEmailDelete = useCallback(() => {
    setEmail('');
    setEmailValid(false);
  }, []);

  // 코드

  const CodeButtonTextRender = useCallback(() => {
    if (SendCode) {
      return '코드 재전송';
    }
    return '코드 전송';
  }, [SendCode]);

  const HandleCodeChange = useCallback(
    (e) => {
      let value = emojiSlice(e.target.value);
      value = spaceSlice(value);
      value = value.slice(0, 8);
      if (!SendCode) {
        value = value.slice(0, 0);
      }
      setCode(value);

      async function axiosPost() {
        try {
          const context = {
            email,
            code: value,
          };

          const { data } = await axios.post('/auth/user/password/find/check', context);

          switch (data.status) {
            case 200:
              setCodeComplete(true);
              setCodeValidMsg(data.message);
              setCodeValid(false);
              break;
            case 1003:
              setCodeValidMsg(data.message);
              setCodeValid(true);
              break;
            case 1101:
              setCodeValidMsg(data.message);
              setCodeValid(true);
              break;
            default:
              break;
          }
        } catch (error) {
          toast.error('알 수 없는 오류가 발생했습니다. 새로고침 후 다시 시도해주시길 바랍니다');

          console.dir(error);
        }
      }
      if (SendCode) {
        axiosPost();
      }
    },
    [email, SendCode, code],
  );

  const HandleCodeDelete = useCallback(() => {
    setCode('');
  }, []);

  // 패스워드

  const PasswordValidCheck = useCallback((value) => {
    if (!isCheckPassword(value)) {
      setPasswordValid(true);
      setPasswordValidMsg('잘못된 비밀번호 형식입니다');
    } else {
      setPasswordValid(false);
      setPasswordValidMsg('숫자/영문/특수문자 포함 8~20글자');
    }
    if (value === '') {
      setPasswordValid(false);
      setPasswordValidMsg('숫자/영문/특수문자 포함 8~20글자');
    }
  }, []);

  const debouncePwd = debounce((value) => {
    PasswordValidCheck(value);
  }, 700);

  const HandlePasswordChange = (e) => {
    let value = emojiSlice(e.target.value);
    value = spaceSlice(value);
    setPassword(value);
    debouncePwd(value);
  };

  const HandlePasswordDelete = useCallback(() => {
    setPassword('');
    setPasswordValid(false);
  }, []);

  const HandlePWConfirmChange = (e) => {
    let value = emojiSlice(e.target.value);
    value = spaceSlice(value);
    setPwConfirm(value);
    if (value === password && isCheckPassword(password)) {
      setPWSetup(true);
      setPwConfirmValid(false);
      setPwConfirmValidMsg('비밀번호가 일치합니다');
    } else {
      setPwConfirmValid(true);
      setPWSetup(false);
      setPwConfirmValidMsg('비밀번호가 일치하지 않습니다');
    }
  };

  const HandlePWConfirmDelete = useCallback(() => {
    setPwConfirm('');
    setPwConfirmValid(false);
  }, []);

  const HandleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      async function axiosPostPWChange() {
        try {
          setBtnLoading(true);

          const context = {
            change_password: password,
            code,
            email,
          };

          const { data } = await axios.post('/auth/user/password/find/confirm', context);

          switch (data.status) {
            case 200:
              toast.success('성공적으로 비밀번호가 변경되었습니다.');
              HandleClick(0);
              break;
            case 1003:
              break;
            default:
              toast.error('잘못된 정보를 입력하셨습니다. 다시 한번 시도해주세요.');
              break;
          }
        } catch (error) {
          toast.error('알 수 없는 오류가 발생했습니다. 새로고침 후 다시 시도해주시길 바랍니다');

          console.dir(error);
        } finally {
          setBtnLoading(false);
        }
      }
      async function axiosPostCode() {
        try {
          setBtnLoading(true);
          const context = {
            email,
          };
          const { data } = await axios.post('/auth/user/password/find', context);

          switch (data.status) {
            case 200:
              setValid(false);
              setSendCode(true);
              setValidMsg('코드를 가입된 이메일로 전송하였습니다. 이메일을 확인하시기 바랍니다');
              break;
            case 1101:
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
      if (CodeComplete) {
        axiosPostPWChange();
      } else {
        axiosPostCode();
      }
    },
    [CodeComplete, email, password],
  );

  useEffect(() => {
    if (IsClick === 0) {
      setCode('');
      setEmail('');
      setEmailValid(false);
      setPassword('');
      setPwConfirm('');
      setSendCode(false);
      setCodeActive(false);
      setCodeComplete(false);
      setCodeValidMsg('코드 전송 후, 입력창에 코드를 입력해주세요');
      setPwConfirmValidMsg('');
      setPWSetup(false);
      setValidMsg('코드를 가입된 이메일로 전송하였습니다. 이메일을 확인하시기 바랍니다');
    }
  }, [IsClick]);

  return (
    <PWFindContents active={IsClick === 5}>
      <form onSubmit={HandleSubmit}>
        <InputList>
          <InputLi>
            <Textfield
              type="email"
              onChange={HandleEmailChange}
              value={email}
              label="이메일"
              validMessage={emailValidMsg}
              valid={emailValid}
              onDelete={HandleEmailDelete}
              disabled={CodeComplete}
            />
            <InputChecked active={CodeComplete} />
          </InputLi>
          <InputLi>
            <Textfield
              type="text"
              onChange={HandleCodeChange}
              value={code}
              label="코드입력"
              validMessage={codeValidMsg}
              valid={codeValid}
              onDelete={HandleCodeDelete}
              disabled={CodeComplete}
            />
            <InputChecked active={CodeComplete} />
          </InputLi>
          {CodeComplete && (
            <>
              <InputLi>
                <TextfieldPW
                  type="text"
                  onChange={HandlePasswordChange}
                  value={password}
                  label="새 비밀번호"
                  validMessage={passwordValidMsg}
                  valid={passwordValid}
                  onDelete={HandlePasswordDelete}
                />
              </InputLi>
              <InputLi>
                <TextfieldPW
                  type="text"
                  onChange={HandlePWConfirmChange}
                  value={pwConfirm}
                  label="비밀번호 확인"
                  validMessage={pwConfirmValidMsg}
                  valid={pwConfirmValid}
                  onDelete={HandlePWConfirmDelete}
                />
              </InputLi>
            </>
          )}
        </InputList>
        <div
          style={{
            position: 'relative',
          }}
        >
          {CodeComplete ? (
            <Button
              size="fullregular"
              color="darkblue"
              loadings={btnLoading}
              disabled={!PWSetup || btnLoading}
              type="submit"
            >
              비밀번호 재설정
            </Button>
          ) : (
            <Button
              size="fullregular"
              color="darkblue"
              loadings={btnLoading}
              disabled={!CodeActive || btnLoading}
              type="submit"
            >
              {CodeButtonTextRender()}
            </Button>
          )}
          <CodeValidMsg active={!CodeComplete && (SendCode || Valid)} Valid={Valid}>
            {ValidMsg}
          </CodeValidMsg>
        </div>
      </form>
      {!CodeComplete && (
        <>
          <DividingLine>혹시 회원이 아니신가요?</DividingLine>
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
          <ButtonWrap>
            <Button size="fullsmall" color="darkblue" onClick={() => HandleClick(1)}>
              이메일로 회원가입하기
            </Button>
          </ButtonWrap>
        </>
      )}
    </PWFindContents>
  );
}

export default PasswordSection;

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

const PWFindContents = styled.div`
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

const InputList = styled.ul`
  margin: 35px 0 20px;
`;

const InputLi = styled.li`
  position: relative;
  height: 75px;
`;

const DividingLine = styled.div`
  margin: 58px auto 30px;
  font-size: 13px;
  color: #000;
  font-weight: 300;
  display: flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
`;

const CodeValidMsg = styled.div`
  font-size: 10px;
  text-align: center;
  font-weight: 300;
  position: absolute;
  width: 100%;
  top: 50px;
  opacity: 0;
  transition: 0.5s;
  user-select: none;

  ${(props) =>
    props.active &&
    css`
      opacity: 1;
      top: 66px;
      color: #00b7ff;
    `};

  ${(props) =>
    props.Valid &&
    css`
      opacity: 1;
      top: 66px;
      color: #ff0045;
    `};
`;

const SnsList = styled.ul`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  padding-bottom: 15px;
  gap: 16px;

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

const ButtonWrap = styled.div`
  margin-bottom: 74px;
`;

const InputChecked = styled.div`
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: absolute;
  display: none;
  top: 15px;
  right: 15px;
  background: url(${CheckImg});
  background-size: 100%;
  cursor: default;
  ${(props) =>
    props.active &&
    css`
      display: flex;
    `}
`;
