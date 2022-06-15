import React, { lazy, Suspense } from 'react';

const LazyHeaderMain = lazy(() => import('./HeaderMain'));

const HeaderMain = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyHeaderMain {...props} />
  </Suspense>
);

export default HeaderMain;
