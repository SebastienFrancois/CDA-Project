import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
// import axios from 'axios';

import { appContainer } from '../../App.style';
import ProjectCard from '../../components/ProjectCard/ProjectCard.lazy';

interface AppAuthenticatedProps {}

const AppAuthenticated: FC<AppAuthenticatedProps> = () => {
  // axios.defaults.baseURL = 'http://localhost:5000/api/';

  return (
    <div className={appContainer}>
      <Routes>
        <Route path="/" element={<ProjectCard />}></Route>
      </Routes>
    </div>
  );
};

export default AppAuthenticated;
