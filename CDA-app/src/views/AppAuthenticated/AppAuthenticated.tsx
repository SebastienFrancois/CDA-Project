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
  // if (error) return <p>Error</p>;

  return (
    <div className={appContainer}>
      <Routes>
        <Route path="/" element={<Sidebar projects={data} />}>
          <Route path="/dashboard" element={<Dashboard projects={data} />} />
          <Route path="/create-project" element={<ProjectForm />} />
          <Route path="/update-project" element={<ProjectForm />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppAuthenticated;
