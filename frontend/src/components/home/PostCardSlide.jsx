/* eslint-disable no-confusing-arrow */
/* eslint-disable operator-linebreak */
import React from 'react';
import styled, { css } from 'styled-components';
import Profile4 from '../../assets/images/Profile4.png';
import StarOff from '../../assets/images/StarOff.png';
import StarOn from '../../assets/images/StarOn.png';

function PostCardSlide({ data }) {
  return (
    <Container>
      <CardPost category="study">
        <CardHead>
          <h5>
            <span>D-14</span>
          </h5>
          <CardHeadRight>
            <p>2/3 (목)</p>
            <p>
              조회수
              <span>50</span>
            </p>
            <Star />
          </CardHeadRight>
        </CardHead>
        <CardBody>
          <CardProfile>
            <ProfileImg alt="" />
          </CardProfile>
          <CardTxt>
            <h4>함께 크루원 모집 플랫폼 작업하실 분 모십니다~!</h4>
            <p>인생인생오쯔</p>
          </CardTxt>
        </CardBody>
        <CardFooter>
          <CardTagStudy>고시/공무원</CardTagStudy>
          <CardTagStudy>오프라인</CardTagStudy>
          <CardTag>
            <span>10/10</span>
            <span>명 모집됨</span>
          </CardTag>
        </CardFooter>
      </CardPost>
    </Container>
  );
}

export default PostCardSlide;

const Container = styled('div')`
  height: auto;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
`;

const CardPost = styled.div`
  ${(props) =>
    props.category === 'study'
      ? css`
          border-top: 6px solid #005ec5;
        `
      : css`
          border-top: 6px solid #f7971e;
        `}

  width: 100%;
  background-color: #fff;
  border-radius: 2px 2px 15px 15px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  cursor: pointer;
  p {
    font-size: 10px;
    font-weight: 400;
    color: #868686;
  }
`;

const CardHead = styled.div`
  padding: 10px 12px 10px 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h5 {
    font-size: 13px;
    font-weight: 700;
  }
`;

const CardHeadRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  p {
    :first-child {
      @media screen and (max-width: 820px) {
        display: none;
      }
    }
    margin-top: 0;
    margin-left: 10px;
    @media screen and (max-width: 820px) {
      font-size: 11px;
      font-weight: 400;
      color: #868686;
    }
  }
`;

const CardBody = styled.div`
  height: 82px;
  padding: 10px 12px 0 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 820px) {
    padding: 0 5px 0 15px;
    height: 64px;
  }
`;

const CardFooter = styled.div`
  padding: 10px 12px 10px 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 820px) {
    padding: 5px;
  }
`;

const CardTag = styled.div`
  width: fit-content;
  padding: 5px 8px;
  border-radius: 13px;
  background-color: #a8a8a8;
  font-size: 13px;
  line-height: 16px;
  color: #fff;
  font-weight: 400;
  :not(:last-child) {
    margin-right: 8px;
    @media screen and (max-width: 820px) {
      margin-right: 4px;
    }
  }
  @media screen and (max-width: 820px) {
    font-size: 11px;
    line-height: 1;
    border-radius: 12px;
    padding: 7px 8px;
  }
`;

const CardTagStudy = styled.div`
  width: fit-content;
  padding: 5px 8px;
  border-radius: 13px;
  background-color: #005ec5;
  font-size: 13px;
  line-height: 16px;
  color: #fff;
  font-weight: 400;
  :not(:last-child) {
    margin-right: 8px;
    @media screen and (max-width: 820px) {
      margin-right: 4px;
    }
  }
  @media screen and (max-width: 820px) {
    font-size: 11px;
    line-height: 1;
    border-radius: 12px;
    padding: 7px 8px;
  }
`;
const CardTagHobby = styled.div`
  width: fit-content;
  padding: 5px 8px;
  border-radius: 13px;
  background-color: #f7971e;
  font-size: 13px;
  line-height: 16px;
  color: #fff;
  font-weight: 400;
  :not(:last-child) {
    margin-right: 8px;
    @media screen and (max-width: 820px) {
      margin-right: 4px;
    }
  }
  @media screen and (max-width: 820px) {
    font-size: 11px;
    line-height: 1;
    border-radius: 12px;
    padding: 7px 8px;
  }
`;
const CardTxt = styled.div`
  width: 100%;
  margin-left: 15px;
  h4 {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 8px;
    line-height: 18px;
    ::after {
      content: none;
      display: none;
      width: none;
      height: none;
      margin-left: none;
      background: none;
      background-size: none;
      background-repeat: none;
    }
  }
  p {
    margin-top: 0;

    @media screen and (max-width: 820px) {
      font-size: 11px;
      font-weight: 400;
      color: #868686;
    }
  }
`;

const CardProfile = styled.div`
  min-width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #8d2bf5;
`;

const ProfileImg = styled.div`
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: url(${Profile4}) 100% 100%;
  background-size: 100% !important;
`;

const Star = styled.div`
  width: 24px;
  height: 24px;
  background: url(${StarOff}) 50% 50% no-repeat;
  background-size: 20px !important;
  cursor: pointer;
  margin-left: 10px;
`;
