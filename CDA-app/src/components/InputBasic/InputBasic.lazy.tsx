import React, { lazy, Suspense } from 'react';
import { InputBasicProps } from './InputBasic';

const LazyInputBasic = lazy(() => import('./InputBasic'));

const InputBasic = (props: JSX.IntrinsicAttributes & InputBasicProps) => (
  <Suspense fallback={null}>
    <LazyInputBasic {...props} />
  </Suspense>
);

export default InputBasic;
