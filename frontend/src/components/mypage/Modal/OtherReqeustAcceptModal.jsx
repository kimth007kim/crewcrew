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

function OtherReqeustAcceptModal({ closeModal, visible, postData, apData, handleReloadAppId }) {
  const cookies = new Cookies();
  const [loading, setLoading] = useState(false);

  const renderDate = useCallback(() => {
    const date = new Date(postData?.createdDate.replace(/-/g, '/'));
    return `${format(date, 'MM월 dd일')}`;
  }, []);

  const handleAcceptRequest = useCallback(async () => {
    setLoading(true);
    try {
      const { data: acceptData } = await axios.put(
        `/application/status`,
        {
          apId: apData.apId,
          statusCode: 2,
        },
        {
          withCredentials: true,
          headers: {
            'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
          },
        },
      );
      setLoading(false);
      switch (acceptData.status) {
        case 200:
          handleReloadAppId(apData.apId + 'accept');
          break;
        case 2301:
          toast.error(apData.message);
          break;

        default:
          toast.error(apData.message);
          break;
      }
    } catch (error) {
      setLoading(false);
      console.dir(error);
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
            <span>{apData.nickName}</span>님의 참여요청을 수락하시겠습니까?
            <br />
            요청수락시 참여링크가 해당 회원에게 메일로 전달됩니다.
          </TitleMsg>
        </Header>
      }
      body={
        <Wrapper>
          <Body>
            <Classification>요청수락하는 크루</Classification>
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
                color="lightBlue"
                loadings={loading}
                onClick={handleAcceptRequest}
              >
                요청수락
              </Button>
            </ButtonWrap>
          </Body>
        </Wrapper>
      }
    ></Modal>
  );
}

export default OtherReqeustAcceptModal;
