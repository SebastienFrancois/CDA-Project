import useModal from '../../hooks/useModal';
import React, { FC } from 'react';
import dayjs from 'dayjs';
import './TaskCard.scss';
import TaskCardModal from '../TaskCardModal/TaskCardModal';

interface TaskCardProps {
  task: ITask;
}

const TaskCard: FC<TaskCardProps> = ({ task }) => {
  const { isShowing, toggle } = useModal();

  return (
    <>
      <TaskCardModal isShowing={isShowing} hide={toggle} task={task} />
      <div className="TaskCard grid grid-cols-4 gap-4 p-4 mb-2 cursor-pointer" onClick={toggle}>
        <p>{task.name}</p>
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
        <div className="flex justify-center">pioupiou</div>
        <p>modifié par pioupiou le {dayjs(Number(task.updatedAt)).format('DD/MM/YYYY')}</p>
      </div>
    </>
  );
};

export default TaskCard;
