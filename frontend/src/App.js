import React from 'react';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';
import Router from './pages/Router';
import GlobalStyle from './GlobalStyle';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <Router />
      </RecoilRoot>
      <ToastContainer autoClose={3000} hideProgressBar limit={3} />
    </>
  );
}

export default App;
