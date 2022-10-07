import TaskCard from '../TaskCard/TaskCard';
import React, { FC } from 'react';
import './TasksListRow.scss';

interface TasksListRowProps {
  status: TaskStatus;
  items: ITask[] | undefined;
}

const TasksListRow: FC<TasksListRowProps> = ({ status, items = [] }) => {
  return (
    <div className="TasksListRow mb-4">
      <fieldset className="border-solid border-t-2 p-2">
        <legend className="ml-4 px-4 capitalize">{status}</legend>
        {items.map((task) => status === task.status && <TaskCard task={task} key={task._id} />)}
      </fieldset>
    </div>
  );
};

export default TasksListRow;
