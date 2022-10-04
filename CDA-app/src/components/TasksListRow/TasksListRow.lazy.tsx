import React, { lazy, Suspense } from 'react';

const LazyTasksListRow = lazy(() => import('./TasksListRow'));

const TasksListRow = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTasksListRow {...props} />
  </Suspense>
);

export default TasksListRow;
