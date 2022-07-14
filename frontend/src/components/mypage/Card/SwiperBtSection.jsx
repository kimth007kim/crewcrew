/* eslint-disable import/no-unresolved */
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import styled, { css } from 'styled-components';
import SlideArrowNext from '@/assets/images/SlideArrowNext.png';
import SlideArrowPrev from '@/assets/images/SlideArrowPrev.png';

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

  return (
    <PostSwiperWrapper active={isSwiperClick}>
      <Swiper {...swiperParams} ref={setSwiper} className="card_swiper">
        {!toggleCheck
          ? participantList.length > 0 &&
            participantList.map((p) => (
              <SwiperSlide key={p && p.apId}>
                <SwiperCard data={p} boardId={boardId} status={status} />
              </SwiperSlide>
            ))
          : waitingList.length > 0 &&
            waitingList.map((w) => (
              <SwiperSlide key={w.apId}>
                <SwiperCard data={w} boardId={boardId} status={status} />
              </SwiperSlide>
            ))}
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
