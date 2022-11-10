import React, { lazy, Suspense } from 'react';

const LazyAddLabelModal = lazy(() => import('./AddLabelModal'));

const AddLabelModal = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAddLabelModal {...props} />
  </Suspense>
);

export default AddLabelModal;
