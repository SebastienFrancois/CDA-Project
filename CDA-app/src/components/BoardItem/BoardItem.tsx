import React, { FC } from 'react';
import useModal from '../../hooks/useModal';
import TaskCardModal from '../TaskCardModal/TaskCardModal';
import './BoardItem.scss';

interface BoardItemProps {
  task: ITask;
  handleDragging: (dragging: boolean) => void;
}

const BoardItem: FC<BoardItemProps> = ({ task, handleDragging }) => {
  const { isShowing, toggle } = useModal();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text', `${task._id}`);
    handleDragging(true);
  };

  const handleDragEnd = () => handleDragging(false);

  return (
    <>
      <TaskCardModal isShowing={isShowing} hide={toggle} task={task} />
      <div
        className="boardItem rounded-lg mb-4 p-2 cursor-pointer"
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={toggle}
      >
        <div className={`flex gap-2 flex-wrap ${task.labels.length > 0 ? 'mb-4' : ''}`}>
          {task.labels.length > 0 &&
            task.labels.map((label, i) => (
              <p
                key={label._id + i}
                className="pill font-bold"
                style={{ color: label.color, background: `${label.color}33` }}
              >
                {label.name}
              </p>
            ))}
        </div>
        <p className="font-bold text-xl">{task.name}</p>
      </div>
    </>
  );
};

export default BoardItem;
