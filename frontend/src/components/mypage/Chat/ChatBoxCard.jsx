import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import IconFlag from '@/assets/images/IconFlag.png';
import LogInCheck_off from '@/assets/images/LogInCheck_off.png';
import LogInCheck_on from '@/assets/images/LogInCheck_on.png';
import { format } from 'date-fns';
import { cateogoryAll } from '@/frontDB/filterDB';
import { useRecoilState } from 'recoil';
import { tooltipBoardId } from '@/atoms/profile';
import ProfileTooltip from '@/components/post/tooltip/ProfileTooltip';

function ChatBoxCard({ isSetting, onClick, check, data }) {
  const [tooltip, setTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(1);
  const [currentBoardId, setCurrentBoardId] = useRecoilState(tooltipBoardId);

  const categoryData = cateogoryAll.filter(
    (category) => `${data.categoryId}` === category.value,
  )[0];

  const viewTooltip = useCallback(
    (e, position) => {
      e.stopPropagation();
      setTooltipPosition(position);
      setCurrentBoardId(data.boardSeq);
      setTooltip(true);
    },
    [tooltip],
  );

  useEffect(() => {
    if (currentBoardId !== data.boardSeq) {
      setTooltip(false);
    }
  }, [currentBoardId]);

  return (
    <Container onClick={onClick}>
      <ContentSet active={isSetting}>
        <InputHide></InputHide>
        <LabelCheck active={check}>
          <span></span>
        </LabelCheck>
      </ContentSet>

      <ContentCard active={isSetting}>
        <ContentHead>
          <HeadBox className="profile" onClick={(e) => viewTooltip(e, 3)}>
            <img src={data.other.profileImage} alt="profile" className="profile" />
            {!data.captain && <img src={IconFlag} alt="flag" className="flag" />}
            <p>{data.other.nickName}</p>
          </HeadBox>
          {tooltip && data && (
            <ProfileTooltip
              data={{ ...data.other, boardId: data.boardSeq }}
              position={tooltipPosition}
              open={tooltip}
              setOpen={setTooltip}
              chatNone={true}
            />
          )}
          <HeadBox className="post">
            <p>
              <CategoryTxt textColor={categoryData.color}>{categoryData.name}</CategoryTxt>
              {data.boardTitle}
            </p>
          </HeadBox>
        </ContentHead>
        <ContentBody>
          <p>
            {data.other.uid
              ? data.recentMessageContent
                ? data.recentMessageContent
                : '이 채팅방에 채팅이 없습니다.'
              : '이 채팅방은 삭제되었습니다'}
          </p>
        </ContentBody>
        <ContentFooter>
          <PDate>{format(new Date(data.recentMessageTime), 'MM.dd')}</PDate>
          {data.unReadCnt !== 0 && (
            <PNew>
              NEW
              <span>{data.unReadCnt}</span>
            </PNew>
          )}
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

  :hover {
    background-color: #f3f3f3;
  }

  @media screen and (max-width: 820px) {
    height: auto;
  }

  @media screen and (max-width: 300px) {
    padding: 8px 4px;
  }
`;

const ContentSet = styled('div')`
  width: 0px;
  min-width: 0px;
  padding-top: 5px;
  overflow: hidden;
  transition: 0.5s ease;

  ${(props) =>
    props.active &&
    css`
      min-width: 40px;
    `};

  @media screen and (max-width: 300px) {
    ${(props) =>
      props.active &&
      css`
        min-width: 30px;
      `};
  }
`;

const ContentCard = styled('div')`
  width: 100%;
  transition: 0.5s;

  ${(props) =>
    props.active &&
    css`
      width: calc(100% - 40px);
    `};

  @media screen and (max-width: 300px) {
    ${(props) =>
      props.active &&
      css`
        width: calc(100% - 30px);
      `};
  }
`;

const ContentHead = styled('div')`
  display: flex;
  gap: 8px;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }
`;

const CategoryTxt = styled('span')`
  font-weight: 700;
  margin-right: 8px;

  color: #0f3fa6;

  ${(props) =>
    props.textColor &&
    css`
      color: ${props.textColor};
    `}
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

  @media screen and (max-width: 820px) {
    width: fit-content;

    &.profile {
      p {
        font-size: 14px;
      }
    }

    &.post {
      max-width: 100%;

      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
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

  @media screen and (max-width: 820px) {
    margin: 10px 0;

    p {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      white-space: normal;
      font-size: 12px;
      line-height: 18px;
      height: 36px;
    }
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

  @media screen and (max-width: 820px) {
    gap: 10px;
    p {
      font-size: 11px;
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
