import React from 'react';
import styled from 'styled-components';
import IconButtonArrow from '@/assets/images/ButtonArrow.png';
import IconButtonArrowGhost from '@/assets/images/ButtonArrowGhost.png';

function NavButton({ ghost, title, clickFunc }) {
  return (
    <NavButtonListLi>
      {ghost ? (
        <ButtonFull2Ghost type="button" onClick={clickFunc}>
          {title}
          <ButtonFull2Ghostspan />
        </ButtonFull2Ghost>
      ) : (
        <ButtonFull2 type="button" onClick={clickFunc}>
          {title}
          <ButtonFull2span />
        </ButtonFull2>
      )}
    </NavButtonListLi>
  );
}

export default NavButton;

const NavButtonListLi = styled.li`
  width: 100%;
  margin-bottom: 15px;
  box-sizing: content-box;

  @media screen and (max-width: 820px) {
    margin-right: 5px;
    :last-child {
      margin-right: 0px;
    }

    width: 100%;
    margin-bottom: 0;
  }
`;

const ButtonFull2 = styled.button`
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  transition: 0.3s;
  padding-top: 17px;
  padding-bottom: 17px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 25px;
  line-height: 16px;
  background-color: #005ec5;
  height: 50px;
  color: #fff;
  padding-left: 26px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  :hover {
    background-color: #00b7ff;
  }

  @media screen and (max-width: 820px) {
    padding: 8px 0;
    height: 30px;
    font-size: 11px;

    justify-content: center;
  }
`;

const ButtonFull2Ghost = styled.button`
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  transition: 0.3s;
  padding-top: 17px;
  padding-bottom: 17px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 25px;
  line-height: 16px;
  background-color: #fff;
  height: 50px;
  color: #707070;
  padding-left: 26px;
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e2e2e2;
  :hover {
    border: 1px solid #a8a8a8;
  }

  @media screen and (max-width: 820px) {
    padding: 8px 0;
    height: 30px;
    font-size: 11px;
    justify-content: center;
  }
`;

const ButtonFull2span = styled.span`
  background: url(${IconButtonArrow}) 50% 50% no-repeat;
  background-size: 100% !important;

  @media screen and (max-width: 820px) {
    display: none;
  }
  width: 6px;
  height: 12px;
`;

const ButtonFull2Ghostspan = styled.span`
  background: url(${IconButtonArrowGhost}) 50% 50% no-repeat;
  color: #707070;
  background-size: 100% !important;
  width: 6px;
  height: 12px;
  @media screen and (max-width: 820px) {
    display: none;
  }
`;
