import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { appContainer } from '../../App.style';

import Dashboard from 'components/Dashboard/Dashboard.lazy';

interface AppAuthenticatedProps {}

const AppAuthenticated: FC<AppAuthenticatedProps> = () => {
  return (
    <div className={appContainer}>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
      </Routes>
    </div>
  );
};

export default AppAuthenticated;
