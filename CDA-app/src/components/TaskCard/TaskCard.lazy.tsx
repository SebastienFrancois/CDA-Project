import React, { lazy, Suspense } from 'react';

const LazyTaskCard = lazy(() => import('./TaskCard'));

const TaskCard = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTaskCard {...props} />
  </Suspense>
);

export default TaskCard;
