import React from 'react';
import Lnb from '@/components/common/Lnb/Lnb';
import ScrollButton from '@/components/common/ScrollButton';
import Err404 from '@/assets/images/Err404.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <Lnb path="home" />
      <Container>
        <ScrollButton />
        <ErrorBody>
          <Wrapper>
            <ErrImg></ErrImg>
            <ErrMsg>
              <em>이용에 불편드려 죄송합니다.</em>
              <br />
              서비스 개편으로 찾으시는 페이지가 변경되어 현재 사용할 수 없습니다.
              <span>혹시 아래 페이지들이 당신이 찾는 페이지일까요?</span>
            </ErrMsg>
            <Link to="/">
              <LinkBox>홈으로 이동</LinkBox>
            </Link>
          </Wrapper>
        </ErrorBody>
      </Container>
    </>
  );
}

export default NotFound;

const Container = styled('main')`
  margin-left: 142px;
  box-sizing: border-box;
  overflow-x: hidden;
  @media screen and (max-width: 820px) {
    width: 100%;
    padding: 60px 0 70px;
    margin: 0;
  }
`;

const ErrorBody = styled('section')`
  min-height: 100vh;
  background-color: #f6f7fb;
  padding: 127px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;

  @media screen and (max-width: 820px) {
    min-height: calc(100vh - 130px);
    padding: 60px 0 30px;
  }
`;

const Wrapper = styled.div`
  max-width: 850px;
  margin: auto;
  position: relative;
  @media screen and (max-width: 820px) {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
  }
  @media screen and (max-width: 300px) {
    padding: 0 10px;
  }
`;

const ErrImg = styled.div`
  width: 403px;
  height: 260px;
  margin: auto;
  background: url(${Err404}) center/contain no-repeat;

  @media screen and (max-width: 820px) {
    width: 192px;
    height: 124px;
  }
`;

const ErrMsg = styled.p`
  font-size: 16px;
  line-height: 24px;
  color: #000;
  font-weight: 500;
  text-align: center;
  margin: 50px 0 40px;

  em {
    color: #00b7ff;
  }

  span {
    display: block;
  }

  @media screen and (max-width: 820px) {
    font-size: 13px;
    line-height: 20px;

    span {
      display: inline;
    }
  }
`;

const LinkBox = styled.div`
  width: 188px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border-radius: 10px;
  cursor: pointer;
  font-size: 20px;
  font-weight: 500;
  color: #868686;
  transition: 0.3s;
  box-sizing: border-box;
  border: 2px solid transparent;
  margin: auto;

  &:hover {
    border: 2px solid #00b7ff;
    color: #00b7ff;
    font-weight: 700;
  }

  @media screen and (max-width: 820px) {
    width: 152px;
  }
`;
