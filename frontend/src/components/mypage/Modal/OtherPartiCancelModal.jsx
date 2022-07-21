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

function OtherPartiCancelModal({ closeModal, visible, apData, postData, handleReloadAppId }) {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);

  const renderDate = useCallback(() => {
    const date = new Date(apData.appliedDate.replace(/-/g, '/'));
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
          apId: apData.apId,
          statusCode: 3,
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
          handleReloadAppId(apData.apId + 'cancelRequest');
          closeModal();
          toast.success('성공적으로 취소되었습니다.');
          break;
        case 2301:
          closeModal();
          toast.error(data.message);
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
            <span>{apData.nickName}</span>의 크루참여를 취소하시겠습니까?
            <br />
            참여취소시 해당 크루원에게 소식이 전달됩니다.
          </TitleMsg>
        </Header>
      }
      body={
        <Wrapper>
          <Body>
            <Classification>참여취소하는 크루</Classification>
            <ClassificationCard>
              <CardHead>
                <span>{renderDate()}</span> 참여중
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
              <ButtonCancel onClick={closeModal}>취소</ButtonCancel>
              <Button
                widthSize={113}
                heightSize={50}
                color="pink"
                loadings={loading}
                onClick={cancelRequest}
              >
                참여취소
              </Button>
            </ButtonWrap>
          </Body>
        </Wrapper>
      }
    ></Modal>
  );
}

export default OtherPartiCancelModal;
