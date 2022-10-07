import React, { lazy, Suspense } from 'react';

const LazyModalLabel = lazy(() => import('./ModalLabel'));

const ModalLabel = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyModalLabel {...props} />
  </Suspense>
);

export default ModalLabel;
