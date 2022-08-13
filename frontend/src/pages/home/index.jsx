import React from 'react';
import Lnb from '@/components/common/Lnb/Lnb';
import Main from './Main';
import { Helmet } from 'react-helmet-async';

function Home() {
  return (
    <div>
      <Helmet>
        <title>크루크루</title>
      </Helmet>
      <Lnb path="home" />
      <Main />
    </div>
  );
}

export default Home;
