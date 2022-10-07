import { ProjectContext } from './../../contexts/ProjectContext';
import React, { FC, useContext } from 'react';
import './Graphs.scss';

const Graphs: FC = () => {
  const { project } = useContext(ProjectContext);

  return (
    <div>
      <h1>Graphs {project?.name}</h1>
    </div>
  );
};

export default Graphs;
