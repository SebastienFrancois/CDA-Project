import React, { lazy, Suspense } from 'react';

const LazyProjectForm = lazy(() => import('./ProjectForm'));

const ProjectForm = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode }) => (
  <Suspense fallback={null}>
    <LazyProjectForm {...props} />
  </Suspense>
);

export default ProjectForm;
