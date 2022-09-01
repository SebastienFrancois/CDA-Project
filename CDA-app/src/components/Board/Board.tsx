import React, { FC } from 'react';
import './Board.scss';

export interface BoardProps {
  project: { getProject: IProject };
}

const Board: FC<BoardProps> = ({ project }) => {
  return (
    <div>
      <h1>Board {project?.getProject.name}</h1>
    </div>
  );
};

export default Board;
