import React, { useCallback } from 'react';
import styled, { css } from 'styled-components';

import ButtonStarWhite from '@/assets/images/ButtonStarWhite.png';
import { cateogoryAll } from '@/frontDB/filterDB';
import { format, getDay, differenceInDays } from 'date-fns';
import { viewDay } from '@/utils';
import { Link } from 'react-router-dom';

function PostCardSlide({ data }) {
  const renderDate = useCallback(() => {
    const date = new Date(data.createdDate);
    return `${format(date, 'M/d')} (${viewDay(getDay(date))})`;
  }, []);

  const renderDay = useCallback(() => {
    const date = new Date(data.expiredDate);
    const nowDate = new Date();
    return differenceInDays(date, nowDate) + 1;
  }, []);

  const category = (id = data.categoryParentId) => {
    return id === 1 ? 'study' : 'hobby';
  };
  return (
    <Container>
      <Link to={`/post/${data.boardId}`}>
        <CardPost category={category()}>
          <CardHead>
            <h5>
              <span>{`D-${renderDay()}`}</span>
            </h5>
            <CardHeadRight>
              <p>{renderDate()}</p>
              <p>
                조회수
                <span> {data.hit}</span>
              </p>
              <Star />
            </CardHeadRight>
          </CardHead>
          <CardBody>
            <CardProfile>
              <ProfileImg profileImg={data.profileImage} alt="" />
            </CardProfile>
            <CardTxt>
              <h4>{data.title}</h4>
              <p>{data.nickname}</p>
            </CardTxt>
          </CardBody>
          <CardFooter>
            <CardTagColor category={category()}>
              {' '}
              {cateogoryAll.filter((category) => `${data.categoryId}` === category.value)[0].name}
            </CardTagColor>
            <CardTagColor category={category()}>
              {data.approachCode ? '온라인' : '오프라인'}
            </CardTagColor>
            <CardTag>
              <span>
                {data.recruitedCrew}/{data.totalCrew}
              </span>
              <span>명 모집됨</span>
            </CardTag>
          </CardFooter>
        </CardPost>
      </Link>
    </Container>
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
  width: 30px;
  height: 30px;
  background: #c4c4c4 url(${ButtonStarWhite}) center/20px no-repeat;
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
