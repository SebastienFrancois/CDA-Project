import React, { lazy, Suspense } from 'react';
import { ProjectTabsProps } from './ProjectTabs';

const LazyProjectTabs = lazy(() => import('./ProjectTabs'));

const ProjectTabs = (props: JSX.IntrinsicAttributes & ProjectTabsProps) => (
  <Suspense fallback={null}>
    <LazyProjectTabs {...props} />
  </Suspense>
);

export default ProjectTabs;
