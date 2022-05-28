import React from 'react';
import styled, { css } from 'styled-components';

function NavCard({ title, p, img, color, number, reverse }) {
  return (
    <NavCardListli>
      {reverse ? (
        <CardIntro img={img} color={color} number={number}>
          <h3
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: p,
            }}
          />
        </CardIntro>
      ) : (
        <CardIntroReverse img={img} color={color} number={number}>
          <h3
            dangerouslySetInnerHTML={{
              __html: title,
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: p,
            }}
          />
        </CardIntroReverse>
      )}
    </NavCardListli>
  );
}

export default NavCard;

const NavCardListli = styled.li`
  padding-bottom: 15px;
  margin-right: 10px;
  @media screen and (max-width: 820px) {
    padding-bottom: 10px;
  }
`;

const CardIntro = styled.div`
  background-position: 20px 50%;

  @media screen and (max-width: 820px) {
    height: 70px;
    padding: 0;
    background-size: 90px !important;
    border-radius: 10px;
    display: flex;
    align-items: center;
    background-position: 15px 50%;
  }

  height: 120px;
  padding: 30px 0 16px;
  box-sizing: border-box;
  background-size: 120px !important;
  background-repeat: no-repeat !important;
  position: relative;
  border-radius: 15px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15);
  background-color: ${(props) => props.color};
  background-image: url(${(props) => props.img});

  &::before {
    content: ${(props) => `'${props.number}'`};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #fff;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 7px;
    left: 7px;
  }

  h3 {
    font-size: 12px;
    color: #fff;
    font-weight: 500;
    br {
      display: none;
    }
    margin-left: 167px;

    @media screen and (max-width: 820px) {
      margin-left: 140px;
      br {
        display: block;
      }
    }
  }
  p {
    font-size: 18px;
    color: #fff;
    margin: 10px 0;
    line-height: 24px;
    margin-left: 167px;

    @media screen and (max-width: 820px) {
      display: none;
    }
  }
`;

const CardIntroReverse = styled.div`
  @media screen and (max-width: 820px) {
    background-position: calc(100% - 15px) 50%;
    height: 70px;
    padding: 0;
    background-size: 90px !important;
    border-radius: 10px;
    display: flex;
    align-items: center;
  }

  height: 120px;
  padding: 30px 0 16px;
  box-sizing: border-box;
  background-size: 120px !important;
  background-repeat: no-repeat !important;
  position: relative;
  border-radius: 15px;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15);
  background-color: ${(props) => props.color};
  background-image: url(${(props) => props.img});
  background-position: calc(100% - 20px) 50%;

  ::before {
    content: ${(props) => `'${props.number}'`};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    color: #fff;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    top: 7px;
    left: 7px;
  }

  h3 {
    font-size: 12px;
    color: #fff;
    font-weight: 500;
    br {
      display: none;
    }
    margin-left: 24px;
    @media screen and (max-width: 820px) {
      br {
        display: block;
      }
      text-align: right;
      margin-left: 30px;
    }
  }

  p {
    font-size: 18px;
    color: #fff;
    margin: 10px 0;
    line-height: 24px;
    margin-left: 24px;
    @media screen and (max-width: 820px) {
      display: none;
    }
  }
`;
