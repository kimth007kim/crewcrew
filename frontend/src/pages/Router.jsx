import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './home';
import Login from './login';
import NotFound from './notFound';
import Register from './register';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
