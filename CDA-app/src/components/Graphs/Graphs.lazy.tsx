import React, { lazy, Suspense } from 'react';
import { GraphsProps } from './Graphs';

const LazyGraphs = lazy(() => import('./Graphs'));

const Graphs = (props: JSX.IntrinsicAttributes & GraphsProps) => (
  <Suspense fallback={null}>
    <LazyGraphs {...props} />
  </Suspense>
);

export default Graphs;
