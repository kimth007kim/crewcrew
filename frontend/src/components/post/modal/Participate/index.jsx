import Modal from '@/components/common/Modal';
import React, { useCallback, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { Cookies } from 'react-cookie';
import useSWR from 'swr';
import fetcher from '@/utils/fetcher';
import Button from '@/components/common/Button';

import Close from '@/assets/images/ModalClose.png';
import SuccessCheck from '@/assets/images/SuccessCheck.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import { cateogoryAll } from '@/frontDB/filterDB';

function ParticipateModal({ closeModal, visible, postData }) {
  const cookies = new Cookies();

  const { data: myData, error: myError } = useSWR(
    ['/auth/token', cookies.get('X-AUTH-TOKEN')],
    fetcher,
  );

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isParticipate, setIsParticipate] = useState(false);
  const bodyRef = useRef(null);

  const onChangeMessage = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  const handleParticipate = useCallback(async () => {
    try {
      setLoading(true);
      const context = {
        boardId: postData?.boardId,
        commentary: message,
      };
      const { data } = await axios.post('/board/application', context, {
        withCredentials: true,
        headers: {
          'X-AUTH-TOKEN': cookies.get('X-AUTH-TOKEN'),
        },
      });
      switch (data.status) {
        case 200:
          setIsParticipate(true);
          break;
        case 201:
          break;
        case 2400:
        case 2401:
        case 2402:
          toast.error(data.message);
          closeModal();
          break;
        case 2403:
        case 2404:
          toast.error(data.message);
          break;

        default:
          toast.error(data.message);
          break;
      }
    } catch (error) {
      console.dir(error);
      toast.error('알 수 없는 오류가 발생했습니다. 새로고침 후 다시 시도해주시길 바랍니다');
    } finally {
      setLoading(false);
    }
  }, [message]);

  const renderContents = () => {
    if (isParticipate) {
      return (
        <>
          <img src={SuccessCheck} alt="successicon" />
          <p>참여 요청 완료!</p>
          <p>
            모집자에게 성공적으로 <span>{myData && myData.data && myData.data.nickName}</span>님의
            참여요청 소식을 전했어요!
            <br />
            요청이 승인되면 이메일({myData && myData.data && myData.data.email})로 알려드릴게요
          </p>
        </>
      );
    } else {
      return (
        <>
          <h5>모집자에게 전달할 메세지를 남겨주세요!</h5>
          <textarea
            name=""
            placeholder="한줄 참여 메세지 입력 (선택)"
            value={message}
            onChange={onChangeMessage}
            readOnly={loading}
          ></textarea>
          <ButtonWrap>
            <Button
              fontSize={20}
              types="fill"
              size="fullregular"
              color="darkblue"
              onClick={handleParticipate}
              loadings={loading}
            >
              크루 참여 요청하기
            </Button>
          </ButtonWrap>
        </>
      );
    }
  };

  if (myData && !myData.data) {
    return null;
  }

  return (
    <Modal
      handleClose={() => {
        closeModal();
      }}
      visible={visible}
      size="regular"
      heightSize={685}
      header={
        <Header>
          <ModalTop>
            <li></li>
            <li>
              <ModalClose
                onClick={() => {
                  closeModal();
                }}
              ></ModalClose>
            </li>
          </ModalTop>
          <TitleWrap textColor={postData?.categoryParentId === 1 ? '#005ec5' : '#F7971E'}>
            <h4>{postData?.title}</h4>
            <ul>
              <li>
                {
                  cateogoryAll.filter((category) => `${postData?.categoryId}` === category.value)[0]
                    .name
                }
              </li>
              <li>{postData?.approachCode ? '오프라인' : '온라인'}</li>
              <li>{`${postData?.recruitedCrew}/${postData?.totalCrew}명`}</li>
              <li>
                조회수
                {` ${postData?.hit}`}
              </li>
            </ul>
          </TitleWrap>
        </Header>
      }
      body={
        <Wrapper>
          <Body ref={bodyRef}>
            <Contents>{renderContents()}</Contents>
          </Body>
        </Wrapper>
      }
    />
  );
}

export default ParticipateModal;

const Wrapper = styled('div')`
  width: 100%;
  height: 100%;
  padding: 0 40px;
  box-sizing: border-box;
  @media screen and (max-width: 820px) {
    padding: 0 20px;
  }
`;

const Header = styled('div')`
  margin: 0 40px;
  border-bottom: 1px solid #000;
  @media screen and (max-width: 820px) {
    margin: 0 20px;
  }
`;

const Body = styled('div')`
  height: calc(100% - 206px);
  overflow-y: auto;

  h5 {
    font-size: 13px;
    font-weight: 700;
    color: #a8a8a8;
    margin-bottom: 8px;
  }

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ButtonWrap = styled('ul')`
  margin-top: auto;

  @media screen and (max-width: 820px) {
  }
`;

const ModalTop = styled('ul')`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  margin-top: 48px;
  height: 18px;

  @media screen and (max-width: 820px) {
    margin-top: 40px;
  }
`;

const ModalClose = styled('span')`
  display: block;
  width: 14px;
  height: 14px;
  background: url(${Close});
  background-size: 100%;
  cursor: pointer;
  margin-right: 10px;
  @media screen and (max-width: 820px) {
    margin-right: 0;
  }
`;

const TitleWrap = styled('div')`
  h4 {
    font-size: 18px;
    color: #000;
    font-weight: 700;
  }

  ul {
    display: flex;
    margin: 12px 0 32px;

    li {
      font-size: 13px;
      font-weight: 500;
      color: #868686;

      :first-child {
        ${(props) =>
          props.textColor &&
          css`
            color: ${props.textColor};
          `}
        font-weight: 700;
      }

      :not(:last-child) {
        margin-right: 25px;
      }
    }
  }

  @media screen and (max-width: 820px) {
    ul {
      margin-bottom: 18px;

      li {
        :not(:last-child) {
          margin-right: 10px;
        }
      }
    }
  }
`;

const Contents = styled('div')`
  display: flex;
  height: 100%;
  flex-direction: column;
  transition: 0.5s;

  h5 {
    font-size: 13px;
    font-weight: 700;
    color: #000;
    text-align: center;
    margin: 48px 0 20px;
  }

  textarea {
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    border-radius: 10px;
    padding: 20px 12px;
    resize: none;
    outline: none;
    transition: 0.3s;
    font-weight: 500;
    font-size: 18px;
    border: 1px solid #e2e2e2;

    :focus {
      border: 1px solid #00b7ff;
    }

    :hover {
      border: 1px solid #00b7ff;
    }
  }

  img {
    width: 170px;
    margin: 70px auto 38px;
  }

  p {
    text-align: center;
    color: #868686;

    :first-of-type {
      font-size: 32px;
      font-weight: 700;
      color: #000;
    }

    :nth-of-type(2) {
      font-size: 13px;
      font-weight: 400;
      margin-top: auto;
      line-height: 22px;

      span {
        :first-child {
          color: #00b7ff;
        }
      }
    }
  }

  @media screen and (max-width: 820px) {
    h5 {
      margin: 44px 0 30px;
    }

    img {
      margin: auto auto 30px;
    }

    p {
      :first-of-type {
        font-size: 28px;
      }

      :nth-of-type(2) {
        font-size: 12px;
      }
    }
  }

  @media screen and (max-width: 300px) {
    h5 {
      margin: 44px 0 30px;
    }

    img {
      width: 120px;
    }

    p {
      :nth-of-type(2) {
        font-size: 12px;
      }
    }
  }
`;
