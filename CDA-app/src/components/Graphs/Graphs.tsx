import React, { FC } from 'react';
import './Graphs.scss';

export interface GraphsProps {project: { getProject: IProject}}

const Graphs: FC<GraphsProps> = ({project}) => {
  return (
    <div>
      <h1>Graphs {project?.getProject.name}</h1>
    </div>
  )
};

export default Graphs;
