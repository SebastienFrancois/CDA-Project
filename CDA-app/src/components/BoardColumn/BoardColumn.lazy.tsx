import React, { lazy, Suspense } from 'react';

const LazyBoardColumn = lazy(() => import('./BoardColumn'));

const BoardColumn = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyBoardColumn {...props} />
  </Suspense>
);

export default BoardColumn;
