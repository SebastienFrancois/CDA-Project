import React, { lazy, Suspense } from 'react';

const LazyAddButton = lazy(() => import('./AddButton'));

const AddButton = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode; onClick: () => void },
) => (
  <Suspense fallback={null}>
    <LazyAddButton {...props} />
  </Suspense>
);

export default AddButton;
