import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Cookies } from 'react-cookie';

import Category1 from '@/assets/images/IconCategory1.png';
import Category2 from '@/assets/images/IconCategory2.png';
import Category3 from '@/assets/images/IconCategory3.png';
import Category4 from '@/assets/images/IconCategory4.png';
import Category5 from '@/assets/images/IconCategory5.png';
import Category6 from '@/assets/images/IconCategory6.png';
import Category7 from '@/assets/images/IconCategory7.png';
import Category8 from '@/assets/images/IconCategory8.png';
import Category9 from '@/assets/images/IconCategory9.png';
import Category10 from '@/assets/images/IconCategory10.png';
import Category11 from '@/assets/images/IconCategory11.png';
import Category12 from '@/assets/images/IconCategory12.png';
import Profile1 from '@/assets/images/Profile1.png';
import Profile5 from '@/assets/images/Profile5.png';
import ArrowCircle from '@/assets/images/ArrowCircle.png';
import IconNavArrowRev from '@/assets/images/IconNavArrow_Rev.png';
import HomeTop from '@/components/home/HomeTop';
import ScrollButton from '@/components/common/ScrollButton';
import SwiperSection from '@/components/home/SwiperSection';
import CategoryCard from '@/components/home/CategoryCard';
import Footer from '@/components/common/Footer';
import PostCreateModal from '@/components/post/modal/PostCreate';
import useModal from '@/hooks/useModal';
import fetcher from '@/utils/fetcher';
import useSWR from 'swr';
import AuthModal from '@/components/common/Auth/AuthModal';
import axios, { toast } from 'axios';
import { allFilter, approachArr, articleArr } from '@/frontDB/filterDB';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginCheck } from '@/atoms/login';

const categoryIcon = [
  Category1,
  Category2,
  Category3,
  Category4,
  Category5,
  Category6,
  Category7,
  Category8,
  Category9,
  Category10,
  Category11,
  Category12,
];

function Main() {
  const cookies = new Cookies();
  const { data: myData } = useSWR(
    cookies.get('X-AUTH-TOKEN') ? ['/auth/token', cookies.get('X-AUTH-TOKEN')] : null,
    fetcher,
  );
  const [categoryCheck, setCategoryCheck] = useState(0);
  const [newPost, setNewPost] = useState([]);
  const [deadlinePost, setDeadlinePost] = useState([]);
  const [catList, setCatList] = useState([]);

  const [authVisible, openAuth, closeAuth] = useModal();
  const [postVisible, openPost, closePost] = useModal();
  const isLogin = useRecoilValue(loginCheck);

  const navigate = useNavigate();

  const handlePostModal = useCallback(
    (category) => {
      if (myData && myData.data) {
        setCategoryCheck(category);
        openPost();
      } else {
        const login = window.confirm('로그인 후 이용가능합니다. 로그인하시겠습니까?');
        if (login) {
          return openAuth();
        }
        return;
      }
    },
    [isLogin, myData],
  );

  const getCategoryList = useCallback(async () => {
    try {
      const { data } = await axios.get('/category/list');
      const listData = [];
      data.data.forEach((dataDepth) => {
        dataDepth.children.forEach((e) => {
          listData.push({
            catParentName: dataDepth.categoryName,
            ...e,
          });
        });
      });

      switch (data.status) {
        case 200:
          setCatList(listData);
          break;
        case 2001:
        case 2301:
          toast.error(data.message);
          break;
        default:
          break;
      }
    } catch (error) {
      toast.error(error);
      console.dir(error);
    }
  }, []);

  const axiosGetNewPost = useCallback(async () => {
    try {
      const { data } = await axios.get('/board/list');
      switch (data.status) {
        case 200:
          setNewPost([...data.data.contents]);
          break;
        case 2001:
        case 2301:
          toast.error(data.message);
          break;
        default:
          break;
      }
    } catch (error) {
      toast.error(error);
      console.dir(error);
    }
  }, []);

  const axiosGetDeadLinePost = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      const context = {
        params,
      };
      params.append('order', 'expired');

      const { data } = await axios.get('/board/list', context);
      switch (data.status) {
        case 200:
          setDeadlinePost([...data.data.contents]);
          break;
        case 2001:
        case 2301:
          toast.error(data.message);
          break;
        default:
          break;
      }
    } catch (error) {
      toast.error(error);
      console.dir(error);
    }
  }, []);

  const navigatePost = (type = 0) => {
    const filterContext = {
      article: articleArr[type],
      approach: [...approachArr],
      categorylist: [...allFilter],
    };
    if (localStorage) {
      localStorage.setItem('postFilter', JSON.stringify(filterContext));
    }

    return navigate('/post');
  };

  useEffect(() => {
    getCategoryList();
    axiosGetNewPost();
    axiosGetDeadLinePost();
  }, []);

  return (
    <MainMain>
      <ScrollButton />
      <HomeTop />
      <MainCategory>
        <SectionWrap>
          <SectionWraph4>12가지 분야에서 크루원 절찬리 모집중!</SectionWraph4>
          <SectionWrapp>혼자서 공부하기 힘들었죠? 이제는 크루원들과 함께 성공합시다~!</SectionWrapp>
          <GridWrap>
            {catList.length > 0 &&
              catList.map((data) => <CategoryCard data={data} key={data.categoryId} />)}
          </GridWrap>
        </SectionWrap>
      </MainCategory>
      <MainWrite>
        <WriteWrap>
          <h4>나도 크루원 모집해볼래요~!</h4>
          <p>더울 효율적이면서, 간편하게 크루원을 모집해보아요</p>
          <WriteButtonList>
            <WriteButtonLi1>
              <WriteButton onClick={() => handlePostModal(0)}>
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
              <WriteButton onClick={() => handlePostModal(1)}>
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
          <h4 onClick={() => navigatePost(0)}>신규 크루원 모집글</h4>
          <p>이번주 새롭게 크루원을 모집하는 모집글을 소개해드려요.</p>
          <SwiperSection data={newPost} post={'New'} cookies={cookies.get('X-AUTH-TOKEN')} />

          <h4 onClick={() => navigatePost(2)}>마감임박! 놓치지 말아요!</h4>
          <p>마감일이 가깝거나 모집인원을 거의 다 모은 크루원 모집글을 소개해드려요.</p>
          <SwiperSection
            data={deadlinePost}
            post={'Deadline'}
            cookies={cookies.get('X-AUTH-TOKEN')}
          />
        </PostWrap>
      </MainPost>
      <Footer />
      <PostCreateModal closeModal={closePost} visible={postVisible} category={categoryCheck} />
      <AuthModal closeModal={closeAuth} visible={authVisible} />
    </MainMain>
  );
}

export default Main;

const MainMain = styled.main`
  margin-left: 142px;
  box-sizing: border-box;
  overflow-x: hidden;

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

  h4 {
    text-align: center;
    font-size: 20px;
    font-weight: 700;
  }

  p {
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: #868686;
    margin-top: 10px;
  }

  @media screen and (max-width: 820px) {
    max-width: calc(100vw - 40px);

    h4 {
      text-align: left;
      font-size: 18px;
      line-height: 26px;
    }

    p {
      text-align: left;
      font-size: 12px;
      line-height: 20px;
      margin-top: 8px;
    }
  }

  @media screen and (max-width: 300px) {
    max-width: calc(100vw - 20px);
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
  font-size: 14px;
  font-weight: 400;
  color: #868686;
  margin-top: 10px;

  @media screen and (max-width: 820px) {
    font-size: 12px;
    line-height: 20px;
    margin-top: 8px;
  }
`;

function template(i) {
  return `
    &:nth-child(${i + 1}) {
      .Icon {
        background-image: url(${categoryIcon[i]});
      }
    }
  `;
}

function getIcon() {
  let str = '';

  for (let index = 0; index < 12; index += 1) {
    str += template(index);
  }
  return str;
}

const GridWrap = styled.ul`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 46px;
  margin-right: -5px;

  li {
    ${getIcon()}
  }
  @media screen and (max-width: 820px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }
  @media screen and (max-width: 300px) {
    grid-template-columns: 1fr 1fr;
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
  box-sizing: border-box;
  box-shadow: 5px 5px 10px rgb(0 0 0 / 10%);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: 1s;

  h5 {
    font-size: 20px;
    font-weight: 300;
    color: white;
    margin: 0;
    line-height: 26px;
    text-align: right;
    transform: translateY(0);
    position: relative;
    transition: 0.5s;
    em {
      font-weight: 500;
    }
  }

  :hover {
    h5 {
      @media screen and (max-width: 820px) {
        transform: none;
      }
      transform: translateY(-34px);
    }
    div {
      opacity: 1;
      transition-delay: 0.1s;
    }
  }

  @media screen and (max-width: 820px) {
    height: 86px;
    padding: 20px 0;
    justify-content: center;

    h5 {
      text-align: center;
      span {
        display: none;
      }
    }
  }

  @media screen and (max-width: 300px) {
    h5 {
      font-size: 18px;
      line-height: 24px;
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
  transition: 0.5s;
  transition-delay: 0s;

  @media screen and (max-width: 820px) {
    display: none;
  }
`;

const WriteButtonList = styled.ul`
  display: flex;
`;

const WriteButtonLi1 = styled.li`
  width: 100%;
  height: 180px;
  margin-top: 45px;
  border-radius: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  cursor: pointer;
  position: relative;
  transition: 1s;
  background-color: #0575e6;
  :hover {
    background-color: #005ec5;
  }
  margin-right: 48px;

  @media screen and (max-width: 820px) {
    margin-right: 20px;
    margin-top: 30px;
    height: 86px;
    padding: 20px 0;
    justify-content: center;
  }

  @media screen and (max-width: 300px) {
    margin-right: 15px;
  }
`;

const WriteButtonLi2 = styled.li`
  width: 100%;
  height: 180px;
  margin-top: 45px;
  border-radius: 10px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  cursor: pointer;
  transition: 1s;
  background-color: #ffd458;
  :hover {
    background-color: #fcb90d;
  }
  width: 100%;

  @media screen and (max-width: 820px) {
    margin-top: 30px;
    height: 86px;
    padding: 20px 0;
    justify-content: center;
  }
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

  & > h4 {
    font-size: 20px;
    font-weight: 700;
    display: flex;
    color: #000;
    align-items: center;
    cursor: pointer;
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
  & > p {
    font-size: 14px;
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

  @media screen and (max-width: 300px) {
    max-width: calc(100vw - 20px);
  }
`;
