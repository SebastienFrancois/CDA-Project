import React, { lazy, Suspense } from 'react';

const LazyBoardItem = lazy(() => import('./BoardItem'));

const BoardItem = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyBoardItem {...props} />
  </Suspense>
);

export default BoardItem;
