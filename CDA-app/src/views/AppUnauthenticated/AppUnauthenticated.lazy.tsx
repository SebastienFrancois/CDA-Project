import React, { lazy, Suspense } from 'react';

const LazyAppUnauthenticated = lazy(() => import('./AppUnauthenticated'));

const AppUnauthenticated = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAppUnauthenticated {...props} />
  </Suspense>
);

export default AppUnauthenticated;
