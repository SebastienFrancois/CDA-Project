import React, { lazy, Suspense } from 'react';
import { TasksListProps } from './TasksList';

const LazyTasksList = lazy(() => import('./TasksList'));

const TasksList = (props: JSX.IntrinsicAttributes & TasksListProps) => (
  <Suspense fallback={null}>
    <LazyTasksList {...props} />
  </Suspense>
);

export default TasksList;
