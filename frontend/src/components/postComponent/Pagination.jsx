import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageArrow2Prev from '../../assets/images/PageArrow2Prev.png';
import PageArrowPrev from '../../assets/images/PageArrowPrev.png';
import PageArrowNext from '../../assets/images/PageArrowNext.png';
import PageArrow2Next from '../../assets/images/PageArrow2Next.png';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Pagination({ data, currentPage, postsPerPage, totalPage }) {
  const query = useQuery();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  const handleClickPageNavi = useCallback(
    (i) => {
      if (query.get('search')) {
        return navigate(`/post?page=${i + 1}&search=${query.get('search')}`);
      }
      navigate(`/post?page=${i + 1}`);
    },
    [query.get('search')],
  );

  const renderNumberDiv = () => {
    const renderArr = [];
    const limitPage = postsPerPage > totalPage ? totalPage : postsPerPage;

    for (let i = 0; i < limitPage; i += 1) {
      renderArr.push(
        <NumberDiv
          active={`${i + 1}` === currentPage}
          key={i}
          onClick={() => handleClickPageNavi(i)}
        >
          {i + 1}
        </NumberDiv>,
      );
    }
    return renderArr;
  };

  return (
    <PaginationWrapper>
      {data && totalPage > 1 && (
        <>
          <Prev2 />
          <Prev1 />
          {renderNumberDiv()}
          <Next />
          <Next2 />
        </>
      )}
    </PaginationWrapper>
  );
}

export default Pagination;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 598px;
  margin: 48px auto 124px;

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

  :hover {
    border-color: #a8a8a8;
  }
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

  :hover {
    border-color: #a8a8a8;
  }

  @media screen and (max-width: 820px) {
    background-position: center;
  }
`;

const Next = styled.div`
  background-color: #fff;
  color: #000;
  background-repeat: no-repeat;
  background-size: 6px;
  background-position: 14px;
  background-image: url(${PageArrowNext});
  cursor: pointer;

  :hover {
    border-color: #a8a8a8;
  }

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

  :hover {
    border-color: #a8a8a8;
  }

  @media screen and (max-width: 820px) {
    background-position: center;
  }
`;
