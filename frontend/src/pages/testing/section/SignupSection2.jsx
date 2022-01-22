import React, { useCallback, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import Textfield from '../../../components/common/TextfieldEmail';
import CameraImg from '../../../assets/images/Camera.png';
import Button from '../../../components/common/Button';

function SignupSection2({ IsClick, HandleClick }) {
  const [nickname, setNickname] = useState('');
  const [nicknameValid, setNicknameValid] = useState(false);

  const HandleNicknameChange = useCallback((e) => {
    setNickname(e.target.value);
  }, []);

  const HandleNicknameDelete = useCallback(() => {
    setNickname('');
    setNicknameValid(false);
  }, []);

  return (
    <SignupContents active={IsClick === 2}>
      <InputList>
        <InputLi>
          <Textfield
            type="text"
            onChange={HandleNicknameChange}
            value={nickname}
            label="닉네임"
            validMessage="앞으로 사용할 닉네임을 알려주세요. (10자 이내)"
            valid={nicknameValid}
            onDelete={HandleNicknameDelete}
          />
        </InputLi>
        <ProfileSection>
          <ProfileBox>
            <ProfileShow>
              <ProfileTitle />
              <ProfileChange />
              <ProfileImg />
              <ProfileBg />
            </ProfileShow>
            <ProfileSelect>
              <SelectWrapper>
                <li>
                  <InputHide />
                  <InputHide />
                  <InputLabel>
                    <span />
                    <p>내 사진</p>
                  </InputLabel>
                </li>
                <li>
                  <ProfileList>
                    <li />
                    <li />
                    <li />
                    <li />
                    <li />
                  </ProfileList>
                </li>
              </SelectWrapper>
            </ProfileSelect>
          </ProfileBox>
        </ProfileSection>
      </InputList>
      <ButtonWrap>
        <Button size="fullregular" color="darkblue">
          거의 다 왔어요!
        </Button>
      </ButtonWrap>
      <SignStep>
        <li>
          <StepSlide>
            <StepBar1 />
          </StepSlide>
        </li>

        <li>
          <StepSlide>
            <StepBar2 />
          </StepSlide>
        </li>

        <li>
          <StepSlide>
            <StepBar3 />
          </StepSlide>
        </li>
      </SignStep>
    </SignupContents>
  );
}

export default SignupSection2;

const FadeIn = keyframes`
    from{
        opacity:0;
    } to {
        opacity:1;
    }
`;

const SignupContents = styled.div`
  transition: 0.5s;
  display: none;

  animation-duration: 0.5s;
  animation-timing-function: ease-out;

  animation-fill-mode: forwards;

  ${(props) =>
    props.active &&
    css`
      display: block;
      animation-name: ${FadeIn};
    `}
`;

const InputList = styled.ul`
  padding: 35px 0 20px;
  overflow-y: auto;
  overflow-x: hidden;
  height: 310px;
  box-sizing: content-box;
`;

const InputLi = styled.li`
  position: relative;
  height: 75px;
`;

const ProfileSection = styled.li`
  position: relative;
  height: 230px;
`;

const ProfileBox = styled.div`
  width: 100%;
  border: 1px solid #e2e2e2;
  border-radius: 10px;
  overflow: hidden;
`;

const ProfileShow = styled.div`
  height: 160px;
  background-color: #e2e2e2;

  display: flex;
  justify-content: center;
  position: relative;
  overflow: hidden;

  transition: 0.5s;
`;

const ProfileTitle = styled.p`
  position: absolute;
  top: 12px;
  left: 12px;
  font-size: 13px;
  color: #fff;
  z-index: 1;
  opacity: 0;
  -webkit-transition: 0.3s;
  transition: 0.3s;
`;

const ProfileChange = styled.label`
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
  top: 10px;
  right: 10px;
  cursor: pointer;
  z-index: 1;
`;

const ProfileImg = styled.div`
  width: 160px;
  height: 160px;
`;

const ProfileBg = styled.div`
  width: 148px;
  height: 148px;
  top: calc(50% - (148px / 2));
  left: calc(50% - (148px / 2));
  position: absolute;
  border-radius: 50%;
  background: transparent;
  -webkit-box-shadow: 0 0 0 300px #000;
  box-shadow: 0 0 0 300px #000;
  opacity: 0.3;
`;

const ProfileSelect = styled.div``;
const SelectWrapper = styled.div`
  display: flex;
  height: 70px;

  & > li {
    height: 100%;
  }

  & > li:first-child {
    width: 88px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & > li:last-child {
    display: flex;
    overflow: hidden;
    width: 100%;
  }

  & > li:last-child::before {
    content: '';
    display: block;
    width: 1px;
    height: 50px;
    background-color: #e2e2e2;
    margin-top: 10px;
  }
`;

const ProfileList = styled.ul`
  width: 100%;
  height: 100%;
  overflow-x: auto;
  display: flex;
  position: relative;

  & > li {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const InputHide = styled.input`
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  position: absolute;
`;

const InputLabel = styled.label`
  width: 50px;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 3px;
  background-color: #fff;
  transition: 0.3s;
  & > span {
    display: block;
    width: 23px;
    height: 16px;
    background: url(${CameraImg}) 50% 50%;
    background-size: 100%;
    transition: 0.3s;
  }

  & > p {
    font-size: 13px;
    font-weight: 300;
    color: #000;
    margin-top: 5px;
    transition: 0.3s;
  }
`;

const ButtonWrap = styled.div`
  margin: 30px 0 10px;
`;

const SignStep = styled.ul`
  display: flex;
  margin-bottom: 80px;
  & > li {
    width: 100%;
    margin-right: 16px;
  }

  & > li:last-child {
    margin-right: 0;
  }
`;
const StepBar1 = styled.div``;

const StepBar2 = styled.div``;

const StepBar3 = styled.div``;

const StepSlide = styled.div`
  width: 100%;
  height: 5px;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  position: relative;

  ${StepBar1} {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: 4px;
    border: none;
    transition: 0.5s;
    width: 100%;

    background-color: #00b7ff;
  }
`;
