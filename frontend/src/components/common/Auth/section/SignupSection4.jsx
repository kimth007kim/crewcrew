import React, { useCallback } from 'react';
import { Cookies } from 'react-cookie';
import { useRecoilValue } from 'recoil';
import styled, { css, keyframes } from 'styled-components';
import useSWR from 'swr';
import IconFlag from '@/assets/images/IconFlag.png';
import Profile1 from '@/assets/images/Profile1.png';
import { nickNameState } from '@/atoms/register';
import fetcher from '@/utils/fetcher';
import Button from '../../Button';

function SignupSection4({ IsClick, closeModal, HandleClick }) {
  const cookies = new Cookies();
  const { data: myData } = useSWR(['/auth/token', cookies.get('X-AUTH-TOKEN')], fetcher);

  const nickName = useRecoilValue(nickNameState);

  const HandleComplete = useCallback((e) => {
    e.preventDefault();
    setTimeout(() => {
      HandleClick(0);
    }, 200);
    closeModal();
  }, []);

  return (
    <SignupContents active={IsClick === 4}>
      <ResultFlag src={IconFlag} alt="IconFlag" />
      <ResultProfileWrapper>
        <ResultProfile>
          {myData && myData.data ? (
            <img src={myData.data.file} alt="" />
          ) : (
            <img src={Profile1} alt="" />
          )}
        </ResultProfile>
        <ResultTitle>
          <b>
            <span>{nickName}</span>
            {'님, '}
          </b>
          환영해요!
        </ResultTitle>
        <ResultTxt>
          {' 회원가입을 성공적으로 마쳤어요.'}
          <br />
          {' 크루크루와 함께 힘차게 출발해봐요~!'}
        </ResultTxt>
      </ResultProfileWrapper>
      <ButtonWrap>
        <Button size="fullregular" color="darkblue" onClick={HandleComplete}>
          확인
        </Button>
      </ButtonWrap>
    </SignupContents>
  );
}

export default SignupSection4;

const FadeIn = keyframes`
    from{
        opacity:0;
    } to {
        opacity:1;
    }
`;

const Flag = keyframes`
    0%{
        top: 27px;
    } 100% {
        top: -33px;
    }
`;
const SignupContents = styled.div`
  transition: 0.5s;
  position: relative;
  display: none;

  animation-duration: 0.5s;
  animation-timing-function: ease-out;

  animation-fill-mode: forwards;
  box-sizing: content-box;

  ${(props) =>
    props.active &&
    css`
      display: block;
      animation-name: ${FadeIn};
    `}
`;

const ResultProfileWrapper = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  scroll-behavior: smooth;
  @media screen and (max-width: 820px) {
    height: calc(var(--vh, 1vh) * 100)-338px;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const ResultFlag = styled.img`
  width: 27px;
  position: absolute;
  top: 27px;
  left: calc(50% - 2px);
  animation: ${Flag} 1s forwards;
`;

const ResultProfile = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #00b7ff;
  z-index: 1;
  margin: 0 auto;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media screen and (max-width: 820px) {
    width: 150px;
    height: 150px;
    position: relative;
  }
`;

const ResultTitle = styled.h2`
  font-size: 32px;
  text-align: center;
  margin: 22px 0 29px;
  font-weight: 300;
  color: #000;

  b {
    font-weight: 700;
  }
  @media screen and (max-width: 820px) {
    margin: 29px 0 30px;
    font-size: 20px;
    line-height: 28px;
    letter-spacing: 0.05em;
    word-break: keep-all;
  }
`;

const ResultTxt = styled.p`
  font-size: 13px;
  text-align: center;
  margin-bottom: 60px;
  font-weight: 400;
  line-height: 24px;
  color: #000;
  @media screen and (max-width: 820px) {
    margin-bottom: 0;
  }
`;

const ButtonWrap = styled.div`
  @media screen and (max-width: 820px) {
    margin-top: 20px;
  }
`;
