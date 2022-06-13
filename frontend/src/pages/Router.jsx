import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home';
import Testing from './testing';
import NotFound from './notfound';
import Post from './post';
import MyPage from './mypage';
import PostDetail from './post/id';
import Recruit from './mypage/recruit';
import Participate from './mypage/participate';
import Request from './mypage/request';
import Arrive from './mypage/arrive';
import Kakao from './callback/kakao';
import Naver from './callback/naver';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback/kakao" element={<Kakao />} />
        <Route path="/callback/naver" element={<Naver />} />
        <Route path="/home" element={<Home />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/post" element={<Post />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/request" element={<Request />} />
        <Route path="/mypage/recruit" element={<Recruit />} />
        <Route path="/mypage/participate" element={<Participate />} />
        <Route path="/mypage/arrive" element={<Arrive />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
