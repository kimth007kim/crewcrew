import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { format, getDay } from 'date-fns';
import ButtonStarWhite from '@/assets/images/ButtonStarWhite.png';
import ButtonStarOn from '@/assets/images/ButtonStarOn.png';
import SettingWhite from '@/assets/images/SettingWhite.png';
import ProfileNull from '@/assets/images/ProfileNull.png';
import { cateogoryAll } from '@/frontDB/filterDB';
import { renderDay, viewDay } from '@/utils';
import { useNavigate, useParams } from 'react-router-dom';
import useQuery from '@/hooks/useQuery';
import { Cookies } from 'react-cookie';
import axios from 'axios';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { changedBookmark } from '@/atoms/post';
import useModal from '@/hooks/useModal';
import ParticipateModal from './modal/Participate';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import { loginCheck } from '@/atoms/login';
import { lnbBookmarkDelete } from '@/atoms/post';
import ProfileTooltip from './tooltip/ProfileTooltip';
import { tooltipBoardId } from '@/atoms/profile';
import PostFixModal from './modal/PostFix';
import AuthModal from '../common/Auth/AuthModal';

function PostCard({ data }) {
  const cookies = new Cookies();
  const { data: myData } = useSWR(
    cookies.get('X-AUTH-TOKEN') ? ['/auth/token', cookies.get('X-AUTH-TOKEN')] : null,
    fetcher,
  );
  const [isBookmark, setIsBookmark] = useState(false);
  const [IsDisable, setIsDisable] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(1);
  const setchangeBookmarked = useSetRecoilState(changedBookmark);
  const [currentBoardId, setCurrentBoardId] = useRecoilState(tooltipBoardId);
  const [deletedBookmark, setDeletedBookmark] = useRecoilState(lnbBookmarkDelete);
  const isLogin = useRecoilValue(loginCheck);

  const navigate = useNavigate();
  const query = useQuery();
  const { postId } = useParams();

  const [participateVisible, openParticipate, closeParticipate] = useModal();
  const [fixVisible, openFix, closeFix] = useModal();
  const [authVisible, openAuth, closeAuth] = useModal();

  const renderDate = useCallback(() => {
    const date = new Date(data.createdDate.replace(/-/g, '/'));
    return `${format(date, 'M/d')} (${viewDay(getDay(date))})`;
  }, []);

  const handleLocate = useCallback(() => {
    const pageNum = query.get('page');
    if (pageNum) {
      return navigate(`/post/${data.boardId}?page=${pageNum}`);
    }
    navigate(`/post/${data.boardId}`);
  }, [query.get('page')]);

  const bookmark = async (e) => {
    e.stopPropagation();

    try {
      if (!(myData && myData.data)) {
        const login = window.confirm('로그인 후 이용가능합니다. 로그인하시겠습니까?');
        if (login) {
          return openAuth();
        }
        return;
      }
      if (!isBookmark) {
        const bookmarkdata = await axios.post(`/bookmark/${data.boardId}`, '', {
          withCredentials: true,
          headers: {
            'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
          },
        });
        if (bookmarkdata.data.status === 200) {
          changeBookmark();
          setIsBookmark(true);
          setDeletedBookmark(false);
        }
      } else {
        const bookmarkdata = await axios.delete(`/bookmark/${data.boardId}`, {
          withCredentials: true,
          headers: {
            'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
          },
        });
        if (bookmarkdata.data.status === 200) {
          changeBookmark();
          setIsBookmark(false);
          setDeletedBookmark(false);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const changeBookmark = () => {
    setchangeBookmarked((state) => !state);
  };

  const getBookmark = useCallback(async () => {
    try {
      if (!(myData && myData.data)) {
        return;
      }
      const bookmarkdata = await axios.get(`/bookmark/${data.boardId}`, {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      bookmarkdata.data.status === 200 && setIsBookmark(bookmarkdata.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [myData]);

  const handleOpenPartiModal = useCallback(
    (e) => {
      e.stopPropagation();
      if (myData?.data) {
        if (data.uid === myData.data.uid) {
          return openFix();
        }
        openParticipate();
      } else {
        if (!(myData && myData.data)) {
          const login = window.confirm('로그인 후 이용가능합니다. 로그인하시겠습니까?');
          if (login) {
            return openAuth();
          }
          return;
        }
      }
    },
    [myData],
  );

  const DeletedBookmarkOnLnb = () => {
    if (deletedBookmark === data.boardId) {
      setIsBookmark(false);
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
    const bool = !data.viewable || renderDay(data.expiredDate) < 0;
    setIsDisable(bool);
  }, []);

  useEffect(() => {
    getBookmark();
  }, [isLogin]);

  useEffect(() => {
    DeletedBookmarkOnLnb();
  }, [deletedBookmark]);

  useEffect(() => {
    if (currentBoardId !== data.boardId) {
      setTooltip(false);
    }
  }, [currentBoardId]);

  return (
    <>
      <Wrapper onClick={handleLocate} current={String(data.boardId) === postId}>
        <CardHead isDisabled={IsDisable}>
          <ProfileBox profile={data.profileImage} onClick={(e) => viewTooltip(e, 1)}>
            {data.profileImage ? (
              <img src={`${data.profileImage}`} alt="" />
            ) : (
              <img src={`${ProfileNull}`} alt="" />
            )}
          </ProfileBox>
          <TextBox>
            <Dday>{IsDisable ? '마감' : `D-${renderDay(data.expiredDate)}`}</Dday>
            <CardDate>{renderDate(data.createdDate)}</CardDate>
            <CardName onClick={(e) => viewTooltip(e, 2)}>{data.nickname}</CardName>
          </TextBox>
          {tooltip && (
            <ProfileTooltip
              data={data}
              position={tooltipPosition}
              open={tooltip}
              setOpen={setTooltip}
            />
          )}
        </CardHead>
        <CardBody isDisabled={IsDisable}>
          <TextBox>
            <TitleBox>
              <h5>{data.title}</h5>
              <Star bookmark={isBookmark} onClick={bookmark} />
            </TitleBox>
            <TextList>
              <CategoryText
                textColor={data.categoryParentId === 1 ? '#005ec5' : '#F7971E'}
                isDisabled={IsDisable}
              >
                {cateogoryAll.filter((category) => `${data.categoryId}` === category.value)[0].name}
              </CategoryText>
              <p>{data.approachCode ? '오프라인' : '온라인'}</p>
              <p>{`${data.recruitedCrew}/${data.totalCrew}명`}</p>
              <p>
                조회수
                {` ${data.hit}`}
              </p>
            </TextList>
          </TextBox>
          <ButtonBox>
            <ButtonDetail>상세보기</ButtonDetail>
            <ButtonParticipate
              disabled={IsDisable}
              onClick={handleOpenPartiModal}
              myPost={myData?.data?.uid === data.uid}
            >
              참여하기
            </ButtonParticipate>
          </ButtonBox>
        </CardBody>
      </Wrapper>
      <ParticipateModal
        closeModal={closeParticipate}
        postData={data}
        visible={participateVisible}
      />
      <AuthModal closeModal={closeAuth} visible={authVisible} />
      <PostFixModal visible={fixVisible} closeModal={closeFix} postData={data}></PostFixModal>
    </>
  );
}

export default PostCard;

const Wrapper = styled.div`
  height: 94px;
  background-color: #fff;
  border-radius: 10px;
  padding: 16px 22px 16px 18px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  transition: 0.2s;
  border: 1px solid transparent;
  cursor: pointer;
  :hover {
    border-color: #a8a8a8;
  }
  ${(props) =>
    props.current &&
    css`
      border-color: #a8a8a8;
    `}
  @media screen and (max-width: 820px) {
    height: 108px;
    padding: 10px 12px 14px 12px;
    flex-direction: column;
    position: relative;
  }
`;

const ProfileBox = styled.div`
  ${(props) =>
    !props.profile &&
    css`
      background-color: #8d2bf5;
    `}
`;

const TextBox = styled.div``;

const Dday = styled.p``;

const CardDate = styled.p``;

const CardName = styled.p``;

const TitleBox = styled.div``;

const CategoryText = styled.span`
  font-size: 12px;
  font-weight: 400;
  margin-right: 14px;
  ${(props) =>
    props.textColor &&
    css`
      color: ${props.textColor};
    `}
  ${(props) =>
    props.isDisabled &&
    css`
      color: #a8a8a8;
    `}
  @media screen and (max-width: 820px) {
    margin-right: 12px;
  }
`;

const Star = styled.div`
  ${(props) =>
    props.bookmark
      ? css`
          background: #c4c4c4 url(${ButtonStarOn}) center/20px no-repeat;
        `
      : css`
          background: #c4c4c4 url(${ButtonStarWhite}) center/20px no-repeat;
        `}
  width: 30px;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 22px;
  margin-right: 14px;
  transition: 0.3s;

  :hover {
    background-color: #b0b0b0;
  }

  @media screen and (max-width: 820px) {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    background-size: 14px;
    margin: 0;
  }
`;

const TextList = styled.div``;

const ButtonBox = styled.div``;

const ButtonDetail = styled.button`
  cursor: pointer;
  background-color: #c4c4c4;
  transition: 0.3s;
  :hover {
    background-color: #b0b0b0;
  }
`;

const ButtonParticipate = styled.button`
  cursor: pointer;
  background-color: #00b7ff;
  transition: 0.3s;

  :hover {
    background-color: #00a3e3;
  }

  :disabled {
    background-color: #e2e2e2;
    cursor: default;
  }

  ${(props) =>
    props.myPost &&
    css`
      text-indent: -9999px;
      background: #00b7ff url(${SettingWhite}) center/24px no-repeat;
    `}
`;

const CardHead = styled.div`
  display: flex;
  min-width: 204px;
  height: 100%;
  border-right: 1px solid #a8a8a8;
  position: relative;

  ${ProfileBox} {
    min-width: 60px;
    height: 60px;
    border-radius: 50%;

    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  ${TextBox} {
    width: 100%;
    height: 100%;
    padding: 0 14px;
    ${Dday} {
      margin-top: 4px;
      font-size: 16px;
      font-weight: 700;
      color: #00b7ff;
      text-align: right;
      ${(props) =>
        props.isDisabled &&
        css`
          color: #a8a8a8;
        `}
    }

    ${CardDate} {
      margin-top: 0px;
      font-size: 12px;
      font-weight: 300;
      color: #868686;
    }

    ${CardName} {
      margin-top: 2px;
      font-size: 13px;
      font-weight: 500;
      color: #000;
    }
  }

  @media screen and (max-width: 820px) {
    width: 100%;
    height: 16px;
    border: none;
    ${ProfileBox} {
      display: none;
    }
    ${TextBox} {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 0;
      margin-top: 2px;
      ${Dday} {
        margin: 0;
        margin-right: auto;
      }

      ${CardDate} {
        margin: 0;
        order: 1;
        margin-left: 12px;
        padding-right: 28px;
      }

      ${CardName} {
        margin: 0;
        font-size: 12px;
        font-weight: 300;
        color: #868686;
      }
    }
  }

  @media screen and (max-width: 820px) {
    ${TextBox} {
      ${CardDate} {
        order: 1;
        margin-left: 10px;
        padding-right: 26px;
      }
    }
  }
`;

const CardBody = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-left: 15px;

  ${TextBox} {
    width: 100%;
    height: 100%;

    ${TitleBox} {
      display: flex;
      align-items: center;
      h5 {
        width: 290px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 15px;
        font-weight: 700;
        color: #000;
        ${(props) =>
          props.isDisabled &&
          css`
            color: #a8a8a8;
          `}
      }
    }

    ${TextList} {
      display: flex;
      margin-top: 12px;
      p {
        font-size: 12px;
        font-weight: 400;
        color: #868686;
      }

      p:not(:last-child) {
        margin-right: 14px;
      }

      ${CategoryText} {
        font-weight: 700;
      }
    }
  }

  ${ButtonBox} {
    display: flex;
    justify-content: space-between;
    height: 60px;
    gap: 14px;
    padding: 5px 0;
    padding-left: 22px;
    box-sizing: border-box;
    border-left: 1px solid #a8a8a8;

    button {
      width: 100px;
      height: 100%;
      border: none;
      border-radius: 10px;
      outline: none;
      color: #fff;
      font-weight: 700;
    }
  }

  @media screen and (max-width: 820px) {
    padding: 0;
    ${ButtonBox} {
      display: none;
    }

    ${TextBox} {
      ${TitleBox} {
        margin-top: 18px;
        h5 {
          font-size: 14px;
        }
      }

      ${TextList} {
        display: flex;
        margin-top: 17px;
        p {
          font-size: 12px;
          font-weight: 400;
        }

        p:not(:last-child) {
          margin-right: 12px;
        }

        ${CategoryText} {
          font-weight: 700;
        }
      }
    }
  }
`;
