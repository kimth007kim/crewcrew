import React, { useCallback, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { Cookies } from 'react-cookie';

import ButtonStarWhite from '@/assets/images/ButtonStarWhite.png';
import ButtonStarOn from '@/assets/images/ButtonStarOn.png';
import { cateogoryAll } from '@/frontDB/filterDB';
import { renderDate, renderDay } from '@/utils';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { changedBookmark } from '@/atoms/post';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';

import { loginCheck } from '@/atoms/login';
import { lnbBookmarkDelete } from '@/atoms/post';
import ProfileTooltip from '../post/tooltip/ProfileTooltip';
import { tooltipBoardId } from '@/atoms/profile';

function PostCardSlide({ data, cookies, isLnb = false }) {
  const [isBookmark, setIsBookmark] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState(1);
  const [currentBoardId, setCurrentBoardId] = useRecoilState(tooltipBoardId);

  const [changeBookmarked, setchangeBookmarked] = useRecoilState(changedBookmark);
  const [deletedBookmark, setDeletedBookmark] = useRecoilState(lnbBookmarkDelete);
  const isLogin = useRecoilValue(loginCheck);
  const myCookies = new Cookies();
  const { data: myData } = useSWR(['/auth/token', myCookies.get('X-AUTH-TOKEN')], fetcher);

  const navigate = useNavigate();

  const category = (id = data.categoryParentId) => {
    return id === 1 ? 'study' : 'hobby';
  };

  const changeBookmark = () => {
    setchangeBookmarked((state) => !state);
  };

  const handleLocate = () => {
    navigate(`/post/${data.boardId}`);
  };

  const bookmark = async (e) => {
    e.stopPropagation();
    try {
      if (!(myData && myData.data)) {
        window.alert('로그인 후 이용가능합니다.');
        return false;
      }
      if (!isBookmark) {
        const bookmarkdata = await axios.post(`/bookmark/${data.boardId}`, '', {
          withCredentials: true,
          headers: {
            'X-AUTH-TOKEN': cookies,
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
            'X-AUTH-TOKEN': cookies,
          },
        });
        if (bookmarkdata.data.status === 200) {
          changeBookmark();
          setIsBookmark(false);
          isLnb ? setDeletedBookmark(data.boardId) : setDeletedBookmark(false);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const DeletedBookmarkOnLnb = () => {
    if (deletedBookmark === data.boardId) {
      setIsBookmark(false);
    }
  };

  const getBookmark = useCallback(async () => {
    if (!(myData && myData.data)) return false;
    try {
      const bookmarkdata = await axios.get(`/bookmark/${data.boardId}`, {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies,
        },
      });
      bookmarkdata.data.status === 200 && setIsBookmark(bookmarkdata.data.data);
    } catch (err) {
      console.error(err);
    }
  }, [myData]);

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
    getBookmark();
    return () => setIsBookmark(false);
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
      <Container>
        <CardPost category={category()} onClick={handleLocate}>
          <CardHead>
            <h5>
              <span>{`D-${renderDay(data.expiredDate)}`}</span>
            </h5>
            <CardHeadRight>
              <p>{renderDate(data.createdDate)}</p>
              <p>
                조회수
                <span> {data.hit}</span>
              </p>
              <Star bookmark={isBookmark} onClick={bookmark} />
            </CardHeadRight>
          </CardHead>
          <CardBody>
            <CardProfile onClick={(e) => viewTooltip(e, 1)}>
              <ProfileImg profileImg={data.profileImage} alt="" />
            </CardProfile>
            <CardTxt>
              <h4>{data.title}</h4>
              <p onClick={(e) => viewTooltip(e, 2)}>{data.nickname}</p>
            </CardTxt>
            {myData && myData.data?.uid && tooltip && (
              <ProfileTooltip
                data={data}
                position={tooltipPosition}
                open={tooltip}
                setOpen={setTooltip}
              />
            )}
          </CardBody>
          <CardFooter>
            <CardTagColor category={category()}>
              {cateogoryAll.filter((category) => `${data.categoryId}` === category.value)[0].name}
            </CardTagColor>
            <CardTagColor category={category()}>
              {data.approachCode ? '오프라인' : '온라인'}
            </CardTagColor>
            <CardTag>
              <span>
                {data.recruitedCrew}/{data.totalCrew}
              </span>
              <span>명 모집됨</span>
            </CardTag>
          </CardFooter>
        </CardPost>
      </Container>
    </>
  );
}

export default PostCardSlide;

const Container = styled('div')`
  height: auto;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
`;

const CardPost = styled.div`
  ${(props) =>
    props.category === 'study'
      ? css`
          border-top: 6px solid #005ec5;
        `
      : css`
          border-top: 6px solid #f7971e;
        `}

  width: 100%;
  background-color: #fff;
  border-radius: 2px 2px 15px 15px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  cursor: pointer;
  p {
    font-size: 12px;
    font-weight: 400;
    color: #868686;
  }
`;

const CardHead = styled.div`
  padding: 10px 12px 10px 15px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h5 {
    font-size: 16px;
    font-weight: 700;
    color: #000;
  }

  @media screen and (max-width: 820px) {
    padding: 10px 5px 10px 15px;
  }
`;

const CardHeadRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  p {
    :first-child {
      @media screen and (max-width: 820px) {
        display: none;
      }
    }
    margin-top: 0;
    margin-left: 10px;
  }
`;

const CardBody = styled.div`
  height: 82px;
  padding: 10px 12px 0 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  position: relative;
  @media screen and (max-width: 820px) {
    padding: 0 5px 0 15px;
    height: 64px;
  }
`;

const CardFooter = styled.div`
  padding: 10px 12px 10px 15px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  @media screen and (max-width: 820px) {
    padding: 5px;
  }
`;

const CardTag = styled.div`
  width: fit-content;
  padding: 5px 8px;
  border-radius: 13px;
  background-color: #a8a8a8;
  font-size: 13px;
  line-height: 16px;
  color: #fff;
  font-weight: 300;

  @media screen and (max-width: 820px) {
    font-size: 11px;
    line-height: 1;
    border-radius: 12px;
    padding: 7px 8px;
  }
`;

const CardTagColor = styled.div`
  width: fit-content;
  padding: 5px 8px;
  border-radius: 13px;
  ${(props) =>
    props.category === 'study'
      ? css`
          background-color: #005ec5;
        `
      : css`
          background-color: #f7971e;
        `}

  font-size: 13px;
  line-height: 16px;
  color: #fff;
  font-weight: 300;
  :not(:last-child) {
    margin-right: 8px;
    @media screen and (max-width: 820px) {
      margin-right: 4px;
    }
  }
  @media screen and (max-width: 820px) {
    font-size: 11px;
    line-height: 1;
    border-radius: 12px;
    padding: 7px 8px;
  }
`;

const CardTxt = styled.div`
  width: 100%;
  margin-left: 15px;
  h4 {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 8px;
    line-height: 18px;
    color: #000;
    word-break: initial;
    ::after {
      content: none;
      display: none;
      width: none;
      height: none;
      margin-left: none;
      background: none;
      background-size: none;
      background-repeat: none;
    }
  }
  p {
    margin-top: 0;
  }

  @media screen and (max-width: 820px) {
    h4 {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
`;

const CardProfile = styled.div`
  min-width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  background-color: transparent;
`;

const ProfileImg = styled.div`
  ${(props) =>
    css`
      background: url(${props.profileImg}) 100% 100%;
    `}
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-size: 100% !important;
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
  cursor: pointer;
  margin-left: 10px;
  border-radius: 5px;
  transition: 0.3s;

  :hover {
    background-color: #b0b0b0;
  }

  @media screen and (max-width: 820px) {
    width: 20px;
    height: 20px;
    background-size: 14px;
  }
`;
