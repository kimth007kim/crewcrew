import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import StarOff from '@/assets/images/ButtonStar.png';
import StarOn from '@/assets/images/ButtonStarOn.png';
import SettingWhite from '@/assets/images/SettingWhite.png';
import Markdown from '@/lib/Markdown';
import { renderDate, renderDay } from '@/utils';
import { cateogoryAll } from '@/frontDB/filterDB';
import axios from 'axios';
import { Cookies } from 'react-cookie';
import { useRecoilState, useRecoilValue } from 'recoil';
import { changedBookmark } from '@/atoms/post';
import useModal from '@/hooks/useModal';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import ParticipateModal from '../modal/Participate';
import { loginCheck } from '@/atoms/login';
import PostDeleteModal from '@/components/common/DeleteModal/PostDeleteModal';
import PostFixModal from '../modal/PostFix';
import ProfileTooltip from '../tooltip/ProfileTooltip';
import { tooltipBoardId } from '@/atoms/profile';

function MainPost({ data }) {
  const cookies = new Cookies();
  const { data: myData } = useSWR(['/auth/token', cookies.get('X-AUTH-TOKEN')], fetcher);

  const [IsDisable, setIsDisable] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(1);
  const [currentBoardId, setCurrentBoardId] = useRecoilState(tooltipBoardId);
  const [bookmarkChanged, setBookmarkChanged] = useRecoilState(changedBookmark);
  const isLogin = useRecoilValue(loginCheck);

  const [participateVisible, openParticipate, closeParticipate] = useModal();
  const [deleteVisible, openDelete, closeDelete] = useModal();
  const [fixVisible, openFix, closeFix] = useModal();

  const bookmarkClick = async () => {
    try {
      if (myData && !myData.data) {
        const login = window.alert('로그인 후 이용가능합니다.');
        return;
      }
      if (!isBookmarked) {
        const bookmarkdata = await axios.post(`/bookmark/${data.boardId}`, '', {
          withCredentials: true,
          headers: {
            'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
          },
        });
        if (bookmarkdata.data.status === 200) {
          bookmarkChange();
        }
      } else {
        const bookmarkdata = await axios.delete(`/bookmark/${data.boardId}`, {
          withCredentials: true,
          headers: {
            'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
          },
        });
        if (bookmarkdata.data.status === 200) {
          bookmarkChange();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const bookmarkGet = useCallback(async () => {
    try {
      if (myData && !myData.data) {
        return;
      }
      const bookmarkdata = await axios.get(`/bookmark/${data.boardId}`, {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      bookmarkdata.data.status === 200 && setIsBookmarked(bookmarkdata.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [myData]);

  const bookmarkChange = () => {
    setBookmarkChanged((state) => !state);
  };

  const handleOpenPartiModal = (e) => {
    e.stopPropagation();
    if (myData && myData.data) {
      if (data.uid === myData.data.uid) {
        return openFix();
      }
      openParticipate();
    } else {
      const login = window.alert('로그인 후 이용가능합니다.');
    }
  };

  const viewTooltip = useCallback(
    (e, position) => {
      e.stopPropagation();
      setTooltipPosition(position);
      setCurrentBoardId(data.boardId);
      setTooltip(true);
    },
    [tooltip],
  );

  useEffect(() => {
    if (currentBoardId !== data.boardId) {
      setTooltip(false);
    }
  }, [currentBoardId]);

  useEffect(() => {
    const bool = !data.viewable || renderDay(data.expiredDate) < 0;
    setIsDisable(bool);
  }, []);

  useEffect(() => {
    let recentPost = JSON.parse(localStorage.getItem('recentPost'));

    if (myData?.data) {
      const uid = String(myData.data.uid);
      if (!recentPost) {
        recentPost = {};
      }

      let recentArr = [];
      if (recentPost[uid]) {
        recentArr = recentPost[uid];
        recentArr = recentArr.filter((id) => id !== data.boardId);
      }
      recentArr.push(data.boardId);

      if (Array.isArray(recentPost[uid])) {
        recentPost[uid] = recentArr;
      } else {
        recentPost[uid] = [data.boardId];
      }

      localStorage.setItem('recentPost', JSON.stringify(recentPost));
    }
  }, []);

  useEffect(() => {
    bookmarkGet();
  }, [bookmarkChanged, isLogin]);

  return (
    <>
      <Container>
        <Wrapper>
          <ul>
            <li>{IsDisable ? '마감' : `D-${renderDay(data.expiredDate)}`}</li>
            <li onClick={(e) => viewTooltip(e, 3)}>{data.nickname}</li>
            <li>{renderDate(data.createdDate)}</li>
            {myData && myData.data?.uid && tooltip && (
              <ProfileTooltip
                data={data}
                position={tooltipPosition}
                open={tooltip}
                setOpen={setTooltip}
              />
            )}
          </ul>
          <TitleMobile>{data.title}</TitleMobile>
          <ul>
            <li>
              <h4>{data.title}</h4>
            </li>
            <li>
              <ButtonStar type="button" onClick={bookmarkClick} bookmark={isBookmarked} />
            </li>
            {myData?.data?.uid === data.uid && (
              <li className="mypost">
                <Button className="delete" onClick={openDelete}>
                  삭제
                </Button>
              </li>
            )}
            <li className={myData?.data?.uid === data.uid ? 'mypost' : ''}>
              <Button
                type="button"
                disabled={IsDisable}
                onClick={handleOpenPartiModal}
                myPost={myData?.data?.uid === data.uid}
              >
                참여하기
              </Button>
            </li>
          </ul>
          <TopUList textColor={data.categoryParentId === 1 ? '#005ec5' : '#F7971E'}>
            <li>
              {cateogoryAll.filter((category) => `${data.categoryId}` === category.value)[0].name}
            </li>
            <li>{data.approachCode ? '오프라인' : '온라인'}</li>
            <li>{`${data.recruitedCrew}/${data.totalCrew}명`}</li>
            <li>{`조회수 ${data.hit}`}</li>
          </TopUList>
          <MarkDownbody>
            <Markdown>{data.boardContent}</Markdown>
          </MarkDownbody>
        </Wrapper>
      </Container>
      <ParticipateModal
        closeModal={closeParticipate}
        postData={data}
        visible={participateVisible}
      />

      <PostDeleteModal
        visible={deleteVisible}
        closeModal={closeDelete}
        postData={data}
      ></PostDeleteModal>
      <PostFixModal visible={fixVisible} closeModal={closeFix} postData={data}></PostFixModal>
    </>
  );
}

export default MainPost;

const Container = styled('section')`
  padding: 60px 0 94px;
  background-color: #f6f7fb;

  @media screen and (max-width: 820px) {
    padding: 42px 0 66px;
  }
`;

const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;
  max-width: 850px;
  margin: auto;
  position: relative;

  ul {
    position: relative;
    display: flex;
    align-items: center;

    li {
      color: #a8a8a8;
      font-weight: 400;
    }

    &:nth-of-type(1) {
      gap: 24px;

      li {
        font-size: 15px;
      }

      li:first-child {
        margin-right: 10px;
        font-size: 20px;
        font-weight: 700;
        color: #00b7ff;
      }

      li:nth-child(2) {
        color: #000;
        cursor: pointer;
      }
    }

    &:nth-of-type(2) {
      margin: 10px 0 18px;
      gap: 8px;

      li:first-child {
        margin-right: auto;
        h4 {
          font-size: 20px;
          color: #000;
        }
      }

      li:not(:first-child) {
        width: 78px;

        &.mypost {
          width: 50px;
        }
      }
    }
  }

  @media screen and (max-width: 820px) {
    padding: 0 20px;
    ul {
      &:nth-of-type(1) {
        margin-bottom: 12px;
        li {
          font-size: 13px;
        }

        li:first-child {
          font-size: 13px;
        }

        li:nth-child(2) {
          color: #000;
        }
      }

      &:nth-of-type(2) {
        order: 1;
        margin: 14px 0;
        gap: 10px;

        li:first-child {
          display: none;
        }

        li:not(:first-child) {
          width: 100%;

          &.mypost {
            width: 100%;
          }
        }
      }
    }
  }

  @media screen and (max-width: 300px) {
    padding: 0 10px;
    ul {
      &:nth-of-type(1) {
        gap: 14px;
      }
    }
  }
`;

const TopUList = styled('ul')`
  gap: 15px;

  li {
    font-size: 15px;
  }

  li:first-child {
    font-weight: 700;
    ${(props) =>
      props.textColor &&
      css`
        color: ${props.textColor};
      `}
  }

  @media screen and (max-width: 300px) {
    gap: 10px;

    li {
      font-size: 13px;
    }
  }
`;

const TitleMobile = styled('h4')`
  display: none;

  @media screen and (max-width: 820px) {
    font-size: 18px;
    margin-bottom: 14px;
    display: block;
  }
`;

const ButtonStar = styled('button')`
  width: 100%;
  border: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  transition: 0.3s;
  padding-top: 12px;
  padding-bottom: 12px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 10px;
  line-height: 26px;
  background-color: #fff;
  height: 50px;
  border: 1px solid #e2e2e2;
  color: #868686;
  background-repeat: no-repeat;
  background-size: 30px;
  background-position: 50%;
  transition: 0.3s;

  :hover {
    border: 1px solid #a8a8a8;
  }

  ${(props) =>
    props.bookmark
      ? css`
          background-image: url(${StarOn});
        `
      : css`
          background-image: url(${StarOff});
        `}
`;

const Button = styled('button')`
  width: 100%;
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

  :hover {
    background-color: #005ec5;
  }

  :disabled {
    background-color: #e2e2e2;
    cursor: default;
  }

  &.delete {
    background-color: #c4c4c4;
    :hover {
      background-color: #a8a8a8;
    }
  }

  ${(props) =>
    props.myPost &&
    css`
      text-indent: -9999px;
      background: #c4c4c4 url(${SettingWhite}) center/24px no-repeat;
      :hover {
        background-color: #a8a8a8;
      }
    `}
`;

const MarkDownbody = styled('div')`
  margin-top: 60px;
  width: 100%;
  min-height: 500px;
  border-radius: 10px;
  padding: 20px 12px;
  box-sizing: border-box;
  background-color: #fff;
  border: 1px solid #e2e2e2;

  @media screen and (max-width: 820px) {
    margin-top: 20px;
    min-height: 320px;
  }
`;
