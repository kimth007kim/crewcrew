import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '../../../common/Button';
import Modal from '../../../common/Modal';
import HeaderContent1 from './headerContent1';

function PostCreateModal({ closeModal, visible }) {
  const [categoryCheck, setCategoryCheck] = useState(0);
  return (
    <Modal
      handleClose={() => {
        closeModal();
      }}
      visible={visible}
      size="large"
      heightSize={850}
      body={
        <Wrapper>
          <Body>
            <HeaderContent1 state={{ categoryCheck, setCategoryCheck }}></HeaderContent1>
          </Body>
          <Footer>
            <ListFlex>
              <li>
                <Button
                  fontSize={15}
                  types="line"
                  size="fullregular"
                  color="white"
                  onClick={() => closeModal()}
                >
                  취소
                </Button>
              </li>
              <li>
                <Button fontSize={15} types="fill" size="fullregular" color="lightBlue">
                  업로드
                </Button>
              </li>
            </ListFlex>
          </Footer>
        </Wrapper>
      }
    />
  );
}

export default PostCreateModal;

const Wrapper = styled('div')`
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
`;

const Body = styled('div')`
  height: calc(100% - 81px);
  overflow-y: auto;

  h4 {
    font-size: 13px;
    font-weight: 500;
    color: #a8a8a8;
    margin-bottom: 8px;
  }
`;

const Footer = styled('div')`
  width: fit-content;
  margin-top: 34px;
  margin-left: auto;
`;

const ListFlex = styled('ul')`
  display: flex;
  margin-right: 0;
  gap: 15px;

  li {
    width: 112px;
  }
`;
