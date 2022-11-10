import React, { lazy, Suspense } from 'react';

const LazyAvatarList = lazy(() => import('./AvatarList'));

const AvatarList = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyAvatarList {...props} />
  </Suspense>
);

export default AvatarList;
