import React, { lazy, Suspense } from 'react';

const LazySidebar = lazy(() => import('./Sidebar'));

const Sidebar = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySidebar {...props} />
  </Suspense>
);

export default Sidebar;
