import Modal from '@/components/common/Modal';
import { cateogoryAll } from '@/frontDB/filterDB';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useCallback, useState } from 'react';
import { Cookies } from 'react-cookie';
import { toast } from 'react-toastify';
import Button from '@/components/common/Button';
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
import styled from 'styled-components';

function PostCloseDownModal({ closeModal, visible, postData, handleCloseDownId }) {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);

  const renderDate = useCallback(() => {
    const date = new Date(postData.createdDate.replace(/-/g, '/'));
    return `${format(date, 'MM월 dd일')}`;
  }, []);

  const handleCloseDown = useCallback(async () => {
    if (!cookies.get('X-AUTH-TOKEN')) {
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.patch(
        `/application/recruiting/${postData.boardId}`,
        {},
        {
          withCredentials: true,
          headers: {
            'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
          },
        },
      );
      setLoading(false);

      switch (data.status) {
        case 200:
          handleCloseDownId(postData.boardId);
          closeModal();
          toast.success('성공적으로 마감되었습니다.');
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
            크루원 모집을 마감하시겠습니까?
            <br />
            마감시 크루원이 더이상 참여요청을 할 수 없습니다.
          </TitleMsg>
        </Header>
      }
      body={
        <Wrapper>
          <Body>
            <Classification>마감하는 크루</Classification>
            <ClassificationCard>
              <CardHead>
                <span>{renderDate()}</span> 업로드
              </CardHead>
              <h4>{postData.title}</h4>
              <CardFooter>
                <li className={postData.categoryParentId === 1 ? 'study' : 'hobby'}>
                  {
                    cateogoryAll.filter(
                      (category) => `${postData.categoryId}` === category.value,
                    )[0].name
                  }
                </li>
                <li>{postData.approachCode ? '오프라인' : '온라인'}</li>
                <li>{`${postData.recruitedCrew}/${postData.totalCrew}명`}</li>
              </CardFooter>
            </ClassificationCard>
            <Notification>
              <li>
                {'마이페이지 > 나의 활동 크루 > 내가쓴 마감글에서 마감일을 연장할 수 있습니다.'}
              </li>
            </Notification>
            <ButtonWrap>
              <ButtonCancel onClick={closeModal}>취소</ButtonCancel>
              <Button
                widthSize={113}
                heightSize={50}
                color="pink"
                loadings={loading}
                onClick={handleCloseDown}
              >
                모집마감
              </Button>
            </ButtonWrap>
          </Body>
        </Wrapper>
      }
    ></Modal>
  );
}

export default PostCloseDownModal;

const Notification = styled('div')`
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: 13px;
  line-height: 19px;
  color: #a8a8a8;
  margin-top: 32px;
`;
