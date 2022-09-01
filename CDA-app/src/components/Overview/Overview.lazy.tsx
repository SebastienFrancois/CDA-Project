import React, { lazy, Suspense } from 'react';
import { OverviewProps } from './Overview';

const LazyOverview = lazy(() => import('./Overview'));

const Overview = (props: JSX.IntrinsicAttributes & OverviewProps) => (
  <Suspense fallback={null}>
    <LazyOverview {...props} />
  </Suspense>
);

export default Overview;
