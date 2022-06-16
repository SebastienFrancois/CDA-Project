import React, { lazy, Suspense } from 'react';
import { BasicButtonProps } from './BasicButton';

const LazyBasicButton = lazy(() => import('./BasicButton'));

const BasicButton = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode } & BasicButtonProps,
) => (
  <Suspense fallback={null}>
    <LazyBasicButton {...props} />
  </Suspense>
);

export default BasicButton;
