import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

import { appContainer } from '../../App.style';

interface AppAuthenticatedProps {}

const AppAuthenticated: FC<AppAuthenticatedProps> = () => {
  axios.defaults.baseURL = 'http://api.local.morio.co/v1';

  return (
    <div className={appContainer}>
      <Routes>
        <Route path="/" element={<div>home</div>}></Route>
      </Routes>
    </div>
  );
};

export default AppAuthenticated;
