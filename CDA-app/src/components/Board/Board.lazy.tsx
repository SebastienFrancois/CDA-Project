import React, { lazy, Suspense } from 'react';
import { BoardProps } from './Board';

const LazyBoard = lazy(() => import('./Board'));

const Board = (props: JSX.IntrinsicAttributes & BoardProps) => (
  <Suspense fallback={null}>
    <LazyBoard {...props} />
  </Suspense>
);

export default Board;
