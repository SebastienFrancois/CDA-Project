import React, { FC } from 'react';
import './Overview.scss';

export interface OverviewProps {
  project: { getProject: IProject };
}

const Overview: FC<OverviewProps> = ({ project }) => {
  return (
    <div>
      <h1>Overview {project?.getProject.name}</h1>
      <p>TBD</p>
    </div>
  );
};

export default Overview;
