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

function RequestCancelModal({ closeModal, visible, postData, handleReloadApId }) {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);

  const renderDate = useCallback(() => {
    const date = new Date(postData.createdDate.replace(/-/g, '/'));
    return `${format(date, 'MM월 dd일')}`;
  }, []);

  const cancelRequest = useCallback(async () => {
    if (!cookies.get('X-AUTH-TOKEN')) {
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.put(
        `/application/status`,
        {
          apId: postData.apId,
          statusCode: 5,
        },
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
          handleReloadApId(postData.apId + 'cancel');
          closeModal();
          toast.success('성공적으로 요청이 취소되었습니다.');
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

  if (!postData) {
    return null;
  }

  return (
    <Modal
      handleClose={() => {
        if (!loading) {
          closeModal();
        }
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
                  if (!loading) {
                    closeModal();
                  }
                }}
              ></ModalClose>
            </li>
          </ModalTop>
          <TitleMsg>
            회원님의 요청을 취소하시겠습니까?
            <br />
            지금 취소하면 모집자에게도 요청이 보이지 않아요!
          </TitleMsg>
        </Header>
      }
      body={
        <Wrapper>
          <Body>
            <Classification>취소하는 요청</Classification>
            <ClassificationCard>
              <CardHead>
                <span>{renderDate()}</span> 요청완료
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

            <ButtonWrap>
              <ButtonCancel
                onClick={() => {
                  if (!loading) {
                    closeModal();
                  }
                }}
              >
                취소
              </ButtonCancel>
              <Button
                widthSize={113}
                heightSize={50}
                color="pink"
                loadings={loading}
                onClick={cancelRequest}
              >
                요청취소
              </Button>
            </ButtonWrap>
          </Body>
        </Wrapper>
      }
    ></Modal>
  );
}

export default RequestCancelModal;
