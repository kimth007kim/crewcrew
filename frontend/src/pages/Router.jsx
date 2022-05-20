import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home';
import Testing from './testing';
import NotFound from './notfound';
import Post from './post';
import MyPage from './mypage';
import PostDetail from './post/id';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/post" element={<Post />}></Route>
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
