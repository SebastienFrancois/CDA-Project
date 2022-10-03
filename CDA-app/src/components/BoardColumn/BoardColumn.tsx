import BoardItem from './../../components/BoardItem/BoardItem';
import React, { FC } from 'react';
import './BoardColumn.scss';

interface BoardColumnProps {
  status: TaskStatus;
  items: ITask[];
  isDragging: boolean;
  handleDragging: (dragging: boolean) => void;
  handleUpdateList: (id: string, status: TaskStatus) => void;
}

const BoardColumn: FC<BoardColumnProps> = ({
  status,
  items = [],
  isDragging, // to change style of Board Column when dragging if needed
  handleDragging,
  handleUpdateList,
}) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleUpdateList(e.dataTransfer.getData('text'), status);
    handleDragging(false);
  };

  //console.log(items);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => e.preventDefault();

  return (
    <div
      className={`layout-cards ${isDragging ? 'layout-dragging' : ''}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <h2 className={`${status.replace(' ', '-')}`}>{status}</h2>
      <div className="tasks-container">
        {items.map(
          (task) =>
            status === task.status && (
              <BoardItem task={task} key={task._id} handleDragging={handleDragging} />
            ),
        )}
      </div>
    </div>
  );
};

export default BoardColumn;
