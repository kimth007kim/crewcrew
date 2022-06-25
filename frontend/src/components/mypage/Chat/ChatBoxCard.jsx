import React from 'react';
import styled, { css } from 'styled-components';
import IconFlag from '@/assets/images/IconFlag.png';
import ProfileMail from '@/assets/images/ProfileMail.png';
import LogInCheck_off from '@/assets/images/LogInCheck_off.png';
import LogInCheck_on from '@/assets/images/LogInCheck_on.png';

function ChatBoxCard({ isSetting }) {
  return (
    <Container>
      <ContentSet active={isSetting}>
        <InputHide></InputHide>
        <LabelCheck>
          <span></span>
        </LabelCheck>
      </ContentSet>
      <ContentCard>
        <ContentHead>
          <HeadBox className="profile">
            <img src={ProfileMail} alt="" className="profile" />
            <img src={IconFlag} alt="" className="flag" />
            <p>재영재영유재영유재영</p>
          </HeadBox>
          <HeadBox className="post">
            <p>
              <CategoryTxt>고시/공무원</CategoryTxt>
              함께 크루원 모집 플랫폼작업하실분
            </p>
          </HeadBox>
        </ContentHead>
        <ContentBody>
          <p>
            안녕하세요. 요청한 내용 보고 궁금한 점이 있어 채팅 남깁니다. 안녕하세요. 요청한 내용
            보고 궁금한 점이 있어 채팅 남깁니다. 안녕하세요. 요청한 내용 보고 궁금한 점이 있어 채팅
            남깁니다.
          </p>
        </ContentBody>
        <ContentFooter>
          <PDate>05.10</PDate>
          <PNew>
            NEW
            <span>2</span>
          </PNew>
        </ContentFooter>
      </ContentCard>
    </Container>
  );
}

export default ChatBoxCard;

const Container = styled('li')`
  height: 116px;
  padding: 8px 14px;
  border: 6px solid #fff;
  box-sizing: border-box;
  background-color: #fff;
  transition: 0.5s;
  position: relative;
  display: flex;
  cursor: pointer;

  &:not(:last-child) {
    ::after {
      display: block;
      content: '';
      height: 1px;
      width: calc(100% + 12px);
      background-color: #e2e2e2;
      position: absolute;
      bottom: -6px;
      left: -6px;
    }
  }
`;

const ContentSet = styled('div')`
  min-width: 0px;
  padding-top: 5px;
  overflow: hidden;
  transition: 0.5s ease;

  ${(props) =>
    props.active &&
    css`
      min-width: 40px;
    `};
`;

const ContentCard = styled('div')`
  width: 100%;
  transition: 0.5s;
`;

const ContentHead = styled('div')`
  display: flex;
  gap: 8px;
`;

const CategoryTxt = styled('span')`
  font-weight: 700;
  margin-right: 8px;

  color: #0f3fa6;
`;

const HeadBox = styled('div')`
  background-color: #fff;
  border-radius: 15px;
  height: 30px;
  border: 1px solid #e2e2e2;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  &.profile {
    padding-right: 12px;

    img {
      &.profile {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-left: 3px;
      }

      &.flag {
        width: 14px;
        height: 14px;
        margin-left: 12px;
      }
    }

    p {
      font-size: 15px;
      font-weight: 700;
      margin-left: 8px;
    }
  }

  &.post {
    padding: 8px 16px;

    p {
      font-size: 12px;
      color: #a8a8a8;
      font-weight: 500;
    }
  }
`;

const ContentBody = styled('div')`
  margin: 14px 0 10px;

  p {
    font-size: 14px;
    color: #707070;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const PDate = styled('p')``;

const PNew = styled('p')``;

const ContentFooter = styled('div')`
  display: flex;
  gap: 12px;
  align-items: center;

  p {
    font-size: 13px;
    font-weight: 500;
  }

  ${PDate} {
    color: #a8a8a8;
  }

  ${PNew} {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #f95884;
    line-height: 1;

    span {
      font-size: 12px;
      color: #fff;
      font-weight: 500;
      background-color: #f95884;
      border-radius: 10px;
      width: 30px;
      height: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const LabelCheck = styled('label')`
  display: block;
  line-height: 21px;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;

  span {
    display: block;
    width: 20px;
    height: 20px;
    background: url(${LogInCheck_off}) center/100% no-repeat;
    transition: background 0.2s;

    ${(props) =>
      props.active &&
      css`
        background: url(${LogInCheck_on});
        background-size: 100%;
      `};
  }
`;

const InputHide = styled('input')`
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  position: absolute;
  display: none;
`;
