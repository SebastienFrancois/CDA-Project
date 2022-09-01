import React, { FC } from 'react';
import './TasksList.scss';

export interface TasksListProps {project: { getProject: IProject}}

const TasksList: FC<TasksListProps> = ({project}) => {
  return (
    <div>
      <h1>Tasks list {project?.getProject.name}</h1>
    </div>
  )
}

export default TasksList;
