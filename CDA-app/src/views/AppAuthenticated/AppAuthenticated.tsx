import React, { FC } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { PROJECTS } from './../../api/query';

import ProjectForm from 'components/ProjectForm/ProjectForm.lazy';
import Dashboard from 'components/Dashboard/Dashboard.lazy';
import Sidebar from 'components/Sidebar/Sidebar.lazy';
import Project from 'components/Project/Project.lazy';
import { appContainer } from '../../App.style';

interface AppAuthenticatedProps {}

const AppAuthenticated: FC<AppAuthenticatedProps> = () => {
  const { loading, error, data } = useQuery(PROJECTS.get);

  return (
    <div className={appContainer}>
      <Routes>
        <Route path="/" element={<Sidebar projects={data} />}>
          <Route path="/dashboard" element={<Dashboard projects={data} isLoading={loading} />} />
          <Route path="/create-project" element={<ProjectForm />} />
          <Route path="/update-project" element={<ProjectForm />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AppAuthenticated;
