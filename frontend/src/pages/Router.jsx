import React from 'react';
import loadable from '@loadable/component';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import PageLoader from '@/components/common/PageLoader';

const Fallback = {
  fallback: <PageLoader></PageLoader>,
};

const Home = loadable(() => import('./home'), Fallback);
const NotFound = loadable(() => import('./notfound'), Fallback);
const Post = loadable(() => import('./post'), Fallback);
const MyPage = loadable(() => import('./mypage'), Fallback);
const PostDetail = loadable(() => import('./post/id'), Fallback);
const Recruit = loadable(() => import('./mypage/recruit'), Fallback);
const Request = loadable(() => import('./mypage/request'), Fallback);
const Kakao = loadable(() => import('./callback/kakao'), Fallback);
const Naver = loadable(() => import('./callback/naver'), Fallback);
const Chat = loadable(() => import('./chat'), Fallback);
const ChatDetail = loadable(() => import('./chat/chatId'), Fallback);
const MyActivity = loadable(() => import('./mypage/myactivity'), Fallback);
const Profile = loadable(() => import('./mypage/profile'), Fallback);
const PageTimeline = loadable(() => import('./mypage/timeline'), Fallback);

function Router() {
  return (
    <BrowserRouter>
      <HelmetProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/callback/kakao" element={<Kakao />} />
          <Route path="/callback/naver" element={<Naver />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post" element={<Post />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/chat/:boardId/:uid" element={<ChatDetail />} />
          <Route path="/chat/:boardId/:uid/:roomId" element={<ChatDetail />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/request" element={<Request />} />
          <Route path="/mypage/recruit" element={<Recruit />} />
          <Route path="/mypage/activity" element={<MyActivity />} />
          <Route path="/mypage/timeline" element={<PageTimeline />} />
          <Route path="/profile/:uid" element={<Profile />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </HelmetProvider>
    </BrowserRouter>
  );
}

export default Router;
