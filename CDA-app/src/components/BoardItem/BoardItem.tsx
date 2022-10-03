import React, { FC } from 'react';
import './BoardItem.scss';

interface BoardItemProps {
  task: ITask;
  handleDragging: (dragging: boolean) => void;
}

const BoardItem: FC<BoardItemProps> = ({ task, handleDragging }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', `${task._id}`);
    handleDragging(true);
  };

  const handleDragEnd = () => handleDragging(false);
  return (
    <div draggable onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <p>{task.name}</p>
    </div>
  );
};

export default BoardItem;
