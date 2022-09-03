import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import SwiperArrow from '@/assets/images/SwiperArrow.png';
import SwiperArrowReverse from '@/assets/images/SwiperArrowReverse.png';
import { renderDate, renderDay } from '@/utils';
import { cateogoryAll } from '@/frontDB/filterDB';
import SwiperBtSection from './SwiperBtSection';
import { useSetRecoilState } from 'recoil';
import { tooltipBoardId } from '@/atoms/profile';
import ProfileTooltip from '@/components/post/tooltip/ProfileTooltip';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MyPartiCancelModal from '../Modal/MyPartiCancelModal';
import useModal from '@/hooks/useModal';

function ParticipateCard({ postData, handleCloseDownId }) {
  const cookies = new Cookies();

  const [IsDisable, setIsDisable] = useState(false);
  const [isSwiperClick, setIsSwiperClick] = useState(false);

  const [tooltip, setTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(1);
  const setCurrentBoardId = useSetRecoilState(tooltipBoardId);
  const [participantList, setParticipantList] = useState([]);

  const [cancelVisible, openCancel, closeCancel] = useModal();

  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    setIsSwiperClick(!isSwiperClick);
  }, [isSwiperClick]);

  const openInNewTab = useCallback((url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  }, []);

  const navigateBoard = useCallback(
    (e) => {
      e.stopPropagation();
      if (IsDisable) {
        return;
      }
      navigate(`/post/${postData?.boardId}`);
    },
    [IsDisable],
  );

  const viewTooltip = useCallback(
    (e, position) => {
      e.stopPropagation();
      setTooltipPosition(position);
      setCurrentBoardId(postData?.boardId);
      setTooltip(true);
    },
    [tooltip],
  );

  const getParticipant = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `/application/myCrew/participated/applier/${postData?.boardId}`,
        {
          withCredentials: true,
          headers: {
            'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
          },
        },
      );
      switch (data.status) {
        case 200:
          setParticipantList([...data.data.content]);
          break;

        default:
          break;
      }
    } catch (error) {
      console.dir(error);
    }
  }, []);

  useEffect(() => {
    const bool = !postData?.viewable || renderDay(postData?.expiredDate) < 0;
    setIsDisable(bool);
  }, []);

  useEffect(() => {
    getParticipant();
  }, []);

  if (!postData) {
    return null;
  }

  return (
    <Container>
      <Wrapper>
        <CardTop active={isSwiperClick}>
          <CardTopHeader active={isSwiperClick}>
            <CardHead isDisabled={IsDisable}>
              <ProfileBox onClick={(e) => viewTooltip(e, 1)}>
                <img src={`${postData?.profileImage}`} alt="postprofile" />
              </ProfileBox>
              <TextBox>
                <Dday>{IsDisable ? '마감' : `D-${renderDay(postData?.expiredDate)}`}</Dday>
                <CardDate>{renderDate(postData?.appliedDate)}</CardDate>
                <CardName onClick={(e) => viewTooltip(e, 2)}>{postData?.nickName}</CardName>
              </TextBox>
              {tooltip && postData && (
                <ProfileTooltip
                  data={postData}
                  position={tooltipPosition}
                  open={tooltip}
                  setOpen={setTooltip}
                />
              )}
              <DetailBox>
                <p>
                  <span>{`(${postData?.recruitedCrew}/${postData?.totalCrew}명)`}</span> 모집완료
                </p>
                <button onClick={() => openInNewTab(postData?.kakaoChat)}>크루원채팅</button>
              </DetailBox>
            </CardHead>
            <CardBody isDisabled={IsDisable}>
              <TextBox>
                <TitleBox>
                  <h5 onClick={navigateBoard}>{postData?.title}</h5>
                </TitleBox>
                <TextList>
                  <CategoryText
                    textColor={postData?.categoryParentId === 1 ? '#005ec5' : '#F7971E'}
                    isDisabled={IsDisable}
                  >
                    {
                      cateogoryAll.filter(
                        (category) => `${postData?.categoryId}` === category.value,
                      )[0].name
                    }
                  </CategoryText>
                  <p>{postData?.approachCode ? '오프라인' : '온라인'}</p>
                </TextList>
              </TextBox>

              <RightBtnBox>
                <button className="cancel" onClick={openCancel}>
                  참여취소
                </button>
              </RightBtnBox>
            </CardBody>
          </CardTopHeader>
        </CardTop>
        <CardBottom active={isSwiperClick}>
          <BtTop>
            <p>
              참여자 <em>{participantList.length}</em>
            </p>
          </BtTop>
          <SwiperBtSection
            isSwiperClick={isSwiperClick}
            participantList={participantList}
            waitingList={[]}
            status={2}
            pageStatus={1}
          ></SwiperBtSection>
        </CardBottom>
      </Wrapper>
      <SwiperBtn onClick={handleClick}>참여자</SwiperBtn>
      <MyPartiCancelModal
        visible={cancelVisible}
        postData={postData}
        closeModal={closeCancel}
        handleCloseDownId={handleCloseDownId}
      ></MyPartiCancelModal>
    </Container>
  );
}

export default ParticipateCard;

const Container = styled('div')`
  position: relative;
`;

const Wrapper = styled('div')`
  background-color: #fff;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  cursor: pointer;
  padding: 0px;
  height: auto;
  flex-direction: column;
  transition: height 0.5s ease 0s, border 0.2s ease 0s;
  cursor: default;

  :hover {
    border-color: #a8a8a8;
  }
`;

const CardTopHeader = styled('div')``;

const TextBox = styled('div')``;

const Dday = styled.p``;

const CardDate = styled.p``;

const TextList = styled.div``;

const ProfileBox = styled.div``;

const CardName = styled.p``;

const TitleBox = styled('div')``;

const RightBtnBox = styled('div')``;

const CategoryText = styled.span`
  font-size: 13px;
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

const CardTop = styled('div')`
  width: 100%;
  position: relative;
  box-sizing: border-box;

  ${CardTopHeader} {
    display: flex;
    padding: 14px 0;
    border: none;
    position: relative;

    ::after {
      content: '';
      display: block;
      width: 100%;
      height: 1px;
      background-color: transparent;
      transition: 0.3s;
      position: absolute;
      bottom: 0;
      ${(props) =>
        props.active &&
        css`
          background-color: #e2e2e2;
        `}
    }
  }

  @media screen and (max-width: 820px) {
    min-height: 146px;
    align-items: flex-start;
    flex-direction: column;
    padding: 0 10px;

    ${CardTopHeader} {
      flex-direction: column;
    }
  }
`;

const CardHead = styled.div`
  display: flex;
  min-width: 262px;
  height: 100%;
  border: none;
  margin-left: 16px;
  position: relative;
  align-items: center;

  ${ProfileBox} {
    min-width: 60px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: transparent;
    overflow: hidden;
    margin-right: 13px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  ${TextBox} {
    width: 100%;
    height: 100%;
    padding: 0;
    display: block;
    min-width: 120px;
    margin-right: 12px;

    ${Dday} {
      margin: 0;
      font-size: 20px;
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
      cursor: pointer;
    }
  }

  @media screen and (max-width: 820px) {
    width: 100%;
    height: 30px;
    min-width: 100%;
    border: none;
    margin: 0;
    flex-direction: row;
    justify-content: space-between;
    ${ProfileBox} {
      display: block;
      min-width: 30px;
      width: 30px;
      height: 30px;
      margin-right: 12px;
    }
    ${TextBox} {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0;
      ${Dday} {
        margin: 0;
        font-size: 18px;
        margin-right: 12px;
        line-height: 30px;
      }

      ${CardDate} {
        display: none;
      }

      ${CardName} {
        display: none;
      }
    }

    ::after {
      content: '';
      width: calc(100% + 20px);
      left: -10px;
    }
  }

  @media screen and (max-width: 300px) {
    ${TextBox} {
      ${Dday} {
        font-size: 16px;
      }
    }
  }
`;

const DetailBox = styled('div')`
  min-width: 158px;
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
    margin-bottom: 7px;
    white-space: nowrap;

    span {
      font-weight: 500;
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

    background-color: #00b7ff;

    &:hover {
      background-color: #00a3e3;
    }
  }

  @media screen and (max-width: 820px) {
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    height: 30px;
    position: absolute;
    top: 0px;
    right: 0px;
    border: none;
    padding: 0;

    p {
      margin: 0;
      span {
        display: none;
      }
    }

    button {
      width: 74px;
    }
  }

  @media screen and (max-width: 300px) {
    gap: 8px;

    p {
      font-size: 13px;
    }
  }
`;

const CardBody = styled.div`
  display: flex;
  align-items: center;
  width: calc(100% - 406px);
  height: 100%;
  padding-left: 24px;
  position: relative;
  box-sizing: content-box;

  ${TextBox} {
    width: 100%;
    height: 100%;

    ${TitleBox} {
      display: flex;
      align-items: center;
      h5 {
        width: calc(100% - 176px);
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
      margin-top: 22px;
      p {
        font-size: 12px;
        font-weight: 400;
        color: #868686;
      }

      ${CategoryText} {
        font-weight: 700;
      }
    }
  }

  ${RightBtnBox} {
    min-width: 160px;
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border-left: 1px solid #a8a8a8;
    justify-content: center;

    button {
      border: none;
      outline: none;
      cursor: pointer;
      color: #fff;
      font-size: 15px;
      font-weight: 700;
      width: 100px;
      height: 50px;
      border-radius: 10px;
      transition: 0.3s;

      &.cancel {
        background-color: #f95884;

        :hover {
          background-color: #e9416e;
        }
      }
    }
  }

  @media screen and (max-width: 820px) {
    width: 100%;
    padding: 0;

    ${TextBox} {
      position: relative;
      ${TitleBox} {
        margin-top: 18px;
        height: 42px;
        h5 {
          width: calc(100% - 83px);
          margin-top: 0;
          white-space: normal !important;
          line-height: 20px;
        }
      }

      ${TextList} {
        margin-top: 22px;
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
    ${RightBtnBox} {
      border: none;
      min-width: auto;
      bottom: -2px;
      top: 18px;
      height: 30px;
      button {
        width: 74px;
        height: 30px;
        border-radius: 5px;
        font-size: 13px;
      }
    }
  }
`;

const SwiperBtn = styled('div')`
  width: 74px;
  height: 26px;
  color: #a8a8a8;
  background: #fff url(${SwiperArrow}) center/10px no-repeat;
  cursor: pointer;
  background-color: #fff;
  background-position: right 8px center;
  border: none;
  border-radius: 0 0 5px 5px;
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
  padding-left: 8px;
  box-sizing: border-box;
  margin: 0 38px 20px auto;

  ${(props) =>
    props.active &&
    css`
      background-image: url(${SwiperArrowReverse});
    `}

  @media screen and (max-width: 820px) {
    margin-right: 10px;
  }
`;

const BtTop = styled('div')``;

const CardBottom = styled('div')`
  width: 100%;
  height: 0;
  overflow-y: hidden;
  background-color: #fff;
  transition: 0.5s;
  border-radius: 0 0 10px 10px;

  ${(props) =>
    props.active &&
    css`
      height: 472px;
    `}

  ${BtTop} {
    height: 54px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 26px 12px 16px;
    box-sizing: border-box;

    p {
      font-size: 18px;
      font-weight: 700;
      color: #a8a8a8;

      em {
        color: #00b7ff;
      }
    }

    button {
      border: none;
      outline: none;
      cursor: pointer;
      background-color: #868686;
      width: 110px;
      height: 30px;
      border-radius: 5px;
      color: #fff;
      font-size: 13px;
      transition: 0.3s;

      &:hover {
        background-color: #747474;
      }
    }
  }
`;
