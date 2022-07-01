import React from 'react';
import styled from 'styled-components';
import ProfileTop from './ProfileTop';
import ProfileTag from './ProfileTag';
import CrewBoxWrap from './CrewBoxWrap';

function ProfileSection({ data }) {
  return (
    <Container>
      <Wrapper>
        <ProfileTop data={data} />
        <ProfileTag data={data.categoryId} />
        <CrewBoxWrap />
      </Wrapper>
    </Container>
  );
}

export default ProfileSection;

const Container = styled('section')`
  padding: 60px 0;

  @media screen and (max-width: 820px) {
    padding: 30px 0 60px;
  }
`;

const Wrapper = styled('div')`
  max-width: 850px;
  margin: auto;
  position: relative;

  @media screen and (max-width: 820px) {
    padding: 0 20px;
  }

  @media screen and (max-width: 300px) {
    padding: 0 10px;
  }
`;
