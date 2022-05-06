/* eslint-disable prettier/prettier */
/* eslint-disable indent */
import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import ButtonScrollTop from '../../assets/images/ButtonScrollTop.png';
import ButtonScrollBottom from '../../assets/images/ButtonScrollBottom.png';
import LogoCircle from '../../assets/images/LogoCircle3.png';
import IconSearch from '../../assets/images/IconSearch.png';
import IconLinkIntro from '../../assets/images/IconLinkIntro.png';
import WaveSvg from '../../assets/images/Wave.svg';
import Category1 from '../../assets/images/IconCategory1.png';
import Profile1 from '../../assets/images/Profile1.png';
import Profile5 from '../../assets/images/Profile5.png';
import ArrowCircle from '../../assets/images/ArrowCircle.png';
import LogoTextBlack from '../../assets/images/LogoTextBlack.png';
import IconNavArrowRev from '../../assets/images/IconNavArrow_Rev.png';
import SlideArrowNext from '../../assets/images/SlideArrowNext.png';
import SlideArrowPrev from '../../assets/images/SlideArrowPrev.png';
import Profile4 from '../../assets/images/Profile4.png';
import StarOff from '../../assets/images/StarOff.png';
import StarOn from '../../assets/images/StarOn.png';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

SwiperCore.use([Navigation, Pagination]);
function CategoryCard({ sort, src, title, sub, ssub }) {
  return sort === 'study' ? (
    <GridWrapliStudy>
      <CategoryStudy>
        <Categoryh5>어학</Categoryh5>
        <Categoryp>토플/토익</Categoryp>
        <Categoryp2>스터디</Categoryp2>
        <CategoryIcon src={src} />
      </CategoryStudy>
    </GridWrapliStudy>
  ) : (
    <GridWrapliHobby>
      <CategoryHobby>
        <Categoryh5>트렌드</Categoryh5>
        <Categoryp>뷰티/패션</Categoryp>
        <Categoryp2>취미</Categoryp2>
        <CategoryIcon src={src} />
      </CategoryHobby>
    </GridWrapliHobby>
  );
}
function MobileSwiper() {
  return (
    <MobileWrapper>
      <Swiper
        spaceBetween={7.5}
        slidesPerView={3}
        scrollbar={{
          draggable: true,
        }}
        breakpoints={{
          225: {
            slidesPerView: 1.45,
          },
        }}
      >
        <SwiperSlide>
          <SwiperSlideCard>
            <CardPostStudy>
              <CardHead>
                <h5>
                  <span>D-14</span>
                </h5>
                <CardHeadRight>
                  <p>2/3 (목)</p>
                  <p>
                    조회수
                    <span>50</span>
                  </p>
                  <Star />
                </CardHeadRight>
              </CardHead>
              <CardBody>
                <CardProfile>
                  <ProfileImg alt="" />
                </CardProfile>
                <CardTxt>
                  <h4>함께 크루원 모집 플랫폼 작업하실 분 모십니다~!</h4>
                  <p>재영재영유재영</p>
                </CardTxt>
              </CardBody>
              <CardFooter>
                <CardTagStudy>고시/공무원</CardTagStudy>
                <CardTagStudy>오프라인</CardTagStudy>
                <CardTag>
                  <span>10</span>/<span>10</span>명 모집됨
                </CardTag>
              </CardFooter>
            </CardPostStudy>
          </SwiperSlideCard>
        </SwiperSlide>
        <SwiperSlide>
          <SwiperSlideCard>
            <CardPostHobby>
              <CardHead>
                <h5>
                  <span>D-14</span>
                </h5>
                <CardHeadRight>
                  <p>2/3 (목)</p>
                  <p>
                    조회수
                    <span>50</span>
                  </p>
                  <Star />
                </CardHeadRight>
              </CardHead>
              <CardBody>
                <CardProfile>
                  <ProfileImg alt="" />
                </CardProfile>
                <CardTxt>
                  <h4>함께 크루원 모집 플랫폼 작업하실 분 모십니다~!</h4>
                  <p>재영재영유재영</p>
                </CardTxt>
              </CardBody>
              <CardFooter>
                <CardTagHobby>프로젝트</CardTagHobby>
                <CardTagHobby>오프라인</CardTagHobby>
                <CardTag>
                  <span>10</span>/<span>10</span>명 모집됨
                </CardTag>
              </CardFooter>
            </CardPostHobby>
          </SwiperSlideCard>
        </SwiperSlide>
        <SwiperSlide>
          <SwiperSlideCard>
            <CardPostStudy>
              <CardHead>
                <h5>
                  <span>D-14</span>
                </h5>
                <CardHeadRight>
                  <p>2/3 (목)</p>
                  <p>
                    조회수
                    <span>50</span>
                  </p>
                  <Star />
                </CardHeadRight>
              </CardHead>
              <CardBody>
                <CardProfile>
                  <ProfileImg alt="" />
                </CardProfile>
                <CardTxt>
                  <h4>함께 크루원 모집 플랫폼 작업하실 분 모십니다~!</h4>
                  <p>재영재영유재영</p>
                </CardTxt>
              </CardBody>
              <CardFooter>
                <CardTagStudy>프로젝트</CardTagStudy>
                <CardTagStudy>오프라인</CardTagStudy>
                <CardTag>
                  <span>10</span>/<span>10</span>명 모집됨
                </CardTag>
              </CardFooter>
            </CardPostStudy>
          </SwiperSlideCard>
        </SwiperSlide>
        <SwiperSlide>
          <SwiperSlideCard>
            <CardPostStudy>
              <CardHead>
                <h5>
                  <span>D-14</span>
                </h5>
                <CardHeadRight>
                  <p>2/3 (목)</p>
                  <p>
                    조회수
                    <span>50</span>
                  </p>
                  <Star />
                </CardHeadRight>
              </CardHead>
              <CardBody>
                <CardProfile>
                  <ProfileImg alt="" />
                </CardProfile>
                <CardTxt>
                  <h4>함께 크루원 모집 플랫폼 작업하실 분 모십니다~!</h4>
                  <p>재영재영유재영</p>
                </CardTxt>
              </CardBody>
              <CardFooter>
                <CardTagStudy>프로젝트</CardTagStudy>
                <CardTagStudy>오프라인</CardTagStudy>
                <CardTag>
                  <span>10</span>/<span>10</span>명 모집됨
                </CardTag>
              </CardFooter>
            </CardPostStudy>
          </SwiperSlideCard>
        </SwiperSlide>
        <SwiperSlide>
          <SwiperSlideCard>
            <CardPostStudy>
              <CardHead>
                <h5>
                  <span>D-14</span>
                </h5>
                <CardHeadRight>
                  <p>2/3 (목)</p>
                  <p>
                    조회수
                    <span>50</span>
                  </p>
                  <Star />
                </CardHeadRight>
              </CardHead>
              <CardBody>
                <CardProfile>
                  <ProfileImg alt="" />
                </CardProfile>
                <CardTxt>
                  <h4>함께 크루원 모집 플랫폼 작업하실 분 모십니다~!</h4>
                  <p>재영재영유재영</p>
                </CardTxt>
              </CardBody>
              <CardFooter>
                <CardTagStudy>프로젝트</CardTagStudy>
                <CardTagStudy>오프라인</CardTagStudy>
                <CardTag>
                  <span>10</span>/<span>10</span>명 모집됨
                </CardTag>
              </CardFooter>
            </CardPostStudy>
          </SwiperSlideCard>
        </SwiperSlide>
        <SwiperSlide>
          <SwiperSlideCard>
            <CardPostHobby>
              <CardHead>
                <h5>
                  <span>D-14</span>
                </h5>
                <CardHeadRight>
                  <p>2/3 (목)</p>
                  <p>
                    조회수
                    <span>50</span>
                  </p>
                  <Star />
                </CardHeadRight>
              </CardHead>
              <CardBody>
                <CardProfile>
                  <ProfileImg alt="" />
                </CardProfile>
                <CardTxt>
                  <h4>함께 크루원 모집 플랫폼 작업하실 분 모십니다~!</h4>
                  <p>재영재영유재영</p>
                </CardTxt>
              </CardBody>
              <CardFooter>
                <CardTagHobby>프로젝트</CardTagHobby>
                <CardTagHobby>오프라인</CardTagHobby>
                <CardTag>
                  <span>10</span>/<span>10</span>명 모집됨
                </CardTag>
              </CardFooter>
            </CardPostHobby>
          </SwiperSlideCard>
        </SwiperSlide>
      </Swiper>
    </MobileWrapper>
  );
}

function Main() {
  return (
    <MainMain>
      <ScrollButton>
        <ScrollTop />
        <ScrollBottom />
      </ScrollButton>
      <MainTop>
        <TopCont>
          <LogoCircleImg />
          <TopConth2>크루원과 크루원이 만나다!</TopConth2>
          <TopConth3>목표를 향해 항해하는 팀원모집 플랫폼, 크루크루</TopConth3>
          <InputWrapper>
            <IconSearchImg />
            <TopContInput type="text" placeholder="참여하고 싶은 모임을 검색해보세요!" />
          </InputWrapper>
        </TopCont>
        <TopWave>
          <Wave1 />
          <Wave2 />
        </TopWave>
        <ButtonIntro />
      </MainTop>
      <MainCategory>
        <SectionWrap>
          <SectionWraph4>12가지 분야에서 크루원 절찬리 모집중!</SectionWraph4>
          <SectionWrapp>혼자서 공부하기 힘들었죠? 이제는 크루원들과 함께 성공합시다~!</SectionWrapp>
          <GridWrap>
            <CategoryCard sort="study" src={Category1} />
            <CategoryCard sort="study" src={Category1} />
            <CategoryCard sort="study" src={Category1} />
            <CategoryCard sort="study" src={Category1} />
            <CategoryCard sort="study" src={Category1} />
            <CategoryCard sort="" src={Category1} />
            <CategoryCard sort="" src={Category1} />
            <CategoryCard sort="" src={Category1} />
            <CategoryCard sort="" src={Category1} />
            <CategoryCard sort="" src={Category1} />
            <CategoryCard sort="" src={Category1} />
            <CategoryCard sort="" src={Category1} />
          </GridWrap>
        </SectionWrap>
      </MainCategory>
      <MainWrite>
        <WriteWrap>
          <h4>나도 크루원 모집해볼래요~!</h4>
          <p>더울 효율적이면서, 간편하게 크루원을 모집해보아요</p>
          <WriteButtonList>
            <WriteButtonLi1>
              <WriteButton>
                <WriteButtonimg src={Profile1} />
                <h5>
                  <em>스터디 크루원</em>
                  <br />
                  모집글 작성
                  <span>하러 가기</span>
                </h5>
                <Arrow />
              </WriteButton>
            </WriteButtonLi1>
            <WriteButtonLi2>
              <WriteButton>
                <WriteButtonimg src={Profile5} alt="" />
                <h5>
                  <em>취미 크루원</em>
                  <br />
                  모집글 작성
                  <span>하러 가기</span>
                </h5>
                <Arrow />
              </WriteButton>
            </WriteButtonLi2>
          </WriteButtonList>
        </WriteWrap>
      </MainWrite>
      <MainPost>
        <PostWrap>
          <h4>마감임박! 놓치지 말아요!</h4>
          <p>마감일이 가깝거나 모집인원을 거의 다 모은 크루원 모집글을 소개해드려요.</p>

          <PostSwiperContainer>
            <MobileSwiper />
            <PostSwiperWrapper>
              <Swiper
                spaceBetween={18}
                slidesPerView={3}
                scrollbar={{
                  draggable: true,
                }}
                breakpoints={{
                  775: {
                    slidesPerView: 2.45,
                  },
                }}
              >
                <SwiperSlide>
                  <SwiperSlideCard>
                    <CardPostStudy>
                      <CardHead>
                        <h5>
                          <span>D-14</span>
                        </h5>
                        <CardHeadRight>
                          <p>2/3 (목)</p>
                          <p>
                            조회수
                            <span>50</span>
                          </p>
                          <Star />
                        </CardHeadRight>
                      </CardHead>
                      <CardBody>
                        <CardProfile>
                          <ProfileImg alt="" />
                        </CardProfile>
                        <CardTxt>
                          <h4>함께 크루원 모집 플랫폼 작업하실 분 모십니다~!</h4>
                          <p>재영재영유재영</p>
                        </CardTxt>
                      </CardBody>
                      <CardFooter>
                        <CardTagStudy>고시/공무원</CardTagStudy>
                        <CardTagStudy>오프라인</CardTagStudy>
                        <CardTag>
                          <span>10</span>/<span>10</span>명 모집됨
                        </CardTag>
                      </CardFooter>
                    </CardPostStudy>
                  </SwiperSlideCard>
                </SwiperSlide>
                <SwiperSlide>
                  <SwiperSlideCard>
                    <CardPostHobby>
                      <CardHead>
                        <h5>
                          <span>D-14</span>
                        </h5>
                        <CardHeadRight>
                          <p>2/3 (목)</p>
                          <p>
                            조회수
                            <span>50</span>
                          </p>
                          <Star />
                        </CardHeadRight>
                      </CardHead>
                      <CardBody>
                        <CardProfile>
                          <ProfileImg alt="" />
                        </CardProfile>
                        <CardTxt>
                          <h4>함께 크루원 모집 플랫폼 작업하실 분 모십니다~!</h4>
                          <p>재영재영유재영</p>
                        </CardTxt>
                      </CardBody>
                      <CardFooter>
                        <CardTagHobby>프로젝트</CardTagHobby>
                        <CardTagHobby>오프라인</CardTagHobby>
                        <CardTag>
                          <span>10</span>/<span>10</span>명 모집됨
                        </CardTag>
                      </CardFooter>
                    </CardPostHobby>
                  </SwiperSlideCard>
                </SwiperSlide>
                <SwiperSlide>
                  <SwiperSlideCard>
                    <CardPostStudy>
                      <CardHead>
                        <h5>
                          <span>D-14</span>
                        </h5>
                        <CardHeadRight>
                          <p>2/3 (목)</p>
                          <p>
                            조회수
                            <span>50</span>
                          </p>
                          <Star />
                        </CardHeadRight>
                      </CardHead>
                      <CardBody>
                        <CardProfile>
                          <ProfileImg alt="" />
                        </CardProfile>
                        <CardTxt>
                          <h4>함께 크루원 모집 플랫폼 작업하실 분 모십니다~!</h4>
                          <p>재영재영유재영</p>
                        </CardTxt>
                      </CardBody>
                      <CardFooter>
                        <CardTagStudy>프로젝트</CardTagStudy>
                        <CardTagStudy>오프라인</CardTagStudy>
                        <CardTag>
                          <span>10</span>/<span>10</span>명 모집됨
                        </CardTag>
                      </CardFooter>
                    </CardPostStudy>
                  </SwiperSlideCard>
                </SwiperSlide>
                <SwiperSlide>
                  <SwiperSlideCard>
                    <CardPostStudy>
                      <CardHead>
                        <h5>
                          <span>D-14</span>
                        </h5>
                        <CardHeadRight>
                          <p>2/3 (목)</p>
                          <p>
                            조회수
                            <span>50</span>
                          </p>
                          <Star />
                        </CardHeadRight>
                      </CardHead>
                      <CardBody>
                        <CardProfile>
                          <ProfileImg alt="" />
                        </CardProfile>
                        <CardTxt>
                          <h4>함께 크루원 모집 플랫폼 작업하실 분 모십니다~!</h4>
                          <p>재영재영유재영</p>
                        </CardTxt>
                      </CardBody>
                      <CardFooter>
                        <CardTagStudy>프로젝트</CardTagStudy>
                        <CardTagStudy>오프라인</CardTagStudy>
                        <CardTag>
                          <span>10</span>/<span>10</span>명 모집됨
                        </CardTag>
                      </CardFooter>
                    </CardPostStudy>
                  </SwiperSlideCard>
                </SwiperSlide>
                <SwiperSlide>
                  <SwiperSlideCard>
                    <CardPostStudy>
                      <CardHead>
                        <h5>
                          <span>D-14</span>
                        </h5>
                        <CardHeadRight>
                          <p>2/3 (목)</p>
                          <p>
                            조회수
                            <span>50</span>
                          </p>
                          <Star />
                        </CardHeadRight>
                      </CardHead>
                      <CardBody>
                        <CardProfile>
                          <ProfileImg alt="" />
                        </CardProfile>
                        <CardTxt>
                          <h4>함께 크루원 모집 플랫폼 작업하실 분 모십니다~!</h4>
                          <p>재영재영유재영</p>
                        </CardTxt>
                      </CardBody>
                      <CardFooter>
                        <CardTagStudy>프로젝트</CardTagStudy>
                        <CardTagStudy>오프라인</CardTagStudy>
                        <CardTag>
                          <span>10</span>/<span>10</span>명 모집됨
                        </CardTag>
                      </CardFooter>
                    </CardPostStudy>
                  </SwiperSlideCard>
                </SwiperSlide>
                <SwiperSlide>
                  <SwiperSlideCard>
                    <CardPostHobby>
                      <CardHead>
                        <h5>
                          <span>D-14</span>
                        </h5>
                        <CardHeadRight>
                          <p>2/3 (목)</p>
                          <p>
                            조회수
                            <span>50</span>
                          </p>
                          <Star />
                        </CardHeadRight>
                      </CardHead>
                      <CardBody>
                        <CardProfile>
                          <ProfileImg alt="" />
                        </CardProfile>
                        <CardTxt>
                          <h4>함께 크루원 모집 플랫폼 작업하실 분 모십니다~!</h4>
                          <p>재영재영유재영</p>
                        </CardTxt>
                      </CardBody>
                      <CardFooter>
                        <CardTagHobby>프로젝트</CardTagHobby>
                        <CardTagHobby>오프라인</CardTagHobby>
                        <CardTag>
                          <span>10</span>/<span>10</span>명 모집됨
                        </CardTag>
                      </CardFooter>
                    </CardPostHobby>
                  </SwiperSlideCard>
                </SwiperSlide>
              </Swiper>
              <ButtonPrev />
              <ButtonNext />
            </PostSwiperWrapper>
          </PostSwiperContainer>
        </PostWrap>
      </MainPost>
      <MainFooter>
        <FooterSectionWrap>
          <FooterTop>
            <LogoTextBlackimg />
            <ul>
              <li>개인정보 취급 방침</li>
              <li>이용 약관</li>
              <li>프로젝트 개요</li>
            </ul>
          </FooterTop>
          <FooterBody>
            <h4>프로젝트 참여자</h4>
            <ul>
              <li>김경동</li>
              <li>김도희</li>
              <li>이하늘</li>
              <li>박한결</li>
              <li>이재혁</li>
              <li>오주영</li>
              <li>유재영</li>
            </ul>
          </FooterBody>
          <FooterBottom>
            <p>
              2021/12/--~2022/04 까지 진행한 웹 서비스 구축 프로젝트.
              <br className="m" />
              백엔드3명, 프론트2명, 퍼블리셔1명, 디자이너1명으로 구성된 팀.
              <br />
              백엔드: 김경동, 김도희, 이하늘/ 프론트: 이재혁, 오주영/
              <br className="m" />
              퍼블리셔: 박한결/ 디자이너: 유재영
              <br />이 사이트의 모든 기술과 디자인의 저작 권리는 위 프로젝트 참여자에 있습니다.
            </p>
          </FooterBottom>
        </FooterSectionWrap>
      </MainFooter>
    </MainMain>
  );
}

export default Main;

// @media screen and (max-width: 820px) {

const MainMain = styled.main`
  margin-left: 142px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  overflow-x: hidden;
  word-break: keep-all;

  @media screen and (max-width: 820px) {
    width: 100%;
    padding: 60px 0 70px;
    margin: 0;
  }
`;
const MainCategory = styled.section`
  background-color: #f6f7fb;
  padding: 90px 0 100px;
  @media screen and (max-width: 820px) {
    padding: 50px 0;
  }
`;
const MainWrite = styled.section`
  padding: 45px 0;
  @media screen and (max-width: 820px) {
    padding: 30px 0;
  }
`;

const WriteWrap = styled.div`
  max-width: 800px;
  margin: auto;
  @media screen and (max-width: 820px) {
    max-width: calc(100vw - 40px);
  }
  margin: auto;
  h4 {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    @media screen and (max-width: 820px) {
      text-align: left;
      font-size: 18px;
      line-height: 26px;
    }
  }
  p {
    text-align: center;
    font-size: 13px;
    font-weight: 400;
    color: #868686;
    margin-top: 10px;
    @media screen and (max-width: 820px) {
      text-align: left;
      font-size: 12px;
      line-height: 20px;
      margin-top: 8px;
    }
  }
`;

const SectionWraph4 = styled.h4`
  font-size: 20px;
  font-weight: 700;

  @media screen and (max-width: 820px) {
    font-size: 18px;
    line-height: 26px;
  }
`;

const SectionWrapp = styled.p`
  font-size: 13px;
  font-weight: 400;
  color: #868686;
  margin-top: 10px;

  @media screen and (max-width: 820px) {
    font-size: 12px;
    line-height: 20px;
    margin-top: 8px;
  }
`;

const GridWrap = styled.ul`
  margin-top: 30px;
  display: -ms-grid;
  display: grid;
  -ms-grid-columns: (1fr) [4];
  grid-template-columns: repeat(4, 1fr);
  gap: 46px;
  margin-right: -5px;
  @media screen and (max-width: 820px) {
    -ms-grid-columns: (1fr) [3];
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }
  @media screen and (max-width: 300px) {
    -ms-grid-columns: 1fr 1fr;
        grid-template-columns: 1fr 1fr;
  }
`;

const GridWrapliStudy = styled.li`
  border-radius: 10px;

  @media screen and (max-width: 820px) {
    max-width: calc(100vw - 40px);
  }
`;
const GridWrapliHobby = styled.li`
  border-radius: 10px;
  @media screen and (max-width: 820px) {
    max-width: calc(100vw - 40px);
  }
`;

const Categoryh5 = styled.h5`
  font-size: 20px;
  font-weight: 500;
  color: #fff;
  @media screen and (max-width: 820px) {
    font-size: 15px;
  }
`;
const Categoryp = styled.p`
  font-size: 13px;
  font-weight: 300;
  margin-top: 4px;
  height: 13px;
  color: #fff;
  @media screen and (max-width: 820px) {
    font-size: 12px;
    line-height: 16px;
    word-break: break-all;
  }
`;

const Categoryp2 = styled.p`
  font-size: 13px;
  font-weight: 300;
  text-align: right;
  margin-top: 78px;
  height: 13px;
  color: #fff;
  @media screen and (max-width: 820px) {
    margin-top: 0;
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
`;

const SectionWrap = styled.section`
  max-width: 800px;
  margin: auto;
  @media screen and (max-width: 820px) {
    max-width: calc(100vw - 40px);
  }

  @media screen and (max-width: 300px) {
    max-width: calc(100vw - 20px);
  }
`;

const ScrollButton = styled.div`
  position: fixed;
  width: 45px;
  height: 110px;
  right: 45px;
  bottom: 45px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  background-size: 100% !important;
  cursor: pointer;
  opacity: 1;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  @media screen and (max-width: 820px) {
    display: none;
  }
`;

const ScrollTop = styled.div`
  width: 45px;
  height: 45px;
  background-size: 100% !important;
  cursor: pointer;
  opacity: 1;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  background: url(${ButtonScrollTop});
`;

const ScrollBottom = styled.div`
  width: 45px;
  height: 45px;
  background-size: 100% !important;
  cursor: pointer;
  opacity: 1;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  background: url(${ButtonScrollBottom});
`;

const MainTop = styled.section`
  height: 400px;
  background-color: #005ec5;
  position: relative;
  overflow: hidden;

  @media screen and (max-width: 820px) {
    height: 240px;
    background-color: #005ec5;
    position: relative;
    overflow: hidden;
  }
`;

const TopCont = styled.div`
  position: absolute;
  left: calc(50% - 253px);
  height: 100%;
  z-index: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  @media screen and (max-width: 820px) {
    span {
      width: 42px;
      height: 36px;
      margin: 38px auto 12px;
    }
    width: calc(100vw - 40px);
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
  }
  @media screen and (max-width: 300px) {
    span {
      margin-top: 50px;
    }
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  height: 50px;
  border: 1px solid #e2e2e2;
  border-radius: 25px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin-top: 25px;
  overflow: hidden;
  background-color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  @media screen and (max-width: 820px) {
    width: calc(100vw - 40px);
    height: 36px;
    border-radius: 18px;
    margin-top: 32px;
    span {
      width: 24px;
      height: 24px;
      margin: 0px 0px 4px 24px !important;
    }
  }
`;

const LogoCircleImg = styled.span`
  width: 70px;
  height: 60px;
  margin: 66px auto 20px;
  background: url(${LogoCircle});
  background-size: 100% !important;
  @media screen and (max-width: 820px) {
    width: 42px;
    height: 36px;
    margin: 38px auto 12px;
  }
`;

const IconSearchImg = styled.span`
  width: 26px;
  height: 26px;
  margin-left: 18px;
  margin-bottom: 4px;
  background: url(${IconSearch});
  background-position: center;
  background-size: 100% !important;

  @media screen and (max-width: 300px) {
    width: 24px;
    height: 24px;
    margin-left: 24px;
    margin-top: 0px;
    background-position: none;
    background-size: none;
  }
`;

const TopContInput = styled.input`
  width: calc(100% - 76px);
  height: 100%;
  border: none;
  outline: none;
  margin-left: 14px;
  font-size: 13px;
  font-weight: 400;

  @media screen and (max-width: 820px) {
    font-size: 10px;
  } ;
`;

const TopConth2 = styled.h2`
  font-size: 48px;
  color: #fff;
  font-weight: 700;
  line-height: 60px;

  @media screen and (max-width: 820px) {
    font-size: 28px;
    line-height: 36px;
  }
  @media screen and (max-width: 300px) {
    font-size: 22px;
    line-height: 30px;
    text-align: center;
    word-break: keep-all;
  }
`;

const TopConth3 = styled.h3`
  font-size: 20px;
  color: #fff;
  font-weight: 300;
  line-height: 36px;

  @media screen and (max-width: 820px) {
    font-size: 13px;
    line-height: 26px;
  }
  @media screen and (max-width: 300px) {
    font-size: 12px;
    line-height: 24px;
    text-align: center;
    word-break: keep-all;
  }
`;

const MobileGnb = styled.div`
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
`;

const TopWave = styled.div`
  height: 160px;
  width: 3200px;
  max-width: 820px;
  bottom: 0;
  left: 0;
`;

const Wave1 = styled.div`
  opacity: 0.9;
  animation-direction: alternate-reverse;
  position: absolute;
  height: 160px;
  width: 3200px;
  bottom: 0;
  left: 0%;
  -webkit-animation: wave 4s linear infinite alternate;
  animation: wave 4s linear infinite alternate-reverse;
  background: url(${WaveSvg}) no-repeat;
  background-size: 100% 100%;
  background-position: left bottom;
  @media screen and (max-width: 820px) {
    height: 80px;
    width: 1600px;
  }
  @-webkit-keyframes wave {
    to {
      left: -50%;
    }
  }

  @keyframes wave {
    to {
      left: -50%;
    }
  }
`;

const Wave2 = styled.div`
  opacity: 0.5;
  position: absolute;
  height: 160px;
  width: 3200px;
  bottom: 0;
  left: 0;
  -webkit-animation: wave 4s linear infinite alternate;
  animation: wave 4s linear infinite alternate;
  background: url(${WaveSvg}) no-repeat;
  background-size: 100% 100%;
  background-position: left bottom;
  @media screen and (max-width: 820px) {
    height: 80px;
    width: 1600px;
  }
  @-webkit-keyframes wave {
    to {
      left: -50%;
    }
  }

  @keyframes wave {
    to {
      left: -50%;
    }
  }
`;

const ButtonIntro = styled.div`
  width: 45px;
  height: 45px;
  background: url(${IconLinkIntro}) 50% 50%;
  background-size: 100% !important;
  cursor: pointer;
  position: absolute;
  top: 63px;
  right: 45px;
  opacity: 0.5;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  :hover {
    opacity: 1;
  }

  @media screen and (max-width: 820px) {
    width: 30px;
    height: 30px;
    top: 17px;
    right: 20px;
    opacity: 1;
  }
`;

const CategoryStudy = styled.div`
  background: linear-gradient(135deg, #0f3fa6 3.96%, #0575e6 99.7%);
  width: 164px;
  height: 164px;
  border-radius: 10px;
  -webkit-box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  padding: 14px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  -webkit-filter: brightness(100%);
  filter: brightness(100%);
  :hover {
    -webkit-filter: brightness(110%);
    filter: brightness(110%);
  }
  @media screen and (max-width: 820px) {
    width: calc((100vw - 70px) / 3);
    height: calc((100vw - 70px) / 3);
    padding: 10px;
  };
  @media screen and (max-width: 300px) {
    width: calc((100vw - 38px)/2);
    height: calc((100vw - 38px)/2);
  };
`;

const CategoryHobby = styled.div`
background: linear-gradient(135deg, #F7971E 0%, #FFD200 100%);
width: 164px;
height: 164px;
border-radius: 10px;
-webkit-box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
padding: 14px;
-webkit-box-sizing: border-box;
        box-sizing: border-box;
position: relative;
cursor: pointer;
-webkit-transition: .3s;
transition: .3s;
-webkit-filter: brightness(100%);
        filter: brightness(100%);
        :hover {
  -webkit-filter: brightness(110%);
          filter: brightness(110%);
        }
          @media screen and (max-width: 820px) {
    width: calc((100vw - 70px)/3);
    height: calc((100vw - 70px)/3);
    padding: 10px;
};
@media screen and (max-width: 300px) {
    width: calc((100vw - 38px)/2);
    height: calc((100vw - 38px)/2);
};
`;

const CategoryIcon = styled.img`
  width: 58px;
  height: 58px;
  background-size: 100% !important;
  position: absolute;
  left: 14px;
  bottom: 14px;
  mix-blend-mode: overlay;
  @media screen and (max-width: 820px) {
    width: 20px;
    height: 20px;
    left: 10px;
    bottom: 10px;
  }
`;

const WriteButtonimg = styled.img`
  width: 180px;
  height: 180px;
  @media screen and (max-width: 820px) {
    display: none;
  }
`;

const WriteButton = styled.div`
  width: 100%;
  height: 180px;
  border-radius: 10px;
  padding: 0 20px 0 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  -webkit-transition: 1s;
  transition: 1s;
  @media screen and (max-width: 820px) {
    height: 86px;
    padding: 20px 0;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  h5 {
    font-size: 20px;
    font-weight: 300;
    color: white;
    margin: 0;
    line-height: 26px;
    text-align: right;
    -webkit-transform: translateY(0);
    transform: translateY(0);
    position: relative;
    -webkit-transition: 0.5s;
    transition: 0.5s;
    em {
      font-weight: 500;
    }

    @media screen and (max-width: 820px) {
      text-align: center;
      span {
        display: none;
      }
    }
  }

  :hover {
    h5 {
      @media screen and (max-width: 820px) {
        -webkit-transform: none;
        transform: none;
      }
      -webkit-transform: translateY(-34px);
      transform: translateY(-34px);
    }
    div {
      opacity: 1;
      -webkit-transition-delay: 0.1s;
      transition-delay: 0.1s;
    }
  }
`;

const Arrow = styled.div`
  width: 55px;
  height: 55px;
  background: url(${ArrowCircle});
  background-size: 100%;
  position: absolute;
  bottom: 25px;
  right: 20px;
  opacity: 0;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  -webkit-transition-delay: 0s;
  transition-delay: 0s;

  @media screen and (max-width: 820px) {
    display: none;
  }
`;

const WriteButtonList = styled.ul`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
`;

const WriteButtonLi1 = styled.li`
  width: 100%;
  height: 180px;
  margin-top: 45px;
  border-radius: 10px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  @media screen and (max-width: 820px) {
    margin-right: 20px;
    margin-top: 30px;
    height: 86px;
    padding: 20px 0;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  cursor: pointer;
  position: relative;
  -webkit-transition: 1s;
  transition: 1s;
  background-color: #0575e6;
  :hover {
    background-color: #005ec5;
  }
  margin-right: 48px;
`;

const WriteButtonLi2 = styled.li`
  width: 100%;
  height: 180px;
  margin-top: 45px;
  border-radius: 10px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  @media screen and (max-width: 820px) {
    margin-top: 30px;
    height: 86px;
    padding: 20px 0;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
  }
  cursor: pointer;
  -webkit-transition: 1s;
  transition: 1s;
  background-color: #ffd458;
  :hover {
    background-color: #fcb90d;
  }
  width: 100%;
`;

const MainFooter = styled.footer`
  background-color: #2d3338;
  padding: 30px 0 57px;
`;

const FooterSectionWrap = styled.div`
  max-width: 800px;
  margin: auto;
`;

const FooterTop = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: end;
  -ms-flex-align: end;
  align-items: flex-end;
  @media screen and (max-width: 820px) {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  @media screen and (max-width: 300px) {
    margin: 10px 0;

    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  ul {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    margin-left: 40px;
    margin-bottom: 2px;

    @media screen and (max-width: 820px) {
      margin: 10px 0;
    }
    @media screen and (max-width: 300px) {
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }


    li {
      color: #fff;
      font-weight: 500;
      font-size: 13px;
      line-height: 1;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      height: 20px;
      padding: 0 40px;
      border-left: 1px solid #fff;
      @media screen and (max-width: 300px) {
        border: none;
      }
      @media screen and (max-width: 820px) {
        padding: 0 10px;
        :first-child {
          border: none;
        }
      }
      a {
        color: #fff;
        font-weight: 500;
        font-size: 13px;
        line-height: 1;
      }
    }
  }
`;

const FooterBody = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  margin: 30px 0;
  color: #fff;
  font-size: 13px;

  @media screen and (max-width: 820px) {
    margin: 20px 0 30px;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  h4 {
    font-weight: 500;
    margin-right: 20px;
    @media screen and (max-width: 820px) {
      font-size: 16px;
      margin: 0;
    }
  }
  ul {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border-left: 1px solid #fff;
    @media screen and (max-width: 820px) {
      margin-top: 10px;
      border: none;
    }
    li {
      padding-left: 20px;
      font-weight: 400;

      @media screen and (max-width: 820px) {
        padding-left: 4px;
        font-size: 12px;
        font-weight: 300;
      }
    }
  }
`;

const FooterBottom = styled.div`
  p {
    font-size: 10px;
    color: #fff;
    font-weight: 500;
    line-height: 14px;

    @media screen and (max-width: 820px) {
      text-align: center;
    }
  }
  br.m {
    display: none;

    @media screen and (max-width: 300px) {
      :first-of-type {
        display: none;
      }
    }
    @media screen and (max-width: 820px) {
      display: block;
    }
  }
`;

const LogoTextBlackimg = styled.span`
  width: 162px;
  height: 46px;
  background: url(${LogoTextBlack}) no-repeat;
  background-size: 100% !important;
`;

const MainPost = styled.section`
  background-color: #f6f7fb;
  padding: 100px 0;
  @media screen and (max-width: 820px) {
    padding: 50px 0;
  }
`;

const PostWrap = styled.div`
  max-width: 800px;
  margin: auto;

  h4 {
    font-size: 20px;
    font-weight: 700;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    color: #000;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    @media screen and (max-width: 820px) {
      font-size: 18px;
      line-height: 26px;
    }
    ::after {
      content: '';
      display: block;
      width: 7px;
      height: 14px;
      margin-left: 8px;
      background: url(${IconNavArrowRev});
      background-size: 100%;
      background-repeat: no-repeat;
    }
  }
  p {
    font-size: 13px;
    font-weight: 400;
    color: #868686;
    margin-top: 10px;
    word-break: keep-all;
    @media screen and (max-width: 820px) {
      font-size: 12px;
      line-height: 20px;
      margin-top: 8px;
    }
  }
  @media screen and (max-width: 820px) {
    max-width: calc(100vw - 40px);
  }
`;

const PostSwiperContainer = styled.div`
  position: relative;
  margin: 36px 0 110px;
  @media screen and (max-width: 820px) {
    margin: 30px 0 70px;
  }
`;

const PostSwiper = styled.div`
  margin-right: 10px;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-transition-property: -webkit-transform;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  li {
    width: 304px;
    margin-bottom: 10px;
  }
`;

const ButtonPrev = styled.div`
  position: absolute;
  width: 62px;
  height: 62px;
  background-color: #fff;
  border-radius: 5px;
  -webkit-box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  top: calc(50% - 31px);
  z-index: 1;
  cursor: pointer;
  background-size: 10px !important;
  background-color: #fff !important;
  opacity: 1;
  -webkit-transition: 0.5s;
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
  -webkit-box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  top: calc(50% - 31px);
  z-index: 1;
  cursor: pointer;
  background-size: 10px !important;
  background-color: #fff !important;
  opacity: 1;
  -webkit-transition: 0.5s;
  transition: 0.5s;
  @media screen and (max-width: 820px) {
    display: none;
  }
`;

const PostSlideWrapper = styled.ul`
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-transition-property: -webkit-transform;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
  -webkit-box-sizing: content-box;
  box-sizing: content-box;
  -webkit-transform: translate3d(0px, 0, 0);
  transform: translate3d(0px, 0, 0);
`;

const SwiperSlideCard = styled.li`
  height: auto;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  position: relative;
  -webkit-transition-property: -webkit-transform;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
`;

const MobileWrapper = styled.div`
  display: none;
  @media screen and (max-width: 820px) {
    display: block;
    overflow: hidden;
  }
  li {
    width: 304px;
    margin-bottom: 10px;
    @media screen and (max-width: 820px) {
      width: 226px;
    }
  }
`;

const PostSwiperWrapper = styled.div`
  overflow: hidden;
  @media screen and (max-width: 820px) {
    display: none;
  }
  li {
    width: 304px;
    margin-bottom: 10px;
    @media screen and (max-width: 820px) {
      width: 226px;
    }
  }
`;

const CardPostStudy = styled.div`
  border-top: 6px solid #005ec5;
  width: 100%;
  background-color: #fff;
  border-radius: 2px 2px 15px 15px;
  -webkit-box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  -webkit-box-sizing: border-box;
        box-sizing: border-box;
  cursor: pointer;
  p {
    font-size: 10px;
    font-weight: 400;
    color: #868686;
  }
`;

const CardPostHobby = styled.div`
  border-top: 6px solid #F7971E;
  width: 100%;
  background-color: #fff;
  border-radius: 2px 2px 15px 15px;
  -webkit-box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
        box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.1);
  -webkit-box-sizing: border-box;
        box-sizing: border-box;
  cursor: pointer;
  p {
    font-size: 10px;
    font-weight: 400;
    color: #868686;
  };
  `;

const CardHead = styled.div`
  padding: 10px 12px 10px 15px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  h5 {
    font-size: 13px;
    font-weight: 700;
  }
`;

const CardHeadRight = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  p {
    :first-child {
      @media screen and (max-width: 820px) {
        display: none;
      }
    }
    margin-top: 0;
    margin-left: 10px;
    @media screen and (max-width: 820px) {
      font-size: 11px;
      font-weight: 400;
      color: #868686;
    }
  }
`;

const CardBody = styled.div`
  height: 82px;
  padding: 10px 12px 0 15px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  @media screen and (max-width: 820px) {
    padding: 0 5px 0 15px;
    height: 64px;
  }
`;

const CardFooter = styled.div`
  padding: 10px 12px 10px 15px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  @media screen and (max-width: 820px) {
    padding: 5px;
  }
`;

const CardTag = styled.div`
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  padding: 5px 8px;
  border-radius: 13px;
  background-color: #a8a8a8;
  font-size: 13px;
  line-height: 16px;
  color: #fff;
  font-weight: 400;
  :not(:last-child) {
    margin-right: 8px;
    @media screen and (max-width: 820px) {
      margin-right: 4px;
    }
  }
  @media screen and (max-width: 820px) {
    font-size: 11px;
    line-height: 1;
    border-radius: 12px;
    padding: 7px 8px;
  }
`;

const CardTagStudy = styled.div`
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  padding: 5px 8px;
  border-radius: 13px;
  background-color: #005ec5;
  font-size: 13px;
  line-height: 16px;
  color: #fff;
  font-weight: 400;
  :not(:last-child) {
    margin-right: 8px;
    @media screen and (max-width: 820px) {
      margin-right: 4px;
    }
  }
  @media screen and (max-width: 820px) {
    font-size: 11px;
    line-height: 1;
    border-radius: 12px;
    padding: 7px 8px;
  }
`;

const CardTagHobby = styled.div`
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  padding: 5px 8px;
  border-radius: 13px;
  background-color: #f7971e;
  font-size: 13px;
  line-height: 16px;
  color: #fff;
  font-weight: 400;
  :not(:last-child) {
    margin-right: 8px;
    @media screen and (max-width: 820px) {
      margin-right: 4px;
    }
  }
  @media screen and (max-width: 820px) {
    font-size: 11px;
    line-height: 1;
    border-radius: 12px;
    padding: 7px 8px;
  }
`;

const CardTxt = styled.div`
  width: 100%;
  margin-left: 15px;
  h4 {
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 8px;
    line-height: 18px;
    ::after {
      content: none;
      display: none;
      width: none;
      height: none;
      margin-left: none;
      background: none;
      background-size: none;
      background-repeat: none;
    }
  }
  p {
    margin-top: 0;

    @media screen and (max-width: 820px) {
      font-size: 11px;
      font-weight: 400;
      color: #868686;
    }
  }
`;

const CardProfile = styled.div`
  min-width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #8d2bf5;
`;

const ProfileImg = styled.div`
  width: 100%;
  height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  background: url(${Profile4}) 100% 100%;
  background-size: 100% !important;
`;

const Star = styled.div`
  width: 24px;
  height: 24px;
  background: url(${StarOff}) 50% 50% no-repeat;
  background-size: 20px !important;
  cursor: pointer;
  margin-left: 10px;
`;
