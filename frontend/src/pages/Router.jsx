import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home';
import Testing from './testing';
import NotFound from './notFound';
import Register from './register';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testing" element={<Testing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
