/* eslint-disable indent */
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import FilterArrowImg from '../../assets/images/FilterArrow.png';
import { approachFilterState, arrayFilterState, articleFilterState } from '../../atom/post';
import {
  allFilter,
  approachArr,
  articleArr,
  hobbyFilterArr,
  studyFilterArr,
} from '../../frontDB/filterDB';

function FilterBox({ handleGetAxios }) {
  const [FixedBox, setFixedBox] = useState(false);
  const [BtnActive, setBtnActive] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(articleArr[0]);
  const [selectedApproach, setSelectedApproach] = useState([...approachArr]);
  const [checkedAll, setCheckedAll] = useState(true);
  const [checkedList, setCheckedList] = useState([]);
  const [approach, setApproach] = useRecoilState(approachFilterState);
  const [article, setArticle] = useRecoilState(articleFilterState);
  const [filterData, setFilterData] = useRecoilState(arrayFilterState);
  const navigate = useNavigate();

  // 전체 카테고리 클릭 시 발생하는 함수
  const onCheckedAll = useCallback(() => {
    if (checkedAll) {
      return;
    }
    setCheckedAll(true);
    setCheckedList([]);
  }, [checkedAll]);

  // 각 필터 체크 여부 확인 함수
  const checkValue = useCallback((arr, value) => arr.some((item) => item.value === value), []);

  // 개별 체크 클릭 시 발생하는 함수
  const onCheckedElement = useCallback(
    (checked, item) => {
      if (checked) {
        setCheckedList([...checkedList, item]);
      } else {
        setCheckedList(checkedList.filter((el) => el.value !== item.value));
      }
      setCheckedAll(false);
    },
    [checkedList],
  );

  // 글 종류 클릭 시 발생하는 함수
  const onChangeArticle = useCallback((e) => {
    const { value } = e.target;
    const selected = articleArr.filter((item) => item.value === value);
    if (selected) {
      setSelectedArticle(selected[0]);
    }
  }, []);

  // 온라인, 오프라인 클릭 시 발생하는 함수
  const onChangeApproach = useCallback(
    (checked, item) => {
      if (checked) {
        setSelectedApproach([...selectedApproach, item]);
      } else {
        setSelectedApproach(selectedApproach.filter((el) => el.value !== item.value));
      }
    },
    [selectedApproach],
  );

  // 모바일 필터 버튼 클릭 시 아래 드롭다운 발생하는 함수
  const handleClickFilterListBtn = useCallback(() => {
    if (BtnActive) {
      setBtnActive(false);
    } else {
      setBtnActive(true);
    }
  }, [BtnActive]);

  // 필터 버튼 클릭 시 발생하는 함수
  const handleClickFilterBtn = useCallback(() => {
    const filterContext = {
      article: selectedArticle,
      approach: selectedApproach,
      categorylist: checkedList,
    };
    if (checkedList.length === 0) {
      filterContext.categorylist = [...allFilter];
    }
    if (selectedApproach.length === 0) {
      filterContext.approach = [...approachArr];
    }
    if (selectedApproach.length > 0) {
      filterContext.approach = filterContext.approach.sort((a, b) => a.index - b.index);
    }
    if (checkedList.length > 0) {
      filterContext.categorylist = filterContext.categorylist.sort((a, b) => a.index - b.index);
    }
    localStorage.postFilter = JSON.stringify(filterContext);
    setArticle({
      ...filterContext.article,
    });
    setApproach([...filterContext.approach]);
    setFilterData([...filterContext.categorylist]);
    setCheckedList([]);
    setCheckedAll(true);
    setSelectedArticle(articleArr[0]);
    setSelectedApproach([...approachArr]);
    handleGetAxios();
    navigate('/post?page=1');
  }, [checkedAll, selectedArticle, selectedApproach, checkedList]);

  // 필터 리스트 렌더
  const renderFilterList = (data) => {
    if (!data || data.length === 0) {
      return null;
    }
    const filterArray = data;

    const renderFilter = filterArray.map((item) => (
      <li key={`${item.htmlId} + ${item.name}`}>
        <FilterSpan textColor={item.color}>{item.name}</FilterSpan>
      </li>
    ));
    return renderFilter;
  };

  useEffect(() => {
    const postFilter = JSON.parse(localStorage.getItem('postFilter'));

    const filterContext = {
      article,
      approach,
      categorylist: [...allFilter],
    };

    if (postFilter) {
      const approaches = postFilter.approach.sort((a, b) => a.index - b.index);
      const categories = postFilter.categorylist.sort((a, b) => a.index - b.index);
      filterContext.article = postFilter.article;
      filterContext.approach = [...approaches];
      filterContext.categorylist = [...categories];
    }

    localStorage.postFilter = JSON.stringify(filterContext);
    setArticle({
      ...filterContext.article,
    });
    setApproach([...filterContext.approach]);
    setFilterData([...filterContext.categorylist]);
  }, []);

  // 필터 스크롤 픽스 함수
  const isSticky = () => {
    const { innerWidth } = window;
    const scrollTop = window.scrollY;
    if (innerWidth >= 768) {
      if (scrollTop >= 358) {
        setFixedBox(true);
      } else {
        setFixedBox(false);
      }
    } else if (scrollTop >= 240) {
      setFixedBox(true);
    } else {
      setFixedBox(false);
    }
  };

  // Sticky Menu Area
  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  });

  return (
    <Container fixed={FixedBox}>
      <FilterHead>
        <FilterButton onClick={handleClickFilterListBtn}>
          필터
          <FilterArrow active={BtnActive} />
        </FilterButton>
        <FilterCheckedWrapper>
          <FilterCheckedMobile>
            {article && approach && (
              <>
                <li>
                  <FilterSpan textColor={article.color}>{article.name}</FilterSpan>
                </li>
                {renderFilterList(approach)}
              </>
            )}
            {renderFilterList(filterData)}
          </FilterCheckedMobile>
        </FilterCheckedWrapper>
      </FilterHead>
      <FilterListWrapper active={BtnActive}>
        <FilterPostBox>
          <FilterList>
            {articleArr.map((item) => (
              <li key={`${item.htmlId}`}>
                <InputHide
                  type="radio"
                  id={item.htmlId}
                  checked={selectedArticle.name === item.name}
                  bgColor={item.color}
                  value={item.value}
                  onChange={onChangeArticle}
                />
                <FilterPostLabel htmlFor={item.htmlId}>{item.name}</FilterPostLabel>
              </li>
            ))}
          </FilterList>
          <FilterList>
            {approachArr.map((item) => (
              <li key={`${item.htmlId}`}>
                <InputHide
                  type="checkbox"
                  id={item.htmlId}
                  checked={checkValue(selectedApproach, item.value)}
                  bgColor={item.color}
                  value={item.value}
                  onChange={(e) => onChangeApproach(e.target.checked, item)}
                />
                <FilterPostLabel htmlFor={item.htmlId}>{item.name}</FilterPostLabel>
              </li>
            ))}
          </FilterList>
        </FilterPostBox>
        <FilterCategoryBox>
          <FilterList>
            {allFilter.map((item) => (
              <li key={`${item.htmlId}`}>
                <InputHide
                  type="checkbox"
                  id={item.htmlId}
                  checked={checkedAll}
                  bgColor={item.color}
                  value={item.value}
                  onChange={onCheckedAll}
                />
                <FilterCategoryLabel htmlFor={item.htmlId}>{item.name}</FilterCategoryLabel>
              </li>
            ))}
            {studyFilterArr.map((item) => (
              <li key={`${item.htmlId}`}>
                <InputHide
                  type="checkbox"
                  id={item.htmlId}
                  checked={checkValue(checkedList, item.value)}
                  bgColor={item.color}
                  value={item.value}
                  onChange={(e) => onCheckedElement(e.target.checked, item)}
                />
                <FilterCategoryLabel htmlFor={item.htmlId} hColor={item.color}>
                  {item.name}
                </FilterCategoryLabel>
              </li>
            ))}
            {hobbyFilterArr.map((item) => (
              <li key={`${item.htmlId}`}>
                <InputHide
                  type="checkbox"
                  id={item.htmlId}
                  checked={checkValue(checkedList, item.value)}
                  bgColor={item.color}
                  value={item.value}
                  onChange={(e) => onCheckedElement(e.target.checked, item)}
                />
                <FilterCategoryLabel htmlFor={item.htmlId} hColor={item.color}>
                  {item.name}
                </FilterCategoryLabel>
              </li>
            ))}
          </FilterList>
        </FilterCategoryBox>
        <ButtonFilter onClick={handleClickFilterBtn}>적용하기</ButtonFilter>
      </FilterListWrapper>
    </Container>
  );
}

export default FilterBox;

const Container = styled.div`
  position: absolute;
  top: -42px;
  width: 100%;
  max-width: 850px;
  padding: 20px 10px 34px 25px;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 5px 5px 5px rgb(0 0 0 / 15%);
  z-index: 1;

  ${(props) =>
    props.fixed &&
    css`
      position: fixed;
      top: 10px;
    `}
  @media screen and (max-width: 820px) {
    top: 0;
    left: 0;
    display: block;
    background-color: #fff;
    padding: 0%;
    border-radius: 0;
    ${(props) =>
      props.fixed &&
      css`
        top: 60px;
      `}
  }
`;

// 모바일에서만 노출
const FilterHead = styled.div`
  display: none;
  box-sizing: content-box;

  @media screen and (max-width: 820px) {
    border-bottom: 1px solid #e2e2e2;
    height: 68px;
    display: flex;
  }
`;

const FilterButton = styled.div`
  box-sizing: content-box;
  @media screen and (max-width: 820px) {
    min-width: 100px;
    border-right: 1px solid #e2e2e2;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
  }
`;

const FilterArrow = styled.span`
  display: block;
  background: url(${FilterArrowImg}) no-repeat;
  background-size: 100%;
  width: 11px;
  height: 6px;
  margin-left: 15px;
  ${(props) =>
    props.active &&
    css`
      transform: rotate(180deg);
    `}
`;

const FilterCheckedWrapper = styled.div`
  @media screen and (max-width: 820px) {
    width: 100%;
    overflow-x: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const FilterSpan = styled.span`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 24px;
  padding: 0 16px;
  color: #fff;
  font-size: 13px;
  font-weight: 300;
  border-radius: 14px;

  ${(props) =>
    props.textColor &&
    css`
      background-color: ${props.textColor};
    `}
`;

const FilterCheckedMobile = styled.ul`
  @media screen and (max-width: 820px) {
    display: flex;
    align-items: center;
    border: none;
    padding-left: 8px;
    width: auto;
    height: 100%;
    flex-wrap: nowrap;

    li {
      margin-right: 8px;
    }

    span {
      white-space: nowrap;
    }
  }
`;

const FilterListWrapper = styled.div`
  display: flex;
  box-sizing: content-box;
  @media screen and (max-width: 820px) {
    height: 0;
    overflow: hidden;
    position: relative;
    transition: 1s;
    display: flex;
    flex-direction: column;
    align-items: center;

    ${(props) =>
      props.active &&
      css`
        height: 322px;
      `}
  }
`;

const FilterList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  box-sizing: content-box;
  li {
    margin-right: 8px;
    margin-bottom: 14px;
  }
  @media screen and (max-width: 820px) {
    align-items: center;
    li {
      margin-right: 0;
      margin-bottom: 0;
    }
  }
`;

const FilterPostBox = styled.div`
  display: inline-block;
  height: 60px;
  width: 328px;
  border-right: 1px solid #e2e2e2;
  box-sizing: content-box;
  @media screen and (max-width: 820px) {
    display: block;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    height: auto;
    ${FilterList} {
      height: 60px;
      border-bottom: 1px solid #e2e2e2;
    }
  }
`;

const FilterCategoryBox = styled.div`
  display: inline-block;
  height: 60px;
  width: calc(100% - 300px);
  padding-left: 25px;
  box-sizing: content-box;
  @media screen and (max-width: 820px) {
    display: block;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    height: auto;
  }
`;

const FilterPostLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  border: 1px solid #e2e2e2;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 500;
  color: #868686;
  cursor: pointer;
  transition: 0.2s;
  box-sizing: border-box;
  width: 88px;
  user-select: none;

  :hover {
    border-color: #000;
    color: #000;
  }

  @media screen and (max-width: 820px) {
    width: fit-content;
    background: none !important;
    border-radius: 0;
    border: none;
    font-size: 13px;
    margin-right: 24px;
    margin-bottom: 0;
  }
`;

const FilterCategoryLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  border: 1px solid #e2e2e2;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 500;
  color: #868686;
  cursor: pointer;
  transition: 0.2s;
  box-sizing: border-box;
  width: fit-content;
  padding: 0 16px;
  user-select: none;

  :hover {
    ${(props) =>
      props.hColor &&
      css`
        border-color: ${props.hColor};
        color: ${props.hColor};
      `}
  }

  @media screen and (max-width: 820px) {
    width: fit-content;
    background: none !important;
    border-radius: 0;
    border: none;
    font-size: 13px;
    margin-right: 24px;
    margin-bottom: 0;
    padding: 0;
    margin-top: 18px;
  }
`;

const InputHide = styled.input`
  width: 1px;
  height: 1px;
  clip: rect(1px, 1px, 1px, 1px);
  position: absolute;
  display: none;

  &:checked + ${FilterPostLabel} {
    ${(props) =>
      props.bgColor &&
      css`
        background-color: ${props.bgColor};
        border-color: transparent;
        color: #fff;
        @media screen and (max-width: 820px) {
          color: ${props.bgColor};
        }
      `}
  }

  &:checked + ${FilterCategoryLabel} {
    ${(props) =>
      props.bgColor &&
      css`
        background-color: ${props.bgColor};
        border-color: transparent;
        color: #fff;
        @media screen and (max-width: 820px) {
          color: ${props.bgColor};
        }
      `}
  }
`;

const ButtonFilter = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  box-sizing: border-box;
  transition: 0.3s;
  font-size: 20px;
  font-weight: 500;
  border-radius: 10px;
  line-height: 26px;
  background-color: #001881;
  color: #fff;
  width: 120px;
  height: 30px;
  font-size: 14px;
  padding: 0;
  position: absolute;
  bottom: -15px;
  left: calc(50% - 60px);
  justify-self: end;
  user-select: none;

  @media screen and (max-width: 820px) {
    width: 100%;
    height: 50px;
    bottom: 0;
    left: 0;
    border-radius: 0;
    font-size: 15px;
  }
`;
