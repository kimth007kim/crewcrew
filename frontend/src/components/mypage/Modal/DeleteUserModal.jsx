import Modal from '@/components/common/Modal';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Cookies } from 'react-cookie';
import { toast } from 'react-toastify';
import { ButtonCancel, ModalClose } from './modal.style';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';
import DeleteCheck from '@/assets/images/DeleteCheck.png';
import SuccessCheck from '@/assets/images/SuccessCheck.png';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';

function DeleteUserModal({ closeModal, visible }) {
  const cookies = new Cookies();
  const { mutate } = useSWR(['/auth/token', cookies.get('X-AUTH-TOKEN')], fetcher);

  const [loading, setLoading] = useState(false);
  const [nextStep, setNextStep] = useState(false);
  const navigate = useNavigate();

  const handleClose = useCallback(() => {
    closeModal();
    if (nextStep) {
      navigate('/');
      window.location.reload();
      return;
    }
  }, [nextStep]);

  const handleDeleteUser = useCallback(async () => {
    if (!cookies.get('X-AUTH-TOKEN')) {
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.delete(`/auth/user`, {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      setLoading(false);

      switch (data.status) {
        case 200:
          toast.success('성공적으로 회원탈퇴되었습니다.');
          mutate('/auth/token');
          setNextStep(true);
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

  const renderContent = () => {
    if (nextStep) {
      return (
        <>
          <img src={SuccessCheck} alt="" />
          <h4>회원탈퇴 완료</h4>
          <span>
            크루크루 회원탈퇴가 완료되었습니다. <br />
            크루크루는 언제든지 회원님을 환영합니다.
          </span>
        </>
      );
    }

    return (
      <>
        <img src={DeleteCheck} alt="" />
        <h4>정말 탈퇴하실건가요?</h4>
        <span>
          지금 탈퇴하시면 지금까지의 모든 기록이 사라지게 됩니다. <br />
          그래도 탈퇴하실 건가요?
        </span>
      </>
    );
  };

  return (
    <Modal
      handleClose={handleClose}
      visible={visible}
      size="regular"
      heightSize={685}
      body={
        <Body>
          <CompleteHeader>
            <Top>
              <div />
              <div>
                <ModalClose onClick={handleClose} />
              </div>
            </Top>
          </CompleteHeader>
          <Wrap>{renderContent()}</Wrap>
          <BtnWrap>
            {nextStep ? (
              <Button widthSize={113} heightSize={50} color="lightBlue" onClick={handleClose}>
                홈으로
              </Button>
            ) : (
              <>
                <ButtonCancel onClick={handleClose}>취소</ButtonCancel>
                <Button
                  widthSize={113}
                  heightSize={50}
                  color="pink"
                  loadings={loading}
                  onClick={handleDeleteUser}
                >
                  회원탈퇴
                </Button>
              </>
            )}
          </BtnWrap>
        </Body>
      }
    ></Modal>
  );
}

export default DeleteUserModal;

const CompleteHeader = styled('div')`
  padding-bottom: 10px;
  box-sizing: content-box;
  @media screen and (max-width: 820px) {
  }
`;

const Top = styled('div')`
  display: flex;
  justify-content: space-between;

  margin-top: 10px;

  @media screen and (max-width: 820px) {
    margin-top: 20px;
    margin-bottom: 25px;
  }

  & > div {
    display: flex;
    justify-content: flex-end;
  }
`;

const Body = styled('div')`
  padding: 40px;
  background-color: #fff;
  z-index: 1;
  transition: 0.5s;
  color: #868686;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 820px) {
    padding: 0 20px;
    width: 100%;
    margin-top: -1px;
    border-radius: 0;
    transition: 0.5s;
    padding-bottom: 20px;

    overflow-y: auto;
    ::-webkit-scrollbar {
      display: none;
    }
  }
`;

const Wrap = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;

  img {
    width: 170px;
    height: 170px;
    object-fit: cover;
  }

  h4 {
    font-size: 32px;
    line-height: 40px;
    font-weight: 700;
    text-align: center;
    margin-top: 38px;
    color: #000000;
  }

  span {
    font-weight: 500;
    font-size: 13px;
    line-height: 23px;
    text-align: center;
    margin-top: 38px;
  }
`;

const BtnWrap = styled('div')`
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;
