import React, { lazy, Suspense } from 'react';

const LazyDevCheckbox = lazy(() => import('./DevCheckbox'));

const DevCheckbox = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyDevCheckbox {...props} />
  </Suspense>
);

export default DevCheckbox;
