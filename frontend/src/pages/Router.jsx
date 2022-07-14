import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home';
import Testing from './testing';
import NotFound from './notfound';
import Post from './post';
import MyPage from './mypage';
import PostDetail from './post/id';
import Recruit from './mypage/recruit';
import Request from './mypage/request';
import Kakao from './callback/kakao';
import Naver from './callback/naver';
import Chat from './chat';
import ChatDetail from './chat/chatId';
import MyActivity from './mypage/myactivity';
import Profile from './mypage/profile';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import PageTimeline from './mypage/timeline';

function Router() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Helmet></Helmet>
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
          <Route path="/mypage/activity" element={<MyActivity />} />
          <Route path="/mypage/chat" element={<Chat />} />
          <Route path="/mypage/chat/:boardId" element={<ChatDetail />} />
          <Route path="/mypage/chat/:boardId/:roomId" element={<ChatDetail />} />
          <Route path="/profile/:uid" element={<Profile />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </HelmetProvider>
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
        <Route path="/mypage/activity" element={<MyActivity />} />
        <Route path="/mypage/chat" element={<Chat />} />
        <Route path="/mypage/chat/:boardId" element={<ChatDetail />} />
        <Route path="/mypage/chat/:boardId/:roomId" element={<ChatDetail />} />
        <Route path="/profile/:uid" element={<Profile />} />
        <Route path="/mypage/timeline" element={<PageTimeline />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
