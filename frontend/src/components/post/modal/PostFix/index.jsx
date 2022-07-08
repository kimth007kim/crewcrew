import { cateogoryAll } from '@/frontDB/filterDB';
import fetcher from '@/utils/fetcher';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import useSWR from 'swr';
import Button from '../../../common/Button';
import Modal from '../../../common/Modal';
import HeaderContent1 from './HeaderContent1';
import HeaderContent2 from './HeaderContent2';
import MainContent from './MainContent';

function PostFixModal({ closeModal, visible, category = 0, postData = null }) {
  const cookies = new Cookies();
  const { data: myData, error: myError } = useSWR(
    ['/auth/token', cookies.get('X-AUTH-TOKEN')],
    fetcher,
  );

  const nowDate = new Date();

  const [categoryCheck, setCategoryCheck] = useState(category);
  const [meetingCheck, setMeetingCheck] = useState(0);
  const [peopleNum, setPeopleNum] = useState(1);
  const [categoryValue, setCategoryValue] = useState('');
  const [lastDate, setLastDate] = useState(new Date(nowDate.setDate(nowDate.getDate() + 1)));
  const [detailCategoryCheck, setDetailCategoryCheck] = useState(0);
  const [inviteLink, setInviteLink] = useState('');
  const [titleText, setTitleText] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const bodyRef = useRef(null);
  const editorRef = useRef(null);

  const handlePostUpload = async () => {
    try {
      setLoading(true);

      if (detailCategoryCheck === 0) {
        toast.error('카테고리를 선택해주세요');
        return;
      }

      if (inviteLink === '') {
        toast.error('초대링크를 입력해주세요');
        return;
      }

      if (titleText === '') {
        toast.error('제목을 입력해주세요');
        return;
      }

      if (editorRef.current?.getInstance().getMarkdown() === '') {
        toast.error('내용을 입력해주세요');
        return;
      }

      const expiredDate = format(lastDate, 'yyyy-MM-dd');

      const context = {
        approachCode: meetingCheck,
        boardContent: editorRef.current?.getInstance().getMarkdown(),
        categoryId: detailCategoryCheck,
        expiredDate: expiredDate,
        kakaoChat: inviteLink,
        title: titleText,
        totalCrew: peopleNum,
        recruitedCrew: postData.recruitedCrew,
      };

      const { data } = await axios.put(`/board/${postData.boardId}`, context, {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });

      switch (data.status) {
        case 200:
          setLoading(false);
          closeModal();
          navigate(`/post/${data.data.boardId}?page=1`);
          toast.success('성공적으로 변경되었습니다.');

          break;
        case 2001:
        case 2101:
        case 2102:
        case 2103:
        case 2104:
        case 2105:
        case 2106:
        case 2107:
        case 2109:
          setLoading(false);
          toast.error(data.message);
          break;
        case 2110:
        case 2111:
          // 유저 정보
          toast.error(data.message);
          setLoading(false);
          closeModal();
          break;
        default:
          setLoading(false);
          toast.error(data.message);
          break;
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category === 1) {
      setCategoryCheck(1);
    } else {
      setCategoryCheck(0);
    }
  }, [category]);

  const initialData = useCallback(() => {
    if (postData.categoryParentId === 2) {
      setCategoryCheck(1);
    }
    if (postData.approachCode === 1) {
      setMeetingCheck(1);
    }
    if (postData.totalCrew) {
      setPeopleNum(postData.totalCrew);
    }
    if (postData.expiredDate) {
      setLastDate(new Date(postData.expiredDate));
    }
    if (postData.kakaoChat) {
      setInviteLink(postData.kakaoChat);
    }
    if (postData.title) {
      setTitleText(postData.title);
    }
    if (postData.categoryId) {
      setDetailCategoryCheck(postData.categoryId);
      const categoryName = cateogoryAll.filter((v) => postData.categoryId === Number(v.value))[0]
        .name;
      setCategoryValue(categoryName);
    }
  }, [postData]);

  useEffect(() => {
    initialData();
  }, [visible]);

  if (!myData || !myData.data || myError) {
    return null;
  }

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
          <Body ref={bodyRef}>
            <HeaderContent1
              state={{
                categoryCheck,
                setCategoryCheck,
                detailCategoryCheck,
                setDetailCategoryCheck,
                categoryValue,
                setCategoryValue,
              }}
            ></HeaderContent1>
            <HeaderContent2
              state={{
                meetingCheck,
                setMeetingCheck,
                peopleNum,
                setPeopleNum,
                lastDate,
                setLastDate,
              }}
            />
            <MainContent
              ref={editorRef}
              state={{
                inviteLink,
                setInviteLink,
                titleText,
                setTitleText,
              }}
              text={postData && postData.boardContent}
            ></MainContent>
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
                <Button
                  fontSize={15}
                  types="fill"
                  size="fullregular"
                  color="lightBlue"
                  onClick={handlePostUpload}
                  loadings={loading}
                >
                  수정
                </Button>
              </li>
            </ListFlex>
          </Footer>
        </Wrapper>
      }
    />
  );
}

export default PostFixModal;

const Wrapper = styled('div')`
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
  @media screen and (max-width: 820px) {
    padding: 18px 0 24px;
  }
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

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 820px) {
    padding: 0 18px;
    height: calc(100% - 90px);
  }
`;

const Footer = styled('div')`
  width: fit-content;
  margin-top: 34px;
  margin-left: auto;

  @media screen and (max-width: 820px) {
    width: 100%;
    padding: 0 18px;
    box-sizing: border-box;
    margin-top: 40px;
  }
`;

const ListFlex = styled('ul')`
  display: flex;
  gap: 15px;

  li {
    width: 112px;
  }

  @media screen and (max-width: 820px) {
    gap: 8px;

    li {
      width: 100%;
    }
  }
`;
