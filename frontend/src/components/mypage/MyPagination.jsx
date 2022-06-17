import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import PageArrow2Prev from '@/assets/images/PageArrow2Prev.png';
import PageArrowPrev from '@/assets/images/PageArrowPrev.png';
import PageArrowNext from '@/assets/images/PageArrowNext.png';
import PageArrow2Next from '@/assets/images/PageArrow2Next.png';

function MyPagination({ data, currentPage, postsPerPage, totalPage, detail = false }) {
  const [page, setPage] = useState(0);
  const [btnDeactive, setbtnDeactive] = useState(null);

  const renderNumberDiv = () => {
    const renderArr = [];

    const limitPage = postsPerPage * (page + 1) > totalPage ? totalPage : postsPerPage * (page + 1);

    for (let i = page * postsPerPage; i < limitPage; i += 1) {
      renderArr.push(i);
    }
    return renderArr;
  };

  useEffect(() => {
    let pageNum = Math.floor((Number(currentPage) - 1) / postsPerPage);
    let tmpBtnActiveObj = {
      prev1: false,
      prev2: false,
      next1: false,
      next2: false,
    };

    if (pageNum < 0) {
      pageNum = 0;
    }

    if (pageNum < 1) {
      tmpBtnActiveObj = {
        ...tmpBtnActiveObj,
        prev1: true,
      };
    }

    if (Number(currentPage) === 1) {
      tmpBtnActiveObj = {
        ...tmpBtnActiveObj,
        prev2: true,
      };
    }

    if (Number(totalPage) === Number(currentPage)) {
      tmpBtnActiveObj = {
        ...tmpBtnActiveObj,
        next2: true,
      };
    }

    if ((pageNum + 1) * postsPerPage + 1 > totalPage) {
      tmpBtnActiveObj = {
        ...tmpBtnActiveObj,
        next1: true,
      };
    }

    setbtnDeactive({
      ...tmpBtnActiveObj,
    });
    setPage(pageNum);
  }, [currentPage, postsPerPage, totalPage]);

  return (
    <PaginationWrapper>
      {data && totalPage > 1 && btnDeactive && (
        <>
          <Prev2 deActive={btnDeactive.prev2} />
          <Prev1 deActive={btnDeactive.prev1} />
          {renderNumberDiv().map((i) => (
            <NumberDiv active={i + 1 === Number(currentPage)} key={i}>
              {i + 1}
            </NumberDiv>
          ))}
          <Next1 deActive={btnDeactive.next1} />
          <Next2 deActive={btnDeactive.next2} />
        </>
      )}
    </PaginationWrapper>
  );
}

export default MyPagination;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 598px;
  padding: 48px 0 64px;
  margin: 0 auto;

  div {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 15px;
    font-weight: 700;
    border: 1px solid transparent;
    transition: 0.2s;
  }
  @media screen and (max-width: 820px) {
    width: 100%;
    margin: 28px auto 80px;

    div {
      width: 24px;
      height: 24px;
      font-size: 13px;
    }
  }
`;

const NumberDiv = styled('div')`
  cursor: pointer;
  user-select: none;

  background-color: #fff;
  color: #000;
  ${(props) =>
    props.active &&
    css`
      background-color: #00b7ff;
      color: #fff;
      border-color: transparent;
      cursor: default;
    `}
  :hover {
    ${(props) =>
      !props.active &&
      css`
        border-color: #a8a8a8;
      `}
  }
`;

const Prev2 = styled.div`
  background-color: #fff;
  color: #000;
  background-repeat: no-repeat;
  background-size: 13px;
  background-position: 9px;
  background-image: url(${PageArrow2Prev});
  cursor: pointer;
  user-select: none;

  :hover {
    ${(props) =>
      !props.deActive &&
      css`
        border-color: #a8a8a8;
      `}
  }

  ${(props) =>
    props.deActive &&
    css`
      opacity: 0.6;
      cursor: default;
    `}

  @media screen and (max-width: 820px) {
    background-position: center;
  }
`;

const Prev1 = styled.div`
  background-color: #fff;
  color: #000;
  background-repeat: no-repeat;
  background-size: 6px;
  background-position: 12px;
  background-image: url(${PageArrowPrev});
  cursor: pointer;
  user-select: none;

  :hover {
    ${(props) =>
      !props.deActive &&
      css`
        border-color: #a8a8a8;
      `}
  }

  ${(props) =>
    props.deActive &&
    css`
      cursor: default;
      opacity: 0.6;
    `}

  @media screen and (max-width: 820px) {
    background-position: center;
  }
`;

const Next1 = styled.div`
  background-color: #fff;
  color: #000;
  background-repeat: no-repeat;
  background-size: 6px;
  background-position: 14px;
  background-image: url(${PageArrowNext});
  cursor: pointer;
  user-select: none;

  :hover {
    ${(props) =>
      !props.deActive &&
      css`
        border-color: #a8a8a8;
      `}
  }

  ${(props) =>
    props.deActive &&
    css`
      cursor: default;
      opacity: 0.6;
    `}

  @media screen and (max-width: 820px) {
    background-position: center;
  }
`;

const Next2 = styled.div`
  background-color: #fff;
  color: #000;
  background-repeat: no-repeat;
  background-size: 13px;
  background-position: 10px;
  background-image: url(${PageArrow2Next});
  cursor: pointer;
  user-select: none;

  :hover {
    ${(props) =>
      !props.deActive &&
      css`
        border-color: #a8a8a8;
      `}
  }

  ${(props) =>
    props.deActive &&
    css`
      cursor: default;
      opacity: 0.6;
    `}

  @media screen and (max-width: 820px) {
    background-position: center;
  }
`;
