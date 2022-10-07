import BoardColumn from '../BoardColumn/BoardColumn';
import React, { FC, useContext, useEffect, useState } from 'react';
import './Board.scss';
import { useDragAndDrop } from './../../hooks/useDragAndDrop';
import { ProjectContext } from './../../contexts/ProjectContext';

const typesColumn: TaskStatus[] = ['backlog', 'in progress', 'in review', 'done'];

const Board: FC = () => {
  const { project } = useContext(ProjectContext);
  const [listItem, setListItem] = useState(project?.tasks);

  const { isDragging, handleDragging, handleUpdateList } = useDragAndDrop(listItem);

  useEffect(() => {
    console.log('fired board', project?.tasks);
    setListItem(project?.tasks);
  }, [project]);

  return (
    <div className="board flex gap-4">
      {typesColumn.map((type) => (
        <BoardColumn
          key={type}
          status={type}
          items={listItem}
          isDragging={isDragging}
          handleDragging={handleDragging}
          handleUpdateList={handleUpdateList}
        />
      ))}
    </div>
  );
};

export default Board;
