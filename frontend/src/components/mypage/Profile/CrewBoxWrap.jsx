import React from 'react';
import styled from 'styled-components';
import CrewBox from './CrewBox';

function CrewBoxWrap({ userBoard }) {
  return (
    <Container>
      <CrewBox
        cat={'recruit'}
        totalNum={userBoard.totRecruitedCrewCnt}
        study={userBoard.recruitedCrewCntInStudy}
        hobby={userBoard.recruitedCrewCntInHobby}
      />
      <CrewBox
        cat={'participate'}
        totalNum={userBoard.totAcceptedCrewCnt}
        study={userBoard.acceptedCrewCntInStudy}
        hobby={userBoard.acceptedCrewCntInHobby}
      />
    </Container>
  );
}

export default CrewBoxWrap;

const Container = styled('div')`
  width: 392px;
  margin: 40px auto 0;
  display: flex;
  gap: 28px;

  @media screen and (max-width: 820px) {
    width: calc(100vw - 40px);
    gap: 16px;
  }

  @media screen and (max-width: 300px) {
    width: calc(100vw - 20px);
    gap: 8px;
  }
`;
