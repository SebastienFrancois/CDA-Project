import { ProjectContext } from './../../contexts/ProjectContext';
import React, { FC, useContext } from 'react';
import './Overview.scss';

const Overview: FC = () => {
  const { project } = useContext(ProjectContext);
  return (
    <div>
      <h1>Overview {project?.name}</h1>
      <p>TBD</p>
    </div>
  );
};

export default Overview;
