import styled from 'styled-components';

export const CardWrapper = styled('div')`
  li {
    padding-bottom: 14px;
  }
`;

export const NoContent = styled('div')`
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 15px;
    line-height: 22px;
    text-align: center;
    font-weight: 400;
    margin-bottom: 20px;

    em {
      font-weight: 700;
    }
  }
`;

export const LoadingWrap = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
`;
