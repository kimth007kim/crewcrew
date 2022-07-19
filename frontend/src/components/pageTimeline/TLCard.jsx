import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import LogInCheckOff from '@/assets/images/LogInCheck_off.png';
import LogInCheckOn from '@/assets/images/LogInCheck_on.png';
import ChatShow from '@/assets/images/ChatShow.png';
import { BtnOpened, DataLists } from '@/atoms/timeline';
import { useRecoilState } from 'recoil';
import dayjs from 'dayjs';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function TLCard({ data, isLast }) {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [category, setCategory] = useState('study');
  const [isCheck, setIsCheck] = useState(false);
  const [btnOpen, setBtnOpen] = useRecoilState(BtnOpened);
  const [dataLists, setDataLists] = useRecoilState(DataLists);
  const hobbyCat = ['예술', '요리', '운동', '게임', '덕질', '트렌드', '취미기타'];
  const Date = dayjs(data.createdDate).format('YY/MM/DD HH:mm');
  const [detailState, setDetailState] = useState('nega');

  const changeProps = (e) => {
    const value = `${data.announcementId}`;
    if (e.target.checked) {
      setDataLists([...dataLists, value]);
    } else if (!e.target.checked && dataLists.find((one) => one === value)) {
      const filter = dataLists.filter((one) => one !== value);
      setDataLists([...filter]);
    }
  };
  const renderDetail = () => {
    if (data.announceType === 1) {
      return (
        <Detail State={detailState} Disabled={data.readChk}>
          <em>{data.nickname}</em>님이 회원님의 글에 <b>참여요청</b>하였습니다.
        </Detail>
      );
    } else if (data.announceType === 2) {
      return (
        <Detail State={detailState} Disabled={data.readChk}>
          <em>{data.boardTitle}</em>에서 회원님의 <b>참여요청을 거절</b>하였습니다.
        </Detail>
      );
    } else if (data.announceType === 3) {
      return (
        <Detail State={detailState} Disabled={data.readChk}>
          <em>{data.boardTitle}</em>에서 회원님의 <b>참여요청을 수락</b>하였습니다.
        </Detail>
      );
    } else if (data.announceType === 4) {
      return (
        <Detail State={detailState} Disabled={data.readChk}>
          <em>{data.boardTitle}</em>님이 회원님의 <b>참여를 취소</b>하였습니다.
        </Detail>
      );
    }
  };

  const navigateDetail = () => {
    if (data.announceType === 1) {
      return navigate(`/mypage/activity`);
    }
    if (data.announceType === 2) {
      return navigate(`/mypage/request`);
    }
    if (data.announceType === 3) {
      return navigate(`/mypage/request`);
    }
    if (data.announceType === 4) {
      return navigate(`/mypage/request`);
    }
  };

  const readDetail = async () => {
    if (data.readChk) {
      navigateDetail();
      return false;
    }
    try {
      const timelineData = await axios.put(`/timeline/${data.announcementId}`, '', {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      if (timelineData.data.status === 200) {
        navigateDetail();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    hobbyCat.forEach((e) => {
      e === data.categoryName && setCategory('hobby');
    });
    if (data.announceType === 1 || data.announceType === 3) {
      setDetailState('posi');
    }
  }, [data]);

  useEffect(() => {
    if (dataLists.includes(`${data.announcementId}`)) {
      setIsCheck(true);
    } else {
      setIsCheck(false);
    }
  }, [dataLists]);

  return (
    <>
      <TLCardSet isOpen={btnOpen}>
        <InputHide
          type={'checkbox'}
          id={data.announcementId}
          onChange={(e) => changeProps(e)}
          checked={isCheck}
        />
        <LabelCheck htmlFor={data.announcementId}>
          <span />
        </LabelCheck>
      </TLCardSet>
      <TLCardboxWrapper isLast={isLast}>
        <TLCardbox Cat={category} State={detailState} Disabled={data.readChk} onClick={readDetail}>
          <Title Cat={category} Disabled={data.readChk}>
            <em>{data.categoryName}</em>
            {Date}
          </Title>
          {renderDetail()}
        </TLCardbox>
      </TLCardboxWrapper>
    </>
  );
}

export default TLCard;

const TLCardSet = styled('div')`
  width: 0;
  padding-top: 34px;
  transition: 0.5s;
  overflow: hidden;

  ${(props) =>
    props.isOpen &&
    css`
      width: 48px;
    `}
`;

const LabelCheck = styled('label')`
  display: block;
  line-height: 21px;
  cursor: pointer;
  user-select: none;
  white-space: nowrap;

  span {
    display: block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background: url(${LogInCheckOff}) center/100% no-repeat;
    transition: background 0.2s;
  }
`;

const InputHide = styled('input')`
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  position: absolute;
  display: none;

  &:checked ~ ${LabelCheck} span {
    background: url(${LogInCheckOn});
    background-size: 100%;
  }
`;

const TLCardboxWrapper = styled('div')`
  padding: 34px 0 6px;
  width: 100%;
  border-left: 1px solid #e2e2e2;

  @media screen and (max-width: 820px) {
    padding: 18px 0 6px;
  }

  ${(props) =>
    props.isLast &&
    css`
      padding-bottom: 24px !important;
    `}
`;

const TLCardbox = styled('div')`
  margin-left: 22px;
  height: 100px;
  border-radius: 10px;
  background-color: #fff;
  border: 2px solid #e2e2e2;
  position: relative;
  padding: 12px;
  box-sizing: border-box;
  cursor: pointer;
  transition: 0.3s;

  &::before {
    content: '';
    display: block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #fff;
    position: absolute;
    left: -34px;
    top: 0;
    box-sizing: border-box;
  }

  @media screen and (max-width: 820px) {
    padding: 10px;
    height: auto;
    margin-left: 15px;

    &::before {
      width: 14px;
      height: 14px;
      left: -25px;
    }
  }

  ${(props) =>
    props.State === 'posi'
      ? css`
          &::before {
            border: 3px solid #00b7ff;
          }
        `
      : css`
          &::before {
            border: 3px solid #ff0045;
          }
        `}
  ${(props) =>
    props.Disabled &&
    css`
      &::after {
        content: '읽음';
        display: block;
        width: 20px;
        text-align: center;
        position: absolute;
        padding-top: 20px;
        font-size: 11px;
        color: #a8a8a8;
        top: 10px;
        right: 14px;
        background: url(${ChatShow}) top center/20px no-repeat;

        @media screen and (max-width: 820px) {
          padding-top: 2px;
          text-indent: -9999px;
          top: 9px;
        }
      }
    `}
`;

const Title = styled('p')`
  display: flex;
  align-items: center;
  font-size: 13px;
  font-weight: 500;
  color: #a8a8a8;

  em {
    font-size: 20px;
    margin-right: 18px;
  }

  @media screen and (max-width: 820px) {
    em {
      font-size: 15px;
      margin-right: 8px;
    }
  }

  ${(props) =>
    props.Cat === 'study'
      ? css`
          em {
            color: #0f3fa6;
          }
        `
      : css`
          em {
            color: #f7971e;
          }
        `}
  ${(props) =>
    props.Disabled &&
    css`
      em {
        color: #c4c4c4;
      }
    `}
`;

const Detail = styled('p')`
  font-size: 17px;
  font-weight: 500;
  color: #868686;
  margin-top: 18px;

  em {
    color: #000;
    font-weight: 700;
  }

  b {
    font-weight: 500;
  }

  @media screen and (max-width: 820px) {
    margin-top: 10px;
    line-height: 22px;
    font-size: 15px;
  }

  ${(props) =>
    props.State === 'posi'
      ? css`
          b {
            color: #00b7ff;
          }
        `
      : css`
          b {
            color: #ff0045;
          }
        `}
  ${(props) =>
    props.Disabled &&
    css`
      b {
        color: #c4c4c4;
      }
    `}
`;
