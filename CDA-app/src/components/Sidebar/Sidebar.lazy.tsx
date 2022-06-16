import React, { lazy, Suspense } from 'react';
import { SidebarProps } from './Sidebar';

const LazySidebar = lazy(() => import('./Sidebar'));

const Sidebar = (
  props: JSX.IntrinsicAttributes & { children?: React.ReactNode } & SidebarProps,
) => (
  <Suspense fallback={null}>
    <LazySidebar {...props} />
  </Suspense>
);

export default Sidebar;
