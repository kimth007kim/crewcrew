import { CommonFunc } from '../Common.js';

window.addEventListener('DOMContentLoaded', CommonFunc);

window.addEventListener('DOMContentLoaded', function () {
  let swiperProperty = function (num) {
    return {
      slidesPerView: 3,
      navigation: {
        nextEl: '.ButtonNext' + num,
        prevEl: '.ButtonPrev' + num,
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
  };

  const swiper1 = new Swiper('.swiper1', swiperProperty(1));

  const swiper2 = new Swiper('.swiper2', swiperProperty(2));
});
