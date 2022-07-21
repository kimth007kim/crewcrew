import Modal from '@/components/common/Modal';
import { cateogoryAll } from '@/frontDB/filterDB';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useCallback, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Button from '../Button';
import {
  Body,
  ButtonCancel,
  ButtonWrap,
  CardFooter,
  CardHead,
  Classification,
  ClassificationCard,
  Header,
  ModalClose,
  ModalTop,
  TitleMsg,
  Wrapper,
} from './modal.style';

function PostDeleteModal({ closeModal, visible, postData }) {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const renderDate = useCallback(() => {
    const date = new Date(postData?.createdDate.replace(/-/g, '/'));
    return `${format(date, 'MM월 dd일')}`;
  }, []);

  const deletePost = useCallback(async () => {
    if (!cookies.get('X-AUTH-TOKEN')) {
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.delete(`/board/${postData?.boardId}`, {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      setLoading(false);

      switch (data.status) {
        case 200:
          closeModal();
          navigate('/post', { replace: true });
          toast.success('성공적으로 삭제되었습니다.');
          break;
        case 2301:
          toast.error(data.message);
          closeModal();
          break;

        default:
          toast.error(data.message);
          break;
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  }, []);

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
            정말 모집글을 삭제하시겠습니까?
            <br />
            삭제시 더이상 이 모집글과 관련된 활동을 할 수 없어요!
          </TitleMsg>
        </Header>
      }
      body={
        <Wrapper>
          <Body>
            <Classification>삭제되는 모집글</Classification>
            <ClassificationCard>
              <CardHead>
                <span>{renderDate()}</span> 업로드
              </CardHead>
              <h4>{postData?.title}</h4>
              <CardFooter>
                <li className={postData?.categoryParentId === 1 ? 'study' : 'hobby'}>
                  {
                    cateogoryAll.filter(
                      (category) => `${postData?.categoryId}` === category.value,
                    )[0].name
                  }
                </li>
                <li>{postData?.approachCode ? '오프라인' : '온라인'}</li>
                <li>{`${postData?.recruitedCrew}/${postData?.totalCrew}명`}</li>
              </CardFooter>
            </ClassificationCard>
            <Notification>
              <li>삭제시 이 모집글의 참여자 및 대기자가 더 이상 모집글을 확인할 수 없습니다</li>
              <li>마이페이지 글 목록등 모든 페이지에서 모집글 삭제</li>
            </Notification>
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

export default PostDeleteModal;

const Notification = styled('div')`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: 13px;
  line-height: 19px;
  color: #a8a8a8;
  margin-top: 32px;
`;
