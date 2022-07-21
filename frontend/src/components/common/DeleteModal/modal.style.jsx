import styled, { css } from 'styled-components';
import Close from '@/assets/images/ModalClose.png';

export const Wrapper = styled('div')`
  width: 100%;
  height: 100%;
  padding: 0 40px;
  box-sizing: border-box;
  @media screen and (max-width: 820px) {
    padding: 0 20px;
  }
`;

export const Header = styled('div')`
  margin: 0 40px;
  border-bottom: 1px solid #000;
  @media screen and (max-width: 820px) {
    margin: 0 20px;
  }
`;

export const Body = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 48px 0 40px;
  box-sizing: border-box;

  height: calc(100% - 168px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 820px) {
    height: calc(100% - 150px);
  }
  @media screen and (max-width: 300px) {
    height: calc(100% - 185px);
  }
`;

export const ModalTop = styled('ul')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  margin-top: 48px;
  height: 18px;

  @media screen and (max-width: 820px) {
    margin-top: 40px;
  }
`;

export const ModalClose = styled('span')`
  display: block;
  width: 14px;
  height: 14px;
  background: url(${Close});
  background-size: 100%;
  cursor: pointer;
  margin-right: 10px;
  @media screen and (max-width: 820px) {
    margin-right: 0;
  }
`;

export const TitleMsg = styled('p')`
  font-size: 18px;
  font-weight: 700;
  color: #000;
  line-height: 30px;
  padding-bottom: 23px;
  border-bottom: 1px solid #a8a8a8;

  @media screen and (max-width: 820px) {
    font-size: 16px;
    line-height: 24px;
  }
`;

export const Classification = styled('h4')`
  margin-bottom: 24px;
  text-align: center;
  font-size: 13px;
  font-weight: 500;
  color: #a8a8a8;
`;

export const ClassificationCard = styled('div')`
  border-left: 1px solid #a8a8a8;
  padding-left: 25px;
  display: flex;
  flex-direction: column;

  &.chat {
    gap: 12px;
    color: #000;
    align-items: flex-start;
  }

  h4 {
    font-size: 16px;
    font-weight: 700;
    color: #000;
    margin-bottom: 10px;

    ${(props) =>
      props.isDisabled &&
      css`
        color: #868686;
      `}
  }

  @media screen and (max-width: 300px) {
    padding-left: 16px;
  }
`;

export const CardHead = styled('p')`
  font-size: 14px;
  font-weight: 700;
  color: #000;
  margin-bottom: 18px;

  span {
    font-weight: 500;
  }
`;

export const CardFooter = styled('ul')`
  display: flex;
  gap: 12px;

  li {
    font-size: 12px;
    font-weight: 500;
    color: #868686;

    &.hobby {
      font-weight: 700;
      color: #f7971e;
    }

    &.study {
      font-weight: 700;
      color: #0f3fa6;
    }
  }
`;

export const ButtonWrap = styled('div')`
  margin-top: auto;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export const ButtonCancel = styled('button')`
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
  background-color: #c4c4c4;
  height: 50px;
  color: #fff;
  width: 113px;

  :hover {
    background-color: #b0b0b0;
  }

  @media screen and (max-width: 820px) {
    :hover {
      background-color: #c4c4c4 !important;
    }
  }
`;
