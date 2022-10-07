import TasksListRow from '../TasksListRow/TasksListRow';
import React, { FC, useContext } from 'react';
import './TasksList.scss';
import { ProjectContext } from './../../contexts/ProjectContext';

const typesColumn: TaskStatus[] = ['backlog', 'in progress', 'in review', 'done'];

const TasksList: FC = () => {
  const { project } = useContext(ProjectContext);
  return (
    <div className="mt-6">
      {typesColumn.map((type) => (
        <TasksListRow
          key={type}
          status={type}
          items={project?.tasks}
          // isDragging={isDragging}
          // handleDragging={handleDragging}
          // handleUpdateList={handleUpdateList}
        />
      ))}
    </div>
  );
};

export default TasksList;
