import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import SwiperArrow from '@/assets/images/SwiperArrow.png';
import SwiperArrowReverse from '@/assets/images/SwiperArrowReverse.png';
import SettingWhite from '@/assets/images/SettingWhite.png';
import { Cookies } from 'react-cookie';
import SwiperBtSection from './SwiperBtSection';
import { renderDate, renderDay } from '@/utils';
import { cateogoryAll } from '@/frontDB/filterDB';
import axios from 'axios';
import PostDeleteModal from '@/components/common/DeleteModal/PostDeleteModal';
import PostFixModal from '@/components/post/modal/PostFix';
import useModal from '@/hooks/useModal';

function ActivityCard({ postData }) {
  const cookies = new Cookies();

  const [IsDisable, setIsDisable] = useState(false);
  const [isSwiperClick, setIsSwiperClick] = useState(false);

  const [participantList, setParticipantList] = useState([]);
  const [deleteVisible, openDelete, closeDelete] = useModal();
  const [fixVisible, openFix, closeFix] = useModal();

  const handleClick = useCallback(() => {
    setIsSwiperClick(!isSwiperClick);
  }, [isSwiperClick]);

  const openInNewTab = useCallback((url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  }, []);

  const getParticipant = useCallback(async () => {
    try {
      const { data } = await axios.get(`/application/myCrew/details/applier/${postData.boardId}`, {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
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
    const bool = !postData.viewable || renderDay(postData.expiredDate) < 0;
    setIsDisable(bool);
    getParticipant();
  }, []);

  return (
    <>
      <Container>
        <Wrapper>
          <CardTop active={isSwiperClick}>
            <CardTopHeader>
              <CardHead>
                <TextBox>
                  <Dday>마감</Dday>
                  <PostDate>{renderDate(postData.createdDate)} 게시</PostDate>
                </TextBox>
                <DetailBox>
                  <p>
                    <span>{`(${postData.recruitedCrew}/${postData.totalCrew}명)`}</span> 모집완료
                  </p>
                  <button onClick={() => openInNewTab(postData.kakaoChat)}>크루원채팅</button>
                </DetailBox>
              </CardHead>
              <CardBody isDisabled={IsDisable}>
                <TextBox>
                  <TitleBox>
                    <h5>{postData.title}</h5>
                  </TitleBox>
                  <TextList>
                    <CategoryText
                      textColor={postData.categoryParentId === 1 ? '#005ec5' : '#F7971E'}
                      isDisabled
                    >
                      {
                        cateogoryAll.filter(
                          (category) => `${postData.categoryId}` === category.value,
                        )[0].name
                      }
                    </CategoryText>
                    <p>{postData.approachCode ? '오프라인' : '온라인'}</p>
                  </TextList>
                  <ButtonBox>
                    <button onClick={openDelete}>삭제</button>
                    <button className="set" onClick={openFix}>
                      세팅
                    </button>
                  </ButtonBox>
                  <RightBtnBox>
                    <button className="deadline">
                      마감 7<span>일+</span>
                    </button>
                  </RightBtnBox>
                </TextBox>
              </CardBody>
            </CardTopHeader>
          </CardTop>
          <CardBottom active={isSwiperClick}>
            <BtTop>
              <p>
                참여자 <em>{postData.recruitedCrew}</em>
              </p>
            </BtTop>
            <SwiperBtSection
              isSwiperClick={isSwiperClick}
              participantList={participantList}
              waitingList={[]}
              status={1}
              boardId={postData.boardId}
              pageStatus={1}
            ></SwiperBtSection>
          </CardBottom>
        </Wrapper>
        <SwiperBtn onClick={handleClick}>참여자</SwiperBtn>
      </Container>
      <PostDeleteModal
        visible={deleteVisible}
        closeModal={closeDelete}
        postData={postData}
      ></PostDeleteModal>
      <PostFixModal visible={fixVisible} closeModal={closeFix} postData={postData}></PostFixModal>
    </>
  );
}

export default ActivityCard;

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

const CardTopHeader = styled('div')``;

const TextBox = styled('div')``;

const Dday = styled('p')``;

const PostDate = styled('p')``;

const TitleBox = styled('div')``;

const TextList = styled('div')``;

const ButtonBox = styled('div')``;

const RightBtnBox = styled('div')``;

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

const CardTop = styled('div')`
  width: 100%;
  position: relative;
  box-sizing: border-box;

  ${CardTopHeader} {
    display: flex;
    padding: 14px 0;
    border: none;
    position: relative;
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
`;

const CardHead = styled('div')`
  display: flex;
  height: 100%;
  position: relative;
  min-width: 262px;
  border: none;
  align-items: center;

  ${TextBox} {
    width: 100%;
    height: 100%;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    ${Dday} {
      font-weight: 700;
      color: #a8a8a8;
      text-align: right;
      font-size: 20px;
      margin: 0;
    }

    ${PostDate} {
      font-size: 12px;
      color: #868686;
      margin-top: 10px;
    }
  }

  @media screen and (max-width: 820px) {
    min-width: 100%;
    height: 30px;

    ${TextBox} {
      align-items: flex-start;

      ${Dday} {
        text-align: left;
        font-size: 18px;
      }

      ${PostDate} {
        display: none;
      }
    }

    ${DetailBox} {
      flex-direction: row;
      border: none;
      min-width: auto;
      height: auto;
      padding: 0;
      gap: 12px;
      align-items: center;

      p {
        margin: 0;
      }

      button {
        width: 74px;
      }
    }
  }

  @media screen and (max-width: 300px) {
    ${TextBox} {
      ${Dday} {
        font-size: 16px;
      }
    }

    ${DetailBox} {
      gap: 8px;

      p {
        font-size: 13px;
      }
    }
  }
`;

const CardBody = styled('div')`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-left: 24px;
  position: relative;

  ${TextBox} {
    width: 100%;
    height: 100%;

    ${TitleBox} {
      display: flex;
      align-items: center;
      h5 {
        width: calc(100% - 220px);
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
    box-sizing: border-box;
    flex-direction: column;
    justify-content: space-between;
    min-width: auto;
    height: 100%;
    position: absolute;
    top: 0;
    right: 175px;
    border: none;
    gap: 4px;
    padding: 0;

    button {
      width: 30px;
      height: 30px;
      min-width: 30px;
      min-height: 30px;
      border: none;
      border-radius: 5px;
      outline: none;
      color: #fff;
      cursor: pointer;
      transition: 0.3s;
      font-size: 12px;
      line-height: 15px;
      background-color: #c4c4c4;

      &.set {
        text-indent: -9999px;
        background: #c4c4c4 url(${SettingWhite}) center/16px no-repeat;
        background-position: center;
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
      background-color: #c4c4c4;

      :hover {
        background-color: #b0b0b0;
      }

      &.deadline {
        background-color: #00b7ff;

        :hover {
          background-color: #00a3e3;
        }
      }
    }
  }

  @media screen and (max-width: 820px) {
    padding: 0;
    ${ButtonBox} {
      display: flex;
      flex-direction: row;
      right: 0;
      top: 18px;
      padding: 0;
      gap: 8px;
    }

    ${TextBox} {
      position: relative;
      ${TitleBox} {
        height: 36px;
        margin-top: 18px;
        h5 {
          font-size: 14px;
          width: calc(100% - 83px);
          margin-top: 0;
          white-space: normal;
          line-height: 20px;
        }
      }

      ${TextList} {
        p:not(:last-child) {
          margin-right: 12px;
        }
      }
    }

    ${RightBtnBox} {
      border: none;
      min-width: auto;
      height: auto;
      top: inherit;
      bottom: -2px;

      button {
        width: 74px;
        height: 30px;
        border-radius: 5px;
        font-size: 13px;
      }
    }
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
