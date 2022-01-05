import React from 'react';
import styled from 'styled-components';
import Modal from '../../components/common/Modal';

function AuthModal({ closeModal, visible }) {
  return (
    <Modal
      handleClose={closeModal}
      header={<div>탑</div>}
      body={<div>여기</div>}
      visible={visible}
      footer={<div>푸터</div>}
    />
  );
}

export default AuthModal;

const ModalTitle = styled.div``;
