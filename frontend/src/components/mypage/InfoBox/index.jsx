import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import InfoCat from './InfoCat';
import InfoProfile from './InfoProfile';

function InfoBox() {
  const [openBtn, setOpenBtn] = useState(false);

  const HandleOpenBtn = useCallback(() => {
    setOpenBtn(true);
  }, []);

  const HandleCloseBtn = useCallback(() => {
    setOpenBtn(false);
  }, []);

  return (
    <Container>
      <InfoTop>
        <h3>내 정보 관리</h3>
        <InfoBtnList>
          <InfoBtn active>프로필</InfoBtn>
          <InfoBtn>기본정보</InfoBtn>
        </InfoBtnList>
      </InfoTop>
      <InfoBody open={openBtn}>
        <InfoProfile />
        <InfoCat />
      </InfoBody>
      {openBtn ? (
        <ButtonSave onClick={HandleCloseBtn}>저장</ButtonSave>
      ) : (
        <ButtonSave onClick={HandleOpenBtn}>프로필 관리하기</ButtonSave>
      )}
    </Container>
  );
}

export default InfoBox;

const Container = styled('div')`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgb(0 0 0 / 10%);
  padding: 20px;
  box-sizing: border-box;
  width: 100%;
  min-width: 428px;
  height: 480px;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 820px) {
    min-width: 100%;
    height: auto;
  }

  @media screen and (max-width: 300px) {
    padding: 20px 10px 10px;
  }
`;

const InfoTop = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  @media screen and (max-width: 820px) {
    margin-bottom: 20px;
  }
`;

const InfoBtnList = styled('ul')`
  display: flex;
  gap: 12px;
`;

const InfoBtn = styled('button')`
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 5px;
  padding: 6px 8px;
  font-size: 13px;
  outline: none;
  cursor: pointer;

  ${(props) =>
    props.active &&
    css`
      color: #00b7ff;
      border: 1px solid #00b7ff;
      cursor: default;
    `}
`;

const InfoBody = styled('div')`
  height: auto;
  @media screen and (max-width: 820px) {
    margin-top: 12px;
    overflow: hidden;
    transition: 0.5s;
    height: 0px;
    ${(props) =>
      props.open &&
      css`
        height: 470px;
      `}
  }
`;
const ButtonSave = styled('button')`
  border: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  transition: 0.3s;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  line-height: 26px;
  background-color: #00b7ff;
  height: 50px;
  color: #fff;
  margin-top: auto;
  margin-left: auto;
  width: 112px;

  :hover {
    background-color: #005ec5;
  }

  @media screen and (max-width: 820px) {
    width: 100%;
    :hover {
      background-color: #00b7ff !important;
    }
  }
`;
