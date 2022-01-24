import React from 'react';
import { ToastContainer } from 'react-toastify';
import Router from './pages/Router';
import GlobalStyle from './GlobalStyle';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router />
      <ToastContainer autoClose={3000} hideProgressBar limit={3} />
    </>
  );
}

export default App;
