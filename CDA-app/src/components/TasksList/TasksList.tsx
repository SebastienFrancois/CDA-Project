import TasksListRow from '../TasksListRow/TasksListRow';
import React, { FC } from 'react';
import './TasksList.scss';

export interface TasksListProps {
  project: { getProject: IProject };
}

const typesColumn: TaskStatus[] = ['backlog', 'in progress', 'in review', 'done'];

const TasksList: FC<TasksListProps> = ({ project }) => {
  return (
    <div className="mt-6">
      {typesColumn.map((type) => (
        <TasksListRow
          key={type}
          status={type}
          items={project.getProject.tasks}
          // isDragging={isDragging}
          // handleDragging={handleDragging}
          // handleUpdateList={handleUpdateList}
        />
      ))}
    </div>
  );
};

export default TasksList;
