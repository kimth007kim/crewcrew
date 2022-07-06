import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import styled from 'styled-components';
import SlideArrowNext from '@/assets/images/SlideArrowNext.png';
import SlideArrowPrev from '@/assets/images/SlideArrowPrev.png';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import PostCardSlide from './PostCardSlide';

SwiperCore.use([Navigation, Pagination]);
function SwiperSection({ data, post, cookies }) {
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
        spaceBetween: 30,
      },
    },
  };

  return (
    <PostSwiperContainer>
      <PostSwiperWrapper>
        <Swiper {...swiperParams} ref={setSwiper}>
          {data.length > 0 &&
            data.map((data, i) => (
              <SwiperSlide key={data.boardId + post + data.uid + i * 10}>
                <PostCardSlide data={data} cookies={cookies} />
              </SwiperSlide>
            ))}
        </Swiper>
        <ButtonPrev ref={btnPrevRef} />
        <ButtonNext ref={btnNextRef} />
      </PostSwiperWrapper>
    </PostSwiperContainer>
  );
}

export default SwiperSection;
const PostSwiperContainer = styled.div`
  position: relative;
  margin: 36px 0 110px;
  @media screen and (max-width: 820px) {
    margin: 30px 0 70px;
  }
`;

const PostSwiperWrapper = styled.div`
  overflow: hidden;

  .swiper-button-disabled {
    opacity: 0;
    cursor: default;
  }

  .swiper-slide {
    width: 304px;
    margin-bottom: 10px;
  }

  .swiper {
    box-sizing: content-box;
    padding-right: 10px;
  }

  @media screen and (max-width: 820px) {
    .swiper-slide {
      width: 226px;
      margin-bottom: 10px;
    }
  }
`;

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
