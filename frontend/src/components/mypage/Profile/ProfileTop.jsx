import React from 'react';
import styled from 'styled-components';

function ProfileTop({ data }) {
  return (
    <Container>
      <ProfileImg>
        <img src={data.file} alt="myprofile" />
      </ProfileImg>
      <ProfileName>
        <p>{data.nickName}</p>
      </ProfileName>
      <ProfileMsg>
        <h3>한줄메세지</h3>
        <p>{data.message ?? '한줄메세지가 없습니다'}</p>
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
