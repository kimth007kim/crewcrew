import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

function MobileNavButton({ icon, title, link = '/', selected }) {
  return (
    <NavLink to={link}>
      <MobileNavLi selected={selected}>
        {icon}
        {title}
      </MobileNavLi>
    </NavLink>
  );
}

export default MobileNavButton;

const MobileNavLi = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 36px;
  height: 50px;
  font-size: 10px;
  font-weight: 400;
  color: #000;

  ${(props) =>
    props.selected &&
    css`
      color: #00b7ff;
    `}
`;
