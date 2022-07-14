import Modal from '@/components/common/Modal';
import { cateogoryAll } from '@/frontDB/filterDB';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled, { css } from 'styled-components';
import Button from '../Button';
import IconFlag from '@/assets/images/IconFlag.png';
import {
  Body,
  ButtonCancel,
  ButtonWrap,
  Classification,
  ClassificationCard,
  Header,
  ModalClose,
  ModalTop,
  TitleMsg,
  Wrapper,
} from './modal.style';

function ChatDeleteModal({ closeModal, visible, chatData, checkList, handleInitial }) {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const deletePost = useCallback(async () => {
    setLoading(true);
    if (!cookies.get('X-AUTH-TOKEN')) {
      return;
    }

    try {
      const context = {
        rooms: checkList,
      };

      const { data } = await axios.delete(`/talk/room`, {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
        data: context,
      });

      switch (data.status) {
        case 200:
          setLoading(false);
          if (handleInitial) {
            handleInitial();
          }
          closeModal();
          navigate('/mypage/chat', { replace: true });
          toast.success('성공적으로 삭제되었습니다.');
          break;
        case 2301:
          toast.error(data.message);
          setLoading(false);
          closeModal();
          break;

        default:
          toast.error(data.message);
          setLoading(false);
          break;
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [checkList]);

  let categoryData;

  if (chatData) {
    categoryData = cateogoryAll.filter(
      (category) => chatData.categoryId === Number(category.value),
    )[0];
  }

  return (
    <Modal
      handleClose={() => {
        closeModal();
      }}
      visible={visible}
      size="regular"
      heightSize={685}
      header={
        <Header>
          <ModalTop>
            <li></li>
            <li>
              <ModalClose
                onClick={() => {
                  closeModal();
                }}
              ></ModalClose>
            </li>
          </ModalTop>
          <TitleMsg>
            정말 채팅방을 삭제하시겠습니까?
            <br />
            삭제시 상대방이 더이상 회원님에게 채팅을 할 수 없어요!
          </TitleMsg>
        </Header>
      }
      body={
        <Wrapper>
          <Body>
            <Classification>삭제되는 채팅방</Classification>
            {chatData && (
              <>
                <ClassificationCard className="chat">
                  <HeadBox className="profile">
                    <img src={chatData.other.profileImage} alt="profile" className="profile" />
                    {<img src={IconFlag} alt="flag" className="flag" />}
                    <p>{chatData.other.nickName}</p>
                  </HeadBox>

                  <HeadBox className="post">
                    <p>
                      <CategoryTxt textColor={categoryData ? categoryData.color : '#fff'}>
                        {categoryData && categoryData.name}
                      </CategoryTxt>
                      {chatData.boardTitle}
                    </p>
                  </HeadBox>
                </ClassificationCard>
                {checkList.length > 1 && <EtcText>{`... 외 ${checkList.length - 1}개`}</EtcText>}
              </>
            )}
            <ButtonWrap>
              <ButtonCancel onClick={closeModal}>취소</ButtonCancel>
              <Button
                widthSize={113}
                heightSize={50}
                color="pink"
                loadings={loading}
                onClick={deletePost}
              >
                삭제
              </Button>
            </ButtonWrap>
          </Body>
        </Wrapper>
      }
    ></Modal>
  );
}

export default ChatDeleteModal;

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

const EtcText = styled('div')`
  display: flex;
  padding-left: 25px;
  color: #707070;
  font-size: 15px;
  line-height: 19px;
  font-weight: 500;
  align-items: center;

  margin-top: 24px;
`;
