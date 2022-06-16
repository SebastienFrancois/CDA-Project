import React, { lazy, Suspense } from 'react';

const LazyInputBasic = lazy(() => import('./InputBasic'));

const InputBasic = (
  props: JSX.IntrinsicAttributes & {
    children?: React.ReactNode;
    type: string;
    label: string;
    required: boolean;
    placeholder?: string;
    error?: string;
  },
) => (
  <Suspense fallback={null}>
    <LazyInputBasic {...props} />
  </Suspense>
);

export default InputBasic;
