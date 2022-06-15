import React from 'react';
import styled from 'styled-components';
import LogoTextBlack from '@/assets/images/LogoTextBlack.png';

function Footer() {
  return (
    <MainFooter>
      <FooterSectionWrap>
        <FooterTop>
          <LogoTextBlackimg />
          <ul>
            <li>개인정보 취급 방침</li>
            <li>이용 약관</li>
            <li>프로젝트 개요</li>
          </ul>
        </FooterTop>
        <FooterBody>
          <h4>프로젝트 참여자</h4>
          <ul>
            <li>김경동</li>
            <li>김도희</li>
            <li>이하늘</li>
            <li>박한결</li>
            <li>오주영</li>
            <li>유재영</li>
          </ul>
        </FooterBody>
        <FooterBottom>
          <p>
            2021/12/--~2022/06 까지 진행한 웹 서비스 구축 프로젝트.
            <br className="m" />
            백엔드3명, 프론트1명, 퍼블리셔1명, 디자이너1명으로 구성된 팀.
            <br />
            백엔드: 김경동, 김도희, 이하늘/ 프론트: 오주영/
            <br className="m" />
            퍼블리셔: 박한결/ 디자이너: 유재영
            <br />
            <span>이 사이트의 모든 기술과 디자인의 저작 권리는 위 프로젝트 참여자에 있습니다.</span>
          </p>
        </FooterBottom>
      </FooterSectionWrap>
    </MainFooter>
  );
}

export default Footer;
const MainFooter = styled.footer`
  background-color: #2d3338;
  padding: 30px 0 57px;
`;

const FooterSectionWrap = styled.div`
  max-width: 800px;
  margin: auto;

  @media screen and (max-width: 820px) {
    max-width: calc(100vw - 40px);
  }

  @media screen and (max-width: 300px) {
    max-width: calc(100vw - 20px);
  }
`;

const FooterTop = styled.div`
  display: flex;
  align-items: flex-end;
  @media screen and (max-width: 820px) {
    flex-direction: column;
    align-items: center;
  }
  ul {
    display: flex;
    margin-left: 40px;
    margin-bottom: 2px;

    @media screen and (max-width: 820px) {
      margin: 10px 0;
    }
    @media screen and (max-width: 300px) {
      flex-direction: column;
      align-items: center;
    }

    li {
      color: #fff;
      font-weight: 500;
      font-size: 13px;
      line-height: 1;
      display: flex;
      align-items: center;
      height: 20px;
      padding: 0 40px;
      border-left: 1px solid #fff;
      @media screen and (max-width: 300px) {
        border: none;
      }
      @media screen and (max-width: 820px) {
        padding: 0 10px;
        :first-child {
          border: none;
        }
      }
      a {
        color: #fff;
        font-weight: 500;
        font-size: 13px;
        line-height: 1;
      }
    }
  }
`;

const FooterBody = styled.div`
  display: flex;
  align-items: center;
  margin: 30px 0;
  color: #fff;
  font-size: 13px;

  @media screen and (max-width: 820px) {
    margin: 20px 0 30px;
    flex-direction: column;
    align-items: center;
  }

  h4 {
    font-weight: 500;
    margin-right: 20px;
    @media screen and (max-width: 820px) {
      font-size: 16px;
      margin: 0;
    }
  }
  ul {
    display: flex;
    border-left: 1px solid #fff;
    @media screen and (max-width: 820px) {
      margin-top: 10px;
      border: none;
    }
    li {
      padding-left: 20px;
      font-weight: 400;

      @media screen and (max-width: 820px) {
        padding-left: 4px;
        font-size: 12px;
        font-weight: 300;
      }
    }
  }
`;

const FooterBottom = styled.div`
  p {
    font-size: 10px;
    color: #fff;
    font-weight: 300;
    line-height: 14px;

    @media screen and (max-width: 820px) {
      text-align: center;
    }
  }
  br.m {
    display: none;

    @media screen and (max-width: 300px) {
      :first-of-type {
        display: none;
      }
    }
    @media screen and (max-width: 820px) {
      display: block;
    }
  }
`;

const LogoTextBlackimg = styled.span`
  width: 162px;
  height: 46px;
  background: url(${LogoTextBlack}) no-repeat;
  background-size: 100% !important;
`;
