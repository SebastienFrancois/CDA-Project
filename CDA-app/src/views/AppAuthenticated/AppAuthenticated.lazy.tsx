import React, { lazy, Suspense } from 'react';

const LazyAppAuthenticated = lazy(() => import('./AppAuthenticated'));

const AppAuthenticated = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAppAuthenticated {...props} />
  </Suspense>
);

export default AppAuthenticated;
