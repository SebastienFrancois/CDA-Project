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
      <div className="w-2/12 h-full"></div>
      <Routes>
        <Route
          path="/"
          element={
            <div className="w-8/12 h-full flex justify-center items-center">
              <ProjectCard />
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default AppAuthenticated;
