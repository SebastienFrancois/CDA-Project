import React, { lazy, Suspense } from 'react';

const LazyBasicButton = lazy(() => import('./BasicButton'));

const BasicButton = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode }) => (
  <Suspense fallback={null}>
    <LazyBasicButton {...props} />
  </Suspense>
);

export default BasicButton;
