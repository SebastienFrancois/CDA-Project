import React, { lazy, Suspense } from 'react';

const LazyManagerSelect = lazy(() => import('./ManagerSelect'));

const ManagerSelect = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyManagerSelect {...props} />
  </Suspense>
);

export default ManagerSelect;
