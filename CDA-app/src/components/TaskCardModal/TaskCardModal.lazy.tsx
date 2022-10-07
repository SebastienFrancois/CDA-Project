import React, { lazy, Suspense } from 'react';

const LazyTaskCardModal = lazy(() => import('./TaskCardModal'));

const TaskCardModal = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTaskCardModal {...props} />
  </Suspense>
);

export default TaskCardModal;
