import Modal from '@/components/common/Modal';
import { cateogoryAll } from '@/frontDB/filterDB';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useCallback, useState } from 'react';
import { Cookies } from 'react-cookie';
import { toast } from 'react-toastify';
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

function HistoryDeleteModal({ closeModal, visible, postData, handleReloadApId }) {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);

  const renderDate = useCallback(() => {
    const date = new Date(postData.createdDate.replace(/-/g, '/'));
    return `${format(date, 'MM월 dd일')}`;
  }, []);

  const deleteHistory = useCallback(async () => {
    if (!cookies.get('X-AUTH-TOKEN')) {
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.delete(`/application/${postData.apId}`, {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      setLoading(false);

      switch (data.status) {
        case 200:
          handleReloadApId(postData.apId + 'delete');
          closeModal();
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
            내역을 삭제하시겠습니까?
            <br />
            지금 삭제하면 내역을 다시 확인할 수 없어요!
          </TitleMsg>
        </Header>
      }
      body={
        <Wrapper>
          <Body>
            <Classification>삭제되는 내역</Classification>
            <ClassificationCard isDisabled={true}>
              <CardHead>
                <span>{renderDate()}</span> 참여취소
              </CardHead>
              <h4>{postData.title}</h4>
              <CardFooter>
                <li>
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
              <ButtonCancel onClick={closeModal}>취소</ButtonCancel>
              <Button
                widthSize={113}
                heightSize={50}
                color="pink"
                loadings={loading}
                onClick={deleteHistory}
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

export default HistoryDeleteModal;
