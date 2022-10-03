import BoardColumn from '../BoardColumn/BoardColumn';
import React, { FC } from 'react';
import './Board.scss';
import { useDragAndDrop } from './../../hooks/useDragAndDrop';

export interface BoardProps {
  project: { getProject: IProject };
}

const typesColumn: TaskStatus[] = ['backlog', 'in progress', 'in review', 'done'];

const Board: FC<BoardProps> = ({ project }) => {
  const { isDragging, listItems, handleDragging, handleUpdateList } = useDragAndDrop(
    project.getProject.tasks,
  );
  //console.log(project.getProject.tasks);

  return (
    <div className="board grid grid-cols-4 gap-4">
      {/* <h1>Board {project?.getProject.name}</h1> */}
      {typesColumn.map((type) => (
        <BoardColumn
          key={type}
          status={type}
          items={listItems}
          isDragging={isDragging}
          handleDragging={handleDragging}
          handleUpdateList={handleUpdateList}
        />
      ))}
    </div>
  );
};

export default Board;
