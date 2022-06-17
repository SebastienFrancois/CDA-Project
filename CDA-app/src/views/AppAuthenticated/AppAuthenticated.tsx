import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { PROJECTS } from 'api/query';

import ProjectForm from 'components/ProjectForm/ProjectForm.lazy';
import Dashboard from 'components/Dashboard/Dashboard.lazy';
import Sidebar from 'components/Sidebar/Sidebar.lazy';
import { appContainer } from '../../App.style';

interface AppAuthenticatedProps {}

const AppAuthenticated: FC<AppAuthenticatedProps> = () => {
  const { loading, error, data } = useQuery(PROJECTS.get);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className={appContainer}>
      <div className="w-2/12 h-full">
        <Sidebar projects={data} />
      </div>
      <div className="w-10/12 p-6 h-full flex flex-col justify-start items-start overflow-y-scroll overflow-x-hidden scroll-auto">
        <Routes>
          <Route path="/" element={<Dashboard projects={data} />}></Route>
          <Route path="/create-project" element={<ProjectForm />} />
          <Route path="/update-project" element={<ProjectForm />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppAuthenticated;
