import dayjs from 'dayjs';
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
              <div className="flex space-x-4">
                <ProjectCard
                  name="1st Project"
                  status="not started"
                  dueDate={dayjs().unix().toString()}
                />
                <ProjectCard
                  name="2nd Project"
                  status="not started"
                  dueDate={dayjs().unix().toString()}
                />
                <ProjectCard
                  name="3rd Project"
                  status="in progress"
                  dueDate={dayjs().unix().toString()}
                />
                <ProjectCard name="4th Project" status="late" dueDate={dayjs().unix().toString()} />
                <ProjectCard name="5th Project" status="done" dueDate={dayjs().unix().toString()} />
              </div>
            </div>
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default AppAuthenticated;
