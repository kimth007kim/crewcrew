import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import InfoCat from './InfoCat';
import InfoInputList from './InfoInputList';
import InfoProfile from './InfoProfile';
import MyInfoInput from './section/MyInfoInput';
import MyInfoProfile from './section/MyInfoProfile';

function InfoBox() {
  const [openBtn, setOpenBtn] = useState(false);
  const [myInfoTab, setMyInfoTab] = useState(1);

  const HandleOpenBtn = useCallback(() => {
    setOpenBtn(true);
  }, []);

  const HandleCloseBtn = useCallback(() => {
    if (window.innerWidth > 768) {
      return null;
    }
    setOpenBtn(false);
  }, []);

  const HandleInfoTab = useCallback((tabNum) => setMyInfoTab(tabNum), [myInfoTab]);

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setOpenBtn(true);
    } else if (!openBtn) {
      setOpenBtn(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Container>
      <InfoTop>
        <h3>내 정보 관리</h3>
        <InfoBtnList>
          <InfoBtn active={myInfoTab === 1} onClick={() => HandleInfoTab(1)}>
            프로필
          </InfoBtn>
          <InfoBtn active={myInfoTab === 2} onClick={() => HandleInfoTab(2)}>
            기본정보
          </InfoBtn>
        </InfoBtnList>
      </InfoTop>

      {myInfoTab === 1 ? <MyInfoProfile open={openBtn} /> : <MyInfoInput open={openBtn} />}

      {!openBtn && <ButtonSave onClick={HandleOpenBtn}>프로필 관리하기</ButtonSave>}
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
        height: ${props.size === 1 ? '470px' : '300px'};
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
