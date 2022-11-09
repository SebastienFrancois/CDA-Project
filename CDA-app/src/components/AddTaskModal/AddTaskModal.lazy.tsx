import React, { lazy, Suspense } from 'react';

const LazyAddTaskModal = lazy(() => import('./AddTaskModal'));

const AddTaskModal = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAddTaskModal {...props} />
  </Suspense>
);

export default AddTaskModal;
