import React, { lazy, Suspense } from 'react';
import { ProjectContextProvider } from './../../contexts/ProjectContext';

const LazyProject = lazy(() => import('./Project'));

const Project = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode }) => (
  <ProjectContextProvider>
    <Suspense fallback={null}>
      <LazyProject {...props} />
    </Suspense>
  </ProjectContextProvider>
);

export default Project;
