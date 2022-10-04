import React, { lazy, Suspense } from 'react';

const LazyTaskCardChat = lazy(() => import('./TaskCardChat'));

const TaskCardChat = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTaskCardChat {...props} />
  </Suspense>
);

export default TaskCardChat;
