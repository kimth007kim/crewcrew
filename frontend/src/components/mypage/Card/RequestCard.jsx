import { tooltipBoardId } from '@/atoms/profile';
import HistoryDeleteModal from '@/components/common/DeleteModal/HistoryDeleteModal';
import ProfileTooltip from '@/components/post/tooltip/ProfileTooltip';
import { cateogoryAll } from '@/frontDB/filterDB';
import useModal from '@/hooks/useModal';
import { renderDate, renderDay } from '@/utils';
import fetcher from '@/utils/fetcher';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { css } from 'styled-components';
import useSWR from 'swr';
import RequestCancelModal from '../Modal/RequestCancelModal';

function RequestCard({ data, handleReloadApId }) {
  const cookies = new Cookies();
  const { data: myData } = useSWR(['/auth/token', cookies.get('X-AUTH-TOKEN')], fetcher);

  const [tooltip, setTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(1);
  const [IsDisable, setIsDisable] = useState(false);
  const setCurrentBoardId = useSetRecoilState(tooltipBoardId);

  const [cancelVisible, openCancel, closeCancel] = useModal();
  const [historyVisible, openHistory, closeHistory] = useModal();

  const navigate = useNavigate();

  useEffect(() => {
    const bool = !data.viewable || renderDay(data.expiredDate) < 0;
    setIsDisable(bool);
  }, []);

  const viewTooltip = useCallback(
    (e, position) => {
      e.stopPropagation();
      setTooltipPosition(position);
      setCurrentBoardId(data.boardId);
      setTooltip(true);
    },
    [tooltip],
  );

  const navigateBoard = useCallback(
    (e) => {
      e.stopPropagation();
      if (IsDisable) {
        return;
      }
      navigate(`/post/${data.boardId}`);
    },
    [IsDisable],
  );

  const openInNewTab = useCallback((url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  }, []);

  const renderProgress = () => {
    if (data.progress === 0) {
      return (
        <>
          <DetailBox color="nega">
            <p>
              <span>
                {data && format(new Date(data.appliedDate.replace(/-/g, '/')), '(MM/dd)')}
              </span>{' '}
              요청거절
            </p>
          </DetailBox>
          <ButtonBox>
            <button onClick={openHistory}>내역삭제</button>
          </ButtonBox>
        </>
      );
    }

    if (data.progress === 1) {
      return (
        <>
          <DetailBox>
            <p>
              <span>
                {data && format(new Date(data.appliedDate.replace(/-/g, '/')), '(MM/dd)')}
              </span>{' '}
              요청완료
            </p>
          </DetailBox>
          <ButtonBox>
            <button onClick={openCancel}>요청취소</button>
          </ButtonBox>
        </>
      );
    }

    if (data.progress === 2) {
      return (
        <>
          <DetailBox color="posi">
            <p>
              <span>
                {data && format(new Date(data.appliedDate.replace(/-/g, '/')), '(MM/dd)')}
              </span>{' '}
              참여중
            </p>
            <button onClick={() => openInNewTab(data.kakaoCaht)}>크루원채팅</button>
          </DetailBox>
          <ButtonBox>
            <button>참여취소</button>
          </ButtonBox>
        </>
      );
    }
    if (data.progress === 3) {
      return (
        <>
          <DetailBox>
            <p>
              <span>
                {data && format(new Date(data.appliedDate.replace(/-/g, '/')), '(MM/dd)')}
              </span>{' '}
              참여취소
            </p>
          </DetailBox>
          <ButtonBox>
            <button onClick={openHistory}>내역삭제</button>
          </ButtonBox>
        </>
      );
    }
    if (data.progress === 4) {
      return (
        <>
          <DetailBox>
            <p>
              <span>
                {data && format(new Date(data.appliedDate.replace(/-/g, '/')), '(MM/dd)')}
              </span>{' '}
              참여취소
            </p>
          </DetailBox>
          <ButtonBox>
            <button onClick={openHistory}>내역삭제</button>
          </ButtonBox>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <Container>
      <CardHead isDisabled={IsDisable}>
        <ProfileBox onClick={(e) => viewTooltip(e, 1)}>
          <img src={`${data.profileImage}`} alt="" />
        </ProfileBox>
        <TextBox>
          <Dday>{IsDisable ? '마감' : `D-${renderDay(data.expiredDate)}`}</Dday>
          <CardDate>{renderDate(data.appliedDate)}</CardDate>
          <CardName onClick={(e) => viewTooltip(e, 2)}>{data.nickName}</CardName>
        </TextBox>
        {myData && myData.data?.uid && tooltip && (
          <ProfileTooltip
            data={data}
            position={tooltipPosition}
            open={tooltip}
            setOpen={setTooltip}
          />
        )}
      </CardHead>
      <CardBody isDisabled={IsDisable}>
        <TextBox>
          <TitleBox onClick={navigateBoard}>
            <h5>{data.title}</h5>
          </TitleBox>
          <TextList>
            <CategoryText
              textColor={data.categoryParentId === 1 ? '#005ec5' : '#F7971E'}
              isDisabled={IsDisable}
            >
              {cateogoryAll.filter((category) => `${data.categoryId}` === category.value)[0].name}
            </CategoryText>
            <p>{data.approachCode ? '오프라인' : '온라인'}</p>
            <p>{`${data.recruitedCrew}/${data.totalCrew}명`}</p>
            <p>
              요청자
              {` ${data.appliedCrew}`}
            </p>
          </TextList>
        </TextBox>
        {renderProgress()}
      </CardBody>
      <RequestCancelModal
        closeModal={closeCancel}
        visible={cancelVisible}
        postData={data}
        handleReloadApId={handleReloadApId}
      />
      <HistoryDeleteModal
        closeModal={closeHistory}
        visible={historyVisible}
        postData={data}
        handleReloadApId={handleReloadApId}
      />
    </Container>
  );
}

export default RequestCard;

const Container = styled('div')`
  height: 94px;
  background-color: #fff;
  border-radius: 10px;
  padding: 16px 22px 16px 18px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  transition: 0.2s;
  border: 1px solid transparent;
  cursor: pointer;

  @media screen and (max-width: 820px) {
    height: 146px;
    padding: 12px 10px 16px 16px;
    flex-direction: column;
    position: relative;
  }
`;

const ProfileBox = styled.div``;

const TextBox = styled.div``;

const Dday = styled.p``;

const CardDate = styled.p``;

const CardName = styled.p``;

const TitleBox = styled.div``;

const CategoryText = styled.span`
  font-size: 12px;
  font-weight: 400;
  margin-right: 20px;
  ${(props) =>
    props.textColor &&
    css`
      color: ${props.textColor};
    `}
  ${(props) =>
    props.isDisabled &&
    css`
      color: #a8a8a8;
    `}
  @media screen and (max-width: 820px) {
    margin-right: 12px;
  }
`;

const TextList = styled.div``;

const ButtonBox = styled.div``;

const CardHead = styled.div`
  display: flex;
  min-width: 204px;
  height: 100%;
  border-right: 1px solid #a8a8a8;
  position: relative;

  ${ProfileBox} {
    min-width: 60px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: transparent;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      -o-object-fit: cover;
      object-fit: cover;
    }
  }

  ${TextBox} {
    width: 100%;
    height: 100%;
    padding: 0 14px;
    ${Dday} {
      margin-top: 4px;
      font-size: 16px;
      font-weight: 700;
      color: #00b7ff;
      text-align: right;
      ${(props) =>
        props.isDisabled &&
        css`
          color: #a8a8a8;
        `}
    }

    ${CardDate} {
      margin-top: 0px;
      font-size: 12px;
      font-weight: 300;
      color: #868686;
    }

    ${CardName} {
      margin-top: 2px;
      font-size: 13px;
      font-weight: 500;
      color: #000;
    }
  }

  @media screen and (max-width: 820px) {
    width: 100%;
    height: 30px;
    border: none;
    align-items: center;
    ${ProfileBox} {
      display: block;
      min-width: 30px;
      width: 30px;
      height: 30px;
      margin-right: 12px;
    }
    ${TextBox} {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0;
      ${Dday} {
        margin: 0;
        font-size: 18px;
        margin-right: auto;
      }

      ${CardDate} {
        display: none;
      }

      ${CardName} {
        display: none;
      }
    }
  }

  @media screen and (max-width: 820px) {
    ${TextBox} {
      ${CardDate} {
        order: 1;
        margin-left: 10px;
        padding-right: 26px;
      }
    }
  }
`;

const CardBody = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-left: 15px;

  ${TextBox} {
    width: 100%;
    height: 100%;

    ${TitleBox} {
      display: flex;
      align-items: center;
      h5 {
        width: 290px;
        margin-top: 4px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 15px;
        font-weight: 700;
        color: #000;
        ${(props) =>
          props.isDisabled &&
          css`
            color: #a8a8a8;
          `}
      }
    }

    ${TextList} {
      display: flex;
      margin-top: 15px;
      p {
        font-size: 12px;
        font-weight: 400;
        color: #868686;

        &:last-child {
          color: #000;
          font-weight: 700;
        }
      }

      p:not(:last-child) {
        margin-right: 20px;
      }

      ${CategoryText} {
        font-weight: 700;
      }
    }
  }

  ${ButtonBox} {
    display: flex;
    justify-content: space-between;
    height: 60px;
    gap: 14px;
    padding: 5px 0;
    padding-left: 22px;
    box-sizing: border-box;
    border-left: 1px solid #a8a8a8;
    min-width: 130px;
    justify-content: flex-end;
    border: none;

    button {
      width: 100px;
      height: 100%;
      border: none;
      border-radius: 10px;
      outline: none;
      color: #fff;
      font-size: 15px;
      background-color: #c4c4c4;
      cursor: pointer;

      transition: 0.3s;

      :hover {
        background-color: #a8a8a8;
      }
    }
  }

  @media screen and (max-width: 820px) {
    padding: 0;
    margin-top: 12px;
    align-items: flex-start;
    ${ButtonBox} {
      display: block;
      min-width: 74px;
      height: 30px;
      right: 10px;
      top: 59px;
      position: absolute;
      padding: 0;

      button {
        width: 100%;
        border-radius: 5px;
        font-size: 13px;
      }
    }

    ${TextBox} {
      ${TitleBox} {
        width: 206px;
        height: 42px;
        margin-top: 0;
        h5 {
          width: 100%;
          white-space: normal;
          line-height: 21px;
          margin-top: 0;
          font-size: 14px;
        }
      }

      ${TextList} {
        margin-top: 20px;
        min-width: 100%;
        p {
          font-size: 12px;
          font-weight: 400;
        }

        p:not(:last-child) {
          margin-right: 12px;
        }

        ${CategoryText} {
          font-weight: 700;
        }
      }
    }
  }

  @media screen and (max-width: 300px) {
    ${TextBox} {
      ${TitleBox} {
        width: 150px;
      }
    }
  }
`;

const DetailBox = styled('div')`
  min-width: 158px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 24px;
  box-sizing: border-box;
  border-left: 1px solid #a8a8a8;
  border-right: 1px solid #a8a8a8;

  p {
    font-size: 14px;
    font-weight: 700;
    white-space: nowrap;
    text-align: center;

    ${(props) =>
      props.color === 'nega' &&
      css`
        color: #f95884;
      `}

    ${(props) =>
      props.color === 'posi' &&
      css`
        margin-bottom: 7px;
      `}

    span {
      font-weight: 500;
      color: #000;
    }
  }

  button {
    width: 100%;
    height: 30px;
    border: none;
    outline: none;
    border-radius: 5px;
    color: #fff;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    transition: 0.3s;

    background-color: #c4c4c4;

    ${(props) =>
      props.color === 'posi' &&
      css`
        background-color: #00b7ff;

        :hover {
          background-color: #00a3e3;
        }
      `}
  }

  @media screen and (max-width: 820px) {
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    height: 30px;
    position: absolute;
    top: 12px;
    right: 10px;
    border: none;
    padding: 0;

    p {
      font-size: 13px;
      margin: 0;
    }

    button {
      width: 0;
      min-width: 74px;
    }
  }

  @media screen and (max-width: 300px) {
    min-width: 0;

    p {
      span {
        display: none;
      }
    }
  }
`;
