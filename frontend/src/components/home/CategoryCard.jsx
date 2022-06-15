import React from 'react';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

function CategoryCard({ data }) {

  const description = (data) => {
    if(data){
      let description = data.replace('(', '');
      description = description.replace(')', '');
      return description;
    }
  }
  return (
    <li>
      <Wrapper group={data.catParentName}>
        <Link to="/post">
          <h5>{data.categoryName}</h5>
          <p>{data.categoryName !== '기타' && description(data.description)}</p>
          <p>{data.catParentName}</p>
          <div className="Icon" />
        </Link>
      </Wrapper>
    </li>
  );
}

export default CategoryCard;

const Wrapper = styled.div`
  ${(props) =>
    props.group === '스터디'
      ? css`
          background: linear-gradient(135deg, #0f3fa6 3.96%, #0575e6 99.7%);
        `
      : css`
          background: linear-gradient(135deg, #f7971e 0%, #ffd200 100%);
        `}
  width: 164px;
  height: 164px;
  border-radius: 10px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  padding: 14px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  transition: 0.3s;
  filter: brightness(100%);
  :hover {
    filter: brightness(110%);
  }
  h5 {
    color: #fff;
    font-size: 20px;
    font-weight: 500;
  }

  p {
    font-size: 13px;
    font-weight: 300;
    margin-top: 4px;
    height: 13px;
    color: #fff;
  }

  p:nth-of-type(2) {
    text-align: right;
    margin-top: 78px;
  }

  .Icon {
    width: 58px;
    height: 58px;
    background-size: 100% !important;
    position: absolute;
    left: 14px;
    bottom: 14px;
    mix-blend-mode: overlay;
  }

  @media screen and (max-width: 820px) {
    width: calc((100vw - 70px) / 3);
    height: calc((100vw - 70px) / 3);
    padding: 10px;

    h5 {
      font-size: 15px;
    }

    p {
      font-size: 12px;
      line-height: 16px;
      word-break: break-all;
    }

    p:nth-of-type(2) {
      margin-top: 0;
      position: absolute;
      right: 10px;
      bottom: 10px;
    }

    .Icon {
      width: 20px;
      height: 20px;
      left: 10px;
      bottom: 10px;
    }
  }
  @media screen and (max-width: 300px) {
    width: calc((100vw - 38px) / 2);
    height: calc((100vw - 38px) / 2);
  } ;
`;
