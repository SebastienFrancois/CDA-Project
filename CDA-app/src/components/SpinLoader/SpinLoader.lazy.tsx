import React, { lazy, Suspense } from 'react';

const LazySpinLoader = lazy(() => import('./SpinLoader'));

const SpinLoader = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySpinLoader {...props} />
  </Suspense>
);

export default SpinLoader;
