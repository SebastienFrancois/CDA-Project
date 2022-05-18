import React, { lazy, Suspense } from 'react';

const LazyProjectCard = lazy(() => import('./ProjectCard'));

const ProjectCard = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyProjectCard {...props} />
  </Suspense>
);

export default ProjectCard;
