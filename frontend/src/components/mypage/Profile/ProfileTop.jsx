import React from 'react';
import styled from 'styled-components';
import Profile2 from '@/assets/images/Profile2.png';

function ProfileTop() {
  return (
    <Container>
      <ProfileImg>
        <img src={Profile2} alt="프로필이미지" />
      </ProfileImg>
      <ProfileName>
        <p>재영재영유재영유재영</p>
      </ProfileName>
      <ProfileMsg>
        <h3>한줄메세지</h3>
        <p>한줄메세지입니다</p>
      </ProfileMsg>
    </Container>
  );
}

export default ProfileTop;

const Container = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileImg = styled('div')`
  width: 100px;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  background-color: #8ed819;
  margin-bottom: 30px;

  img {
    width: 100%;
  }
`;

const ProfileName = styled('div')`
  margin-bottom: 38px;

  p {
    font-size: 24px;
    font-weight: 700;
  }
`;

const ProfileMsg = styled('div')`
  text-align: center;

  h3 {
    color: #a8a8a8;
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 12px;
  }

  p {
    color: #00b7ff;
    font-size: 15px;
    font-weight: 700;
    margin-bottom: 40px;
  }
`;
