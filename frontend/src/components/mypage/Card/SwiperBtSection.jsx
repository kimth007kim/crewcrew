/* eslint-disable import/no-unresolved */
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import styled, { css } from 'styled-components';
import SlideArrowNext from '@/assets/images/SlideArrowNext.png';
import SlideArrowPrev from '@/assets/images/SlideArrowPrev.png';
import NocontProfile2 from '@/assets/images/NocontProfile2.png';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import SwiperCard from './SwiperCard';

SwiperCore.use([Navigation, Pagination]);
function SwiperBtSection({
  isSwiperClick,
  participantList,
  waitingList,
  toggleCheck = false,
  boardId,
  status,
  pageStatus = 0,
  handleReloadAppId,
  postData,
}) {
  const [swiper, setSwiper] = useState(null);
  const [mainIndex, setMainIndex] = useState(0);

  const btnPrevRef = useRef(null);
  const btnNextRef = useRef(null);

  const swiperParams = {
    onBeforeInit: (swipe) => {
      swipe.params.navigation.prevEl = btnPrevRef.current;
      swipe.params.navigation.nextEl = btnNextRef.current;
      swipe.activeIndex = mainIndex;
      swipe.navigation.update();
    },
    onSwiper: setSwiper,
    onSlideChange: (e) => setMainIndex(e.activeIndex),
    navigation: {
      nextEl: btnNextRef.current,
      prevEl: btnPrevRef.current,
    },
    spaceBetween: 10,
    slidesPerView: 'auto',

    observer: true,
    observeParents: true,
    breakpoints: {
      768: {
        spaceBetween: 16,
      },
    },
  };

  const renderParticipantList = () => {
    if (participantList.length > 0) {
      return participantList.map((p) => (
        <SwiperSlide key={p && p.apId}>
          <SwiperCard
            data={p}
            boardId={boardId}
            status={status}
            handleReloadAppId={handleReloadAppId}
            postData={postData}
          />
        </SwiperSlide>
      ));
    } else {
      return (
        <NoContent>
          <div className="illust">
            <img src={NocontProfile2} alt="noContentImg" />
          </div>
          <p>
            <em>{pageStatus === 1 ? '참여자가 없네요...!' : '아직 참여자가 없네요...!'}</em>
            <br />
            {pageStatus === 1
              ? '마감일을 연장하시면 다시 모집가능합니다'
              : '대기자가 없는지 한번 확인해보세요'}
          </p>
        </NoContent>
      );
    }
  };

  const renderWaitingList = () => {
    if (waitingList.length > 0) {
      return waitingList.map((p) => (
        <SwiperSlide key={p && p.apId}>
          <SwiperCard
            data={p}
            boardId={boardId}
            status={status}
            handleReloadAppId={handleReloadAppId}
            postData={postData}
          />
        </SwiperSlide>
      ));
    } else {
      return (
        <NoContent>
          <div className="illust">
            <img src={NocontProfile2} alt="noContentImg" />
          </div>
          <p>
            <em>아직 대기자가 없네요...!</em>
            <br />
            기다리다보면 참여요청하는 크루원이 있을거에요
          </p>
        </NoContent>
      );
    }
  };

  return (
    <PostSwiperWrapper active={isSwiperClick}>
      <Swiper {...swiperParams} ref={setSwiper} className="card_swiper">
        {!toggleCheck ? renderParticipantList() : renderWaitingList()}
      </Swiper>
      <ButtonPrev ref={btnPrevRef} />
      <ButtonNext ref={btnNextRef} />
    </PostSwiperWrapper>
  );
}

export default SwiperBtSection;

const ButtonPrev = styled.div`
  position: absolute;
  width: 62px;
  height: 62px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  top: calc(50% - 31px);
  z-index: 1;
  cursor: pointer;
  background-size: 10px !important;
  background-color: #fff !important;
  opacity: 1;
  transition: 0.5s;
  left: -87px;
  background: url(${SlideArrowPrev}) no-repeat 50% 50%;

  @media screen and (max-width: 820px) {
    display: none;
  }
`;

const ButtonNext = styled.div`
  right: -87px;
  background: url(${SlideArrowNext}) no-repeat 50% 50%;
  position: absolute;
  width: 62px;
  height: 62px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  top: calc(50% - 31px);
  z-index: 1;
  cursor: pointer;
  background-size: 10px !important;
  background-color: #fff !important;
  opacity: 1;

  transition: 0.5s;

  @media screen and (max-width: 820px) {
    display: none;
  }
`;

const PostSwiperWrapper = styled.div`
  margin-bottom: 14px;
  overflow: hidden;
  .swiper-button-disabled {
    opacity: 0;
    cursor: default;
  }

  ${(props) =>
    !props.active &&
    css`
      ${ButtonPrev} {
        opacity: 0;
        cursor: default;
      }

      ${ButtonNext} {
        opacity: 0;
        cursor: default;
      }
    `}

  .swiper-slide {
    flex-shrink: 0;
    width: 300px;
    height: 100%;
    position: relative;
    transition-property: transform;
    transition-property: transform, -webkit-transform;
  }

  .card_swiper {
    box-sizing: content-box;
    padding: 0 16px;
  }

  .swiper-wrapper {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: flex;
    transition-property: transform;
    transition-property: transform, -webkit-transform;
    box-sizing: content-box;
  }

  @media screen and (max-width: 820px) {
    .swiper-slide {
      width: calc(100% - 78px);
      margin-bottom: 10px;
    }

    .card_swiper {
      padding: 0 10px;
    }
  }

  @media screen and (max-width: 300px) {
    .swiper-slide {
      width: calc(100% - 18px);
    }
  }
`;

const NoContent = styled('div')`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 416px;

  .illust {
    width: 240px;
    height: 240px;
    aspect-ratio: 1;
    border-radius: 50%;
    overflow: hidden;
    margin-bottom: 20px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  p {
    font-size: 13px;
    font-weight: 400;
    line-height: 20px;
    text-align: center;

    em {
      font-weight: 700;

      span {
        color: #00b7ff;
      }
    }
  }

  @media screen and (max-width: 820px) {
    .illust {
      width: 200px;
      height: 200px;
      margin-bottom: 24px;
    }
  }
`;
